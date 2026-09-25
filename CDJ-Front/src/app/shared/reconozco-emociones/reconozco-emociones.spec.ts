import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReconozcoEmocionesComponent } from './reconozco-emociones';

describe('ReconozcoEmocionesComponent', () => {
  let fixture: ComponentFixture<ReconozcoEmocionesComponent>;
  let component: ReconozcoEmocionesComponent;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReconozcoEmocionesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReconozcoEmocionesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.audioOn.set(false);
    component.startGame();
  });

  const choose = (index: number) => {
    element.querySelectorAll<HTMLButtonElement>('.re-option-btn')[index].click();
    fixture.detectChanges();
  };

  it('shows tiredness until the child chooses to turn off the tablet, then shows the calmer outcome', () => {
    component.currentSceneIndex.set(6);
    fixture.detectChanges();

    expect(element.querySelector('.bit-character')?.getAttribute('data-emotion')).toBe('cansancio');
    expect(element.querySelector('.re-emotion-tag')?.textContent).toBe('Bit');
    expect(element.querySelector('.re-situation-text')?.textContent).toContain('está cansado');

    choose(1);
    expect(element.querySelector('.bit-character')?.getAttribute('data-emotion')).toBe('cansancio');
    expect(element.querySelector('.re-emotion-tag')?.textContent).toBe('Bit');

    choose(0);
    expect(element.querySelector('.bit-character')?.getAttribute('data-emotion')).toBe('calma');
    expect(element.querySelector('.re-emotion-tag')?.textContent).toBe('Calma');
    expect(element.querySelector('.re-situation-text')?.textContent).toContain('apaga la tableta');
  });

  it('shows reassurance after asking for help and resets the expression and label in the next scene', () => {
    component.currentSceneIndex.set(4);
    fixture.detectChanges();

    expect(element.querySelector('.bit-character')?.getAttribute('data-emotion')).toBe('duda');
    choose(0);
    expect(element.querySelector('.bit-character')?.getAttribute('data-emotion')).toBe('calma');
    expect(element.querySelector('.re-situation-text')?.textContent).toContain('pide ayuda');

    element.querySelector<HTMLButtonElement>('.re-btn-next')?.click();
    fixture.detectChanges();

    expect(element.querySelector('.bit-character')?.getAttribute('data-emotion')).toBe('cansancio');
    expect(element.querySelector('.re-emotion-tag')?.textContent).toBe('Bit');
    expect(element.querySelector('.re-situation-text')?.textContent).toContain(
      'ojitos están cansados',
    );
    expect(component.isCorrect()).toBeNull();
  });
});
