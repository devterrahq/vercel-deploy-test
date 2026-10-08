'use client';

import { WidgetHtml5Video } from '@npm-refactored/pr-widget-html5-video';
import { isAssetDefined } from '@npm-refactored/storyblok-utilities';
import type { WidgetHtml5VideoEmbedStoryblok } from '@/component-types';
import type { Source } from '@npm-refactored/pr-widget-html5-video';
import './WidgetHtml5VideoEmbed.scss';

interface WidgetHtml5VideoEmbedProps {
  blok: WidgetHtml5VideoEmbedStoryblok;
}
export default function WidgetHtml5VideoEmbed({ blok }: WidgetHtml5VideoEmbedProps) {
  if (isAssetDefined(blok.video) && blok.video?.filename) {
    const videoSrc: Source = {
      src: blok.video.filename,
    };
    return (
      <div className='ratio ratio-1x1'>
        <WidgetHtml5Video sources={[videoSrc]} controls={true} autoPlay={true} />
      </div>
    );
  }
}
