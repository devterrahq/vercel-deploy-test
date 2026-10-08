'use client';

import { CimaBannerSvg, CPWABannerSvg, RMABannerSvg } from '@/components/svg';
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
import type { PanelHeroCertificationStoryblok } from '@/component-types';
import './Hero.scss';

interface PanelHeroCertificationProps {
  blok: PanelHeroCertificationStoryblok;
}

export default function PanelHeroCertification({ blok }: PanelHeroCertificationProps) {
  const render = useRichTextResolver();
  const contentClasses = cn(
    'col',
    'col-md-7',
    'col-lg-5',
    'content-col',
    getPaddingBottomClass(blok.panel_padding_bottom, 'panel'),
  );
  const contentWrapperClasses = cn(
    'content-wrapper',
    'richtext-margin-helper',
    'text-dark-navy',
    getPaddingTopClass(blok.panel_padding_top, 'panel'),
  );
  const heroImageSize = BootstrapColumnToNextImageSizes(10);

  return (
    <section className='panel-hero certification'>
      {isAssetDefined(blok.image) ? (
        <div className='panel-hero-image'>
          <Image src={blok.image} sizes={heroImageSize} />
        </div>
      ) : null}

      {isRichtextDefined(blok.content) ? (
        <div className='panel-hero-content'>
          <div className='container'>
            <div className='row'>
              <div className={contentClasses}>
                {blok.certification ? (
                  <div className='certification-svg'>
                    <CertificationBanner certKey={blok.certification} />
                  </div>
                ) : null}
                <div className='panel-hero-honeycomb'>
                  <HoneycombHeroBackgroundSvg />
                </div>
                <div className={contentWrapperClasses}>{render(blok.content)}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

interface CertificationBannerProps {
  certKey: 'cima' | 'cpwa' | 'rma' | undefined;
}
function CertificationBanner({ certKey }: CertificationBannerProps) {
  switch (certKey) {
    case 'cima':
      return <CimaBannerSvg />;
    case 'cpwa':
      return <CPWABannerSvg />;
    case 'rma':
      return <RMABannerSvg />;
    default:
      return undefined;
  }
}
