import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { YoutubePlayerComponent } from '../shared/youtube-player/youtube-player';
import { ExploreByTopicComponent } from '../shared/explore-by-topic/explore-by-topic';
import { AudIllustrationComponent } from '../shared/aud-illustration/aud-illustration';

interface FilterChip { id: string; label: string; icon?: string; }

@Component({
  selector: 'app-edutips',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    RevealDirective, YoutubePlayerComponent, ExploreByTopicComponent,
    AudIllustrationComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edutips.html',
})
export class EdutipsComponent {
  private content = inject(ContentService);

  query = signal('');
  ageFilter = signal('todos');
  levelFilter = signal('todos');
  typeFilter = signal('todos');
  durationFilter = signal('todos');

  ageOptions: FilterChip[]      = [
    { id: 'todos', label: 'Todas las edades' },
    { id: 'k',     label: '5-11', icon: 'face' },
    { id: 't',     label: '12-17', icon: 'smartphone' },
    { id: 'a',     label: '18+',   icon: 'person' },
  ];
  levelOptions: FilterChip[]    = [
    { id: 'todos',  label: 'Todos los niveles' },
    { id: 'pre',    label: 'Preescolar' },
    { id: 'pri-b',  label: 'Primaria baja' },
    { id: 'pri-a',  label: 'Primaria alta' },
    { id: 'sec',    label: 'Secundaria' },
    { id: 'prep',   label: 'Preparatoria' },
  ];
  typeOptions: FilterChip[]     = [
    { id: 'todos', label: 'Todos los tipos' },
    { id: 'video', label: 'Video',         icon: 'play_arrow' },
    { id: 'audio', label: 'Audiocuento',   icon: 'graphic_eq' },
    { id: 'guia',  label: 'Guía',          icon: 'menu_book' },
  ];
  durationOptions: FilterChip[] = [
    { id: 'todos', label: 'Cualquier duración' },
    { id: 'cort',  label: '< 5 min', icon: 'speed' },
    { id: 'med',   label: '5-15 min' },
    { id: 'larg',  label: '> 15 min' },
  ];

  edutipsSeries = computed(() => this.content.getSeriesBySlug('edutips'));
  videos = computed(() => this.edutipsSeries()?.videos ?? []);

  filteredVideos = computed(() => {
    const q = this.query().trim().toLowerCase();
    const list = this.videos();
    if (!q) return list;
    return list.filter((v) =>
      v.title.toLowerCase().includes(q) ||
      v.description?.toLowerCase().includes(q) ||
      (v.tags ?? []).some((t) => t.toLowerCase().includes(q))
    );
  });
}
