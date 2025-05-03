/**
 * @module auth
 * @description Configuración de autenticación utilizando NextAuth.js con Google y credenciales.
 */

import type { NextAuthConfig, User } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

/**
 * Configuración principal de autenticación
 */
export const authConfig = {
  pages: {
    signIn: "/authentication",
    error: "/authentication/error",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: { params: { scope: "openid email profile" } },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        console.log("Email:", email);
        console.log("Password:", password);

        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "api/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
              credentials: "include",
            }
          );

          console.log("Login response status:", response.status);
          console.log("Login response ok:", response.ok);

          if (!response.ok) {
            console.log("Login response body:", await response.text());
            return null;
          }

          const data = await response.json();
          console.log("Login response data:", data);

          if (!data.userId || typeof data.userId !== "string") {
            console.log("Invalid userId in response");
            return null;
          }

          const cookies = response.headers.get("set-cookie");
          let jwtToken = null;
          if (cookies) {
            const jwtMatch = cookies.match(/jwt=([^;]+)/);
            jwtToken = jwtMatch ? jwtMatch[1] : null;
          }
          console.log("Extracted jwtToken:", jwtToken);

          return {
            id: data.userId,
            email,
            jwtToken,
          } satisfies User;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
        if (account?.provider !== "credentials") return true;
        // Verificar si el usuario existe y tiene los datos necesarios
        return !!user && !!user.id;
      },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.jwtToken = user.jwtToken;
      }
      if (account && profile) {
        token.id = profile.sub!;
        token.email = profile.email ?? "no-email@example.com";
      }
      console.log("JWT token:", token);
      return token;
    },
    async session({ session, token }) {
      try {
        console.log("Fetching /me with jwtToken:", token.jwtToken);
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "api/auth/me",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: token.jwtToken ? `Bearer ${token.jwtToken}` : "",
            },
          }
        );

        console.log("Response status:", response.status);
        if (!response.ok) {
          const errorBody = await response.text();
          console.error("Error response body:", errorBody);
          throw new Error(
            `Failed to fetch user data: ${response.status} ${errorBody}`
          );
        }

        const userData = await response.json();
        console.log("User data:", userData);
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: userData.name,
          role: userData.role,
          jwtToken: token.jwtToken,
          emailVerified: null,
        };
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        throw error; // Let Auth.js handle the error
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
