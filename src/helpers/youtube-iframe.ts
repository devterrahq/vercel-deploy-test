import 'client-only';

export function adjustYouTubeIFrame(htmlString: string | undefined) {
  if (!htmlString) return htmlString;
  if (typeof window === 'undefined') return htmlString;

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const iframe = doc.querySelector('iframe');

  if (iframe) {
    const srcURL = new URL(iframe.src);

    // Check if it is a YouTube link
    if (!srcURL.hostname.startsWith('www.youtube')) return htmlString;

    // Adjust the src URL
    const params = new URLSearchParams(srcURL.search);
    params.set('autoplay', '1');
    params.set('rel', '0');
    params.set('modestbranding', '1');
    srcURL.search = params.toString();
    iframe.src = srcURL.toString();

    // Adjust the allow attribute
    iframe.allow = iframe.allow.replace('autoplay', 'autoplay *');

    // Serialize back to string
    const serializer = new XMLSerializer();
    return serializer.serializeToString(iframe);
  }

  return htmlString; // Return original string if no iframe is found
}
