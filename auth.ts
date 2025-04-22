/**
 * @module auth
 * @description Configuración de autenticación utilizando NextAuth.js con Google y credenciales.
 */

import type { NextAuthConfig, User } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

// Define la respuesta esperada del endpoint de inicio de sesión de Quarkus
interface QuarkusLoginResponse {
  userId: string;
  token: string;
  // Agrega otros campos si Quarkus devuelve más datos (por ejemplo, nombre, rol)
}

// Define la configuración para Auth.js
export const authConfig = {
  pages: {
    signIn: "/login", // Página de inicio de sesión
    error: "/auth/error", // Página de error
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
      /**
       * @function authorize
       * @description Valida las credenciales del usuario.
       * @param {Object} credentials - Credenciales del usuario.
       * @returns {Promise<User | null>} - Devuelve el usuario si la autenticación es exitosa, de lo contrario null.
       */
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

          // Store the token from the cookie or response
          const cookies = response.headers.get("set-cookie");
          let jwtToken = null;
          if (cookies) {
            const jwtMatch = cookies.match(/jwt=([^;]+)/);
            jwtToken = jwtMatch ? jwtMatch[1] : null;
          }

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
      // const existingUser = await getUserById(user.id?.toString()!);
      return true; // Always return a boolean, not the user object
    },
    /**
     * @function jwt
     * @description Callback que se ejecuta cada vez que se crea o actualiza un JWT.
     * @param {Object} param0 - Contiene el token y el usuario.
     * @returns {Promise<Object>} - Devuelve el token modificado.
     */
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email as string;
        token.jwtToken = user.jwtToken;
      }
      if (account && profile) {
        token.userId = profile.sub!;
        token.email = profile.email ?? "no-email@example.com";
      }
      return token;
    },
    /**
     * @function session
     * @description Callback que se ejecuta para crear el objeto 'session' que estará disponible en el cliente o servidor.
     * @param {Object} param0 - Contiene la sesión y el token.
     * @returns {Promise<Object>} - Devuelve la sesión modificada.
     */
    async session({ session, token }) {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "api/auth/me",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: token.jwtToken ? `Bearer ${token.jwtToken}` : "", // Include the token
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
          //   return null;
        }

        const userData = await response.json();
        session.user = {
          id: token.userId as string,
          email: token.email as string,
          name: userData.name,
          role: userData.role,
          jwtToken: token.jwtToken,
          emailVerified: null,
        };
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        throw new Error("Failed to fetch user data");
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Asegúrate de usar JWT como estrategia de sesión
  },
  secret: process.env.NEXTAUTH_SECRET, // Clave secreta para NextAuth
} satisfies NextAuthConfig;

// Exporta los handlers GET y POST y la función auth
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
