import { FetchAllStoriesFromStoryblok } from '@/helpers/storyblok-fetch';
import type { ConferenceScheduleItemStoryblok, PersonStoryblok } from '@/component-types';
import type { ComponentResolverData } from '@/helpers/data-resolver';

export type ConferenceScheduleItemData = {
  presenters: Record<string, PersonStoryblok>;
};

export async function getConferenceScheduleItem({
  component,
  options: { isDraftMode },
}: ComponentResolverData<ConferenceScheduleItemStoryblok>): Promise<ConferenceScheduleItemData> {
  const presentersUUIDs = new Set<string>();
  if (typeof component?.presenters?.[0] !== 'string') return { presenters: {} };

  component.presenters.forEach((presenter) => {
    presentersUUIDs.add(presenter as string);
  });

  // create a cs string of all the uuids
  const presentersUUIDsString = Array.from(presentersUUIDs).join(',');

  try {
    const res = await FetchAllStoriesFromStoryblok({
      isDraftModeEnabled: isDraftMode,
      params: {
        by_uuids: presentersUUIDsString,
      },
    });

    const presenters: Record<string, PersonStoryblok> = {};
    res.forEach((presenter) => {
      presenters[presenter.uuid] = presenter.content as PersonStoryblok;
    });

    return { presenters };
  } catch (error) {
    console.error(error);
    return { presenters: {} };
  }
}
