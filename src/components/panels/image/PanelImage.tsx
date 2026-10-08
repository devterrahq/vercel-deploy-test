'use client';

import * as RefPanelImage from '@npm-refactored/panel-image';
import { Image } from '@npm-refactored/storyblok-next-image';
import { isAssetDefined } from '@npm-refactored/storyblok-utilities';
import type { PanelImageStoryblok } from '@/component-types';
import './PanelImage.scss';

interface PanelImageTextProps {
  blok: PanelImageStoryblok;
}

export default function PanelImage({ blok }: PanelImageTextProps) {
  return (
    <RefPanelImage.Root blok={blok}>
      {isAssetDefined(blok.image) ? <Image className={'panel-image_image'} src={blok.image} /> : null}
    </RefPanelImage.Root>
  );
}
