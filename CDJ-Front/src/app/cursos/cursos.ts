import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { COURSES } from '../core/data/special-sections.data';
import { Course, CourseLevel } from '../core/models/special-sections.models';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cursos.html',
})
export class CursosComponent {
  protected courses = signal<Course[]>(COURSES);

  protected levelFilter = signal<CourseLevel | 'todos'>('todos');
  protected audienceFilter = signal<string>('todos');

  protected filtered = computed(() => {
    const lvl = this.levelFilter();
    const aud = this.audienceFilter();
    return this.courses().filter((c) =>
      (lvl === 'todos' || c.level === lvl) &&
      (aud === 'todos' || c.audience === aud)
    );
  });

  protected levelLabels: Record<CourseLevel, string> = {
    basico: 'Básico', intermedio: 'Intermedio', avanzado: 'Avanzado',
  };
}
