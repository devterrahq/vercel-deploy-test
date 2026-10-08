'use client';

import { StoryblokComponent } from '@storyblok/react';
import { WidgetMenuCtaRoot } from '@npm-refactored/storyblok-widget-menu-cta';
import type { WidgetMenuCtaStoryblok } from '@/component-types';
import './WidgetMenuCta.scss';

interface WidgetMenuCtaProps {
  blok: WidgetMenuCtaStoryblok;
}

export default function WidgetMenuCta({ blok }: WidgetMenuCtaProps) {
  return (
    <WidgetMenuCtaRoot blok={blok} headlineAndImageLink={blok?.buttons && blok?.buttons.length === 1 ? true : false}>
      {blok.buttons && blok.buttons.map((blok) => <StoryblokComponent blok={blok} key={blok._uid} />)}
    </WidgetMenuCtaRoot>
  );
}
