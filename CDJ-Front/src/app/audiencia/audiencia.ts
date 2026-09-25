import { isStageExperience, resolveStageDelivery } from '../learning-experience/stage-delivery/stage-experiences.data';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  effect,
  HostListener,
  inject,
  OnDestroy,
  signal,
  Type,
  untracked,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AUDIENCE_PAGES, LevelResource } from '../core/data/page-content';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { AudienceSlug } from '../core/models/content.models';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';
import { AUDIENCE_CONFIG } from './audiencia-config';
import { WIDGET_REGISTRY, WidgetId } from './widget-registry';
import { ResourceCardComponent } from '../shared/resource-card/resource-card';
import { AdultStoryCollectionComponent } from '../shared/adult-story-collection/adult-story-collection';
import { adultStoryGroupsFor } from '../core/data/adult-story-catalog';
import { PROFILE_LEARNING, PROFILE_QUERY } from './profile-activities.data';
import { guidanceFor } from './profile-guidance.data';
import { getExperience } from '../learning-experience/learning-experience.data';
import {
  FAMILIES_MISSIONS,
  TEACHERS_MISSIONS,
  TEACHERS_BOOKS,
  CASI_POSTCARDS,
} from '../core/data/audience-extensions.data';
import {
  availableAdultDownloads,
  featuredVideoActivityFor,
  featuredVideosFor,
  FeaturedVideo,
  FeaturedVideoAudience,
  FeaturedVideoStage,
} from '../core/data/featured-videos.data';
import { VideoModalComponent, VideoModalData } from '../shared/video-modal/video-modal';

const FEATURED_AUDIENCES: FeaturedVideoAudience[] = ['teens', 'families', 'teachers'];
const FEATURED_STAGES: FeaturedVideoStage[] = [
  'secundaria',
  'preparatoria',
  'fam-0-5',
  'fam-12-14',
  'fam-15-17',
  'fam-18-22',
  'doc-pre',
  'doc-sec',
  'doc-prep',
];

