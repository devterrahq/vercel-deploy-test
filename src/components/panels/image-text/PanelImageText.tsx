'use client';

import { CalcTwoColumnWidths } from '@/helpers/col-helpers';
import { useParallax } from '@npm-refactored/hooks';
import { Image } from '@npm-refactored/storyblok-next-image';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import {
  BootstrapColumnToNextImageSizes,
  isAssetDefined,
  isRichtextDefined,
} from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { PanelImageTextStoryblok } from '@/component-types';
import './PanelImageText.scss';

interface PanelImageTextProps {
  blok: PanelImageTextStoryblok;
}

export default function PanelImageText({ blok }: PanelImageTextProps) {
  const render = useRichTextResolver();
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});
  const widths = CalcTwoColumnWidths(blok.image_size);

  const contentColClasses = cn(
      'col',
      'col-12',
      `col-md-${widths[1]}`,
      'panel-column',
      `panel-column-${blok.content_alignment}`,
      blok.image_side === 'right' ? 'order-md-first' : '',
    ),
    imageColClasses = cn(
      'panel-image-text_image',
      'col',
      'col-12',
      `col-md-${widths[0]}`,
      'panel-column',
      'panel-column-center',
    ),
    rowClasses = cn('row', parallaxClass, inViewClass);
  const imageSizes = BootstrapColumnToNextImageSizes(widths[0], 12);

  return (
    <PanelGeneric blok={blok} panelName='image-text'>
      <div className={rowClasses} ref={parallaxRef}>
        <div className={imageColClasses}>
          {isAssetDefined(blok.image) ? <Image sizes={imageSizes} src={blok.image} /> : null}
        </div>
        <div className={contentColClasses}>
          {isRichtextDefined(blok.content) ? (
            <div className='panel-column-content richtext-margin-helper'>{render(blok.content)}</div>
          ) : null}
        </div>
      </div>
    </PanelGeneric>
  );
}
