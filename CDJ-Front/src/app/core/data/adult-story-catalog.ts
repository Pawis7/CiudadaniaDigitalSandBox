import { AudienceSlug } from '../models/content.models';
import { ADULT_STORY_GUIDANCE, AdultStoryGuidance } from './adult-story-guidance.data';
import { AUDIENCE_PAGES, LevelResource } from './page-content';

export interface AdultStoryEntry {
  resource: LevelResource;
  guidance: AdultStoryGuidance;
}

export interface AdultStoryGroup {
  id: string;
  title: string;
  age: string;
  entries: AdultStoryEntry[];
}

const STAGES: Record<string, Record<string, string[]>> = {
  families: {
    'fam-0-5': ['preescolar'],
    'fam-6-11': ['primaria-baja', 'primaria-alta'],
  },
  teachers: {
    'doc-pre': ['preescolar'],
    'doc-pb': ['primaria-baja'],
    'doc-pa': ['primaria-alta'],
  },
};

/** References the original catalogue so a story keeps one title, cover and player. */
export function adultStoryGroupsFor(theme: AudienceSlug, level: string): AdultStoryGroup[] {
  const stageIds = STAGES[theme]?.[level] ?? [];
  const children = AUDIENCE_PAGES.find((page) => page.slug === 'ninas-y-ninos');
  return stageIds.flatMap((id) => {
    const stage = children?.subLevels.find((item) => item.id === id);
    if (!stage) return [];
    const entries = (stage.levelResources ?? []).flatMap((resource) => {
      const guidance = ADULT_STORY_GUIDANCE.find((item) => item.resourceId === resource.id);
      return guidance ? [{ resource, guidance }] : [];
    });
    return entries.length ? [{ id, title: stage.title, age: stage.subtitle, entries }] : [];
  });
}
