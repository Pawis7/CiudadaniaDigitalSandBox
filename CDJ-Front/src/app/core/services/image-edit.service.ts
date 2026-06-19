import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageEditService {
  readonly isEditActive = computed(() => false);
  readonly overrides = signal<Record<string, string>>({});

  clearAll() {}
  getOverride(id: string): string | undefined {
    return undefined;
  }
}
