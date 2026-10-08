import { getTestimonialsByStoryUUID } from '@/helpers/api-client-helpers';
import type { PanelTestimonialCarouselStoryblok, TestimonialStoryblok } from '@/component-types';
import type { ComponentResolverData } from '@/helpers/data-resolver';

export type TestimonialCarouselData = {
  testimonials: TestimonialStoryblok[] | undefined;
};

export async function getTestimonialCarouselData({
  component,
  options: { isDraftMode },
}: ComponentResolverData<PanelTestimonialCarouselStoryblok>): Promise<TestimonialCarouselData> {
  const isResolved = component.testimonial_data?.every((testimonial) => typeof testimonial !== 'string');
  if (isResolved) {
    const testimonialStories = [];

    if (!component.testimonial_data) {
      return {
        testimonials: undefined,
      };
    }

    for (const testimonial of component.testimonial_data) {
      if (testimonial) {
        testimonialStories.push(testimonial as unknown as TestimonialStoryblok);
      }
    }

    return {
      testimonials: testimonialStories,
    };
  }

  const testimonialCollection = await getTestimonialsByStoryUUID(component.testimonial_data as string[], isDraftMode);

  return {
    testimonials: testimonialCollection,
  };
}
