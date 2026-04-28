import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../core/services/content.service';
import { RevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { EditableImageComponent } from '../../shared/editable-image/editable-image';

@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, EditableImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-list.html',
})
export class SeriesListComponent {
  private content = inject(ContentService);
  series = this.content.videoSeries;
}
