import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const tag = decodeURIComponent(request.nextUrl.searchParams.get('tag') || '');
  const token = request.headers.get('token');
  if (token == process.env.API_ROUTE_SECRET_KEY) {
    if (tag) {
      console.log('Revalidating tag', tag);
      revalidateTag(tag);
      return Response.json({ revalidated: true, now: Date.now(), tag: tag });
    }

    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Missing tag to revalidate',
    });
  }
  return new Response(null, { status: 401 });
}
