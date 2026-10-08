import { z } from 'zod';
import DATA from '../redirects.json';

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages
 * 301 - Moved Permanently
 * 302 - Found
 * 307 - Temporary Redirect
 * 308 - Permanent Redirect
 */

const info = z.object({
  from: z.string(),
  to: z.string(),
  status: z.union([z.literal(301), z.literal(302), z.literal(307), z.literal(308)]),
});

type InfoType = z.infer<typeof info>;

function buildMap(): Map<string, InfoType> {
  const newMap = new Map();
  if (Array.isArray(DATA)) {
    DATA.forEach((record) => {
      try {
        const r = info.parse(record);
        newMap.set(r.from, r);
      } catch (err) {
        console.warn('- Middleware [Redirects]: Invalid redirect record: ', record);
        if (err instanceof z.ZodError) {
          console.error('- Middleware [Redirects]: Field Errors: ', err.flatten().fieldErrors);
        } else {
          console.error(err);
        }
      }
    });
  }
  return newMap;
}

const redirectMap = buildMap();

export function CheckRedirectFile(path: string) {
  return redirectMap.get(path);
}
