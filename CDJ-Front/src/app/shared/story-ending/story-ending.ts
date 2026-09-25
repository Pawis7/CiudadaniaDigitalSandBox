import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-story-ending',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './story-ending.html',
  styleUrl: './story-ending.css',
})
export class StoryEndingComponent {
  readonly title = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly ruleLabel = input.required<string>();
  readonly rule = input.required<string>();
  readonly imageSrc = input('');
  readonly imageAlt = input('');
  readonly restart = output<void>();
  readonly closed = output<void>();
}
