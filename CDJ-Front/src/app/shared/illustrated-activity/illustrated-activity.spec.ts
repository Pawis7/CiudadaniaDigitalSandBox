import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IllustratedActivityComponent } from './illustrated-activity';
import { IllustratedActivityConfig } from './illustrated-activity.models';

const ACTIVITY: IllustratedActivityConfig = {
  id: 'decision-story',
  title: 'Una historia para pensar',
  ageLabel: '9 a 11 años',
  intro: 'Observa antes de decidir.',
  cover: { src: '/cover.webp', alt: 'Amigos observando un cartel' },
  scenes: [
    {
      id: 'first',
      title: 'Una decisión',
      image: { src: '/first.webp', alt: 'Una niña observa una pantalla' },
      paragraphs: ['La niña necesita decidir qué hacer.'],
      prompt: '¿Qué le propones?',
      choices: [
        {
          id: 'rush',
          label: 'Actuar de inmediato',
          feedback: 'Nos falta información para decidir.',
          correct: false,
        },
        {
          id: 'pause',
          label: 'Detenerse y preguntar',
          feedback: 'Preguntar ayuda a entender.',
          correct: true,
        },
      ],
      takeaway: 'Podemos hacer una pausa.',
    },
    {
      id: 'clues',
      title: 'Miremos más de cerca',
      image: { src: '/clues.webp', alt: 'Dos pistas sobre una mesa' },
      paragraphs: ['Hay dos pistas que pueden ayudarnos.'],
      prompt: '¿Qué sabes ahora?',
      evidence: [
        { id: 'date', label: 'La fecha', text: 'El aviso es del año pasado.' },
        { id: 'source', label: 'La fuente', text: 'La escuela publicó información nueva.' },
      ],
      requiredEvidenceIds: ['date', 'source'],
      choices: [
        {
          id: 'verify',
          label: 'Consultar el aviso de la escuela',
          feedback: 'Usaste las dos pistas.',
          correct: true,
        },
        {
          id: 'share',
          label: 'Compartir sin revisar',
          feedback: 'El aviso puede estar desactualizado.',
          correct: false,
        },
      ],
      takeaway: 'Verifico antes de compartir.',
    },
  ],
  ending: {
    title: '¡Lo pensaste con calma!',
    message: 'Encontraste información para decidir.',
    rule: 'Primero observo, después decido.',
    image: { src: '/ending.webp', alt: 'Los amigos celebran juntos' },
  },
};

describe('IllustratedActivityComponent', () => {
  let fixture: ComponentFixture<IllustratedActivityComponent>;
  let component: IllustratedActivityComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IllustratedActivityComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(IllustratedActivityComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('activity', ACTIVITY);
    fixture.detectChanges();
    element = fixture.nativeElement;
  });

  function reachSecondScene(): void {
    component.start();
    component.choose('pause');
    component.next();
    fixture.detectChanges();
  }

  function completeActivity(): void {
    reachSecondScene();
    component.toggleEvidence('date');
    component.toggleEvidence('source');
    component.choose('verify');
    component.next();
    fixture.detectChanges();
  }

  it('starts on the illustrated cover without audio and blocks unanswered scenes and future shortcuts', () => {
    expect(element.querySelector('h1')?.textContent).toContain(ACTIVITY.title);
    expect(element.querySelector('.picture-page img')).toBeTruthy();
    expect(component.isSpeaking()).toBe(false);
    component.start();
    component.next();
    component.goToScene(1);
    fixture.detectChanges();
    expect(component.page()).toBe(0);
    expect(element.querySelectorAll<HTMLButtonElement>('.scene-tab')[1].disabled).toBe(true);
    expect(
      element.querySelector<HTMLButtonElement>('.book-footer > button:last-child')?.disabled,
    ).toBe(true);
  });

  it('explains an incorrect choice, allows retry, and unlocks progress only after the correct decision', () => {
    component.start();
    fixture.detectChanges();
    element.querySelectorAll<HTMLButtonElement>('.choice-button')[0].click();
    fixture.detectChanges();
    expect(element.querySelector('.choice-feedback')?.textContent).toContain(
      'Nos falta información',
    );
    expect(component.solvedCount()).toBe(0);
    component.next();
    expect(component.page()).toBe(0);
    element.querySelector<HTMLButtonElement>('.choice-feedback button')!.click();
    fixture.detectChanges();
    element.querySelectorAll<HTMLButtonElement>('.choice-button')[1].click();
    fixture.detectChanges();
    expect(component.solvedCount()).toBe(1);
    expect(element.querySelector('.takeaway')?.textContent).toContain('Podemos hacer una pausa');
    component.next();
    expect(component.page()).toBe(1);
  });

  it('requires opening every required clue before evaluating, and remembers a clue after it is collapsed', () => {
    reachSecondScene();
    component.choose('verify');
    expect(component.selectedChoice()).toBeNull();
    const clueButtons = element.querySelectorAll<HTMLButtonElement>('.evidence-tab');
    clueButtons[0].click();
    fixture.detectChanges();
    expect(clueButtons[0].getAttribute('aria-expanded')).toBe('true');
    expect(element.querySelector('.evidence-copy')?.hasAttribute('hidden')).toBe(false);
    expect(component.canChoose()).toBe(false);
    clueButtons[1].click();
    clueButtons[0].click();
    fixture.detectChanges();
    expect(component.isEvidenceOpen('date')).toBe(false);
    expect(component.isEvidenceReviewed('date')).toBe(true);
    expect(component.canChoose()).toBe(true);
    component.choose('verify');
    component.next();
    expect(component.atEnding()).toBe(true);
  });

  it('preserves resolved scenes when going back, while restart clears decisions, clues, and progress', () => {
    completeActivity();
    component.previous();
    expect(component.sceneSolved()).toBe(true);
    component.goToScene(0);
    expect(component.selectedChoice()?.id).toBe('pause');
    expect(component.solvedCount()).toBe(2);
    component.restart();
    fixture.detectChanges();
    expect(component.atCover()).toBe(true);
    expect(component.solvedCount()).toBe(0);
    expect(component.selections()).toEqual({});
    expect(component.reviewedEvidence()).toEqual({});
    expect(component.expandedEvidence()).toEqual({});
    expect(component.canVisitScene(1)).toBe(false);
  });

  it('shows the illustrated ending and connects its restart and close controls', () => {
    let closed = 0;
    component.closeRequested.subscribe(() => closed++);
    completeActivity();
    expect(element.querySelector('.picture-page--ending img')?.getAttribute('src')).toBe(
      '/ending.webp',
    );
    expect(element.querySelector('.ending-rule')?.textContent).toContain(ACTIVITY.ending.rule);
    element.querySelectorAll<HTMLButtonElement>('.ending-actions button')[1].click();
    expect(closed).toBe(1);
    element.querySelectorAll<HTMLButtonElement>('.ending-actions button')[0].click();
    expect(component.atCover()).toBe(true);
    expect(component.isSpeaking()).toBe(false);
  });
});
