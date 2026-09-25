import { TestBed } from '@angular/core/testing';
import { WIDGET_REGISTRY } from '../../audiencia/widget-registry';
import { AUDIENCE_PAGES } from '../../core/data/page-content';
import {
  DETECTIVES_ACTIVITY,
  LUNA_ACTIVITY,
  MURAL_ACTIVITY,
} from '../../core/data/primary-digital-activities.data';
import { CASTLE_ACTIVITY, MISSION_ACTIVITY } from '../../core/data/virtual-world-stories.data';
import { IllustratedActivityComponent } from '../illustrated-activity/illustrated-activity';
import { LunaCajitaImportanteComponent } from '../luna-cajita-importante/luna-cajita-importante';
import { QuienEntraMiMundoComponent } from '../quien-entra-mi-mundo/quien-entra-mi-mundo';
import {
  DetectivesDeLasPistasComponent,
  MuralBuenasIdeasComponent,
  CastilloCambioComponent,
  MisionPuedeEsperarComponent,
} from './primary-digital-stories';

const ACTIVITIES = [
  LUNA_ACTIVITY,
  DETECTIVES_ACTIVITY,
  MURAL_ACTIVITY,
  CASTLE_ACTIVITY,
  MISSION_ACTIVITY,
];

describe('Primary digital stories', () => {
  it.each(ACTIVITIES)('completes and restarts the four decisions in $title', async (activity) => {
    await TestBed.configureTestingModule({
      imports: [IllustratedActivityComponent],
    }).compileComponents();
    const fixture = TestBed.createComponent(IllustratedActivityComponent);
    fixture.componentRef.setInput('activity', activity);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const element = fixture.nativeElement as HTMLElement;

    expect(activity.scenes).toHaveLength(4);
    expect(component.page()).toBe(-1);
    expect(element.querySelector('h1')?.textContent).toContain(activity.title);
    component.start();
    fixture.detectChanges();

    for (const [index, scene] of activity.scenes.entries()) {
      expect(component.scene()?.id).toBe(scene.id);
      component.next();
      expect(component.page()).toBe(index);

      const incorrect = scene.choices.find((choice) => !choice.correct)!;
      const correct = scene.choices.find((choice) => choice.correct)!;
      expect(incorrect).toBeDefined();
      expect(correct).toBeDefined();

      const requiredEvidence = scene.requiredEvidenceIds ?? [];
      if (requiredEvidence.length) {
        component.choose(correct.id);
        expect(component.selectedChoice()).toBeNull();
        expect(component.sceneSolved()).toBe(false);
        component.next();
        expect(component.page()).toBe(index);
      }
      for (const evidenceId of requiredEvidence) component.toggleEvidence(evidenceId);
      fixture.detectChanges();
      expect(component.canChoose()).toBe(true);

      component.choose(incorrect.id);
      fixture.detectChanges();
      expect(element.querySelector('.choice-feedback')?.textContent).toContain(incorrect.feedback);
      expect(component.sceneSolved()).toBe(false);
      component.next();
      expect(component.page()).toBe(index);

      component.retry();
      fixture.detectChanges();
      expect(component.selectedChoice()).toBeNull();
      expect(component.canChoose()).toBe(true);
      component.choose(correct.id);
      fixture.detectChanges();
      expect(component.sceneSolved()).toBe(true);
      expect(component.solvedCount()).toBe(index + 1);
      expect(element.querySelector('.choice-feedback')?.textContent).toContain(scene.takeaway);
      component.next();
      fixture.detectChanges();
      expect(component.page()).toBe(index + 1);
    }

    expect(component.atEnding()).toBe(true);
    expect(element.querySelector('.ending-rule')?.textContent).toContain(activity.ending.rule);
    component.restart();
    fixture.detectChanges();
    expect(component.page()).toBe(-1);
    expect(component.solvedCount()).toBe(0);
    expect(component.selections()).toEqual({});
    expect(component.reviewedEvidence()).toEqual({});
    expect(component.expandedEvidence()).toEqual({});
    component.start();
    expect(component.sceneSolved()).toBe(false);
    expect(component.selectedChoice()).toBeNull();
    fixture.destroy();
  });

  it('places each activity in its intended stage and resolves its registered component', () => {
    const placements = AUDIENCE_PAGES.flatMap((page) =>
      page.subLevels.flatMap((level) =>
        (level.levelResources ?? []).map((resource) => ({
          id: resource.id,
          audience: page.slug,
          level: level.id,
        })),
      ),
    );
    const routes = [
      {
        id: 'quien-entra-mi-mundo',
        audience: 'adolescentes',
        level: 'secundaria',
        component: QuienEntraMiMundoComponent,
      },
      {
        id: 'luna-cajita-importante',
        audience: 'ninas-y-ninos',
        level: 'primaria-alta',
        component: LunaCajitaImportanteComponent,
      },
      {
        id: 'detectives-pistas',
        audience: 'ninas-y-ninos',
        level: 'primaria-alta',
        component: DetectivesDeLasPistasComponent,
      },
      {
        id: 'mural-buenas-ideas',
        audience: 'ninas-y-ninos',
        level: 'primaria-alta',
        component: MuralBuenasIdeasComponent,
      },
      {
        id: 'castillo-cambio',
        audience: 'ninas-y-ninos',
        level: 'primaria-alta',
        component: CastilloCambioComponent,
      },
      {
        id: 'mision-puede-esperar',
        audience: 'ninas-y-ninos',
        level: 'primaria-alta',
        component: MisionPuedeEsperarComponent,
      },
    ] as const;

    expect(ACTIVITIES.map((activity) => activity.id)).toEqual(
      routes.slice(1).map((route) => route.id),
    );
    for (const route of routes) {
      expect(placements.filter((placement) => placement.id === route.id)).toEqual([
        { id: route.id, audience: route.audience, level: route.level },
      ]);
      expect(WIDGET_REGISTRY[route.id]).toBe(route.component);
    }
    const primaryStage = AUDIENCE_PAGES.find(
      (page) => page.slug === 'ninas-y-ninos',
    )!.subLevels.find((level) => level.id === 'primaria-alta')!;
    expect(primaryStage.resourceCount).toBe(7);
    expect(primaryStage.levelResources).toHaveLength(primaryStage.resourceCount);
    for (const [id, cover] of [
      ['castillo-cambio', 'castillo'],
      ['mision-puede-esperar', 'mision'],
      ['monedas-gratis', 'monedas'],
      ['el-mundo-privado', 'mundo'],
    ]) {
      expect(primaryStage.levelResources?.find((resource) => resource.id === id)?.coverSrc).toBe(
        `/cuentos/primaria/carteles/${cover}.webp`,
      );
    }
  });
});
