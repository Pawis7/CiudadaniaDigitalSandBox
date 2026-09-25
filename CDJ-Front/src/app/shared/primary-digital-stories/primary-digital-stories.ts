import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import {
  DETECTIVES_ACTIVITY,
  MURAL_ACTIVITY,
} from '../../core/data/primary-digital-activities.data';
import { CASTLE_ACTIVITY, MISSION_ACTIVITY } from '../../core/data/virtual-world-stories.data';
import { IllustratedActivityComponent } from '../illustrated-activity/illustrated-activity';

@Component({
  selector: 'app-detectives-de-las-pistas',
  standalone: true,
  imports: [IllustratedActivityComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-activity [activity]="activity" (closeRequested)="closeBook()" />',
  host: { style: 'display: contents' },
})
export class DetectivesDeLasPistasComponent {
  readonly activity = DETECTIVES_ACTIVITY;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  closeBook(): void {
    this.host.nativeElement
      .closest('[role="dialog"]')
      ?.querySelector<HTMLButtonElement>('button[aria-label="Cerrar"]')
      ?.click();
  }
}

@Component({
  selector: 'app-mural-buenas-ideas',
  standalone: true,
  imports: [IllustratedActivityComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-activity [activity]="activity" (closeRequested)="closeBook()" />',
  host: { style: 'display: contents' },
})
export class MuralBuenasIdeasComponent {
  readonly activity = MURAL_ACTIVITY;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  closeBook(): void {
    this.host.nativeElement
      .closest('[role="dialog"]')
      ?.querySelector<HTMLButtonElement>('button[aria-label="Cerrar"]')
      ?.click();
  }
}

@Component({
  selector: 'app-castillo-cambio',
  standalone: true,
  imports: [IllustratedActivityComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-activity [activity]="activity" (closeRequested)="closeBook()" />',
  host: { style: 'display: contents' },
})
export class CastilloCambioComponent {
  readonly activity = CASTLE_ACTIVITY;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  closeBook(): void {
    this.host.nativeElement
      .closest('[role="dialog"]')
      ?.querySelector<HTMLButtonElement>('button[aria-label="Cerrar"]')
      ?.click();
  }
}

@Component({
  selector: 'app-mision-puede-esperar',
  standalone: true,
  imports: [IllustratedActivityComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<app-illustrated-activity [activity]="activity" (closeRequested)="closeBook()" />',
  host: { style: 'display: contents' },
})
export class MisionPuedeEsperarComponent {
  readonly activity = MISSION_ACTIVITY;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  closeBook(): void {
    this.host.nativeElement
      .closest('[role="dialog"]')
      ?.querySelector<HTMLButtonElement>('button[aria-label="Cerrar"]')
      ?.click();
  }
}
