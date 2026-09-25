import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IllustratedAudiobookComponent } from './illustrated-audiobook';
import { IllustratedAudiobookConfig } from './illustrated-audiobook.models';

const TEST_BOOK: IllustratedAudiobookConfig = {
  id: 'test-book',
  title: 'Bit aprende con propósito',
  spreads: [
    {
      id: 'cover',
      kind: 'cover',
      lead: 'Un cuento de prueba.',
      leftPage: { src: '/test-cover.webp', alt: 'Bit sostiene unas hojas' },
      pageLabel: 'Portada',
      narration: {
        fallbackSegments: [{ text: 'Bit aprende con propósito.' }],
      },
    },
    {
      id: 'scene-1',
      kind: 'scene',
      title: 'Una escena',
      leftPage: { src: '/test-scene.webp', alt: 'Bit observa una hoja' },
      blocks: [{ text: 'Bit observa con atención.' }],
      pageLabel: 'Escena 1',
      narration: {
        fallbackSegments: [{ text: 'Bit observa con atención.' }],
      },
    },
  ],
  ending: {
    title: 'Cuento terminado',
    subtitle: 'Terminamos la prueba.',
    ruleLabel: 'Mi acuerdo',
    rule: 'Primero pienso para qué usaré el dispositivo.',
  },
};

describe('IllustratedAudiobookComponent', () => {
  let fixture: ComponentFixture<IllustratedAudiobookComponent>;
  let component: IllustratedAudiobookComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IllustratedAudiobookComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IllustratedAudiobookComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('book', TEST_BOOK);
    fixture.detectChanges();
  });

  it('renders a one-illustration cover with a separate text page', () => {
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('h1')?.textContent).toContain(TEST_BOOK.title);
    expect(element.querySelector('.aib-page--text')).toBeTruthy();
    expect(element.querySelectorAll('img')).toHaveLength(1);
  });

  it('moves from the last illustrated spread to the ending', () => {
    component.currentIndex.set(TEST_BOOK.spreads.length - 1);
    component.next();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(component.atEnding()).toBe(true);
    expect(element.querySelector('.aib-ending')?.textContent).toContain(TEST_BOOK.ending.rule);
  });

  it('keeps the illustrated ending controls connected to restart and close', () => {
    const element = fixture.nativeElement as HTMLElement;
    let closed = false;
    component.closeRequested.subscribe(() => {
      closed = true;
    });
    component.goTo(TEST_BOOK.spreads.length);
    fixture.detectChanges();

    element.querySelector<HTMLButtonElement>('.story-ending__restart')!.click();
    fixture.detectChanges();
    expect(component.currentIndex()).toBe(0);
    expect(element.querySelector('h1')?.textContent).toContain(TEST_BOOK.title);

    component.goTo(TEST_BOOK.spreads.length);
    fixture.detectChanges();
    element.querySelector<HTMLButtonElement>('.story-ending__close')!.click();
    expect(closed).toBe(true);
  });

  it('starts continuous playback from the cover', () => {
    component.currentIndex.set(1);

    component.listenContinuously();

    expect(component.currentIndex()).toBe(0);
    expect(component.continuousMode()).toBe(true);
    component.ngOnDestroy();
  });

  it('shows a visible message when narration is unavailable', () => {
    component.narrationState.set('unavailable');
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('[role="status"]')?.textContent).toContain(
      'El audio no está disponible',
    );
  });

  it('reads and closes a reading-only book without audio controls or playback', () => {
    fixture.componentRef.setInput('book', { ...TEST_BOOK, readingOnly: true });
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('.aib-audio-controls')).toBeNull();
    expect(element.querySelector('audio')).toBeNull();

    component.toggleCurrentNarration();
    component.listenContinuously();
    expect(component.narrationState()).toBe('idle');
    expect(component.continuousMode()).toBe(false);

    let closeEvents = 0;
    element.addEventListener('audiobook-close-requested', event => {
      event.preventDefault();
      closeEvents++;
    });
    component.goTo(TEST_BOOK.spreads.length);
    fixture.detectChanges();
    expect(element.querySelector('.aib-sr-only')?.textContent?.trim()).toBe('Fin');
    element.querySelector<HTMLButtonElement>('.aib-nav--next')!.click();
    expect(closeEvents).toBe(1);
  });
});
