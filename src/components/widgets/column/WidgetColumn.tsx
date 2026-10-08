'use client';

import { StoryblokComponent } from '@storyblok/react/rsc';
import { WidgetColumn as RefWidgetColumn } from '@npm-refactored/widget-column';
import type { WidgetColumnStoryblok } from '@/component-types';
import './WidgetColumn.scss';

interface WidgetColumnTextProps {
  blok: WidgetColumnStoryblok;
}

export default function WidgetColumn({ blok }: WidgetColumnTextProps) {
  const responsiveFieldSizes = { algorithm: 'column_widths', data: blok.sizes };
  return (
    <RefWidgetColumn blok={blok}>
      {blok.body &&
        blok.body.map((blok) => (
          <StoryblokComponent blok={blok} key={blok._uid} responsiveFieldSizes={responsiveFieldSizes} />
        ))}
    </RefWidgetColumn>
  );
}
