import { cookies, draftMode } from 'next/headers';

/**
 * Resources:
 * https://www.storyblok.com/faq/how-to-verify-the-preview-query-parameters-of-the-visual-editor#nodejs
 */

const SECONDS_VALID = 3600;
// We expect 1 hour as the time of a token being valid.
// So basically that an editor will work max 1 hour on one page before switching to another entry inside the editor or refreshing the browser window.
// You can extend that by adjusting SECONDS_VALID above with the value you need.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tkSpace = searchParams.get('_storyblok_tk[space_id]') || undefined;
  const tkToken = searchParams.get('_storyblok_tk[token]') || undefined;
  const tkTime = parseInt(searchParams.get('_storyblok_tk[timestamp]') || '0') || undefined;

  const testHash = await BuildHashFromSearchParams(tkSpace, tkTime);

  if (testHash !== tkToken || !tkTime) {
    return new Response('Invalid token', { status: 401 });
  }
  if (tkTime <= Math.floor(Date.now() / 1000) - SECONDS_VALID) {
    return new Response('Token expired', { status: 404 });
  }

  draftMode().enable();
  const draft = cookies().get('__prerender_bypass');
  if (draft?.value) {
    cookies().set({
      name: '__prerender_bypass',
      value: draft?.value,
      sameSite: 'none',
      secure: true,
      path: '/',
    });
  }

  const slug = searchParams.get('slug');
  searchParams.delete('slug');

  return new Response('', {
    status: 307,
    headers: {
      Location: `/${slug}?${searchParams.toString()}`,
    },
  });
}

// https://www.storyblok.com/faq/how-to-verify-the-preview-query-parameters-of-the-visual-editor#nodejs
async function BuildHashFromSearchParams(spaceId?: string, time?: number): Promise<string> {
  const validationString = `${spaceId}:${process.env.STORYBLOK_BRIDGE_PREVIEW_TOKEN}:${time}`;

  const secretBuffer = new TextEncoder().encode(validationString);
  const hash = await crypto.subtle.digest('SHA-1', secretBuffer);
  return ArrayBufferToHex(hash);
}

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
function ArrayBufferToHex(buffer: ArrayBuffer): string {
  const hashArray = Array.from(new Uint8Array(buffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
  return hashHex;
}
