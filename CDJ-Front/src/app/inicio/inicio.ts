import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { UiIconComponent, UiIconName } from '../shared/ui-icon/ui-icon';
import { FeatureCardComponent } from '../shared/feature-card/feature-card';
import { HeroSectionComponent } from '../hero-section/hero-section';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, UiIconComponent, FeatureCardComponent, HeroSectionComponent, ImageLoaderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class InicioComponent {
  private content = inject(ContentService);

  hero = this.content.hero;
  categories = this.content.categories;
  profileCards = computed(() => this.categories().map((cat) => this.content.categoryAsCard(cat)));
  featureCards = this.content.homeFeatureCards;
  pillars = this.content.pillars;
  secondaryBanner = this.content.secondaryBanner;
  videoSeries = this.content.videoSeries;

  editorial = {
    heroExplanatory: 'La vida digital forma parte de la escuela, la familia, las amistades, el juego, la información y la participación pública. Este sitio reúne recursos para entender mejor ese mundo, tomar decisiones con criterio y construir relaciones digitales más seguras, humanas y respetuosas.',
    featuredResourcesTitle: 'Recursos destacados',
    featuredResourcesGuide: 'Explora lo más reciente del portal: una selección de nuestras series, videos, cuentos y microlecciones diseñadas para aprender sobre ciudadanía digital de forma amena y directa.',
    profilesTitle: 'Contenido por perfil',
    profilesGuide: 'Al elegir tu perfil, accederás a una biblioteca completa diseñada para tu edad y rol. Aquí es donde encontrarás los simuladores interactivos, guías de acción, checklist y materiales específicos para aprender a navegar con seguridad en situaciones reales.',
    institutionalTitle: 'Cada acción en línea tiene impacto',
    institutionalText: 'Informarnos, respetar, proteger y participar nos ayuda a construir un mundo digital más seguro, justo e inclusivo.',
    explanatoryComplementary: 'Ser ciudadanía digital no significa usar más tecnología, sino usarla mejor: con seguridad, criterio, empatía, responsabilidad y sentido de comunidad.',
    finalCtaTitle: 'Elige tu ruta y comienza hoy',
  };

  stats = [
    { value: '8',    label: 'Series' },
  ];

  quickAccess: { title: string; copy: string; href: string; icon: UiIconName; tone: string }[] = [
    {
      title: 'Ayuda Digital',
      copy: 'Orientación para fraude, acoso o situaciones de riesgo.',
      href: '/ayuda',
      icon: 'shield',
      tone: 'bg-rose-600',
    },
    {
      title: 'Edutips',
      copy: 'Cápsulas breves para moverte mejor en internet.',
      href: '/edutips',
      icon: 'spark',
      tone: 'bg-amber-600',
    },
  ];

  featuredSpaces: { title: string; description: string; href: string; audience: string; icon: UiIconName; kicker: string }[] = [
    {
      title: 'Edutips',
      description: 'Piezas breves y directas para resolver dudas del día a día digital sin saturarte.',
      href: '/edutips',
      audience: 'edutips',
      icon: 'spark',
      kicker: 'Orientar',
    },
    {
      title: 'Ayuda Digital',
      description: 'Canales de apoyo cuando algo ya pasó y necesitas una siguiente acción clara.',
      href: '/ayuda',
      audience: 'help',
      icon: 'shield',
      kicker: 'Actuar',
    },
  ];

  getCatIcon(audience: string): UiIconName {
    const map: Record<string, UiIconName> = {
      kids: 'children',
      teens: 'phone',
      families: 'family',
      teachers: 'school',
      cdj: 'community',
    };
    return map[audience] ?? 'community';
  }

  pillarUiIcon(id: string): UiIconName {
    const map: Record<string, UiIconName> = {
      aprender: 'course',
      convivir: 'community',
      participar: 'spark',
    };
    return map[id] ?? 'check';
  }
}
