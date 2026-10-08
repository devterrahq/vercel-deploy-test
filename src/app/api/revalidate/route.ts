import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';

export function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  const token = request.headers.get('token');
  if (token == process.env.API_ROUTE_SECRET_KEY) {
    if (path) {
      console.log('Revalidating path', decodeURIComponent(path));
      revalidatePath(decodeURIComponent(path), 'page');
      return Response.json({ revalidated: true, now: Date.now(), path: decodeURIComponent(path) });
    }

    return Response.json({
      revalidated: false,
      now: Date.now(),
      message: 'Missing path to revalidate',
    });
  }
  return new Response(null, { status: 401 });
}
