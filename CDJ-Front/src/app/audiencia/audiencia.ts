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

@Component({
  selector: 'app-audiencia',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet, RouterLink, RevealDirective, ImageLoaderDirective, ResourceCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audiencia.html',
})
export class AudienciaComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), { initialValue: '' });
  fragment = toSignal(this.route.fragment);
  page = computed(() => AUDIENCE_PAGES.find((a) => a.slug === this.slug()));
  config = computed(() => AUDIENCE_CONFIG[this.slug()] ?? null);
  audienceTheme = computed<AudienceSlug>(() => this.config()?.theme ?? 'cdj');
  profileLearning = computed(() => PROFILE_LEARNING[this.audienceTheme()] ?? null);
  profileQuery = computed(() => PROFILE_QUERY[this.audienceTheme()] ?? 'teens');

  selectedLevel = signal<string>('');
  activeWidgetId = signal<WidgetId | null>(null);

  constructor() {
    effect(() => {
      const cfg = this.config();
      const frag = this.fragment();
      untracked(() => {
        const p = this.page();
        const valid = frag && p && p.subLevels.some((s) => s.id === frag);
        this.selectedLevel.set(valid ? frag : (cfg?.defaultLevel ?? ''));
        if (valid) setTimeout(() => this.scrollToAnchor('actividades-nivel'), 120);
      });
    });
    effect(() => {
      this.selectedLevel();
      untracked(() => this.closeWidgetModal());
    });
  }

  activeSubLevel = computed(() => {
    const p = this.page();
    return p?.subLevels.find((s) => s.id === this.selectedLevel()) ?? null;
  });
  getActiveLevelName = computed(() => this.activeSubLevel()?.title ?? '');
  levelResources = computed(() => {
    let resources = this.activeSubLevel()?.levelResources ?? [];
    if (this.selectedLevel() === 'secundaria') {
      resources = resources.filter((r) => r.typeLabel?.toLowerCase() !== 'cuestionario' && r.id !== 'app-no-se-acaba');
    }
    return resources;
  });

  activeWidget = computed<Type<unknown> | null>(() => {
    const id = this.activeWidgetId();
    return id ? (WIDGET_REGISTRY[id] ?? null) : null;
  });
  isPhoneWidget = computed(() => {
    const id = this.activeWidgetId();
    return !!id && ['fraud-simulator','peer-pressure','sticker-control','el-carino-no-pide-contrasenas','chat-en-llamas','la-voz-en-el-squad','no-lo-hagas-viral','perfil-fantasma','monedas-gratis','jugada-problema','el-servidor-de-discor','el-mercado-gamer','el-mundo-privado','quien-entra-mi-mundo','bit-data-mensaje-gris','luna-cajita-importante'].includes(id);
  });

  scrollToAnchor(id: string) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  selectLevelAndScroll(levelId: string) {
    if (this.selectedLevel() === levelId) this.scrollToAnchor('actividades-nivel');
    else this.router.navigate([], { fragment: levelId, relativeTo: this.route, replaceUrl: true });
  }

  onResourceActionClicked(item: LevelResource): void {
    const map: Record<string, WidgetId> = {
      'simulador-fraudes':'fraud-simulator','candado-rapido':'candado-rapido','presion-pares':'peer-pressure','limites-chats':'limites-chats','presencia-adulta':'adult-presence','riesgos-reales':'riesgos-reales','presencia-jovenes':'presencia-jovenes','privacidad-dinero':'privacidad-dinero','sticker-control':'sticker-control','app-no-se-acaba':'app-no-se-acaba','el-carino-no-pide-contrasenas':'el-carino-no-pide-contrasenas','chat-en-llamas':'chat-en-llamas','la-voz-en-el-squad':'la-voz-en-el-squad','no-lo-hagas-viral':'no-lo-hagas-viral','perfil-fantasma':'perfil-fantasma','monedas-gratis':'monedas-gratis','jugada-problema':'jugada-problema','reconozco-emociones':'reconozco-emociones','bit-data-mensaje-gris':'bit-data-mensaje-gris','luna-cajita-importante':'luna-cajita-importante','el-servidor-de-discor':'el-servidor-de-discor','el-mercado-gamer':'el-mercado-gamer','el-mundo-privado':'el-mundo-privado','cuando-hijo-mundo-privado':'cuando-hijo-mundo-privado','quien-entra-mi-mundo':'quien-entra-mi-mundo'
    };
    const widget = map[item.id];
    if (widget) {
      this.activeWidgetId.set(widget);
      document.body.classList.add('no-scroll');
    }
  }
  closeWidgetModal() { this.activeWidgetId.set(null); document.body.classList.remove('no-scroll'); }
  @HostListener('document:keydown.escape') onEscKey() { if (this.activeWidgetId()) this.closeWidgetModal(); }
}
