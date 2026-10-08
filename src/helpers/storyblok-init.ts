import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import { components } from './component-list';

const setupStoryblokInit = () => {
  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
    apiOptions: {
      cache: {
        clear: 'auto',
        type: 'memory',
      },
      region: 'us',
    },
    components,
  });
};

export { setupStoryblokInit };
