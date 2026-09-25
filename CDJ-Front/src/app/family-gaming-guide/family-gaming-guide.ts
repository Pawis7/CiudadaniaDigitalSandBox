import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FAMILY_GAMING_GUIDE } from '../core/data/family-gaming-guide.data';
import { AUDIENCE_PAGES } from '../core/data/page-content';

@Component({
  selector: 'app-family-gaming-guide',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './family-gaming-guide.html',
  styleUrl: './family-gaming-guide.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamilyGamingGuideComponent {
  readonly guide = FAMILY_GAMING_GUIDE;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly childResources =
    AUDIENCE_PAGES.find((page) => page.slug === 'ninas-y-ninos')?.subLevels.flatMap(
      (level) => level.levelResources ?? [],
    ) ?? [];

  readonly situations = this.guide.situations.map((situation) => ({
    ...situation,
    resource: this.childResources.find((resource) => resource.id === situation.resourceId),
  }));

  focusSection(id: string): void {
    this.host.nativeElement.querySelector<HTMLElement>(`#${id}`)?.focus({ preventScroll: true });
  }
}
