import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import { JWT } from "next-auth/jwt"
// import { Session } from "next-auth"

// Define la configuración de Auth.js
export const authConfig = {
  pages: {
    signIn: "/login",
    //   signOut: "/auth/signout",
    error: "/auth/error",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // ¡Importante! Asegúrate de solicitar 'openid' y 'email' scopes
      // 'profile' es generalmente incluido por defecto.
      authorization: { params: { scope: "openid email profile" } },
    }),
    // Puedes añadir otros proveedores aquí (GitHub, Credentials, etc.)
  ],
  callbacks: {
    /**
     * Callback 'jwt': Se ejecuta cada vez que se crea o actualiza un JWT.
     * Aquí es donde puedes añadir información al token que Auth.js maneja internamente
     * y, crucialmente, el token que quieres enviar a tu backend (Quarkus).
     */
    async jwt({ token, account, profile }) {
      // 'account' contiene información del proveedor (Google, etc.) solo en el primer login
      if (account) {
        // 'id_token' de Google es un JWT que Quarkus podría validar si está configurado como OIDC client.
        // O podrías generar tu propio JWT aquí si usas Credentials o prefieres un token propio.
        token.idToken = account.id_token; // Guarda el id_token de Google
        token.accessToken = account.access_token; // Guarda el access_token si lo necesitas
        // Añade el ID de usuario de tu base de datos al token si es necesario.
        // Aquí usamos el 'sub' (subject) del perfil de Google como identificador único.
        // En un escenario real, podrías buscar/crear el usuario en tu BD aquí
        // y añadir tu propio user ID interno al token.
        token.userId = token.sub; // Asigna el 'sub' del token JWT estándar
      }
      return token; // Devuelve el token modificado
    },

    /**
     * Callback 'session': Se ejecuta para crear el objeto 'session' que
     * estará disponible en el cliente (useSession) o servidor (auth()).
     * Aquí expones la información necesaria del token JWT al resto de tu app Next.js.
     */
    async session({ session, token }) {
      // Añade la información del token (que modificamos en el callback 'jwt')
      // al objeto 'session'.
      // ¡NO expongas secretos o información sensible aquí!
      session.idToken = token.idToken as string; // Expone el id_token para enviarlo a Quarkus
      session.accessToken = token.accessToken as string; // Expone el access_token si es necesario
      if (session.user) {
        session.user.id = token.userId as string; // Expone el userId
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // Asegúrate de usar JWT como estrategia de sesión
  },
  // Añade tu NEXTAUTH_SECRET aquí, es crucial para la seguridad
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

// Exporta los handlers GET y POST y la función auth
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
