// === START OF AUTHORIZATION === //

// import { decode } from '@/middleware';
// import * as jose from 'jose';
// import NextAuth from 'next-auth';
// import type { NextAuthOptions } from 'next-auth';

// export const authOptions: NextAuthOptions = {
//   pages: {
//     signIn: '/signin',
//   },
//   providers: [
//     AtlassianProvider({
//       clientId: process.env.ATLASSIAN_CLIENT_ID,
//       clientSecret: process.env.ATLASSIAN_CLIENT_SECRET,
//       authorization: {
//         params: {
//           scope: 'read:me',
//         },
//       },
//       profile(profile) {
//         return {
//           id: profile.account_id,
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           app_metadata: {
//             authorization: {
//               role: ['admin', 'user'],
//             },
//           },
//         };
//       },
//     }),
//   ],
//   jwt: {
//     async encode({ token, secret }) {
//       try {
//         if (!token) throw new Error('No token to encode');
//         if (!secret) throw new Error('No secret to encode token with');

//         const base64Secret = jose.base64url.decode(secret);
//         const jwt = new jose.SignJWT(token)
//           .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
//           .setIssuedAt()
//           .setExpirationTime('30d')
//           .sign(base64Secret);

//         return jwt;
//       } catch (error) {
//         console.error(error);
//         return '';
//       }
//     },
//     decode,
//   },
//   callbacks: {
//     jwt({ token, user }) {
//       if (user) token.app_metadata = user.app_metadata;

//       return token;
//     },
//     session({ session, token }) {
//       if (!token.app_metadata) return session;

//       session.user.role = token.app_metadata.authorization.role;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// === END OF AUTHORIZATION === //

// Bypass NextAuth Until There SAML is Ready
export function GET() {
  return new Response('Next Auth', { status: 200 });
}
