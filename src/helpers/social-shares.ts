export function xSocialShareLink(text: string, pageUrl: URL | undefined) {
  const xLink = new URL('https://twitter.com/intent/tweet');
  if (text) {
    xLink.searchParams.set('text', text);
  }
  if (pageUrl) {
    xLink.searchParams.set('url', pageUrl.href);
  }
  return xLink.href;
}

export function linkedInShareLink(pageUrl: URL | undefined) {
  const liLink = new URL('https://www.linkedin.com/sharing/share-offsite/');
  if (pageUrl) {
    liLink.searchParams.set('url', pageUrl.href);
  }
  return liLink.href;
}

export function facebookShareLink(pageUrl: URL | undefined) {
  const fbLink = new URL('https://www.facebook.com/sharer.php');
  if (pageUrl) {
    fbLink.searchParams.set('u', pageUrl.href);
  }
  return fbLink.href;
}
