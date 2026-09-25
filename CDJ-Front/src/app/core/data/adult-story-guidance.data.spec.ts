import {
  ADULT_STORY_GUIDANCE,
  ADULT_STORY_GUIDANCE_BY_RESOURCE,
} from './adult-story-guidance.data';
import { AUDIENCE_PAGES } from './page-content';

describe('Adult guidance linked to the children’s catalogue', () => {
  it('covers each preschool and primary activity once without creating a second resource catalogue', () => {
    const levels = AUDIENCE_PAGES.find((page) => page.slug === 'ninas-y-ninos')!.subLevels;
    const resourceIds = levels
      .filter((level) => ['preescolar', 'primaria-baja', 'primaria-alta'].includes(level.id))
      .flatMap((level) => level.levelResources ?? [])
      .map((resource) => resource.id);

    expect(ADULT_STORY_GUIDANCE).toHaveLength(resourceIds.length);
    expect(new Set(ADULT_STORY_GUIDANCE.map((guidance) => guidance.resourceId)).size).toBe(
      resourceIds.length,
    );
    expect([...ADULT_STORY_GUIDANCE_BY_RESOURCE.keys()].sort()).toEqual(resourceIds.sort());
    for (const guidance of ADULT_STORY_GUIDANCE) {
      expect(ADULT_STORY_GUIDANCE_BY_RESOURCE.get(guidance.resourceId)).toBe(guidance);
      expect(Object.keys(guidance).sort()).toEqual(['family', 'resourceId', 'school']);
    }
  });
});
