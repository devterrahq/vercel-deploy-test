'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import WidgetTestimonialSlider from '@/components/widgets/testimonial-slider/WidgetTestimonialSlider';
import { PanelGeneric } from '@npm-refactored/storyblok-panel-generic';
import { Autoplay } from 'swiper/modules';
import type { PanelTestimonialSliderStoryblok } from '@/component-types';
import type { Swiper as SwiperInstance } from 'swiper/types';
import 'swiper/css';
import './PanelTestimonialSlider.scss';

interface PanelTestimonialSliderProps {
  blok: PanelTestimonialSliderStoryblok;
}

export default function PanelTestimonialSlider({ blok }: PanelTestimonialSliderProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const quotes = blok.quotes ?? [];
  const showControls = quotes.length > 1;

  return (
    <PanelGeneric blok={blok} panelName='testimonial-slider'>
      <div className='c--slider-a'>
        <Swiper
          className='c--slider-a__bd'
          onSwiper={setSwiper}
          onActiveIndexChange={(instance) => setActiveIndex(instance.activeIndex)}
          modules={[Autoplay]}
          autoplay={showControls}
          rewind={showControls}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            768: { spaceBetween: 24 },
            1200: { spaceBetween: 32 },
          }}
        >
          {quotes.map((quote) => (
            <SwiperSlide key={quote._uid}>
              <WidgetTestimonialSlider blok={quote} />
            </SwiperSlide>
          ))}
        </Swiper>
        {showControls ? (
          <div className='c--slider-a__list-group' role='tablist' aria-label='Testimonials'>
            {quotes.map((quote, index) => (
              <button
                key={quote._uid}
                type='button'
                role='tab'
                aria-selected={index === activeIndex}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`c--slider-a__list-group__item${
                  index === activeIndex ? ' c--slider-a__list-group__item--is-active' : ''
                }`}
                onClick={() => swiper?.slideTo(index)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </PanelGeneric>
  );
}
