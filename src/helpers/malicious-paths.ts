import { z } from 'zod';
import DATA from '../malicious-routes.json';

const info = z.object({
  path: z.string(),
  check_type: z.string(),
});

type InfoType = z.infer<typeof info>;

function buildMap(): Map<string, InfoType> {
  const newMap = new Map();
  if (Array.isArray(DATA)) {
    DATA.forEach((record) => {
      try {
        const r = info.parse(record);
        newMap.set(r.path, r);
      } catch (err) {
        console.warn('- Middleware [Malicious Paths]: Invalid redirect record: ', record);
        if (err instanceof z.ZodError) {
          console.error('- Middleware [Malicious Paths]: Field Errors: ', err.flatten().fieldErrors);
        } else {
          console.error(err);
        }
      }
    });
  }
  return newMap;
}

const maliciousPathMap = buildMap();

export function checkMaliciousPath(path: string) {
  if (!path) return;
  // check exact match
  if (maliciousPathMap.get(path)) {
    return maliciousPathMap.get(path);
  }
  // check starts with
  for (const maliciousPath of maliciousPathMap.values()) {
    if (maliciousPath.check_type === 'exact') {
      break;
    }
    if (path.startsWith(maliciousPath.path)) {
      return maliciousPathMap.get(maliciousPath.path);
    }
  }
}
