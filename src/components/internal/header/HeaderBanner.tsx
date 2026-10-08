'use client';

import { RefLink } from '@/components/internal/RefLink';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isLinkDefined, isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import type { HeaderStoryblok } from '@/component-types';
import './HeaderBanner.scss';

interface HeaderBannerProps {
  blok: HeaderStoryblok;
}

/**
 * Sitewide banner shown right under the header, driven by the header's "Sitewide banner" tab.
 * The call to action renders after the text when both the link and its text are set.
 */
export default function HeaderBanner({ blok }: HeaderBannerProps) {
  const render = useRichTextResolver();
  const hasText = isRichtextDefined(blok.text);
  const hasLink = isLinkDefined(blok.link) && Boolean(blok.link_text);

  if (!blok.show || (!hasText && !hasLink)) return null;

  return (
    <aside className='c--banner-a' aria-label='Sitewide announcement'>
      <div className='container-lg'>
        <div className='c--banner-a__wrapper'>
          {hasText ? <div className='c--banner-a__wrapper__content'>{render(blok.text)}</div> : null}
          {hasLink ? (
            <RefLink src={blok.link} className='c--banner-a__wrapper__link'>
              {blok.link_text}
            </RefLink>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
