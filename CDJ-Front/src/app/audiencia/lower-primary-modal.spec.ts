import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from '../app.routes';
import { LOWER_PRIMARY_BOOKS } from '../core/data/lower-primary-books.data';
import { AudienciaComponent } from './audiencia';

const STORY_IDS = [
  'bit-puente-por-terminar',
  'bit-ventana-inesperada',
  'bit-boton-brillante',
  'bit-cartel-clase',
];

describe('Lower primary illustrated stories', () => {
  it('opens all four covers, reads every spread and closes back to the same card and stage', async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      '/p/ninas-y-ninos#primaria-baja',
      AudienciaComponent,
    );
    harness.detectChanges();
    const element = harness.routeNativeElement!;
    const cards = Array.from(element.querySelectorAll<HTMLElement>('app-resource-card'));
    expect(cards).toHaveLength(4);
    expect(component.activeSubLevel()?.resourceCount).toBe(4);
    expect(component.levelResources().map(resource => resource.id)).toEqual(STORY_IDS);

    for (const [index, card] of cards.entries()) {
      const resource = component.levelResources()[index];
      const book = LOWER_PRIMARY_BOOKS[resource.id];
      const cover = card.querySelector<HTMLButtonElement>('.story-card__cover')!;
      expect(cover).not.toBeNull();
      expect(resource.badge).toBe('Lectura acompañada · 6 a 8 años');
      expect(resource.actionLabel).toBe('Leer cuento');
      expect(resource.coverSrc).toBe(`/cuentos/PrimariaBaja/${resource.id}/01-portada.webp`);
      expect(book.spreads[0].leftPage.src).toBe(`/cuentos/PrimariaBaja/${resource.id}/02-escena-1.webp`);
      cover.focus();
      cover.click();
      harness.detectChanges();
      card.querySelector<HTMLButtonElement>('.story-card__panel button')!.click();
      harness.detectChanges();

      expect(component.activeWidgetId()).toBe(resource.id);
      expect(component.isBookWidget()).toBe(true);
      const reader = element.querySelector('app-illustrated-audiobook')!;
      expect(reader).not.toBeNull();
      expect(reader.querySelector('h1')?.textContent).toBe(resource.title);
      expect(reader.querySelector('.aib-audio-controls')).toBeNull();
      expect(reader.querySelector('audio')).toBeNull();
      expect(element.querySelector('app-lower-primary-game')).toBeNull();
      expect(element.querySelector('.audiencia-page-content')?.hasAttribute('inert')).toBe(true);
      expect(document.body.classList.contains('no-scroll')).toBe(true);

      expect(book.readingOnly).toBe(true);
      expect(book.spreads).toHaveLength(7);
      for (let page = 0; page < book.spreads.length; page++) {
        expect(reader.querySelector('.aib-progress')?.textContent).toContain(book.spreads[page].pageLabel);
        reader.querySelector<HTMLButtonElement>('.aib-nav--next')!.click();
        harness.detectChanges();
      }
      expect(reader.querySelector('.aib-ending')?.textContent).toContain(book.ending.rule);
      reader.querySelector<HTMLButtonElement>('.story-ending__close')!.click();
      harness.detectChanges();
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(component.activeWidgetId()).toBeNull();
      expect(element.querySelector('[role="dialog"]')).toBeNull();
      expect(component.selectedLevel()).toBe('primaria-baja');
      expect(document.body.classList.contains('no-scroll')).toBe(false);
      expect(document.activeElement).toBe(cover);
    }
  });
});
