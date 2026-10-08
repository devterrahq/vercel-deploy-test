import { useEffect, useState } from 'react';
import { getStoryByUuid } from '@/helpers/api-client-helpers';
import { normalizeSlug } from '@/helpers/slug-helpers';
import type { MultilinkStoryblok } from '@/component-types';

export function useStoryblokLinkByUUID(src?: MultilinkStoryblok | undefined) {
  const [storyUri, setStoryUri] = useState<string | null>('');

  useEffect(() => {
    if (!src || src.linktype !== 'story' || (src.story && src.story?.url)) {
      setStoryUri(null);
      return;
    }

    if (src.id) {
      void getStoryByUuid(src.id).then((story) => {
        if (story) {
          setStoryUri(normalizeSlug(story.full_slug));
          return;
        }
        console.warn(
          `Unable to find story with uuid "${src.id}". This is most likely due to the story being deleted. We will attempt to use the cached url. Make sure to add this as an alternate url in Storyblok for the new story or update the link using the following cached url: "${src.cached_url}"`,
        );
        setStoryUri(normalizeSlug(src.cached_url || ''));
      });
    }
  }, [src]);

  return storyUri;
}
