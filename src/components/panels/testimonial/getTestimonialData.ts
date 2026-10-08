import { getTestimonialByStoryUUID } from '@/helpers/api-client-helpers';
import type { PanelTestimonialStoryblok, TestimonialStoryblok } from '@/component-types';
import type { ComponentResolverData } from '@/helpers/data-resolver';

export type TestimonialData = {
  testimonial: TestimonialStoryblok | undefined;
};

export async function getTestimonialData({
  component,
  options: { isDraftMode },
}: ComponentResolverData<PanelTestimonialStoryblok>): Promise<TestimonialData> {
  if (typeof component.testimonial_data !== 'string') {
    return {
      testimonial: component.testimonial_data?.content,
    };
  }

  const testimonial = await getTestimonialByStoryUUID(component.testimonial_data, isDraftMode);

  return {
    testimonial,
  };
}
