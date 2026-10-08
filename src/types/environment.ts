// === ENV === //
// Fake import to get @types/node
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import path from 'path';
import { z } from 'zod';

const envVariables = z.object({
  // URL
  BASE_URL: z.string(),
  VERCEL_URL: z.string(),
  URL: z.string(),

  // Algolia
  NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: z.string(),
  NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_KEY: z.string(),
  API_ADMIN_SECRET: z.string(),
  ALGOLIA_ADMIN_KEY: z.string(),

  // Storyblok
  NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN: z.string(),
  NEXT_PUBLIC_STORYBLOK_REGION: z.string(),
  NEXT_PUBLIC_STORYBLOK_VERSION: z.union([z.literal('draft'), z.literal('published')]),
  STORYBLOK_BRIDGE_PREVIEW_TOKEN: z.string(),
  STORYBLOK_PREVIEW_ACCESS_TOKEN: z.string(),
  STORYBLOK_OAUTH_TOKEN: z.string(),
  STORYBLOK_SPACE_ID: z.string(),
  STORYBLOK_WEBHOOK_SECRET: z.string(),

  // NextAuth
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
  API_ROUTE_SECRET_KEY: z.string(),
});

envVariables.parse(process.env);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
