import { storyblokEditable } from '@storyblok/react/rsc';
import type { WidgetPillAStoryblok } from '@/component-types';
import './WidgetPillA.scss';

interface WidgetPillAProps {
  blok: WidgetPillAStoryblok;
}

export default function WidgetPillA({ blok }: WidgetPillAProps) {
  if (!blok.text) return null;

  return (
    <span {...storyblokEditable(blok)} className='c--pill-a'>
      {blok.text}
    </span>
  );
}
