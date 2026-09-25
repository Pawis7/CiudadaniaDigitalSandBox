import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { FamilyGamingGuideComponent } from '../family-gaming-guide/family-gaming-guide';
import { FAMILY_GAMING_GUIDE } from '../core/data/family-gaming-guide.data';
import { AudienciaComponent } from './audiencia';

describe('Stories accompanied by families and schools', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('opens the linked family guidance, runs its original story and returns to the same profile', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      '/p/familias?acompanar=castillo-cambio#fam-6-11',
      AudienciaComponent,
    );
    harness.detectChanges();
    expect(component.adultStoryGroups().map((group) => [group.id, group.entries.length])).toEqual([
      ['primaria-baja', 4],
      ['primaria-alta', 7],
    ]);
    const element = harness.routeNativeElement!;
    const proposal = element.querySelector<HTMLElement>('#propuesta-castillo-cambio')!;
    expect(proposal.hidden).toBe(false);
    expect(proposal.textContent).toContain('Antes');
    const openButton = element.querySelector<HTMLButtonElement>(
      '#acompanar-castillo-cambio .story-guide__open',
    )!;
    openButton.focus();
    openButton.click();
    harness.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(component.activeWidgetId()).toBe('castillo-cambio');
    expect(element.querySelector('[role="dialog"] h1')?.textContent).toContain(
      'El castillo que cambió',
    );
    expect(element.querySelector('.audiencia-page-content')?.hasAttribute('inert')).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    harness.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(component.activeWidgetId()).toBeNull();
    expect(component.selectedLevel()).toBe('fam-6-11');
    expect(proposal.hidden).toBe(false);
    expect(document.activeElement).toBe(openButton);
  });

  it('filters by school stage and does not expose preschool activities as activities for babies', async () => {
    const harness = await RouterTestingHarness.create();
    const families = await harness.navigateByUrl('/p/familias#fam-0-5', AudienciaComponent);
    harness.detectChanges();
    expect(families.adultStoryGroups()[0].age).toBe('3 a 5 años');
    expect(harness.routeNativeElement?.textContent).toContain('niñas y niños de 3 a 5 años');

    for (const [level, count] of [
      ['doc-pre', 6],
      ['doc-pb', 4],
      ['doc-pa', 7],
    ] as const) {
      const school = await harness.navigateByUrl('/p/docentes#' + level, AudienciaComponent);
      harness.detectChanges();
      const entries = school.adultStoryGroups().flatMap((group) => group.entries);
      expect(entries).toHaveLength(count);
      const id = entries[0].resource.id;
      harness
        .routeNativeElement!.querySelector<HTMLButtonElement>(
          '#acompanar-' + id + ' .story-guide__toggle',
        )!
        .click();
      harness.detectChanges();
      const proposal = harness.routeNativeElement!.querySelector<HTMLElement>('#propuesta-' + id)!;
      expect(proposal.hidden).toBe(false);
      expect(proposal.textContent).toContain(entries[0].guidance.school.after);
      expect(proposal.textContent).toContain('Qué observar:');
    }

    const teenagers = await harness.navigateByUrl(
      '/p/familias?acompanar=castillo-cambio#fam-15-17',
      AudienciaComponent,
    );
    expect(teenagers.adultStoryGroups()).toEqual([]);
    expect(teenagers.activeWidgetId()).toBeNull();
  });

  it('routes the internal gaming guide and links every case to its family proposal', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/p/familias/videojuegos', FamilyGamingGuideComponent);
    harness.detectChanges();
    const element = harness.routeNativeElement!;
    expect(element.querySelector('h1')?.textContent).toContain('Videojuegos en casa');
    const links = Array.from(element.querySelectorAll<HTMLAnchorElement>('a[href]'));
    for (const situation of FAMILY_GAMING_GUIDE.situations) {
      expect(
        links.some(
          (link) =>
            link.getAttribute('href') ===
            '/p/familias?acompanar=' + situation.resourceId + '#fam-6-11',
        ),
      ).toBe(true);
    }
    expect(links.some((link) => link.href === FAMILY_GAMING_GUIDE.sources[0].url)).toBe(true);
  });
});
