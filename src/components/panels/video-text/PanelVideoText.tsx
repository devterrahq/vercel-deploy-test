'use client';

import VideoModal from '@/components/internal/video-modal/VideoModal';
import { CalcTwoColumnWidths } from '@/helpers/col-helpers';
import { useParallax } from '@npm-refactored/hooks';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import {
  BootstrapColumnToNextImageSizes,
  isAssetDefined,
  isRichtextDefined,
} from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { PanelVideoTextStoryblok } from '@/component-types';
import './PanelVideoText.scss';

interface PanelVideoTextProps {
  blok: PanelVideoTextStoryblok;
}

export default function PanelVideoText({ blok }: PanelVideoTextProps) {
  const render = useRichTextResolver();
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const widths = CalcTwoColumnWidths(blok.video_size);

  const contentColClasses = cn(
    'col',
    'col-12',
    `col-md-${widths[1]}`,
    'panel-column',
    `panel-column-${blok.content_alignment}`,
  );
  const thumbnailColClasses = cn(
    'col',
    'col-12',
    `col-md-${widths[0]}`,
    'panel-column',
    'panel-column-center',
    blok.video_side === 'right' ? 'order-md-last' : '',
  );
  const rowClasses = cn('row', parallaxClass, inViewClass);
  const imageSizes = BootstrapColumnToNextImageSizes(widths[0], 12);

  return (
    <PanelGeneric blok={blok} panelName='video-text'>
      <div className={rowClasses} ref={parallaxRef}>
        {blok.video_thumbnail && isAssetDefined(blok.video_thumbnail) ? (
          <VideoModal
            thumbnailClasses={thumbnailColClasses}
            thumbnail={blok.video_thumbnail}
            thumbnailSizes={imageSizes}
            videoEmbed={blok.video_embed ? blok.video_embed[0] : undefined}
          />
        ) : null}
        <div className={contentColClasses}>
          {isRichtextDefined(blok.content) ? (
            <div className='panel-column-content richtext-margin-helper'>{render(blok.content)}</div>
          ) : null}
        </div>
      </div>
    </PanelGeneric>
  );
}
