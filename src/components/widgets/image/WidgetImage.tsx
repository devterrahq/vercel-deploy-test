'use client';

import { Image } from '@npm-refactored/storyblok-next-image';
import { useResponsiveFieldSizes } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { WidgetImageStoryblok } from '@/component-types';
import type { WidgetItem } from '@/types';
import './WidgetImage.scss';

interface WidgetImageProps extends WidgetItem {
  blok: WidgetImageStoryblok;
}

export default function WidgetImage({ blok, responsiveFieldSizes }: WidgetImageProps) {
  const { image_size, horizontal_position, image } = blok;
  const imageSize = image_size ? image_size : '12';

  const classNames = cn('widget-image__root');
  const sizes = useResponsiveFieldSizes(responsiveFieldSizes, '100vw');

  return (
    <>
      {image?.filename ? (
        <div
          className={classNames}
          style={horizontal_position ? ({ '--horizontal-position': horizontal_position } as React.CSSProperties) : {}}
        >
          <Image sizes={sizes} className={`col-${imageSize}`} src={blok.image} />
        </div>
      ) : null}
    </>
  );
}
