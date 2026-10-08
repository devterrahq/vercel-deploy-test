'use client';

import { StoryblokComponent } from '@storyblok/react';
import { SiteTextColorKeyToClassName } from '@/helpers/datasources';
import { Grid } from '@npm-refactored/pr-grid';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import cn from 'classnames';
import type { PanelTextWidgetGridStoryblok } from '@/component-types';
import type { ResponsiveFieldInfo } from '@npm-refactored/storyblok-utilities';
import './PanelTextWidgetGrid.scss';

interface PanelTextWidgetGridProps {
  blok: PanelTextWidgetGridStoryblok;
}
export default function PanelTextWidgetGrid({ blok }: PanelTextWidgetGridProps) {
  const render = useRichTextResolver();
  const responsiveInfo: ResponsiveFieldInfo | undefined = blok.grid_items_per_row
    ? { algorithm: 'items_per_row', data: blok.grid_items_per_row }
    : undefined;
  const contentClasses = cn(
    'col-12',
    'col-lg-4',
    'panel-column',
    'panel-column-center',
    blok.content_text_color ? SiteTextColorKeyToClassName(blok.content_text_color) : '',
  );
  const gridClasses = cn('col-12', 'col-lg-8', 'panel-column', 'panel-column-center');
  const subgridClasses = cn(
    'panel-text-widget-grid--grid',
    blok.grid_fill_direction === 'right-to-left' ? 'text-widget-grid-reverse' : '',
  );
  return (
    <PanelGeneric blok={blok} panelName='text-widget-grid'>
      <div className='row text-widget-grid--container-row'>
        <div className={contentClasses}>
          <div className='richtext-margin-helper'>{render(blok.content)}</div>
        </div>
        <div className={gridClasses}>
          <Grid className={subgridClasses} itemsPerRow={blok.grid_items_per_row} alignmentVertical='center'>
            {blok.grid_items?.map((widget) => {
              return <StoryblokComponent blok={widget} key={widget._uid} responsiveFieldSizes={responsiveInfo} />;
            })}
          </Grid>
        </div>
      </div>
    </PanelGeneric>
  );
}
