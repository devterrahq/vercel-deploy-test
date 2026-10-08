import { FetchStoryFromStoryblok } from '@/helpers/storyblok-fetch';
import type { PersonStoryblok, WidgetProfileCardStoryblok } from '@/component-types';
import type { ComponentResolverData } from '@/helpers/data-resolver';

export type WidgetProfileCardData = {
  person: PersonStoryblok | undefined;
};

export async function getWidgetProfileCard({
  component,
  options: { isDraftMode },
}: ComponentResolverData<WidgetProfileCardStoryblok>): Promise<WidgetProfileCardData> {
  if (typeof component?.person !== 'string') return { person: undefined };

  try {
    const res = await FetchStoryFromStoryblok({
      slug: component.person,
      params: {
        find_by: 'uuid',
      },
      isDraftModeEnabled: isDraftMode,
    });

    return { person: res?.content as PersonStoryblok };
  } catch (error) {
    console.error(error);
    return { person: undefined };
  }
}
