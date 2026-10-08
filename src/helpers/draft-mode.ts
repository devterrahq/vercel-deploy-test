import 'server-only';
import type { NextRequest } from 'next/server';

/**
 * Represents the duration in seconds for which a token is considered valid.
 * The default value is set to 3600 seconds (1 hour), assuming that an editor
 * will work for a maximum of 1 hour on one page before switching to another
 * entry inside the editor or refreshing the browser window.
 * This duration can be customized as needed by modifying the `SECONDS_VALID` constant.
 *
 * @constant
 * @default 3600
 */
const SECONDS_VALID = 3600;

/**
 * This will give us a good idea whether we should be in draft mode or not. Based on this information we can direct the user to the correct page handler (dynamic or static)
 * In the future we should be able to use the built in Next.js Draft Mode feature, but currently there is a bug with setting and accessing it from the middleware.
 * @param request
 * @returns
 */
export async function isDraftMode(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tkSpace = searchParams.get('_storyblok_tk[space_id]') || undefined;
  const tkToken = searchParams.get('_storyblok_tk[token]') || undefined;
  const tkTime = parseInt(searchParams.get('_storyblok_tk[timestamp]') || '0') || undefined;

  if (!tkToken || !tkSpace || !tkTime) {
    return false;
  }

  const testHash = await buildHashFromSearchParams(tkSpace, tkTime);

  if (testHash !== tkToken || !tkTime) {
    return false;
  }

  if (tkTime <= Math.floor(Date.now() / 1000) - SECONDS_VALID) {
    return false;
  }

  return true;
}

/**
 * Asynchronously generates a SHA-1 hash from the provided search parameters.
 * This function is used to verify the preview query parameters of the Storyblok visual editor.
 * It constructs a validation string from the space ID, Storyblok bridge preview token, and a timestamp,
 * then encodes this string and computes its SHA-1 hash.
 *
 * @see https://www.storyblok.com/faq/how-to-verify-the-preview-query-parameters-of-the-visual-editor#nodejs
 *
 * @param [spaceId] - The space ID used in the Storyblok API.
 * @param [time] - A timestamp associated with the request.
 * @returns A promise that resolves to the SHA-1 hash of the validation string.
 */
async function buildHashFromSearchParams(spaceId?: string, time?: number): Promise<string> {
  const validationString = `${spaceId}:${process.env.STORYBLOK_BRIDGE_PREVIEW_TOKEN}:${time}`;
  const secretBuffer = new TextEncoder().encode(validationString);
  const hash = await crypto.subtle.digest('SHA-1', secretBuffer);
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
}
