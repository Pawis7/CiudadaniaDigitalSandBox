import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

const STORAGE_KEY  = 'cdj_image_overrides_v1';
const EDIT_MODE_KEY = 'cdj_edit_mode_v1';

/**
 * Gestiona el modo de edición y los overrides locales de imágenes.
 *
 * Seguridad: editMode solo puede activarse si el usuario está logueado.
 * Si cierra sesión con el lápiz activo, se desactiva automáticamente.
 *
 * Los componentes no deben usar editMode directamente como gate de UI —
 * deben usar: computed(() => imgEdit.editMode() && auth.isLogged())
 * para doble protección (ya implementado en FeatureCardComponent y similares).
 */
@Injectable({ providedIn: 'root' })
export class ImageEditService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser  = isPlatformBrowser(this.platformId);
  private auth       = inject(AuthService);

  readonly editMode  = signal<boolean>(false); // Siempre arranca en false; se restaura solo si hay sesión
  readonly overrides = signal<Record<string, string>>(this.readOverrides());

  constructor() {
    if (!this.isBrowser) return;

    // Persistir overrides en localStorage
    effect(() => {
      const v = this.overrides();
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(v)); } catch {}
    });

    // Restaurar editMode del localStorage SOLO si hay sesión activa
    // Se ejecuta de forma diferida para que auth.currentUser() esté disponible
    effect(() => {
      const logged = this.auth.isLogged();
      if (!logged) {
        // Si cierra sesión → forzar editMode a false inmediatamente
        this.editMode.set(false);
      } else {
        // Si está logueado → restaurar el estado que tenía antes
        const saved = this.readEditMode();
        if (saved) this.editMode.set(true);
      }
    });
  }

  /**
   * Activa/desactiva el modo de edición.
   * Solo funciona si el usuario está logueado — si no, no hace nada.
   */
  toggleEdit() {
    if (!this.auth.isLogged()) {
      this.editMode.set(false);
      return;
    }
    this.editMode.update((v) => {
      const next = !v;
      try { localStorage.setItem(EDIT_MODE_KEY, next ? '1' : '0'); } catch {}
      return next;
    });
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

  clearAll() { this.overrides.set({}); }

  getOverride(id: string): string | undefined {
    return this.overrides()[id];
  }

  /**
   * Merge no-destructivo de overrides que vienen del backend.
   * Los overrides locales (dataURL) tienen prioridad sobre los del server.
   */
  mergeBackendOverrides(serverMap: Record<string, string>) {
    if (!serverMap || typeof serverMap !== 'object') return;
    this.overrides.update((current) => {
      const merged: Record<string, string> = { ...serverMap };
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
    } catch { return {}; }
  }

  private readEditMode(): boolean {
    if (!this.isBrowser) return false;
    try {
      return localStorage.getItem(EDIT_MODE_KEY) === '1';
    } catch { return false; }
  }
}
