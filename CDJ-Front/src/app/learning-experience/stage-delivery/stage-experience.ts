import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ExperienceConditionsComponent } from './experience-conditions';
import { BAND_LABELS, DELIVERY_OPTIONS, DELIVERY_TITLES, PROFILE_LABELS, PROFILE_ROUTES, StageOption, StageProfile, resolveStageDelivery } from './stage-experiences.data';

@Component({
  selector: 'app-stage-experience', standalone: true,
  imports: [RouterLink, ExperienceConditionsComponent],
  templateUrl: './stage-experience.html', styleUrl: './stage-experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StageExperienceComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly slug = toSignal(this.route.paramMap.pipe(map(p => p.get('slug') ?? '')), { initialValue: '' });
  readonly params = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });
  readonly delivery = computed(() => {
    const p = this.params();
    return resolveStageDelivery(this.slug(), p.get('perfil'), p.get('etapa'), p.get('contexto'), p.get('enfoque'));
  });
  readonly title = computed(() => DELIVERY_TITLES[this.slug()] ?? 'Actividad');
  readonly options = computed(() => DELIVERY_OPTIONS[this.slug()] ?? []);
  readonly profiles = PROFILE_LABELS;
  readonly routes = PROFILE_ROUTES;
  readonly bands = BAND_LABELS;
  readonly profileKeys: StageProfile[] = ['kids', 'teens', 'families', 'teachers'];
  readonly profileDescriptions: Record<StageProfile, string> = {
    kids: 'Resolver el caso con acompañamiento.',
    teens: 'Analizar la situación y tomar una decisión.',
    families: 'Conversar en familia y acompañar las decisiones.',
    teachers: 'Preparar el caso y trabajarlo con el grupo.',
  };
  readonly first = signal<number | null>(null);
  readonly second = signal<number | null>(null);
  readonly practice = signal<number | null>(null);
  readonly finished = signal(false);
  readonly step = signal(0);
  readonly direction = signal<'forward' | 'backward'>('forward');
  readonly pinnedGuides = signal<number[]>([]);
  readonly previewedGuide = signal<number | null>(null);
  readonly moments = ['Antes', 'Durante', 'Al cerrar'];
  readonly momentIcons = ['menu_book', 'forum', 'check_circle'];
  readonly adult = computed(() => ['families', 'teachers'].includes(this.delivery()?.option.profile ?? ''));
  readonly guide = computed(() => (this.delivery()?.option.profile === 'teachers'
    ? this.delivery()?.lesson.teacher : this.delivery()?.lesson.family) ?? []);
  readonly question = computed(() => this.step() === 0 ? this.delivery()?.lesson.first
    : this.step() === 1 ? this.delivery()?.lesson.second : null);
  readonly selected = computed(() => this.step() === 0 ? this.first() : this.second());
  readonly feedback = computed(() => {
    const choice = this.selected();
    return choice === null ? '' : this.question()?.choices[choice]?.feedback ?? '';
  });
  readonly canFinish = computed(() => this.first() !== null && this.second() !== null && this.practice() !== null);
  readonly related = computed(() => {
    const d = this.delivery();
    return d ? this.options().filter(o => o.profile !== d.option.profile && (o.band === d.option.band || o.alternativeBand === d.option.band)) : [];
  });
  readonly banner = computed(() => {
    const profile = this.delivery()?.option.profile;
    const key = profile ?? (this.slug() === 'fomo' ? 'teens' : this.slug() === 'roblox-seguridad' ? 'families' : 'screens');
    const banners: Record<string, { src: string; bg: string; alt: string }> = {
      kids: { src: '/banners/CD_NinasYNinos.jpg', bg: '#8f489d', alt: 'Personajes de la sección Niñas y niños de Ciudadanía Digital.' },
      teens: { src: '/banners/CD_Adolescentes.jpg', bg: '#07663d', alt: 'Jóvenes de la sección Adolescentes de Ciudadanía Digital.' },
      families: { src: '/banners/CD_Familias.jpg', bg: '#e90e4c', alt: 'Una familia comparte una actividad con una computadora.' },
      teachers: { src: '/banners/CD_Docentes.jpg', bg: '#f58423', alt: 'Docentes de Ciudadanía Digital acompañan el aprendizaje.' },
      screens: { src: '/banners/CD_PantallasSeguras.jpg', bg: '#022f53', alt: 'Una familia acompañada en el uso de entornos digitales.' },
    };
    return banners[key];
  });
  readonly chooserIntro = computed(() => this.slug() === 'fomo'
    ? 'La presión por estar siempre disponible también se puede conversar.'
    : this.slug() === 'roblox-seguridad'
      ? 'Premios, mensajes y compras: hay decisiones que conviene revisar juntos.'
      : 'Una solicitud parece amable, pero pide información personal. ¿Qué conviene hacer?');

  constructor() {
    effect(() => {
      this.slug(); this.params();
      this.resetState();
      this.pinnedGuides.set([]); this.previewedGuide.set(null);
    });
  }
  optionsFor(profile: StageProfile) { return this.options().filter(o => o.profile === profile); }
  select(option: StageOption) {
    return { perfil: option.profile, etapa: option.stage, contexto: option.profile === 'teachers' ? 'escuela' : 'casa' };
  }
  relatedParams(option: StageOption) { return { ...this.select(option), enfoque: this.delivery()?.option.band }; }
  change(key: 'contexto' | 'enfoque', value: string) {
    void this.router.navigate([], { relativeTo: this.route, queryParams: { [key]: value }, queryParamsHandling: 'merge' });
  }
  choose(index: number) {
    if (!Number.isInteger(index) || !this.question()?.choices[index]) return;
    if (this.step() === 0) this.first.set(index); else if (this.step() === 1) this.second.set(index);
    this.finished.set(false);
  }
  choosePractice(index: number) {
    if (!Number.isInteger(index) || !this.delivery()?.lesson.practice[index]) return;
    this.practice.set(index); this.finished.set(false);
  }
  next() {
    if (this.step() >= 2 || this.selected() === null) return;
    this.moveTo(this.step() + 1);
  }
  previous() { if (this.step() > 0) this.moveTo(this.step() - 1); }
  private moveTo(nextStep: number) {
    this.direction.set(nextStep > this.step() ? 'forward' : 'backward');
    this.step.set(nextStep);
    this.focusStep();
  }
  private focusStep() {
    // The new keyed panel must exist before moving focus. Never advance on a radio change.
    setTimeout(() => {
      const target = document.querySelector<HTMLElement>('#case-flow .step-heading');
      target?.focus({ preventScroll: true });
      document.getElementById('case-flow')?.scrollIntoView({ block: 'start', behavior: 'instant' });
    }, 0);
  }
  private resetState() {
    this.first.set(null); this.second.set(null); this.practice.set(null);
    this.finished.set(false); this.step.set(0); this.direction.set('forward');
  }
  restart() { this.resetState(); this.focusStep(); }
  finish() { if (this.canFinish()) this.finished.set(true); }
  print() { window.print(); }
  guideOpen(index: number) { return this.pinnedGuides().includes(index) || this.previewedGuide() === index; }
  previewGuide(index: number) {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) this.previewedGuide.set(index);
  }
  endPreview() { this.previewedGuide.set(null); }
  toggleGuide(index: number) {
    this.previewedGuide.set(null);
    this.pinnedGuides.update(open => open.includes(index) ? open.filter(i => i !== index) : [...open, index]);
  }
}
