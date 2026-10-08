import { NextHtmlWithScripts } from '@npm-refactored/nextjs-html-with-scripts';
import type { WidgetScriptEmbedStoryblok } from '@/component-types';

interface WidgetScriptEmbedProps {
  blok: WidgetScriptEmbedStoryblok;
}

export default function WidgetScriptEmbed({ blok }: WidgetScriptEmbedProps) {
  return <NextHtmlWithScripts html={blok.script} />;
}
