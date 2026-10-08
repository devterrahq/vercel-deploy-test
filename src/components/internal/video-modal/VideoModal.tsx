import { StoryblokComponent } from '@storyblok/react';
import { PlaySvg } from '@/components/svg';
import { Image } from '@npm-refactored/storyblok-next-image';
import Modal from '../modal/Modal';
import type { AssetStoryblok } from '@/component-types';
import type { SbBlokData } from '@storyblok/react';
import './VideoModal.scss';

interface VideoModalProps {
  thumbnail: AssetStoryblok;
  thumbnailSizes: string;
  thumbnailClasses?: string;
  videoEmbed?: SbBlokData;
}

export default function VideoModal({ thumbnailClasses, thumbnail, thumbnailSizes, videoEmbed }: VideoModalProps) {
  if (videoEmbed) {
    return (
      <div className={thumbnailClasses}>
        <Modal
          openTrigger={
            <button className='thumbnail'>
              <Image className='video-thumbnail' src={thumbnail} sizes={thumbnailSizes} />
              <PlaySvg className='no-path-opacity-on-hover' role='presentation' />
            </button>
          }
        >
          <div className='responsive-video'>{videoEmbed && <StoryblokComponent blok={videoEmbed} />}</div>
        </Modal>
      </div>
    );
  }
  return (
    <div className={thumbnailClasses}>
      <div className='thumbnail'>
        <Image className='video-thumbnail' src={thumbnail} sizes={thumbnailSizes} />
      </div>
    </div>
  );
}
