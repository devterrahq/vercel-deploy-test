'use client';

import { HoneycombCarouselBackgroundSvg } from '@/components/svg/HoneycombCarouselBackgroundSvg';
import { SiteBackgroundColorKeyToClassName, SiteTextColorKeyToClassName } from '@/helpers/datasources';
import { IWIText } from '@/helpers/richtext';
import { useParallax } from '@npm-refactored/hooks';
import { Image } from '@npm-refactored/storyblok-next-image';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { useRichTextResolver } from '@npm-refactored/storyblok-rich-text';
import { isAssetDefined, isRichtextDefined } from '@npm-refactored/storyblok-utilities';
import cn from 'classnames';
import type { TestimonialCarouselData } from './getTestimonialCarouselData';
import type { PanelTestimonialCarouselStoryblok, TestimonialStoryblok } from '@/component-types';
import type { WithResolvedData } from '@/helpers/data-resolver';
import './PanelTestimonialCarousel.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface PanelTestimonialCarouselProps {
  blok: WithResolvedData<'panel_testimonial_carousel', PanelTestimonialCarouselStoryblok, TestimonialCarouselData>;
}
export default function PanelTestimonialCarousel({ blok }: PanelTestimonialCarouselProps) {
  const testimonials = blok.resolver_data?.testimonials;
  if (!testimonials) {
    return;
  }

  return <TestimonialCarousel blok={blok} testimonials={testimonials} />;
}

interface TestimonialCarouselProps {
  blok: PanelTestimonialCarouselStoryblok;
  testimonials: TestimonialStoryblok[];
}
export function TestimonialCarousel({ blok, testimonials }: TestimonialCarouselProps) {
  const animationDuration: number = Number(blok.carousel_speed);

  let autoplaySettings = undefined;
  if (animationDuration > 0) {
    autoplaySettings = {
      delay: animationDuration * 1000,
      disableOnInteraction: true,
    };
  }

  return (
    <PanelGeneric blok={blok} panelName='testimonial-carousel'>
      <div className='swiper-container-with-bg'>
        <HoneycombCarouselBackgroundSvg className='swiper-background' />
        <Swiper
          spaceBetween={4}
          slidesPerView={1}
          navigation
          modules={[Pagination, Autoplay]}
          loop
          centeredSlides={true}
          pagination={{ clickable: true }}
          autoplay={autoplaySettings}
          breakpoints={{
            1024: {
              slidesPerView: 1.6,
              spaceBetween: 5,
            },
            350: {
              slidesPerView: 1.35,
              spaceBetween: 4,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={`testimonial_${index}`}>
              <Testimonial blok={blok} testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </PanelGeneric>
  );
}

interface TestimonialProps {
  blok: PanelTestimonialCarouselStoryblok;
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
  const testimonialCardClasses = cn(
    'testimonial-slide',
    SiteBackgroundColorKeyToClassName(blok?.testimonial_card_background_color),
  );
  const quoteClasses = cn(
    'testimonial-quote',
    'richtext-margin-helper',
    SiteTextColorKeyToClassName(blok?.quote_text_color),
  );
  const nameClasses = cn('signature-text-name', primaryColor);
  const titleClasses = cn('signature-text-title', secondaryColor);
  const figureClasses = cn('widget-testimonial', hasPhoto ? '' : 'no-photo');

  return (
    <div className={testimonialCardClasses}>
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
    </div>
  );
}
