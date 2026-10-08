'use client';

import { NextHtmlWithScripts } from '@npm-refactored/nextjs-html-with-scripts';
import type { WidgetIframeEmbedStoryblok } from '@/component-types';

interface WidgetIframeEmbedProps {
  blok: WidgetIframeEmbedStoryblok;
}

export default function WidgetIFrameEmbed({ blok }: WidgetIframeEmbedProps) {
  return <NextHtmlWithScripts html={blok.embed_code} />;
}
