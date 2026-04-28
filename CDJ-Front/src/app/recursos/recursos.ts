import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RESOURCES } from '../core/data/page-content';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { ExploreByTopicComponent } from '../shared/explore-by-topic/explore-by-topic';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, ExploreByTopicComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recursos.html',
})
export class RecursosComponent {
  resources = RESOURCES;
}
