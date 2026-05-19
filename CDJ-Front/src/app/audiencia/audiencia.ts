import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { AUDIENCE_PAGES } from '../core/data/page-content';
import { ContentService } from '../core/services/content.service';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { AudIllustrationComponent } from '../shared/aud-illustration/aud-illustration';
import { SecondaryFraudSimulatorComponent } from '../shared/secondary-fraud-simulator/secondary-fraud-simulator';
import { AudienceSlug } from '../core/models/content.models';
import { FeatureCardComponent } from '../shared/feature-card/feature-card';

const SLUG_TO_AUDIENCE: Record<string, AudienceSlug> = {
  'ninas-y-ninos': 'kids',
  'adolescentes':  'teens',
  'familias':      'families',
  'docentes':      'teachers',
};

@Component({
  selector: 'app-audiencia',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, AudIllustrationComponent, SecondaryFraudSimulatorComponent, FeatureCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './audiencia.html',
})
export class AudienciaComponent {
  private route   = inject(ActivatedRoute);
  private content = inject(ContentService);

  private slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  page          = computed(() => AUDIENCE_PAGES.find((a) => a.slug === this.slug()));
  audienceTheme = computed<AudienceSlug>(() => SLUG_TO_AUDIENCE[this.slug()] ?? 'cdj');

  /** Series recomendadas convertidas a FeatureCard → usa app-feature-card */
  recommendedCards = computed(() => {
    const p = this.page();
    if (!p) return [];
    return this.content
      .videoSeries()
      .filter((s) => p.recommendedSeriesSlugs.includes(s.slug))
      .map((s) => this.content.seriesAsCard(s));
  });

  isTeenAudience = computed(() => this.slug() === 'adolescentes');
}

