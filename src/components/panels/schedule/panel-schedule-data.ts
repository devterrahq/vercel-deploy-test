import { GetAllTrackDataInFolder } from '@/helpers/api-client-helpers';
import { getConferenceHomePath } from '@/helpers/slug-helpers';
import type { ConferenceTrackStoryblok, PanelScheduleStoryblok } from '@/component-types';
import type { ComponentResolverData } from '@/helpers/data-resolver';
import type { ISbStoryData } from 'storyblok-js-client';

export type PanelScheduleData = {
  tracks: Array<ISbStoryData<ConferenceTrackStoryblok>>;
};

export async function getPanelScheduleData({
  options: { slug, isDraftMode },
}: ComponentResolverData<PanelScheduleStoryblok>): Promise<PanelScheduleData> {
  if (!slug) return { tracks: [] };
  try {
    const path = await getConferenceHomePath(slug);
    const trackData = await GetAllTrackDataInFolder(path + '*', isDraftMode);
    return { tracks: trackData };
  } catch (error) {
    console.error(error);
    return { tracks: [] };
  }
}
