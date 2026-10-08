import 'client-only';

export const extractVideoIdFromUrl = (url: string): string => {
  const parsedUrl = new URL(url);

  if (parsedUrl.hostname.includes('youtube.com')) {
    return parsedUrl.searchParams.get('v') || parsedUrl.pathname.split('/').pop()?.split('?')[0] || '';
  } else if (parsedUrl.hostname.includes('youtu.be')) {
    return parsedUrl.pathname.split('/').pop()?.split('?')[0] || '';
  } else if (parsedUrl.hostname.includes('vimeo.com')) {
    return parsedUrl.pathname.split('/').pop()?.split('?')[0] || '';
  }

  return '';
};

export const extractVideoIdFromEmbedCode = (embedCode: string): string => {
  const srcMatch = embedCode.match(/src="([^"]+)"/);
  if (srcMatch && srcMatch[1]) {
    return extractVideoIdFromUrl(srcMatch[1]);
  }
  return '';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEmbedUrl = (type: string, videoEmbed: any): { embedUrl: string; videoId: string } => {
  let videoId = '';
  if (type === 'widget_youtube_embed') {
    const embedCode = videoEmbed[0]?.embed_code;

    if (embedCode.includes('iframe')) {
      videoId = extractVideoIdFromEmbedCode(embedCode);
    } else {
      videoId = extractVideoIdFromUrl(embedCode);
    }

    if (videoId) {
      return {
        embedUrl: `https://youtube.com/embed/${videoId}?autoplay=1&loop=1&rel=0&showinfo=0&controls=0&autohide=1&mute=1&modestbranding=1?enablejsapi=1`,
        videoId,
      };
    }
  } else if (type === 'widget_vimeo_embed') {
    const embedCode = videoEmbed[0]?.embed_code;

    if (embedCode.includes('iframe')) {
      videoId = extractVideoIdFromEmbedCode(embedCode);
    } else {
      videoId = extractVideoIdFromUrl(embedCode);
    }
    if (videoId) {
      return { embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1`, videoId };
    }
  } else if (type === 'widget_html5_video_embed') {
    return { embedUrl: videoEmbed[0]?.video?.filename || '', videoId: '' };
  }

  return { embedUrl: '', videoId: '' };
};
