import { Image } from '@npm-refactored/storyblok-next-image';
import { isAssetDefined } from '@npm-refactored/storyblok-utilities';
import type { WidgetTestimonialSliderStoryblok } from '@/component-types';
import './WidgetTestimonialSlider.scss';

interface WidgetTestimonialSliderProps {
  blok: WidgetTestimonialSliderStoryblok;
}

/**
 * `quoter` resolves to the full person story when `widget_testimonial_slider.quoter` is listed in
 * RESOLVE_RELATIONS, and stays a bare uuid string otherwise.
 */
export default function WidgetTestimonialSlider({ blok }: WidgetTestimonialSliderProps) {
  const person = typeof blok.quoter === 'string' ? undefined : blok.quoter?.content;
  const photo = person?.image;

  return (
    <figure className='c--testimonial-a'>
      <div className='c--testimonial-a__bg-items' aria-hidden='true'>
        <span className='c--testimonial-a__bg-items__item'>
          <span className='c--testimonial-a__bg-items__item__artwork' />
        </span>
        <span className='c--testimonial-a__bg-items__item c--testimonial-a__bg-items__item--second' />
        <span className='c--testimonial-a__bg-items__item c--testimonial-a__bg-items__item--third' />
      </div>
      <div className='c--testimonial-a__ft-items'>
        <blockquote className='c--testimonial-a__ft-items__bd'>
          <p className='c--testimonial-a__ft-items__bd__title'>&ldquo;{blok.quote}&rdquo;</p>
        </blockquote>
        <figcaption className='c--testimonial-a__ft-items__ft'>
          {isAssetDefined(photo) ? (
            <div className='c--testimonial-a__ft-items__ft__media-wrapper'>
              <Image
                className='c--testimonial-a__ft-items__ft__media-wrapper__media'
                src={photo}
                alt={person?.name ?? ''}
                width={69}
                height={82}
                sizes='69px'
                unoptimized={photo?.is_external_url}
              />
            </div>
          ) : null}
          <cite className='c--testimonial-a__ft-items__ft__bd'>
            {person?.name ? <span className='c--testimonial-a__ft-items__ft__bd__title'>{person.name}</span> : null}
            {person?.title ? (
              <span className='c--testimonial-a__ft-items__ft__bd__subtitle'>{person.title}</span>
            ) : null}
          </cite>
        </figcaption>
      </div>
    </figure>
  );
}
