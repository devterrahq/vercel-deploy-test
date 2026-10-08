'use client';

import { StoryblokComponent } from '@storyblok/react';
import { PanelGrid as RefPanelGrid } from '@npm-refactored/panel-grid';
import type { PanelGridStoryblok } from '@/component-types';
import './PanelGrid.scss';

interface PanelGridProps {
  blok: PanelGridStoryblok;
}

export default function PanelGrid({ blok }: PanelGridProps) {
  return (
    <RefPanelGrid blok={blok}>
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
    </RefPanelGrid>
  );
}
