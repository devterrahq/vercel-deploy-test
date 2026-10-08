'use client';

import { getColumnWidth, getTextAlignment } from '@npm-refactored/classname-helpers';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { WidgetRichtextStoryblok } from '@/component-types';
import './WidgetRichtext.scss';

interface WidgetRichtextProps {
  blok: WidgetRichtextStoryblok;
}

export default function WidgetRichtext({ blok }: WidgetRichtextProps) {
  const render = useRichTextResolver();
  const rootClass = cn(
    'widget-richtext',
    'richtext-margin-helper',
    `text-${blok.content_text_color}`,
    getTextAlignment(blok.content_alignment),
    getColumnWidth(blok.content_width),
  );
  return <div className={rootClass}>{isRichtextDefined(blok.content) ? render(blok.content) : null}</div>;
}
