'use client';

import { storyblokEditable } from '@storyblok/react/rsc';
import { ChevronDownSvg } from '@/components/svg';
import { IWIText } from '@/helpers/richtext';
import * as RefAccordion from '@npm-refactored/pr-accordion';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import type {
  AccordionGroupStoryblok,
  AccordionItemStoryblok,
  PanelAccordionStoryblok,
  WidgetAccordionStoryblok,
} from '@/component-types';
import type { RichTextContextValue } from '@npm-refactored/storyblok-rich-text';
import './WidgetAccordion.scss';

interface WidgetAccordionProps {
  blok: WidgetAccordionStoryblok;
  rootLevel?: boolean;
}

export default function WidgetAccordion({ blok, rootLevel = true }: WidgetAccordionProps) {
  return <Accordion items={blok.items} rootLevel={rootLevel} blok={blok} />;
}
interface AccordionProps {
  items: Array<AccordionItemStoryblok | AccordionGroupStoryblok> | undefined;
  rootLevel: boolean;
  blok: WidgetAccordionStoryblok | PanelAccordionStoryblok;
}
export function Accordion({ items, rootLevel, blok }: AccordionProps) {
  const render = useRichTextResolver();

  return items?.map((item, i) => {
    if (item.component === 'accordion_group') {
      const groupItem = item as AccordionGroupStoryblok;

      return (
        <div className='accordion-group_wrapper' key={groupItem._uid}>
          {groupItem?.section_title || isRichtextDefined(groupItem?.section_content) ? (
            <div className='accordion-group_title-desc'>
              {groupItem?.section_title ? <h3>{groupItem?.section_title?.toString()}</h3> : null}
              {isRichtextDefined(groupItem?.section_content) ? <div>{render(groupItem?.section_content)}</div> : null}
            </div>
          ) : null}

          {groupItem.items && groupItem.items.length > 0 ? (
            <RefAccordion.Root type={'multiple'} {...(rootLevel && storyblokEditable(blok))}>
              {groupItem.items.map((item, j) => {
                return <Item key={item._uid} value={`${i}${j}`} item={item} richtextRenderer={render} />;
              })}
            </RefAccordion.Root>
          ) : null}
        </div>
      );
    } else if (item.component === 'accordion_item') {
      const singleItem = item as AccordionItemStoryblok;

      return (
        <RefAccordion.Root key={singleItem._uid} type={'single'} {...(rootLevel && storyblokEditable(blok))}>
          <Item value={`${i}`} item={singleItem} richtextRenderer={render} />
        </RefAccordion.Root>
      );
    }
  });
}

interface ItemProps {
  value: string;
  item: AccordionItemStoryblok;
  richtextRenderer: RichTextContextValue;
}
function Item({ value, item, richtextRenderer }: ItemProps) {
  return (
    <RefAccordion.Item value={value}>
      <RefAccordion.Header>
        <RefAccordion.Trigger className='accordion-group_trigger'>
          <IWIText as='span' text={item.headline} className='accordion-group_trigger_headline' />

          <div className='accordion-group_trigger_icon-container'>
            <div className='accordion-group_trigger_icon'>
              <ChevronDownSvg />
            </div>
          </div>
        </RefAccordion.Trigger>
      </RefAccordion.Header>

      {isRichtextDefined(item?.content) ? (
        <RefAccordion.Panel className='accordion-group_panel'>{richtextRenderer(item.content)}</RefAccordion.Panel>
      ) : null}
    </RefAccordion.Item>
  );
}
