'use client';

import { StoryblokComponent } from '@storyblok/react';
import { WidgetGrid as RefWidgetGrid } from '@npm-refactored/storyblok-widget-grid';
import type { WidgetGridStoryblok } from '@/component-types';

interface WidgetGridProps {
  blok: WidgetGridStoryblok;
}

export default function WidgetGrid({ blok }: WidgetGridProps) {
  return (
    <RefWidgetGrid blok={blok}>
      {blok.items &&
        blok.items.map((childBlok) => {
          return (
            <div key={childBlok._uid} className='col'>
              <StoryblokComponent
                blok={childBlok}
                responsiveFieldSizes={{ algorithm: 'items_per_row', data: blok.items_per_row }}
              />
            </div>
          );
        })}
    </RefWidgetGrid>
  );
}
