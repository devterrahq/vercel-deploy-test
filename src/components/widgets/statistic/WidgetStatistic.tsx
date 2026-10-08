'use client';

import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { WidgetStatistic } from '@npm-refactored/storyblok-widget-statistic';
import type { WidgetStatisticStoryblok } from '@/component-types';
import './WidgetStatistic.scss';

interface WidgetStatisticProps {
  blok: WidgetStatisticStoryblok;
}

export default function SBWidgetStatistic({ blok }: WidgetStatisticProps) {
  const render = useRichTextResolver();
  return (
    <WidgetStatistic blok={blok}>
      <div className='richtext-margin-helper'>{render(blok.description)}</div>
    </WidgetStatistic>
  );
}
