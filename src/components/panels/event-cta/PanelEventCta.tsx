'use client';

import VideoModal from '@/components/internal/video-modal/VideoModal';
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
import type { AssetStoryblok, PanelEventCtaStoryblok } from '@/component-types';
import './PanelEventCta.scss';

interface PanelEventCTAProps {
  blok: PanelEventCtaStoryblok;
}

export default function PanelEventCta({ blok }: PanelEventCTAProps) {
  const render = useRichTextResolver();
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.enable_parallax, {});

  const asideImages: Array<AssetStoryblok> = [];
  blok.aside_images?.map((asset) => {
    if (isAssetDefined(asset)) {
      asideImages.push(asset);
    }
  });
  const hasAsideImages = asideImages.length > 0;
  const hasThumbnail = blok.video_thumbnail && isAssetDefined(blok.video_thumbnail);

  const imagesClasses = cn('col', 'col-12', 'col-md-3', 'panel-event-cta-images-col');
  const eventClasses = cn('col', 'col-12', hasAsideImages ? 'col-md-9' : '', 'panel-event-cta-event-col');
  const contentClasses = cn(
    'col',
    'col-12',
    hasThumbnail ? 'col-md-6' : '',
    'panel-column',
    'panel-column-center',
    'panel-event-cta-content-col',
  );
  const thumbnailClasses = cn(
    'col',
    'col-12',
    'col-md-6',
    'panel-column',
    'panel-column-center',
    'panel-event-cta-thumbnail-col',
  );
  const rowClasses = cn('row', 'panel-event-cta-main-wrapper', parallaxClass, inViewClass);
  return (
    <PanelGeneric blok={blok} panelName='event-cta'>
      <div className={rowClasses} ref={parallaxRef}>
        {asideImages && asideImages.length > 0 ? (
          <div className={imagesClasses}>
            {asideImages.map((asset) => {
              return <Image key={asset.id} src={asset} sizes={BootstrapColumnToNextImageSizes(3)} />;
            })}
          </div>
        ) : null}
        <div className={eventClasses}>
          <div className='panel-event-cta-event-wrapper'>
            <div className='row'>
              <div className={contentClasses}>
                <div className='richtext-margin-helper text-dark-navy'>
                  {isRichtextDefined(blok.content) ? render(blok.content) : null}
                </div>
              </div>
              {hasThumbnail && blok.video_thumbnail ? (
                <div className={thumbnailClasses}>
                  <VideoModal
                    thumbnail={blok.video_thumbnail}
                    thumbnailSizes={BootstrapColumnToNextImageSizes(4)}
                    videoEmbed={blok.video ? blok.video[0] : undefined}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </PanelGeneric>
  );
}
