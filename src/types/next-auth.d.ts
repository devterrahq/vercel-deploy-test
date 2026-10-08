import type { DefaultSession, User as NextAuthUser } from 'next-auth';
import type { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string[];
    } & DefaultSession['user'];
  }

  interface User extends NextAuthUser {
    app_metadata: {
      authorization: {
        role: string[];
      };
    };
  }

  interface Profile {
    account_id: string;
    email: string;
    name: string;
    picture: string;
    account_status: string;
    characteristics: {
      not_mentionable: boolean;
    };
    last_updated: string;
    nickname: string;
    zoneinfo: string;
    locale: string;
    extended_profile: {
      job_title: string;
      organization: string;
      location: string;
    };
    account_type: string;
    email_verified: boolean;
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends Record<string, unknown>, DefaultJWT {
    app_metadata?: {
      authorization: {
        role: string[];
      };
    };
  }
}
