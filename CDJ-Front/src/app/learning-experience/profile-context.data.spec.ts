import { getExperience } from './learning-experience.data';
import { adaptExperience } from './profile-context.data';

describe('Uso con intención for children', () => {
  it('adapts the whole activity to a child creating with a tablet without changing other profiles', () => {
    const base = getExperience('uso-con-intencion')!;
    const original = structuredClone(base);
    const kids = adaptExperience(base, 'kids')!;

    expect(kids.title).toBe('¿Para qué vamos a usar la tableta?');
    expect(kids.prompt).toContain('dibujar una mariposa');
    expect(kids.postScenario).toContain('avión de papel');
    expect(kids.postChoices.filter((choice) => choice.preferred)).toHaveLength(1);
    expect(kids.postChoices.find((choice) => choice.preferred)?.label).toContain('construir');
    expect(kids.takeaways).not.toEqual(base.takeaways);
    expect(JSON.stringify(kids)).not.toMatch(/adolescente|obligarla|scroll|consumo pasivo/i);
    expect(base).toEqual(original);
    expect(adaptExperience(base, 'teens')?.postScenario).toBe(original.postScenario);
    expect(adaptExperience(base, 'families')?.postChoices).toEqual(original.postChoices);
  });
});
