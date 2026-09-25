import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { LUNA_ACTIVITY } from '../../core/data/primary-digital-activities.data';
import { IllustratedActivityComponent } from '../illustrated-activity/illustrated-activity';

@Component({
  selector: 'app-luna-cajita-importante',
  standalone: true,
  imports: [IllustratedActivityComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './luna-cajita-importante.html',
  styleUrl: './luna-cajita-importante.css',
})
export class LunaCajitaImportanteComponent {
  readonly activity = LUNA_ACTIVITY;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  closeBook(): void {
    this.host.nativeElement
      .closest('[role="dialog"]')
      ?.querySelector<HTMLButtonElement>('button[aria-label="Cerrar"]')
      ?.click();
  }
}
