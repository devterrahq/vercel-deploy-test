import { NextResponse } from 'next/server';
import { encodeMegaparam } from './helpers/auth';
import { isDraftMode } from './helpers/draft-mode';
import { checkMaliciousPath } from './helpers/malicious-paths';
import { CheckRedirectFile } from './helpers/redirects';
import type { NextRequest } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (Next.js static files)
     * - _next/image (Next.js image optimization files)
     * - field-options (Field Option JSON)
     * - assets (Static component assets)
     * - icons (Sitewide Icons)
     * - manifest.webmanifest (webmanifest file)
     * - favicon.ico (favicon file)
     * - icon.svg (SVG icon)
     * - icon-192.png (PNG icon 192px)
     * - icon-512.png (PNG icon 512px)
     * - apple-touch-icon.png (Apple touch icon)
     * - apple-icon.png (Apple touch icon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|field-options|assets|jazz-hr|icons|icon.svg|icon-192.png|icon-512.png|apple-touch-icon.png|apple-icon.png|manifest.webmanifest|sitemap.xml|robots.txt).*)',
  ],
};

export async function middleware(req: NextRequest) {
  // console.log('- Middleware: req.nextUrl.pathname: ', req.nextUrl.pathname);

  /** These are pages which do not require the mega param */
  const megaParamWhitelist = ['/signin', '/not-authorized'];
  const url = req.nextUrl.clone();
  const hasExtension = /\.\w+$/.test(url.pathname);
  const isDraft = await isDraftMode(req);
  const searchParams = url.searchParams;

  // Check malicious intentions by path
  const maliciousPath = checkMaliciousPath(url.pathname);
  if (maliciousPath) {
    return new Response(null, { status: 403 });
  }

  if (url.pathname !== url.pathname.toLowerCase()) {
    // check if path starts with

    // console.log('- Middleware: redirecting to lowercase path: ', url.pathname.toLowerCase());
    url.pathname = url.pathname.toLowerCase();
    return Response.redirect(url, 301);
  }

  if (hasExtension) {
    // console.log('- Middleware: redirecting from path with extension to path without extension: ', url.pathname);
    url.pathname = url.pathname.replace(/\.([^/.]+)$/, '');
    return Response.redirect(url, 301);
  }

  const path = url.pathname;
  if (megaParamWhitelist.includes(path)) {
    // console.log('- Middleware: whitelist going to page handler for: ', path);
    return NextResponse.next();
  }

  // Check Redirects Json File
  const redirect = CheckRedirectFile(path);
  if (redirect) {
    // console.log('- Middleware: redirecting from redirects.json file to: ', redirect.to);
    const originalUrl = new URL(req.url);
    const newUrl = new URL(decodeURIComponent(redirect.to).replace('&amp;', '&'), originalUrl);
    if (newUrl.hostname == originalUrl.hostname) {
      newUrl.search = originalUrl.search;
    }
    return Response.redirect(newUrl, redirect.status);
  }

  url.pathname = `/${encodeMegaparam(undefined, searchParams, isDraft)}${path}`;

  return NextResponse.rewrite(url);
}
