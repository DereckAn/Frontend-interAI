import { DefaultSession, DefaultUser } from 'next-auth';
import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string | null;
      email?: string | null;
      name?: string | null;
      role?: string | null;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    userId?: string;
    email?: string;
  }
}