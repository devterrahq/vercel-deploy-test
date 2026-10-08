import type { NextRequest } from 'next/server';

/**
 * Oddly enough, this is the only way to get the client's IP address.
 * see https://nextjs.org/docs/app/api-reference/functions/headers
 */
export const getClientIpAddress = (req: NextRequest) => {
  const headers = req.headers;
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? forwardedFor;
  }
  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp.split(',')[0] ?? realIp;
  }
  return req.ip;
};
