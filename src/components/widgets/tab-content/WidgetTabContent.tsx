'use client';

import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc';
import type { WidgetTabContentStoryblok } from '@/component-types';

interface WidgetTabContentProps {
  blok: WidgetTabContentStoryblok;
}

export default function WidgetTabContent({ blok }: WidgetTabContentProps) {
  return (
    <div className='widget-tab-content' {...storyblokEditable(blok)}>
      {blok.content?.map((nestedBlok) => <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />)}
    </div>
  );
}
