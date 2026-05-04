import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TopicItem {
  id: string;
  label: string;
  icon: string;
  bgClass: string;
}

export const DEFAULT_TOPICS: TopicItem[] = [
  { id: 'seguridad',     label: 'Seguridad y privacidad', icon: 'lock',          bgClass: 'bg-blue-500' },
  { id: 'convivencia',   label: 'Convivencia digital',    icon: 'forum',         bgClass: 'bg-violet-500' },
  { id: 'bienestar',     label: 'Bienestar digital',      icon: 'spa',           bgClass: 'bg-emerald-500' },
  { id: 'pensamiento',   label: 'Pensamiento crítico',    icon: 'psychology',    bgClass: 'bg-amber-500' },
  { id: 'creatividad',   label: 'Creatividad y creación', icon: 'palette',       bgClass: 'bg-pink-500' },
  { id: 'uso',           label: 'Uso responsable',        icon: 'eco',           bgClass: 'bg-teal-500' },
];

@Component({
  selector: 'app-explore-by-topic',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="mb-8 rounded-[1.5rem] border border-slate-100 bg-white p-6 shadow-sm sm:mb-12 sm:rounded-[2.5rem] sm:p-10">
      <div class="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <p class="text-xs font-black uppercase tracking-widest text-violet-600">Explora por tema</p>
          <h2 class="text-2xl font-black tracking-tight text-slate-800 sm:text-3xl">{{ heading }}</h2>
        </div>
        <a href="#" class="hidden items-center gap-1 text-sm font-bold text-slate-500 transition-colors hover:text-slate-800 sm:inline-flex">
          Todos los temas
          <span translate="no" class="notranslate material-symbols-rounded text-base">arrow_forward</span>
        </a>
      </div>

      <div class="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
        <a *ngFor="let t of topics; let i = index"
           href="#"
           class="group flex flex-col items-center gap-2 rounded-2xl p-3 transition-all hover:bg-slate-50 sm:gap-3 sm:p-4">
          <span
            class="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-md transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg sm:h-14 sm:w-14"
            [ngClass]="t.bgClass">
            <span translate="no" class="notranslate material-symbols-rounded text-2xl icon-fill sm:text-[26px]">{{ t.icon }}</span>
          </span>
          <span class="text-center text-[11px] font-bold leading-tight text-slate-700 sm:text-xs">
            {{ t.label }}
          </span>
        </a>
      </div>
    </section>
  `,
})
export class ExploreByTopicComponent {
  @Input() heading = 'Encuentra por interés';
  @Input() topics: TopicItem[] = DEFAULT_TOPICS;
}
