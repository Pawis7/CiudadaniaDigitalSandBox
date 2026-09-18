import { ChangeDetectionStrategy, Component, computed, effect, HostListener, inject, signal, Type, untracked } from '@angular/core';
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
import { PROFILE_LEARNING, PROFILE_QUERY } from './profile-activities.data';
import { guidanceFor } from './profile-guidance.data';
import { FlipCardComponent } from '../shared/flip-card/flip-card';
import {
  FAMILIES_MISSIONS,
  TEACHERS_MISSIONS,
  TEACHERS_BOOKS,
  CASI_POSTCARDS
} from '../core/data/audience-extensions.data';

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
    FlipCardComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audiencia.html',
  styleUrl: './audiencia.css'
})
export class AudienciaComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  slug = toSignal(this.route.paramMap.pipe(map(p => p.get('slug') ?? '')), { initialValue: '' });
  fragment = toSignal(this.route.fragment);
  page = computed(() => AUDIENCE_PAGES.find(a => a.slug === this.slug()));
  config = computed(() => AUDIENCE_CONFIG[this.slug()] ?? null);
  audienceTheme = computed<AudienceSlug>(() => this.config()?.theme ?? 'cdj');
  profileLearning = computed(() => PROFILE_LEARNING[this.audienceTheme()] ?? null);
  profileQuery = computed(() => PROFILE_QUERY[this.audienceTheme()] ?? 'teens');
  selectedLevel = signal<string>('');
  activeWidgetId = signal<WidgetId | null>(null);
  openGuidance = signal<number | null>(null);

  // Extensiones oficiales de producción
  familiesMissions = FAMILIES_MISSIONS;
  teachersMissions = TEACHERS_MISSIONS;
  teachersBooks = TEACHERS_BOOKS;
  casiPostcards = CASI_POSTCARDS;

  // Estados comprimibles
  isBooksOpen = signal<boolean>(false);
  isPostcardsOpen = signal<boolean>(false);
  isDownloadsOpen = signal<boolean>(false);

  toggleBooks() { this.isBooksOpen.update(v => !v); }
  togglePostcards() { this.isPostcardsOpen.update(v => !v); }
  toggleDownloads() { this.isDownloadsOpen.update(v => !v); }

  guidance = computed(() => guidanceFor(this.audienceTheme(), this.selectedLevel()));
  showEduTips = computed(() => !(this.audienceTheme() === 'kids' && this.selectedLevel() === 'preescolar'));

  filteredLearning = computed(() => {
    const block = this.profileLearning();
    if (!block) return null;
    if (this.audienceTheme() !== 'kids') return block;
    const level = this.selectedLevel();
    const activities = block.activities.filter(a =>
      level === 'primaria-alta'
        ? a.kicker.toLowerCase().includes('primaria alta') || a.kicker.toLowerCase().includes('primaria ·')
        : level === 'primaria-baja'
        ? a.kicker.toLowerCase().includes('primaria ·') || a.kicker.toLowerCase().includes('primaria baja')
        : false
    );
    return {
      ...block,
      title: level === 'primaria-alta' ? 'Refuerza lo aprendido' : 'Sigue practicando',
      description: 'Actividades breves que parten de una situación y usan el EduTip como complemento al final.',
      activities
    };
  });

  showCasi = computed(() => ['kids', 'families', 'teachers'].includes(this.audienceTheme()) && !(this.audienceTheme() === 'kids' && this.selectedLevel() === 'preescolar'));
  casiProfile = computed(() => this.audienceTheme() === 'families' ? 'families' : this.audienceTheme() === 'teachers' ? 'teachers' : this.selectedLevel() === 'primaria-alta' ? 'pa' : 'pb');
  casiCopy = computed(() => {
    if (this.audienceTheme() === 'families') return { k: 'Historia para conversar', t: 'El día que casi… en familia', d: 'Miren una historia, escuchen primero qué piensan y cierren con un acuerdo posible.' };
    if (this.audienceTheme() === 'teachers') return { k: 'Historia para analizar', t: 'El día que casi… en el aula', d: 'Usa un episodio como detonador para analizar decisiones y construir un cierre con el grupo.' };
    if (this.selectedLevel() === 'primaria-alta') return { k: 'Historia', t: 'El día que casi…', d: 'Identifica el momento en que todavía puedes detenerte, revisar una señal y cambiar una decisión.' };
    return { k: 'Historia · En compañía', t: 'El día que casi…', d: 'Reconoce cuándo algo no se siente bien y practica qué hacer y cuándo pedir ayuda.' };
  });

  constructor() {
    effect(() => {
      const cfg = this.config(), frag = this.fragment();
      untracked(() => {
        const p = this.page();
        const valid = frag && p && p.subLevels.some(s => s.id === frag);
        this.selectedLevel.set(valid ? frag : (cfg?.defaultLevel ?? ''));
        this.openGuidance.set(null);
        if (valid) setTimeout(() => this.scrollToAnchor('contenido-etapa'), 120);
      });
    });
    effect(() => {
      this.selectedLevel();
      untracked(() => {
        this.openGuidance.set(null);
        this.closeWidgetModal();
      });
    });
  }

  activeSubLevel = computed(() => this.page()?.subLevels.find(s => s.id === this.selectedLevel()) ?? null);
  getActiveLevelName = computed(() => this.activeSubLevel()?.title ?? '');
  levelResources = computed(() => {
    let r = this.activeSubLevel()?.levelResources ?? [];
    if (this.selectedLevel() === 'secundaria') r = r.filter(x => x.id !== 'app-no-se-acaba');
    return r;
  });

  activeWidget = computed<Type<unknown> | null>(() => {
    const id = this.activeWidgetId();
    return id ? (WIDGET_REGISTRY[id] ?? null) : null;
  });

  isPhoneWidget = computed(() => {
    const id = this.activeWidgetId();
    return !!id && [
      'fraud-simulator', 'peer-pressure', 'sticker-control', 'el-carino-no-pide-contrasenas',
      'chat-en-llamas', 'la-voz-en-el-squad', 'no-lo-hagas-viral', 'perfil-fantasma',
      'monedas-gratis', 'jugada-problema', 'el-servidor-de-discor', 'el-mercado-gamer',
      'el-mundo-privado', 'quien-entra-mi-mundo', 'bit-data-mensaje-gris', 'luna-cajita-importante', 'bit-foto-otra-vez'
    ].includes(id);
  });

  isFullscreenWidget = computed(() => {
    const id = this.activeWidgetId();
    return !!id && ['el-servidor-de-discor', 'el-mundo-privado', 'el-mercado-gamer', 'quien-entra-mi-mundo', 'monedas-gratis', 'jugada-problema'].includes(id);
  });

  isBookWidget = computed(() => {
    const id = this.activeWidgetId();
    return !!id && ['bit-data-mensaje-gris', 'luna-cajita-importante', 'bit-foto-otra-vez'].includes(id);
  });

  toggleGuidance(i: number) { this.openGuidance.set(this.openGuidance() === i ? null : i); }
  scrollToAnchor(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  selectLevelAndScroll(id: string) {
    if (this.selectedLevel() === id) this.scrollToAnchor('contenido-etapa');
    else this.router.navigate([], { fragment: id, relativeTo: this.route, replaceUrl: true });
  }

  onResourceActionClicked(item: LevelResource) {
    const m: Record<string, WidgetId> = {
      'simulador-fraudes': 'fraud-simulator', 'candado-rapido': 'candado-rapido', 'presion-pares': 'peer-pressure',
      'limites-chats': 'limites-chats', 'presencia-adulta': 'adult-presence', 'riesgos-reales': 'riesgos-reales',
      'presencia-jovenes': 'presencia-jovenes', 'privacidad-dinero': 'privacidad-dinero', 'sticker-control': 'sticker-control',
      'app-no-se-acaba': 'app-no-se-acaba', 'el-carino-no-pide-contrasenas': 'el-carino-no-pide-contrasenas',
      'chat-en-llamas': 'chat-en-llamas', 'la-voz-en-el-squad': 'la-voz-en-el-squad', 'no-lo-hagas-viral': 'no-lo-hagas-viral',
      'perfil-fantasma': 'perfil-fantasma', 'monedas-gratis': 'monedas-gratis', 'jugada-problema': 'jugada-problema',
      'reconozco-emociones': 'reconozco-emociones', 'bit-data-mensaje-gris': 'bit-data-mensaje-gris',
      'luna-cajita-importante': 'luna-cajita-importante', 'bit-foto-otra-vez': 'bit-foto-otra-vez',
      'el-servidor-de-discor': 'el-servidor-de-discor', 'el-mercado-gamer': 'el-mercado-gamer',
      'el-mundo-privado': 'el-mundo-privado', 'cuando-hijo-mundo-privado': 'cuando-hijo-mundo-privado',
      'quien-entra-mi-mundo': 'quien-entra-mi-mundo'
    };
    const w = m[item.id];
    if (w) {
      this.activeWidgetId.set(w);
      document.body.classList.add('no-scroll');
    }
  }

  closeWidgetModal() {
    this.activeWidgetId.set(null);
    document.body.classList.remove('no-scroll');
  }

  @HostListener('document:keydown.escape')
  onEscKey() {
    if (this.activeWidgetId()) this.closeWidgetModal();
  }
}

