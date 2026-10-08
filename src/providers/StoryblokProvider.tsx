'use client';

import { setupStoryblokInit } from '@/helpers/storyblok-init';

setupStoryblokInit();

export default function StoryblokProvider({ children }: { children: JSX.Element }) {
  return children;
}
