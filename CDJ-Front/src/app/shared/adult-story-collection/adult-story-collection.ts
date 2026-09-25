import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { AdultStoryGroup } from '../../core/data/adult-story-catalog';
import { LevelResource } from '../../core/data/page-content';

@Component({
  selector: 'app-adult-story-collection',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './adult-story-collection.html',
  styleUrl: './adult-story-collection.css',
})
export class AdultStoryCollectionComponent {
  groups = input.required<AdultStoryGroup[]>();
  school = input(false);
  requestedId = input<string | null>(null);
  actionClicked = output<LevelResource>();
  openId = signal<string | null>(null);
  expandedGroups = signal<Set<string>>(new Set());
  isPreschool = computed(() => this.groups()[0]?.id === 'preescolar');

  constructor() {
    effect(() => {
      const groups = this.groups();
      const requested = this.requestedId();
      this.expandedGroups.set(new Set());
      this.openId.set(
        groups.some((group) => group.entries.some((entry) => entry.resource.id === requested))
          ? requested
          : null,
      );
    });
  }

  toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }

  toggleGroup(id: string): void {
    this.expandedGroups.update((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
}
