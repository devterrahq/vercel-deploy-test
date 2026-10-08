'use client';

import React from 'react';
import { useParallax } from '@npm-refactored/hooks';
import { ComparisonMatrix } from '@npm-refactored/pr-comparison-matrix';
import { StoryblokPanel } from '@npm-refactored/storyblok-panel';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import { GetImageRow } from './ImageRow';
import { GetRichtextRow } from './RichtextRow';
import type {
  ComparisonMatrixHeadingRowStoryblok,
  ComparisonMatrixImageRowStoryblok,
  ComparisonMatrixRichTextRowStoryblok,
  PanelComparisonMatrixStoryblok,
} from '@/component-types';
import type { MatrixColumnConfig, MatrixContentRow, MatrixHeadingRow } from '@npm-refactored/pr-comparison-matrix';
import './PanelComparisonMatrix.scss';

interface PanelComparisonMatrixProps {
  blok: PanelComparisonMatrixStoryblok;
}
export default function PanelComparisonMatrix({ blok }: PanelComparisonMatrixProps) {
  const render = useRichTextResolver();
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const cols: Array<MatrixColumnConfig> = [];
  blok.config_items?.forEach((config) => {
    const col: MatrixColumnConfig = {
      label_desktop: render(config.label_desktop),
      label_mobile: render(config.label_mobile),
      column_class: config.column_style,
      slot_choice: config.slot_choice,
      key: config._uid,
    };
    cols.push(col);
  });
  const rows: Array<MatrixHeadingRow | MatrixContentRow> = [];
  blok.body?.map((rowItem) => {
    if (rowItem.component === 'comparison_matrix_heading_row') {
      const headingRow = rowItem as ComparisonMatrixHeadingRowStoryblok;
      const hRow: MatrixHeadingRow = {
        key: headingRow._uid,
        row_type: 'heading',
        label: headingRow.label || '',
      };
      rows.push(hRow);
    } else if (rowItem.component === 'comparison_matrix_rich_text_row') {
      rows.push(GetRichtextRow(rowItem as ComparisonMatrixRichTextRowStoryblok));
    } else if (rowItem.component === 'comparison_matrix_image_row') {
      rows.push(GetImageRow(rowItem as ComparisonMatrixImageRowStoryblok));
    }
    return null;
  });
  const containerClasses = cn(parallaxClass, inViewClass);

  return (
    <StoryblokPanel blok={blok}>
      <div className={containerClasses} ref={parallaxRef}>
        {isRichtextDefined(blok.mobile_subhead) ? (
          <div className='comparison-matrix--subhead'>{render(blok.mobile_subhead)}</div>
        ) : null}
        <ComparisonMatrix tableId={`table_${blok._uid || '1'}`} columnItems={cols} rowItems={rows} />
      </div>
    </StoryblokPanel>
  );
}
