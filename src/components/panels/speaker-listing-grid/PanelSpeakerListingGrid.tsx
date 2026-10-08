'use client';

import './PanelSpeakerListingGrid.scss';
import { StoryblokComponent } from '@storyblok/react';
import { generalResponsiveFieldToClassName } from '@/helpers/responsive';
import {
  getAlignItems,
  getColumnGutter,
  getJustifyContent,
  getRowColumns,
  getRowGutter,
} from '@npm-refactored/classname-helpers';
import { useParallax } from '@npm-refactored/hooks';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import cn from 'classnames';
import type { PanelSpeakerListingGridStoryblok } from '@/component-types';
import type { Breakpoint } from '@/types';

interface PanelSpeakerListingGridProps {
  blok: PanelSpeakerListingGridStoryblok;
}

export default function PanelSpeakerListingGrid({ blok }: PanelSpeakerListingGridProps) {
  const {
    items_per_row,
    alignment_vertical,
    alignment_horizontal,
    parallax_enabled,
    parallax_options = {
      offset: 200,
    },
  } = blok;

  const [parallaxRef, parallaxClass, inViewClass] = useParallax(parallax_enabled, parallax_options);
  const sizeSettings: { [key: string]: string | null } = {};

  for (let size in items_per_row?.fieldValue) {
    const { value } = items_per_row?.fieldValue[size as Breakpoint];
    if (size === 'default') size = '';
    if (value) sizeSettings[size] = getRowColumns(value, size);
  }
  const responsive = cn(Object.values(sizeSettings));
  const rootClass = cn(
    'row',
    responsive,
    getAlignItems(alignment_vertical, undefined, 'panel'),
    getJustifyContent(alignment_horizontal, undefined, 'panel'),
    generalResponsiveFieldToClassName(blok.gutters_column, getColumnGutter),
    generalResponsiveFieldToClassName(blok.gutters_row, getRowGutter),
    parallaxClass,
    inViewClass,
  );

  return (
    <PanelGeneric blok={blok} panelName='speaker-listing-grid'>
      <div className={rootClass} ref={parallaxRef}>
        {blok.speakers &&
          blok.speakers.map((childBlok) => {
            return (
              <div key={childBlok._uid} className='col'>
                <StoryblokComponent blok={childBlok} />
              </div>
            );
          })}
      </div>
    </PanelGeneric>
  );
}
