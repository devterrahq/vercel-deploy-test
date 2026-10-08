'use client';

import { WidgetTable as RefWidgetTable } from '@npm-refactored/widget-table';
import './WidgetTable.scss';
import type { WidgetTableStoryblok } from '@/component-types';

interface WidgetTableProps {
  blok: WidgetTableStoryblok;
}
export default function WidgetTable({ blok }: WidgetTableProps) {
  return <RefWidgetTable blok={blok} />;
}
