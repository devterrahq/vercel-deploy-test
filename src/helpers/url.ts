export function getHrefWithClearedParamsIfSameParams(url: string | URL): string {
  if (url instanceof URL) {
    url = url.href;
  }

  if (typeof window === 'undefined') {
    return url;
  }

  const currentSearchParams = new URLSearchParams(window.location.search);
  const targetSearchParams = new URLSearchParams(new URL(url, window.location.href).search);

  if (currentSearchParams.toString() === targetSearchParams.toString()) {
    // If the search parameters match, return the current URL without search params
    return window.location.pathname;
  }

  return url; // Otherwise, return the original URL
}
