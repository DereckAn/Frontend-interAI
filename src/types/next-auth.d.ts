import { DefaultSession, DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    idToken?: string
    accessToken?: string
    user?: {
      id?: string | null
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
     // Puedes añadir propiedades aquí si usas adaptadores o el callback profile
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    idToken?: string
    accessToken?: string
    userId?: string
  }
}