import { StoryblokComponent } from '@storyblok/react';
import type { WidgetMenuCtaStoryblok } from '@/component-types';

interface MegaMenuAsideProps {
  items: WidgetMenuCtaStoryblok[] | [];
  otherColCount: number;
}

export default function MegaMenuAside({ items, otherColCount }: MegaMenuAsideProps) {
  return (
    <div>
      {items.map((item, i: number) => (
        <StoryblokComponent
          blok={item}
          key={i}
          responsiveFieldSizes={{
            algorithm: 'items_per_row',
            data: { default: { value: otherColCount + 1 }, lg: { value: 1 } },
          }}
        />
      ))}
    </div>
  );
}
