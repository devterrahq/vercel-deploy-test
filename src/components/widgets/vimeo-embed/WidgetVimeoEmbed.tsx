'use client';

import { NextHtmlWithScripts } from '@npm-refactored/nextjs-html-with-scripts';
import type { WidgetVimeoEmbedStoryblok } from '@/component-types';

interface WidgetVimeoEmbedProps {
  blok: WidgetVimeoEmbedStoryblok;
}
export default function WidgetVimeoEmbed({ blok }: WidgetVimeoEmbedProps) {
  return <NextHtmlWithScripts html={blok.embed_code} />;
}
