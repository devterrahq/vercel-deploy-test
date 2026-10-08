'use client';

import { SiteTextColorKeyToClassName } from '@/helpers/datasources';
import { Image } from '@npm-refactored/storyblok-next-image';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isAssetDefined, isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import WidgetButton from '../button/WidgetButton';
import type { WidgetIconTextStoryblok } from '@/component-types';
import type { WidgetItem } from '@/types';
import './WidgetIconText.scss';

interface WidgetIconTextProps extends WidgetItem {
  blok: WidgetIconTextStoryblok;
}

export default function WidgetIconText({ blok }: WidgetIconTextProps) {
  const render = useRichTextResolver();
  const hasDescription = isRichtextDefined(blok.description);
  const rootClasses = cn('widget-icon-text', blok.orientation === 'vertical' ? 'widget-icon-text-vertical' : '');
  const contentClasses = cn(
    'widget-icon-text-content',
    'richtext-margin-helper',
    blok.content_text_color ? SiteTextColorKeyToClassName(blok.content_text_color) : '',
  );
  const imageSizes = '25vw';

  return (
    <div className={rootClasses}>
      {isAssetDefined(blok.icon) ? (
        <div className='widget-icon-text-icon'>
          <Image sizes={imageSizes} src={blok.icon} />
        </div>
      ) : null}
      {blok.link_text || hasDescription ? (
        <div className={contentClasses}>
          {blok.link_last ? null : RenderLink(blok)}
          {hasDescription ? render(blok.description) : null}
          {blok.link_last ? RenderLink(blok) : null}
        </div>
      ) : null}
    </div>
  );
}

function RenderLink(blok: WidgetIconTextStoryblok) {
  return blok.link_text ? (
    <WidgetButton
      blok={{
        text: blok.link_text,
        link: blok.link,
        button_style: blok.link_style,
        after_icon: blok.link_after_icon,
        _uid: `btn_widget_for_${blok._uid}`,
        component: 'widget_button',
        button_size: blok.link_size && blok.link_size != '' ? blok.link_size : 'button-sm',
        button_color: blok.link_override,
      }}
    />
  ) : null;
}