@Component({
  selector: 'app-audiencia',
  standalone: true,
  imports: [
    CommonModule,
    NgComponentOutlet,
    RouterLink,
    RevealDirective,
    ImageLoaderDirective,
    ResourceCardComponent,
    AdultStoryCollectionComponent,
    VideoModalComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audiencia.html',
  styleUrl: './audiencia.css',
})
export class AudienciaComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private previouslyFocusedElement: HTMLElement | null = null;

  @ViewChild('widgetDialog') private widgetDialog?: ElementRef<HTMLElement>;

  slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), { initialValue: '' });
  fragment = toSignal(this.route.fragment);
  requestedStoryId = toSignal(
    this.route.queryParamMap.pipe(map((params) => params.get('acompanar'))),
  );
  page = computed(() => AUDIENCE_PAGES.find((a) => a.slug === this.slug()));
  config = computed(() => AUDIENCE_CONFIG[this.slug()] ?? null);
  audienceTheme = computed<AudienceSlug>(() => this.config()?.theme ?? 'cdj');
  profileLearning = computed(() => PROFILE_LEARNING[this.audienceTheme()] ?? null);
  profileQuery = computed(() => PROFILE_QUERY[this.audienceTheme()] ?? 'teens');
  selectedLevel = signal<string>('');
  activeWidgetId = signal<WidgetId | null>(null);
  activeVideo = signal<VideoModalData | null>(null);
  activeWidgetTitle = signal('Actividad interactiva');
  openGuidance = signal<number | null>(null);
  adultStoryGroups = computed(() =>
    adultStoryGroupsFor(this.audienceTheme(), this.selectedLevel()),
  );

  // Extensiones oficiales de producción, filtradas por la etapa seleccionada.
  familiesMissions = computed(() =>
    FAMILIES_MISSIONS.filter((mission) => mission.levels.includes(this.selectedLevel())),
  );
  teachersMissions = computed(() =>
    TEACHERS_MISSIONS.filter((mission) => mission.levels.includes(this.selectedLevel())),
  );
  teachersBooks = TEACHERS_BOOKS;
  interactivePostcards = computed(() => {
    if (this.audienceTheme() !== 'kids') return [];
    const allowedIds: Record<string, number[]> = {
      'primaria-baja': [2, 3, 4, 5, 7],
      'primaria-alta': CASI_POSTCARDS.map((postcard) => postcard.id),
    };
    const ids = allowedIds[this.selectedLevel()] ?? [];
    return CASI_POSTCARDS.filter((postcard) => ids.includes(postcard.id));
  });
  // Estados comprimibles
  isBooksOpen = signal<boolean>(false);
  isPostcardsOpen = signal<boolean>(false);

  toggleBooks() {
    this.isBooksOpen.update((v) => !v);
  }
  togglePostcards() {
    this.isPostcardsOpen.update((v) => !v);
  }

  guidance = computed(() => guidanceFor(this.audienceTheme(), this.selectedLevel()));

  filteredLearning = computed(() => {
    const block = this.profileLearning();
    if (!block) return null;
    const level = this.selectedLevel();
    const activities = block.activities.filter((activity) => activity.levels.includes(level));
    return {
      ...block,
      activities,
    };
  });

  featuredVideoCards = computed(() => {
    const currentAudience = this.audienceTheme();
    const currentStage = this.selectedLevel();
    if (
      !FEATURED_AUDIENCES.includes(currentAudience as FeaturedVideoAudience) ||
      !FEATURED_STAGES.includes(currentStage as FeaturedVideoStage)
    )
      return [];

    const audience = currentAudience as FeaturedVideoAudience;
    const stage = currentStage as FeaturedVideoStage;
    return featuredVideosFor(audience, stage).flatMap((video) => {
      const activity = featuredVideoActivityFor(video, audience, stage);
      if (!activity) return [];
      const downloads =
        audience === 'families' || audience === 'teachers'
          ? availableAdultDownloads(video, audience).filter((download) =>
              download.stages.includes(stage),
            )
          : [];
      return [{ video, activity, downloads }];
    });
  });

  featuredVideoDownloads = computed(() =>
    this.featuredVideoCards().flatMap((card) => card.downloads),
  );

  showCasi = computed(() => {
    const theme = this.audienceTheme();
    const level = this.selectedLevel();
    if (theme === 'kids') return level === 'primaria-baja' || level === 'primaria-alta';
    if (theme === 'families') return level === 'fam-6-11';
    if (theme === 'teachers') return ['doc-pb', 'doc-pa', 'doc-sec', 'doc-prep'].includes(level);
    return false;
  });
  casiProfile = computed(() =>
    this.audienceTheme() === 'families'
      ? 'families'
      : this.audienceTheme() === 'teachers'
        ? 'teachers'
        : this.selectedLevel() === 'primaria-alta'
          ? 'pa'
          : 'pb',
  );
  casiCopy = computed(() => {
    if (this.audienceTheme() === 'families')
      return {
        k: 'Historia para conversar',
        t: 'El día que casi… en familia',
        d: 'Historia para conversar con niñas y niños de 9 a 11 años. Acompaña la visualización y cierren con un acuerdo posible.',
      };
    if (this.audienceTheme() === 'teachers')
      return {
        k: 'Historia para analizar',
        t: 'El día que casi… en el aula',
        d: 'Usa un episodio como detonador para analizar decisiones y construir un cierre con el grupo.',
      };
    if (this.selectedLevel() === 'primaria-alta')
      return {
        k: 'Historia',
        t: 'El día que casi…',
        d: 'Identifica el momento en que todavía puedes detenerte, revisar una señal y cambiar una decisión.',
      };
    return {
      k: 'Historia · En compañía',
      t: 'El día que casi…',
      d: 'Reconoce cuándo algo no se siente bien y practica qué hacer y cuándo pedir ayuda.',
    };
  });

  casiThumb = computed(() => {
    const prof = this.casiProfile();
    const vidMap: Record<string, string> = {
      pb: 'EmXJWNeYQZs',
      pa: '0VnGrnTfgDU',
      families: 'CtTLuyLp7vg',
      teachers: 'pEmFgQjDZ1g',
    };
    const vid = vidMap[prof] ?? 'pEmFgQjDZ1g';
    return `https://img.youtube.com/vi/${vid}/hqdefault.jpg`;
  });

  isStageActivity = isStageExperience;

  activityParams() {
    const p = this.route.snapshot.queryParamMap;
    return { perfil: this.profileQuery(), etapa: this.selectedLevel(), contexto: p.get('contexto') ?? (this.audienceTheme() === 'teachers' ? 'escuela' : 'casa'), enfoque: p.get('enfoque') };
  }

  getActivityThumb(slug: string): string {
    if (isStageExperience(slug)) return '';
    const exp = getExperience(slug);
    if (exp?.videoId) {
      return `https://img.youtube.com/vi/${exp.videoId}/hqdefault.jpg`;
    }
    return '';
  }

  getActivityDuration(slug: string): string {
    const params = this.activityParams();
    const delivered = resolveStageDelivery(slug, params.perfil, params.etapa, params.contexto, params.enfoque);
    if (delivered) return delivered.lesson.duration;
    const exp = getExperience(slug);
    return exp?.duration ?? '';
  }

  onVideoThumbError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img && !img.src.includes('edutips.webp')) {
      img.src = '/portadas/edutips.webp';
    }
  }

  openVideo(video: FeaturedVideo): void {
    this.activeVideo.set({
      youtubeUrl: video.youtubeUrl,
      title: video.title,
      description: video.description,
      durationLabel: video.durationLabel,
      seriesTitle: video.collection,
      author: video.institution,
    });
  }

  constructor() {
    effect(() => {
      const cfg = this.config(),
        frag = this.fragment(),
        requestedId = this.requestedStoryId();
      untracked(() => {
        const p = this.page();
        const valid = frag && p && p.subLevels.some((s) => s.id === frag);
        const level = valid ? frag : (cfg?.defaultLevel ?? '');
        this.selectedLevel.set(level);
        this.openGuidance.set(null);
        const hasRequested = adultStoryGroupsFor(cfg?.theme ?? 'cdj', level).some((group) =>
          group.entries.some((entry) => entry.resource.id === requestedId),
        );
        if (valid)
          setTimeout(
            () =>
              this.scrollToAnchor(hasRequested ? 'acompanar-' + requestedId : 'contenido-etapa'),
            120,
          );
      });
    });
    effect(() => {
      this.selectedLevel();
      untracked(() => {
        this.openGuidance.set(null);
        this.closeWidgetModal();
        this.activeVideo.set(null);
      });
    });
  }

  activeSubLevel = computed(
    () => this.page()?.subLevels.find((s) => s.id === this.selectedLevel()) ?? null,
  );
  getActiveLevelName = computed(() => this.activeSubLevel()?.title ?? '');
  levelResources = computed(() => {
    let r = this.activeSubLevel()?.levelResources ?? [];
    if (this.selectedLevel() === 'secundaria') r = r.filter((x) => x.id !== 'app-no-se-acaba');
    return r;
  });

  activeWidget = computed<Type<unknown> | null>(() => {
    const id = this.activeWidgetId();
    return id ? (WIDGET_REGISTRY[id] ?? null) : null;
  });

  isPhoneWidget = computed(() => {
    const id = this.activeWidgetId();
    return (
      !!id &&
      [
        'fraud-simulator',
        'peer-pressure',
        'sticker-control',
        'el-carino-no-pide-contrasenas',
        'chat-en-llamas',
        'la-voz-en-el-squad',
        'no-lo-hagas-viral',
        'perfil-fantasma',
        'monedas-gratis',
        'jugada-problema',
        'el-servidor-de-discor',
        'el-mercado-gamer',
        'el-mundo-privado',
        'quien-entra-mi-mundo',
        'bit-data-mensaje-gris',
        'luna-cajita-importante',
        'bit-foto-otra-vez',
      ].includes(id)
    );
  });

  isFullscreenWidget = computed(() => {
    const id = this.activeWidgetId();
    return (
      !!id &&
      [
        'el-servidor-de-discor',
        'el-mundo-privado',
        'el-mercado-gamer',
        'quien-entra-mi-mundo',
        'monedas-gratis',
        'jugada-problema',
      ].includes(id)
    );
  });

  isBookWidget = computed(() => {
    const id = this.activeWidgetId();
    return (
      !!id &&
      [
        'bit-data-mensaje-gris',
        'bit-hojas',
        'bit-plan-casa',
        'bit-rotonda',
        'luna-cajita-importante',
        'detectives-pistas',
        'mural-buenas-ideas',
        'castillo-cambio',
        'mision-puede-esperar',
        'bit-foto-otra-vez',
        'bit-puente-por-terminar',
        'bit-ventana-inesperada',
        'bit-boton-brillante',
        'bit-cartel-clase',
      ].includes(id)
    );
  });

  toggleGuidance(i: number) {
    this.openGuidance.set(this.openGuidance() === i ? null : i);
  }
  scrollToAnchor(id: string) {
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document
      .getElementById(id)
      ?.scrollIntoView?.({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }
  selectLevelAndScroll(id: string) {
    if (this.selectedLevel() === id) this.scrollToAnchor('contenido-etapa');
    else this.router.navigate([], { fragment: id, relativeTo: this.route, replaceUrl: true });
  }

  onResourceActionClicked(item: LevelResource) {
    const m: Record<string, WidgetId> = {
      'simulador-fraudes': 'fraud-simulator',
      'candado-rapido': 'candado-rapido',
      'presion-pares': 'peer-pressure',
      'limites-chats': 'limites-chats',
      'presencia-adulta': 'adult-presence',
      'riesgos-reales': 'riesgos-reales',
      'presencia-jovenes': 'presencia-jovenes',
      'privacidad-dinero': 'privacidad-dinero',
      'sticker-control': 'sticker-control',
      'app-no-se-acaba': 'app-no-se-acaba',
      'el-carino-no-pide-contrasenas': 'el-carino-no-pide-contrasenas',
      'chat-en-llamas': 'chat-en-llamas',
      'la-voz-en-el-squad': 'la-voz-en-el-squad',
      'no-lo-hagas-viral': 'no-lo-hagas-viral',
      'perfil-fantasma': 'perfil-fantasma',
      'monedas-gratis': 'monedas-gratis',
      'jugada-problema': 'jugada-problema',
      'reconozco-emociones': 'reconozco-emociones',
      'bit-data-mensaje-gris': 'bit-data-mensaje-gris',
      'bit-hojas': 'bit-hojas',
      'bit-plan-casa': 'bit-plan-casa',
      'bit-rotonda': 'bit-rotonda',
      'luna-cajita-importante': 'luna-cajita-importante',
      'detectives-pistas': 'detectives-pistas',
      'mural-buenas-ideas': 'mural-buenas-ideas',
      'castillo-cambio': 'castillo-cambio',
      'mision-puede-esperar': 'mision-puede-esperar',
      'bit-foto-otra-vez': 'bit-foto-otra-vez',
      'el-servidor-de-discor': 'el-servidor-de-discor',
      'el-mercado-gamer': 'el-mercado-gamer',
      'el-mundo-privado': 'el-mundo-privado',
      'cuando-hijo-mundo-privado': 'cuando-hijo-mundo-privado',
      'quien-entra-mi-mundo': 'quien-entra-mi-mundo',
      'bit-puente-por-terminar': 'bit-puente-por-terminar',
      'bit-ventana-inesperada': 'bit-ventana-inesperada',
      'bit-boton-brillante': 'bit-boton-brillante',
      'bit-cartel-clase': 'bit-cartel-clase',
    };
    const w = m[item.id];
    if (w) {
      this.previouslyFocusedElement =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      this.activeWidgetTitle.set(item.title);
      this.activeWidgetId.set(w);
      document.body.classList.add('no-scroll');
      setTimeout(() => {
        this.widgetDialog?.nativeElement
          .querySelector<HTMLElement>('button[aria-label="Cerrar"]')
          ?.focus();
      });
    }
  }

  closeWidgetModal() {
    const focusTarget = this.previouslyFocusedElement;
    this.activeWidgetId.set(null);
    this.activeWidgetTitle.set('Actividad interactiva');
    document.body.classList.remove('no-scroll');
    this.previouslyFocusedElement = null;
    setTimeout(() => focusTarget?.focus());
  }

  onAudiobookCloseRequested(event: Event) {
    event.preventDefault();
    this.closeWidgetModal();
  }

  @HostListener('document:keydown.escape')
  onEscKey() {
    if (this.activeWidgetId()) this.closeWidgetModal();
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTabKey(event: Event) {
    const keyEvent = event as KeyboardEvent;
    const dialog = this.widgetDialog?.nativeElement;
    if (!dialog || !this.activeWidgetId()) return;

    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute('hidden') && element.offsetParent !== null);

    if (!focusable.length) {
      event.preventDefault();
      dialog.focus();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = document.activeElement;

    if (keyEvent.shiftKey && (current === first || !dialog.contains(current))) {
      event.preventDefault();
      last.focus();
    } else if (!keyEvent.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('no-scroll');
  }
}
