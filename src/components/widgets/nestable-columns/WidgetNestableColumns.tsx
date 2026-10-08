'use client';

import { WidgetNestableColumns as RefWidgetNestableColumns } from '@npm-refactored/storyblok-widget-nestable-columns';
import type { WidgetNestableColumnsStoryblok } from '@/component-types';
import './WidgetNestableColumns.scss';
import { StoryblokComponent } from '@storyblok/react';

interface WidgetNestableColumnsProps {
  blok: WidgetNestableColumnsStoryblok;
}

export default function WidgetNestableColumns({ blok }: WidgetNestableColumnsProps) {
  return (
    <RefWidgetNestableColumns blok={blok}>
      {blok.columns && blok.columns.map((blok) => <StoryblokComponent blok={blok} key={blok._uid} />)}
    </RefWidgetNestableColumns>
  );
}
