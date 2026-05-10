import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'cdj_image_overrides_v1';
const EDIT_MODE_KEY = 'cdj_edit_mode_v1';

/**
 * Persistencia local de imágenes "modificadas" desde la UI.
 * El usuario presiona "Modificar" → se guarda un dataURL en localStorage
 * bajo el id del slot. Al renderizar, el componente prefiere el override
 * a la URL original. Útil para previsualizar cómo quedaría el sitio
 * sin tocar código ni backend.
 */
@Injectable({ providedIn: 'root' })
export class ImageEditService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  readonly editMode = signal<boolean>(this.readEditMode());
  readonly overrides = signal<Record<string, string>>(this.readOverrides());

  constructor() {
    if (!this.isBrowser) return;
    effect(() => {
      const v = this.editMode();
      try { localStorage.setItem(EDIT_MODE_KEY, v ? '1' : '0'); } catch {}
    });
    effect(() => {
      const v = this.overrides();
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch {}
    });
  }

  toggleEdit() {
    this.editMode.update((v) => !v);
  }

  setOverride(id: string, dataUrl: string) {
    this.overrides.update((v) => ({ ...v, [id]: dataUrl }));
  }

  clearOverride(id: string) {
    this.overrides.update((v) => {
      const { [id]: _, ...rest } = v;
      return rest;
    });
  }

  clearAll() {
    this.overrides.set({});
  }

  getOverride(id: string): string | undefined {
    return this.overrides()[id];
  }

  /**
   * Merge no-destructivo de overrides que vienen del backend.
   * Si el usuario tiene un override local (dataURL en localStorage), gana
   * — para que pueda previsualizar cambios sin tocar el server. Cuando
   * confirme la subida, el backend devuelve la URL real y la guardamos.
   */
  mergeBackendOverrides(serverMap: Record<string, string>) {
    if (!serverMap || typeof serverMap !== 'object') return;
    this.overrides.update((current) => {
      const merged: Record<string, string> = { ...serverMap };
      // Preferir overrides locales (dataURL del editor) sobre los del server
      for (const [id, val] of Object.entries(current)) {
        if (val?.startsWith('data:')) merged[id] = val;
      }
      return merged;
    });
  }

  private readOverrides(): Record<string, string> {
    if (!this.isBrowser) return {};
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  private readEditMode(): boolean {
    if (!this.isBrowser) return false;
    try {
      return localStorage.getItem(EDIT_MODE_KEY) === '1';
    } catch {
      return false;
    }
  }
}
