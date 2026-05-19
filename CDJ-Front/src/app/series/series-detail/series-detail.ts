import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ContentService } from '../../core/services/content.service';
import { RevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { YoutubePlayerComponent } from '../../shared/youtube-player/youtube-player';
import { EditableImageComponent } from '../../shared/editable-image/editable-image';
import { ImageEditService } from '../../core/services/image-edit.service';
import { AuthService } from '../../core/services/auth.service';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card';

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, YoutubePlayerComponent, EditableImageComponent, FeatureCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-detail.html',
})
export class SeriesDetailComponent {
  private route   = inject(ActivatedRoute);
  private content = inject(ContentService);
  private imgEdit = inject(ImageEditService);
  private auth    = inject(AuthService);

  /** editMode del hero cover también requiere login */
  editMode = computed(() => this.imgEdit.editMode() && this.auth.isLogged());

  hasOverride(id: string): boolean { return !!this.imgEdit.getOverride(id); }
  resetOverride(id: string) { this.imgEdit.clearOverride(id); }

  onFileSelected(event: Event, id: string) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.imgEdit.setOverride(id, String(reader.result)); };
    reader.readAsDataURL(file);
    input.value = '';
  }

  private slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  serie  = computed(() => this.content.getSeriesBySlug(this.slug()));
  videos = computed(() => this.serie()?.videos ?? []);

  /** Otras series como FeatureCard para usar app-feature-card */
  relatedCards = computed(() => {
    const current = this.serie();
    if (!current) return [];
    return this.content
      .videoSeries()
      .filter((s) => s.id !== current.id)
      .slice(0, 3)
      .map((s) => this.content.seriesAsCard(s));
  });
}
