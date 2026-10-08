'use client';

import { HoneycombFullBackgroundSvg } from '@/components/svg/HoneycombFullBackgroundSvg';
import { SiteTextColorKeyToClassName } from '@/helpers/datasources';
import { IWIText } from '@/helpers/richtext';
import { useParallax } from '@npm-refactored/hooks';
import { Image } from '@npm-refactored/storyblok-next-image';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isAssetDefined, isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { TestimonialData } from './getTestimonialData';
import type { PanelTestimonialStoryblok, TestimonialStoryblok } from '@/component-types';
import type { WithResolvedData } from '@/helpers/data-resolver';
import './PanelTestimonial.scss';

interface PanelTestimonialProps {
  blok: WithResolvedData<'panel_testimonial', PanelTestimonialStoryblok, TestimonialData>;
}
export default function PanelTestimonial({ blok }: PanelTestimonialProps) {
  const testimonial = blok.resolver_data?.testimonial;
  if (!testimonial) return;

  return <Testimonial blok={blok} testimonial={testimonial} />;
}

interface TestimonialProps {
  blok: PanelTestimonialStoryblok;
  testimonial: TestimonialStoryblok;
}
export function Testimonial({ blok, testimonial }: TestimonialProps) {
  const render = useRichTextResolver();
  const [parallaxRef, parallaxClass, inViewClass] = useParallax(blok.parallax_enabled, {
    offset: 200,
  });

  const parallaxClasses = cn(parallaxClass, inViewClass);

  const quote = render(testimonial ? testimonial.content : '');

  if (!testimonial) return;

  const hasPhoto = isAssetDefined(testimonial.photo);
  const primaryColor = SiteTextColorKeyToClassName(blok.title_text_color);
  const secondaryColor = SiteTextColorKeyToClassName(blok.description_text_color);

  const headlineClasses = cn('testimonial-heading', primaryColor);
  const disclaimerClasses = cn('testimonial-disclaimer', secondaryColor);
  const quoteClasses = cn(
    'testimonial-quote',
    'richtext-margin-helper',
    SiteTextColorKeyToClassName(blok?.quote_text_color),
  );
  const nameClasses = cn('signature-text-name', primaryColor);
  const titleClasses = cn('signature-text-title', secondaryColor);
  const figureClasses = cn('widget-testimonial', hasPhoto ? '' : 'no-photo');

  return (
    <PanelGeneric blok={blok} panelName='testimonial'>
      <div className='testimonial-honeycomb'>
        <HoneycombFullBackgroundSvg />
      </div>
      <div ref={parallaxRef} className={parallaxClasses}>
        <figure className={figureClasses}>
          {hasPhoto ? (
            <div className='testimonial-photo'>
              <Image src={testimonial.photo} alt={`${testimonial.name || ''}, ${testimonial.title || ''}`} />
            </div>
          ) : null}
          {testimonial.headline || testimonial.disclaimer ? (
            <div className='testimonial-headline richtext-margin-helper'>
              {testimonial.headline ? (
                <IWIText as='h3' className={headlineClasses} text={testimonial.headline} />
              ) : null}
              {testimonial.disclaimer ? (
                <IWIText as='p' className={disclaimerClasses} text={testimonial.disclaimer} />
              ) : null}
            </div>
          ) : null}
          {isRichtextDefined(testimonial.content) ? <blockquote className={quoteClasses}>{quote}</blockquote> : null}
          {testimonial.name || testimonial.title ? (
            <figcaption className='testimonial-signature'>
              {testimonial.name ? <IWIText as='h5' className={nameClasses} text={testimonial.name} /> : null}
              {testimonial.title ? <IWIText as='h6' className={titleClasses} text={testimonial.title} /> : null}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </PanelGeneric>
  );
}
