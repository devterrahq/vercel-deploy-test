'use client';

import { WidgetNextHubspotEmbed } from './HubspotEmbed';
import type { WidgetHubspotEmbedStoryblok } from '@/component-types';

interface WidgetHubspotEmbedProps {
  blok: WidgetHubspotEmbedStoryblok;
}
export default function WidgetHubspotEmbed({ blok }: WidgetHubspotEmbedProps) {
  return <WidgetNextHubspotEmbed blok={blok} />;
}
