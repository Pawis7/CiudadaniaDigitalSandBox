import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class InicioComponent {
  private content = inject(ContentService);

  hero = this.content.hero;
  categories = this.content.categories;
  featureCards = this.content.featureCards;
  pillars = this.content.pillars;
  secondaryBanner = this.content.secondaryBanner;
  videoSeries = this.content.videoSeries;

  stats = [
    { value: '120+', label: 'Recursos' },
    { value: '12',   label: 'Cursos' },
    { value: '8',    label: 'Series' },
  ];

  hotTerms = [
    { label: 'Privacidad',     href: '/recursos' },
    { label: 'Ciberacoso',     href: '/ayuda' },
    { label: 'Convivencia',    href: '/cursos' },
    { label: 'Bienestar digital', href: '/edutips' },
  ];

  /** Cursos destacados curados — placeholders coherentes con el catálogo */
  featuredCourses = [
    {
      title: 'Convivencia digital en el aula',
      description: 'Estrategias prácticas para fomentar respeto y bienestar entre estudiantes.',
      audience: 'teachers', audienceLabel: 'Docentes',
      audIcon: 'school', icon: 'menu_book',
      level: 'Intermedio', duration: '6h', lessons: 18, certificate: true,
    },
    {
      title: 'Privacidad en familia',
      description: 'Una guía conversacional para hablar con tus hijos sobre datos personales.',
      audience: 'families', audienceLabel: 'Familias',
      audIcon: 'family_restroom', icon: 'shield',
      level: 'Básico', duration: '2h', lessons: 8, certificate: false,
    },
    {
      title: 'Identidad digital adolescente',
      description: 'Reputación, huella digital y cómo cuidar tu narrativa en redes.',
      audience: 'teens', audienceLabel: 'Adolescentes',
      audIcon: 'smartphone', icon: 'fingerprint',
      level: 'Intermedio', duration: '4h', lessons: 12, certificate: true,
    },
    {
      title: 'Mi primera vez en internet',
      description: 'Para los más pequeños: qué es internet, cómo navegar y a quién pedir ayuda.',
      audience: 'kids', audienceLabel: 'Niñas y niños',
      audIcon: 'child_care', icon: 'auto_stories',
      level: 'Básico', duration: '1h', lessons: 6, certificate: false,
    },
  ];

  getCatIcon(audience: string): string {
    const map: Record<string, string> = {
      kids: 'child_care',
      teens: 'smartphone',
      families: 'family_restroom',
      teachers: 'school',
      cdj: 'public',
    };
    return map[audience] ?? 'public';
  }
}
