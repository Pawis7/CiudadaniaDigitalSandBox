import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { StageExperienceComponent } from './stage-delivery/stage-experience';
import { isStageExperience } from './stage-delivery/stage-experiences.data';
import { getExperience } from './learning-experience.data';
import { adaptExperience, normalizeProfile, profileContext } from './profile-context.data';

@Component({
  selector: 'app-learning-experience',
  standalone: true,
  imports: [RouterLink, StageExperienceComponent],
  templateUrl: './learning-experience.html',
  styleUrl: './learning-experience.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearningExperienceComponent {
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  slug = toSignal(this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')), { initialValue: '' });
  isStageExperience = computed(() => isStageExperience(this.slug()));
  profileParam = toSignal(this.route.queryParamMap.pipe(map((p) => p.get('perfil'))), { initialValue: null });
  stageParam = toSignal(this.route.queryParamMap.pipe(map((p) => p.get('etapa'))), { initialValue: null });
  profile = computed(() => normalizeProfile(this.profileParam()));
  context = computed(() => profileContext(this.profile()));
  experience = computed(() => adaptExperience(getExperience(this.slug()), this.profile(), this.stageParam()));
  backFragment = computed(() => this.stageParam() || undefined);
  videoUrl = computed(() => {
    const x = this.experience();
    return x ? this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube-nocookie.com/embed/' + x.videoId) : null;
  });

  sheet = signal<'first' | 'post' | null>(null);
  firstChoice = signal<string | null>(null);
  postChoice = signal<number | null>(null);
  actionChoice = signal<string | null>(null);

  open(which: 'first' | 'post') {
    this.sheet.set(which);
    document.body.classList.add('no-scroll');
  }
  close() {
    this.sheet.set(null);
    document.body.classList.remove('no-scroll');
  }
  chooseFirst(value: string) { this.firstChoice.set(value); }
  choosePost(index: number) { this.postChoice.set(index); }
  chooseAction(value: string) { this.actionChoice.set(value); }
}
