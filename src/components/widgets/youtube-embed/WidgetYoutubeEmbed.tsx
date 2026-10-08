'use client';

import Modal from '@/components/internal/modal/Modal';
import { PlaySvg } from '@/components/svg';
import { adjustYouTubeIFrame } from '@/helpers/youtube-iframe';
import { NextHtmlWithScripts } from '@npm-refactored/nextjs-html-with-scripts';
import { Image } from '@npm-refactored/storyblok-next-image';
import { isAssetDefined, useResponsiveFieldSizes } from '@npm-refactored/storyblok-utilities';
import type { WidgetYoutubeEmbedStoryblok } from '@/component-types';
import type { WidgetItem } from '@/types';

interface WidgetYoutubeEmbedProps extends WidgetItem {
  blok: WidgetYoutubeEmbedStoryblok;
}
export default function WidgetYoutubeEmbed({ blok, responsiveFieldSizes }: WidgetYoutubeEmbedProps) {
  const imageSize = useResponsiveFieldSizes(responsiveFieldSizes, '100vw');

  if (blok.thumbnail && isAssetDefined(blok.thumbnail)) {
    if (blok.embed_code) {
      return (
        <Modal
          openTrigger={
            <button className='thumbnail'>
              <Image className='video-thumbnail' src={blok.thumbnail} sizes={imageSize} />
              <PlaySvg className='no-path-opacity-on-hover' />
            </button>
          }
        >
          <div className='responsive-video'>
            <NextHtmlWithScripts html={adjustYouTubeIFrame(blok.embed_code)} />;
          </div>
        </Modal>
      );
    } else {
      return <Image className='video-thumbnail' src={blok.thumbnail} sizes={imageSize} />;
    }
  }
  return <NextHtmlWithScripts html={adjustYouTubeIFrame(blok.embed_code)} />;
}
