'use client';

import { StoryblokComponent } from '@storyblok/react/rsc';
import { PanelColumns as RefPanelColumns } from '@npm-refactored/storyblok-panel-columns';
import type { PanelColumnsStoryblok } from '@/component-types';
import './PanelColumns.scss';

interface PanelColumnsTextProps {
  blok: PanelColumnsStoryblok;
}

export default function PanelColumns({ blok }: PanelColumnsTextProps) {
  return (
    <RefPanelColumns blok={blok}>
      {blok.columns && blok.columns.map((blok) => <StoryblokComponent blok={blok} key={blok._uid} />)}
    </RefPanelColumns>
  );
}
