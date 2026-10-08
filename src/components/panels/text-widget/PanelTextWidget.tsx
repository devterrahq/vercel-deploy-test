'use client';

import { StoryblokComponent } from '@storyblok/react';
import { CalcTwoColumnWidths } from '@/helpers/col-helpers';
import { SiteTextColorKeyToClassName } from '@/helpers/datasources';
import { useParallax } from '@npm-refactored/hooks';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { PanelTextWidgetStoryblok } from '@/component-types';
import type { RichTextContextValue } from '@npm-refactored/storyblok-rich-text';

interface PanelTextWidgetProps {
  blok: PanelTextWidgetStoryblok;
}
export default function PanelTextWidget({ blok }: PanelTextWidgetProps) {
  const widths = CalcTwoColumnWidths(blok.content_size);
  const render = useRichTextResolver();
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const rowClasses = cn('row', 'panel-row-gap-4', parallaxClass, inViewClass);
  return (
    <PanelGeneric blok={blok} panelName='text-widget'>
      <div className={rowClasses} ref={parallaxRef}>
        {blok.mobile_order === 'widget' ? WidgetColumn(blok, widths) : null}
        {ContentColumn(blok, widths, render)}
        {blok.mobile_order !== 'widget' ? WidgetColumn(blok, widths) : null}
      </div>
    </PanelGeneric>
  );
}

function WidgetColumn(blok: PanelTextWidgetStoryblok, widths: Array<number>) {
  const widgetClasses = cn(
    'panel-image-text_image',
    'col',
    'col-12',
    `col-md-${widths[1]}`,
    'panel-column',
    'panel-column-center',
    blok.content_side === 'right' ? 'order-md-first' : '',
  );
  return (
    <div className={widgetClasses}>
      {blok.widget?.map((widget) => {
        return <StoryblokComponent blok={widget} key={widget._uid} />;
      })}
    </div>
  );
}
function ContentColumn(blok: PanelTextWidgetStoryblok, widths: Array<number>, render: RichTextContextValue) {
  const contentClasses = cn(
    'col',
    'col-12',
    `col-md-${widths[0]}`,
    'panel-column',
    `panel-column-${blok.content_alignment}`,
    blok.content_side === 'left' ? 'order-md-first' : '',
    blok.content_text_color ? SiteTextColorKeyToClassName(blok.content_text_color) : '',
  );
  return (
    <div className={contentClasses}>
      {isRichtextDefined(blok.content) ? <div className='richtext-margin-helper'>{render(blok.content)}</div> : null}
    </div>
  );
}
