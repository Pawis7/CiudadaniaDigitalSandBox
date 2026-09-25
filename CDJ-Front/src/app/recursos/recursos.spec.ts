import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { getExperience } from '../learning-experience/learning-experience.data';
import { RecursosComponent } from './recursos';

describe('Resources filtered for children', () => {
  it('lists the four accompanied lower-primary stories instead of the retired games', async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(RecursosComponent);
    const component = fixture.componentInstance;
    component.changeAudience('kids');
    component.level.set('Primaria baja');
    component.format.set('story');
    fixture.detectChanges();
    const stories = component.results().filter(entry => entry.href === '/p/ninas-y-ninos#primaria-baja');
    expect(stories.map(story => story.title)).toEqual([
      'Bit y el puente por terminar',
      'Bit y la ventana inesperada',
      'Bit y el botón brillante',
      'Bit y el cartel de la clase',
    ]);
    expect(stories.map(story => story.topic)).toEqual(['wellbeing', 'security', 'security', 'create']);
    expect(stories.every(story => story.formatLabel === 'Cuento para leer')).toBe(true);
  });

  it('opens the child version of Uso con intención and preserves other profile entries', async () => {
    await TestBed.configureTestingModule({
      imports: [RecursosComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    const fixture = TestBed.createComponent(RecursosComponent);
    const component = fixture.componentInstance;
    const base = getExperience('uso-con-intencion')!;

    component.changeAudience('kids');
    component.level.set('Primaria baja');
    component.topic.set('create');
    component.query.set('tableta');
    fixture.detectChanges();

    const childEntry = component.results().find(entry => entry.id === 'experiencia-uso-con-intencion');
    expect(childEntry?.title).toBe('¿Para qué vamos a usar la tableta?');
    expect(childEntry?.levels).toEqual(['Primaria baja', 'Primaria alta']);
    expect(childEntry?.audiences).toEqual(['kids']);
    expect(fixture.nativeElement.querySelector('a[href="/actividad/uso-con-intencion?perfil=kids"]')).not.toBeNull();

    for (const audience of ['teens', 'families'] as const) {
      component.reset();
      component.changeAudience(audience);
      fixture.detectChanges();
      const entry = component.results().find(item => item.id === 'experiencia-uso-con-intencion');
      expect(entry?.title).toBe(base.title);
      expect(entry?.queryParams).toBeUndefined();
      expect(fixture.nativeElement.querySelector('a[href="/actividad/uso-con-intencion"]')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('a[href="/actividad/uso-con-intencion?perfil=kids"]')).toBeNull();
    }
  });
});
