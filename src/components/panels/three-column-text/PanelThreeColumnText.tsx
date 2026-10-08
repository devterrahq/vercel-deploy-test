'use client';

import { useParallax } from '@npm-refactored/hooks';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { PanelThreeColumnTextStoryblok } from '@/component-types';
import './PanelThreeColumnText.scss';

interface PanelThreeColumnTextProps {
  blok: PanelThreeColumnTextStoryblok;
}

export default function PanelThreeColumnText({ blok }: PanelThreeColumnTextProps) {
  const { column_1_text, column_2_text, column_3_text } = blok;

  const render = useRichTextResolver();
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const wrapperClass = cn(
    'row',
    'three-column-text-wrapper',
    blok.column_gap ? `gx-${blok.column_gap}` : '',
    parallaxClass,
    inViewClass,
  );
  const columnClass = cn(
    'col-12',
    'col-md-6',
    'col-lg-4',
    'column-richtext-wrapper',
    'gy-5 gy-md-4 gy-lg-0',
    'panel-column',
  );
  const colOneClasses = cn(
    blok.left_vertical_alignment ? `panel-column-${blok.left_vertical_alignment}` : '',
    blok.left_horizontal_alignment ? `text-${blok.left_horizontal_alignment}` : '',
    columnClass,
  );
  const colTwoClasses = cn(
    blok.center_vertical_alignment ? `panel-column-${blok.center_vertical_alignment}` : '',
    blok.center_horizontal_alignment ? `text-${blok.center_horizontal_alignment}` : '',
    columnClass,
  );
  const colThreeClasses = cn(
    blok.right_vertical_alignment ? `panel-column-${blok.right_vertical_alignment}` : '',
    blok.right_horizontal_alignment ? `text-${blok.right_horizontal_alignment}` : '',
    columnClass,
  );

  return (
    <PanelGeneric blok={blok} panelName='three-column-text'>
      <div className={wrapperClass} ref={parallaxRef}>
        {isRichtextDefined(column_1_text) ? <div className={colOneClasses}>{render(column_1_text)}</div> : null}
        {isRichtextDefined(column_2_text) ? <div className={colTwoClasses}>{render(column_2_text)}</div> : null}
        {isRichtextDefined(column_3_text) ? <div className={colThreeClasses}>{render(column_3_text)}</div> : null}
      </div>
    </PanelGeneric>
  );
}
