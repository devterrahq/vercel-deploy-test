'use client';

import { StoryblokComponent } from '@storyblok/react';
import { HoneycombHeroBackgroundSvg } from '@/components/svg/HoneycombHeroBackgroundSvg';
import { getPaddingBottomClass, getPaddingTopClass } from '@npm-refactored/classname-helpers';
import { Image } from '@npm-refactored/storyblok-next-image';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import {
  BootstrapColumnToNextImageSizes,
  isAssetDefined,
  isRichtextDefined,
} from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { PanelHeroStoryblok } from '@/component-types';
import './Hero.scss';

interface PanelHeroProps {
  blok: PanelHeroStoryblok;
}

export default function PanelHero({ blok }: PanelHeroProps) {
  const render = useRichTextResolver();
  const contentClasses = cn(
    'col',
    'col-md-7',
    'col-lg-5',
    'content-col',
    getPaddingTopClass(blok.panel_padding_top, 'panel'),
    getPaddingBottomClass(blok.panel_padding_bottom, 'panel'),
  );
  const heroImageSize = BootstrapColumnToNextImageSizes(10);

  return (
    <section className='panel-hero'>
      {isAssetDefined(blok.image) ? (
        <div className='panel-hero-image'>
          <Image src={blok.image} sizes={heroImageSize} priority />
        </div>
      ) : null}

      {isRichtextDefined(blok.content) ? (
        <div className='panel-hero-content'>
          <div className='container'>
            <div className='row'>
              <div className={contentClasses}>
                {blok.background ? (
                  <div className='panel-hero-honeycomb'>
                    <HoneycombHeroBackgroundSvg />
                  </div>
                ) : null}
                <div className='content-wrapper richtext-margin-helper text-dark-navy'>
                  {blok.pill?.length ? (
                    <div className='panel-hero-pill'>
                      {blok.pill.map((pill) => (
                        <StoryblokComponent blok={pill} key={pill._uid} />
                      ))}
                    </div>
                  ) : null}
                  {render(blok.content)}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
