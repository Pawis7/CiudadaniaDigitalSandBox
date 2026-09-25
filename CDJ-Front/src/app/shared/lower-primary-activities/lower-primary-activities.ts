import {
  ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit,
  inject, input, output, signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LOWER_PRIMARY_BOARD_BY_ID, LowerPrimaryBoard, LowerPrimaryObject,
} from '../../core/data/lower-primary-activities.data';
import { BitCharacterComponent } from '../bit-character/bit-character';
import { LowerPrimaryAudio } from './lower-primary-audio';

type Placements = Record<string, Record<string, string>>;
type DragState = { id: string; x: number; y: number };

@Component({
  selector: 'app-lower-primary-game', standalone: true,
  imports: [CommonModule, BitCharacterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lower-primary-activities.html', styleUrl: './lower-primary-activities.css',
})
export class LowerPrimaryGameComponent implements OnInit, OnDestroy {
  readonly activity = input.required<LowerPrimaryBoard>();
  readonly closeRequested = output<void>();
  readonly selected = signal<string | null>(null);
  readonly roundIndex = signal(0);
  readonly placements = signal<Placements>({});
  readonly openedClues = signal<string[]>([]);
  readonly feedback = signal('');
  readonly feedbackKind = signal<'neutral' | 'success' | 'retry'>('neutral');
  readonly finished = signal(false);
  readonly resumed = signal(false);
  readonly drag = signal<DragState | null>(null);
  readonly dragInsightHeight = signal(0);
  readonly hoveredZone = signal<string | null>(null);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly audio = new LowerPrimaryAudio();
  readonly soundOn = signal(!this.audio.muted);
  private pointer: { id: string; pointerId: number; x: number; y: number } | null = null;
  private ignoreClickUntil = 0;
  private readonly storageVersion = 3;

  ngOnInit(): void { this.restoreProgress(); }
  ngOnDestroy(): void { this.audio.destroy(); }

  round() { return this.activity().rounds[this.roundIndex()]; }
  currentPlacements() { return this.placements()[this.round().id] ?? {}; }
  placedCount() { return Object.keys(this.currentPlacements()).length; }
  complete() { return this.placedCount() === this.round().objects.length; }
  remaining() { return this.round().objects.filter(object => !this.currentPlacements()[object.id]); }
  objectsFor(zone: string) { return this.round().objects.filter(object => this.currentPlacements()[object.id] === zone); }
  selectedObject() { return this.round().objects.find(object => object.id === this.selected()); }
  draggedObject() { return this.round().objects.find(object => object.id === this.drag()?.id); }
  clueIsOpen(object: LowerPrimaryObject) { return this.openedClues().includes(`${this.round().id}:${object.id}`); }
  resultText(object: LowerPrimaryObject, zoneId: string) {
    return object.resultText || object.feedbackByTarget?.[zoneId] || object.successFeedback;
  }
  finalItems() {
    return this.activity().rounds.flatMap(round => round.objects.map(object => ({
      key: `${round.id}:${object.id}`, label: object.label, image: object.image,
      text: this.resultText(object, this.placements()[round.id]?.[object.id] ?? ''),
    })));
  }
  sceneLabel() {
    return { footprints: 'El mapa de nuestras huellas', evidence: 'Mesa de pistas',
      chat: 'El equipo está conversando', day: 'Un día con espacio para todo',
      tools: 'Nuestro taller de ideas', agreements: 'El acuerdo de nuestro grupo' }[this.activity().mode];
  }
  finalTitle() {
    return { footprints: 'Ahora puedes seguir el rastro', evidence: 'Investigar nos ayuda a decidir',
      chat: 'Un equipo que se escucha', day: 'Tu día tiene de todo',
      tools: 'Cada misión tiene más de un camino', agreements: 'Nuestro acuerdo digital' }[this.activity().mode];
  }
  modeIcon() {
    return { footprints: 'footprint', evidence: 'search', chat: 'forum', day: 'schedule',
      tools: 'handyman', agreements: 'handshake' }[this.activity().mode];
  }
  readFinal(): void { this.audio.read(`${this.finalTitle()}. ${this.activity().success}`); }

  selectObject(id: string, read = true): void {
    if (Date.now() < this.ignoreClickUntil) return;
    const object = this.round().objects.find(item => item.id === id);
    if (!object || this.currentPlacements()[id]) return;
    this.selected.set(id);
    this.feedback.set('');
    this.feedbackKind.set('neutral');
    if (read) this.audio.read(`${object.label}. ${object.description ?? ''}`);
    else this.audio.stop();
    this.audio.cue('pick');
  }

  readInstructions(): void {
    this.audio.read(`${this.round().context} ${this.round().instruction}`, this.activity().id);
  }
  readObject(): void {
    const object = this.selectedObject();
    if (!object) return;
    const clue = object.clue && this.clueIsOpen(object) ? `${object.clue.title}. ${object.clue.text}` : '';
    this.audio.read(`${object.label}. ${object.description ?? ''} ${clue}`);
  }
  openClue(): void {
    const object = this.selectedObject();
    if (!object?.clue) return;
    const key = `${this.round().id}:${object.id}`;
    if (!this.openedClues().includes(key)) this.openedClues.update(clues => [...clues, key]);
    this.feedback.set('Lee o escucha la pista. Después elige dónde colocar el mensaje.');
    this.feedbackKind.set('neutral');
    this.audio.read(`${object.clue.title}. ${object.clue.text}`);
    this.saveProgress();
  }
  toggleSound(): void {
    this.soundOn.set(!this.audio.toggleMute());
  }

  tapZone(zone: string): void {
    if (Date.now() < this.ignoreClickUntil) return;
    const id = this.selected();
    if (id) this.place(id, zone);
    else {
      this.feedback.set('Primero elige un objeto. Después toca el lugar donde lo quieres colocar.');
      this.feedbackKind.set('neutral');
    }
  }

  place(id: string, zoneId: string): void {
    const object = this.round().objects.find(item => item.id === id);
    const zone = this.round().zones.find(item => item.id === zoneId);
    if (!object || !zone || this.currentPlacements()[id] || this.finished()) return;
    this.selected.set(id);
    if (this.activity().mode === 'evidence' && object.clue && !this.clueIsOpen(object)) {
      this.respond(false, 'Antes de decidir, abre la pista de este mensaje. Ahí puedes revisar quién lo dijo y cuándo.');
      return;
    }
    if (zone.capacity && this.objectsFor(zoneId).length >= zone.capacity) {
      this.respond(false, 'Ese momento ya tiene una actividad. Puedes moverla de nuevo con el botón de la flecha.');
      return;
    }
    if (!object.correctTargets.includes(zoneId)) {
      this.respond(false, object.feedbackByTarget?.[zoneId] ?? object.errorFeedback);
      return;
    }
    this.placements.update(placements => ({
      ...placements, [this.round().id]: { ...this.currentPlacements(), [id]: zoneId },
    }));
    this.selected.set(null);
    this.respond(true, object.feedbackByTarget?.[zoneId] ?? object.successFeedback);
    this.saveProgress();
  }

  returnObject(id: string): void {
    this.audio.stop();
    const placements = { ...this.currentPlacements() };
    delete placements[id];
    this.placements.update(all => ({ ...all, [this.round().id]: placements }));
    this.selected.set(id);
    this.feedback.set('Puedes probar otra organización. Elige un lugar para este objeto.');
    this.feedbackKind.set('neutral');
    this.saveProgress();
    setTimeout(() => this.host.nativeElement.querySelector<HTMLButtonElement>(`[data-object-id="${id}"]`)?.focus({ preventScroll: true }), 0);
  }

  nextRound(): void {
    if (!this.complete()) return;
    this.audio.stop();
    this.selected.set(null);
    this.feedback.set('');
    this.feedbackKind.set('neutral');
    if (this.roundIndex() < this.activity().rounds.length - 1) this.roundIndex.update(index => index + 1);
    else {
      this.finished.set(true);
      this.audio.cue('complete');
    }
    this.saveProgress();
    this.focusStage();
  }

  restart(): void {
    this.audio.stop();
    this.roundIndex.set(0);
    this.placements.set({});
    this.openedClues.set([]);
    this.selected.set(null);
    this.feedback.set('');
    this.finished.set(false);
    this.resumed.set(false);
    this.feedbackKind.set('neutral');
    this.saveProgress();
    this.focusStage();
  }

  requestClose(): void {
    this.audio.stop();
    this.closeRequested.emit();
    this.host.nativeElement.dispatchEvent(new CustomEvent('lower-primary-close-requested', {
      bubbles: true, composed: true,
    }));
  }

  pointerDown(event: PointerEvent, id: string): void {
    if (event.button !== 0 || this.finished()) return;
    // Selection details must not move the drop targets while a pointer is held.
    // Keep the existing panel's space if the child first selected an object.
    const insight = this.host.nativeElement.querySelector<HTMLElement>('.object-insight');
    const style = insight ? window.getComputedStyle(insight) : null;
    this.dragInsightHeight.set(insight ? insight.getBoundingClientRect().height +
      (parseFloat(style?.marginTop ?? '0') || 0) + (parseFloat(style?.marginBottom ?? '0') || 0) : 0);
    this.pointer = { id, pointerId: event.pointerId, x: event.clientX, y: event.clientY };
  }

  @HostListener('document:pointermove', ['$event'])
  pointerMove(event: PointerEvent): void {
    if (!this.pointer || event.pointerId !== this.pointer.pointerId) return;
    if (!this.drag() && Math.hypot(event.clientX - this.pointer.x, event.clientY - this.pointer.y) < 7) return;
    if (event.cancelable) event.preventDefault();
    if (!this.drag()) this.selectObject(this.pointer.id, false);
    this.drag.set({ id: this.pointer.id, x: event.clientX, y: event.clientY });
    this.hoveredZone.set(this.zoneAt(event.clientX, event.clientY));
    // Keep a long board usable when a finger or mouse reaches the panel edge.
    const panel = this.host.nativeElement.closest<HTMLElement>('.lower-primary-modal-content');
    if (panel) {
      const rect = panel.getBoundingClientRect();
      if (event.clientY > rect.bottom - 70) panel.scrollTop += 16;
      else if (event.clientY < rect.top + 70) panel.scrollTop -= 16;
    }
  }

  @HostListener('document:pointerup', ['$event'])
  pointerUp(event: PointerEvent): void {
    if (!this.pointer || event.pointerId !== this.pointer.pointerId) return;
    if (this.drag()) {
      if (event.cancelable) event.preventDefault();
      const target = this.zoneAt(event.clientX, event.clientY);
      if (target) this.place(this.pointer.id, target);
      else {
        this.feedback.set('El objeto sigue seleccionado. Toca un destino para colocarlo.');
        this.feedbackKind.set('neutral');
      }
      this.ignoreClickUntil = Date.now() + 250;
    }
    this.cancelPointer();
  }

  @HostListener('document:pointercancel')
  cancelPointer(): void {
    this.pointer = null;
    this.drag.set(null);
    this.hoveredZone.set(null);
  }

  private zoneAt(x: number, y: number): string | null {
    const element = document.elementFromPoint?.(x, y)?.closest<HTMLElement>('[data-drop-zone]');
    return element && this.host.nativeElement.contains(element) ? element.dataset['dropZone'] ?? null : null;
  }
  private respond(success: boolean, text: string): void {
    this.feedback.set(text);
    this.feedbackKind.set(success ? 'success' : 'retry');
    this.audio.feedback(success, text);
  }
  private focusStage(): void {
    setTimeout(() => this.host.nativeElement.querySelector<HTMLElement>('[data-stage-title]')?.focus(), 0);
  }
  private storageKey(): string { return `cdj-primaria-baja-v${this.storageVersion}:${this.activity().id}`; }
  private saveProgress(): void {
    try {
      sessionStorage.setItem(this.storageKey(), JSON.stringify({
        version: this.storageVersion, roundIndex: this.roundIndex(), placements: this.placements(),
        openedClues: this.openedClues(), finished: this.finished(),
      }));
    } catch { /* The game remains usable when storage is unavailable. */ }
  }
  private restoreProgress(): void {
    try {
      const saved = JSON.parse(sessionStorage.getItem(this.storageKey()) ?? 'null');
      if (!saved || saved.version !== this.storageVersion) return;
      const valid: Placements = {};
      for (const round of this.activity().rounds) {
        const placed: Record<string, string> = {};
        for (const object of round.objects) {
          const target = saved.placements?.[round.id]?.[object.id];
          const zone = round.zones.find(item => item.id === target);
          if (zone && object.correctTargets.includes(target) &&
              (!zone.capacity || Object.values(placed).filter(id => id === target).length < zone.capacity)) {
            placed[object.id] = target;
          }
        }
        valid[round.id] = placed;
      }
      this.placements.set(valid);
      let index = 0;
      while (index < this.activity().rounds.length - 1 &&
        Object.keys(valid[this.activity().rounds[index].id]).length === this.activity().rounds[index].objects.length &&
        Number.isInteger(saved.roundIndex) && index < saved.roundIndex) index++;
      this.roundIndex.set(index);
      const clueKeys = this.activity().rounds.flatMap(round => round.objects.filter(item => item.clue).map(item => `${round.id}:${item.id}`));
      this.openedClues.set(Array.isArray(saved.openedClues) ? saved.openedClues.filter((key: unknown) => typeof key === 'string' && clueKeys.includes(key)) : []);
      this.finished.set(saved.finished === true && this.activity().rounds.every(round => Object.keys(valid[round.id]).length === round.objects.length));
      this.resumed.set(Object.values(valid).some(placed => Object.keys(placed).length > 0));
    } catch { /* Invalid or old progress is ignored. */ }
  }
}

function board(id: string): LowerPrimaryBoard {
  const activity = LOWER_PRIMARY_BOARD_BY_ID.get(id);
  if (!activity) throw new Error('Tablero no encontrado: ' + id);
  return activity;
}
@Component({ selector: 'app-rastro-de-bit', standalone: true, imports: [LowerPrimaryGameComponent], template: '<app-lower-primary-game [activity]="activity" />' })
export class RastroDeBitComponent { readonly activity = board('rastro-de-bit'); }
@Component({ selector: 'app-lo-sabemos-o-preguntamos', standalone: true, imports: [LowerPrimaryGameComponent], template: '<app-lower-primary-game [activity]="activity" />' })
export class LoSabemosOPreguntamosComponent { readonly activity = board('lo-sabemos-o-preguntamos'); }
@Component({ selector: 'app-chat-del-equipo', standalone: true, imports: [LowerPrimaryGameComponent], template: '<app-lower-primary-game [activity]="activity" />' })
export class ChatDelEquipoComponent { readonly activity = board('chat-del-equipo'); }
@Component({ selector: 'app-mi-dia-tiene-de-todo', standalone: true, imports: [LowerPrimaryGameComponent], template: '<app-lower-primary-game [activity]="activity" />' })
export class MiDiaTieneDeTodoComponent { readonly activity = board('mi-dia-tiene-de-todo'); }
@Component({ selector: 'app-que-herramienta-nos-ayuda', standalone: true, imports: [LowerPrimaryGameComponent], template: '<app-lower-primary-game [activity]="activity" />' })
export class QueHerramientaNosAyudaComponent { readonly activity = board('que-herramienta-nos-ayuda'); }
@Component({ selector: 'app-nuestro-acuerdo-digital', standalone: true, imports: [LowerPrimaryGameComponent], template: '<app-lower-primary-game [activity]="activity" />' })
export class NuestroAcuerdoDigitalComponent { readonly activity = board('nuestro-acuerdo-digital'); }
