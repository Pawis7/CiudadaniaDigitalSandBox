import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './quienes-somos.html',
  styleUrl: './quienes-somos.css',
})
export class QuienesSomosComponent {
  /** Índices de cards actualmente volteadas */
  flipped = new Set<number>();

  private cdr = inject(ChangeDetectorRef);

  toggle(i: number) {
    if (this.flipped.has(i)) {
      this.flipped.delete(i);
    } else {
      this.flipped.add(i);
    }
    this.cdr.markForCheck();
  }

  editorial = {
    title: 'Quiénes somos',
    brief: 'Cultura y seguridad en el entorno digital.',
    explanatory: 'El mundo digital ofrece oportunidades para aprender, crear, convivir y participar, pero también requiere habilidades para cuidarnos y cuidar a otras personas. Este sitio busca reunir recursos educativos y de orientación para fortalecer una cultura digital más segura, humana e inclusiva en Jalisco.',
    closure: 'Este sitio reúne recursos educativos, formativos y de orientación para fortalecer una cultura digital más segura, humana e inclusiva.'
  };

  audiences = [
    {
      title: 'Estudiantes',
      description: 'Con recursos diseñados para su edad, lenguaje y contexto. Desde preescolar hasta secundaria, cada material respeta el momento de desarrollo de niñas, niños y adolescentes.',
      icon: 'face',
      bgClass: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Familias y cuidadores',
      description: 'Con herramientas para acompañar sin miedo, sin invadir y con confianza. Porque la mejor protección digital se construye desde la conversación y el vínculo.',
      icon: 'family_restroom',
      bgClass: 'from-violet-500 to-purple-500',
    },
    {
      title: 'Docentes',
      description: 'Con materiales prácticos para trabajar ciudadanía digital en el aula. Guías, dinámicas y recursos listos para usar en cualquier nivel educativo.',
      icon: 'local_library',
      bgClass: 'from-blue-500 to-indigo-500',
    }
  ];

  enfoques = [
    {
      title: 'Seguro',
      description: 'Cuidamos la privacidad, la información personal y el bienestar en línea.',
      icon: 'shield',
      bgClass: 'bg-emerald-500',
      textClass: 'text-emerald-600'
    },
    {
      title: 'Crítico',
      description: 'Promovemos el análisis, la verificación y la toma de decisiones informadas.',
      icon: 'psychology',
      bgClass: 'bg-amber-500',
      textClass: 'text-amber-600'
    },
    {
      title: 'Ético',
      description: 'Impulsamos el respeto, la empatía y la responsabilidad en línea.',
      icon: 'volunteer_activism',
      bgClass: 'bg-rose-500',
      textClass: 'text-rose-600'
    },
    {
      title: 'Participativo',
      description: 'Reconocemos que la tecnología también sirve para crear, colaborar y transformar.',
      icon: 'campaign',
      bgClass: 'bg-indigo-500',
      textClass: 'text-indigo-600'
    }
  ];
}
