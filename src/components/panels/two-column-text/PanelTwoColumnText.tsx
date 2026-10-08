'use client';

import { CalcTwoColumnWidths } from '@/helpers/col-helpers';
import { useParallax } from '@npm-refactored/hooks';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { PanelTwoColumnTextStoryblok } from '@/component-types';
import './PanelTwoColumnText.scss';

interface PanelTwoColumnTextProps {
  blok: PanelTwoColumnTextStoryblok;
}
export default function PanelTwoColumnText({ blok }: PanelTwoColumnTextProps) {
  const render = useRichTextResolver();
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const hasLeftText = isRichtextDefined(blok.left_text);
  const hasRightText = isRichtextDefined(blok.right_text);
  const widths = CalcTwoColumnWidths(blok.content_left_size);
  const leftTextClasses = cn(
    'col',
    'col-12',
    `col-md-${widths[0]}`,
    'panel-column',
    blok.content_left_alignment ? `panel-column-${blok.content_left_alignment}` : '',
    blok.content_left_color ? `text-${blok.content_left_color}` : '',
    blok.content_left_font_size ? `text-size-${blok.content_left_font_size}` : '',
    blok.content_left_horizontal_align ? `text-${blok.content_left_horizontal_align}` : '',
  );
  const rightTextClasses = cn(
    'col',
    'col-12',
    `col-md-${widths[1]}`,
    'panel-column',
    blok.content_right_alignment ? `panel-column-${blok.content_right_alignment}` : '',
    blok.content_right_color ? `text-${blok.content_right_color}` : '',
    blok.content_right_font_size ? `text-size-${blok.content_right_font_size}` : '',
    blok.content_right_horizontal_align ? `text-${blok.content_right_horizontal_align}` : '',
  );
  const rowClasses = cn(
    'row',
    'two-column-text-row',
    blok.column_gap ? `gx-${blok.column_gap}` : '',
    parallaxClass,
    inViewClass,
  );

  return (
    <PanelGeneric blok={blok} panelName='two-column-text'>
      <div className={rowClasses} ref={parallaxRef}>
        {hasLeftText ? (
          <div className={leftTextClasses}>
            <div className='richtext-margin-helper'>{render(blok.left_text)}</div>
          </div>
        ) : null}
        {hasRightText ? (
          <div className={rightTextClasses}>
            <div className='richtext-margin-helper'>{render(blok.right_text)}</div>
          </div>
        ) : null}
      </div>
    </PanelGeneric>
  );
}
