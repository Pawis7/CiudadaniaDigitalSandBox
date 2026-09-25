import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LOWER_PRIMARY_BOARDS, LowerPrimaryBoard } from '../../core/data/lower-primary-activities.data';
import { LowerPrimaryGameComponent } from './lower-primary-activities';

function create(board = LOWER_PRIMARY_BOARDS[0]) {
  const fixture = TestBed.createComponent(LowerPrimaryGameComponent);
  fixture.componentRef.setInput('activity', board);
  fixture.detectChanges();
  return fixture;
}
function click(fixture: ComponentFixture<LowerPrimaryGameComponent>, selector: string) {
  const button = fixture.nativeElement.querySelector(selector) as HTMLButtonElement | null;
  expect(button, `Missing interactive button ${selector}`).not.toBeNull();
  expect(button?.tagName).toBe('BUTTON');
  button!.click();
  fixture.detectChanges();
}
function completeRound(fixture: ComponentFixture<LowerPrimaryGameComponent>) {
  const game = fixture.componentInstance;
  for (const object of game.round().objects) {
    click(fixture, `[data-object-id="${object.id}"]`);
    if (object.clue) click(fixture, '[data-open-clue]');
    const target = object.correctTargets.find(id => {
      const zone = game.round().zones.find(item => item.id === id)!;
      return !zone.capacity || game.objectsFor(id).length < zone.capacity;
    })!;
    click(fixture, `[data-zone-target="${target}"]`);
    expect(fixture.nativeElement.querySelector(`[data-placed-object="${object.id}"]`)).not.toBeNull();
  }
}

describe('Lower primary activities: real board interactions', () => {
  beforeEach(async () => {
    sessionStorage.clear();
    localStorage.setItem('cdj.lower-primary.sound-muted', 'true');
    await TestBed.configureTestingModule({ imports: [LowerPrimaryGameComponent] }).compileComponents();
  });
  afterEach(() => { TestBed.resetTestingModule(); vi.restoreAllMocks(); });

  it.each(LOWER_PRIMARY_BOARDS)('completes both distinct missions of $title with buttons and closes the modal', board => {
    const fixture = create(board);
    const game = fixture.componentInstance;
    const closed = vi.fn();
    const output = vi.fn();
    fixture.nativeElement.parentElement.addEventListener('lower-primary-close-requested', closed);
    game.closeRequested.subscribe(output);
    expect(board.rounds).toHaveLength(2);
    for (let index = 0; index < board.rounds.length; index++) {
      expect(game.roundIndex()).toBe(index);
      expect(game.round().id).toBe(board.rounds[index].id);
      completeRound(fixture);
      expect(game.complete()).toBe(true);
      expect(game.finished()).toBe(false);
      expect(game.roundIndex()).toBe(index); // No timed advance hides the completed board.
      click(fixture, '[data-next-round]');
    }
    expect(game.finished()).toBe(true);
    expect(fixture.nativeElement.querySelectorAll('.final-list li')).toHaveLength(8);
    click(fixture, '[data-finish]');
    expect(output).toHaveBeenCalledOnce();
    expect(closed).toHaveBeenCalledOnce();
    expect(closed.mock.calls[0][0].bubbles).toBe(true);
    fixture.destroy();
  });

  it('keeps an incorrect object selected and explains the specific decision', () => {
    const fixture = create();
    const game = fixture.componentInstance;
    const object = game.round().objects[0];
    const incorrect = game.round().zones.find(zone => !object.correctTargets.includes(zone.id))!;
    click(fixture, `[data-object-id="${object.id}"]`);
    expect(fixture.nativeElement.querySelector(`[data-object-id="${object.id}"]`).getAttribute('aria-pressed')).toBe('true');
    click(fixture, `[data-zone-target="${incorrect.id}"]`);
    expect(game.placedCount()).toBe(0);
    expect(game.selected()).toBe(object.id);
    expect(game.feedback()).toBe(object.feedbackByTarget?.[incorrect.id] ?? object.errorFeedback);
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(game.feedback());
    fixture.destroy();
  });

  it('requires opening the source and date clue before deciding', () => {
    const fixture = create(LOWER_PRIMARY_BOARDS.find(board => board.mode === 'evidence')!);
    const game = fixture.componentInstance;
    const object = game.round().objects[0];
    click(fixture, `[data-object-id="${object.id}"]`);
    click(fixture, `[data-zone-target="${object.correctTargets[0]}"]`);
    expect(game.placedCount()).toBe(0);
    expect(game.feedback()).toContain('abre la pista');
    click(fixture, '[data-open-clue]');
    expect(fixture.nativeElement.querySelector('.evidence-clue').textContent).toContain(object.clue!.text);
    click(fixture, `[data-zone-target="${object.correctTargets[0]}"]`);
    expect(game.placedCount()).toBe(1);
    fixture.destroy();
  });

  it('accepts an alternative useful tool and explains that specific purpose', () => {
    const fixture = create(LOWER_PRIMARY_BOARDS.find(board => board.mode === 'tools')!);
    const game = fixture.componentInstance;
    const object = game.round().objects.find(item => item.correctTargets.length > 1)!;
    const target = object.correctTargets[1];
    click(fixture, `[data-object-id="${object.id}"]`);
    click(fixture, `[data-zone-target="${target}"]`);
    expect(game.currentPlacements()[object.id]).toBe(target);
    expect(game.feedback()).toBe(object.feedbackByTarget![target]);
    fixture.destroy();
  });

  it('moves an object by pointer drag without relying on HTML drag and drop', () => {
    const fixture = create();
    const game = fixture.componentInstance;
    const object = game.round().objects[0];
    const target = fixture.nativeElement.querySelector(`[data-drop-zone="${object.correctTargets[0]}"]`);
    const savedElementFromPoint = document.elementFromPoint;
    document.elementFromPoint = vi.fn().mockReturnValue(target);
    const pointer = (type: string, x: number, y: number) => {
      const event = new Event(type, { bubbles: true, cancelable: true });
      Object.assign(event, { button: 0, pointerId: 1, clientX: x, clientY: y });
      return event;
    };
    fixture.nativeElement.querySelector(`[data-object-id="${object.id}"]`).dispatchEvent(pointer('pointerdown', 10, 10));
    document.dispatchEvent(pointer('pointermove', 50, 80));
    fixture.detectChanges();
    expect(game.drag()?.id).toBe(object.id);
    expect(game.hoveredZone()).toBe(object.correctTargets[0]);
    expect(fixture.nativeElement.querySelector('.object-insight')).toBeNull();
    expect(fixture.nativeElement.querySelector('.drag-insight-space')).toBeNull();
    document.dispatchEvent(pointer('pointerup', 50, 80));
    fixture.detectChanges();
    expect(game.placedCount()).toBe(1);
    expect(game.drag()).toBeNull();
    document.elementFromPoint = savedElementFromPoint;
    fixture.destroy();
  });

  it('does not overwrite an occupied time slot and supports moving an object again', () => {
    const source = LOWER_PRIMARY_BOARDS.find(board => board.mode === 'day')!;
    const board: LowerPrimaryBoard = JSON.parse(JSON.stringify(source));
    const zone = board.rounds[0].zones[0];
    board.rounds[0].objects[0].correctTargets = [zone.id];
    board.rounds[0].objects[1].correctTargets = [zone.id];
    const fixture = create(board);
    const game = fixture.componentInstance;
    const [first, second] = game.round().objects;
    game.place(first.id, zone.id);
    game.place(second.id, zone.id);
    fixture.detectChanges();
    expect(game.placedCount()).toBe(1);
    expect(game.feedback()).toContain('ya tiene una actividad');
    click(fixture, `[data-placed-object="${first.id}"] .return-object`);
    expect(game.placedCount()).toBe(0);
    game.place(second.id, zone.id);
    expect(game.currentPlacements()[second.id]).toBe(zone.id);
    fixture.destroy();
  });

  it('restores progress after closing and only resets when explicitly requested', () => {
    const fixture = create();
    const game = fixture.componentInstance;
    completeRound(fixture);
    click(fixture, '[data-next-round]');
    const object = game.round().objects[0];
    game.place(object.id, object.correctTargets[0]);
    fixture.destroy();
    const reopened = create();
    expect(reopened.componentInstance.roundIndex()).toBe(1);
    expect(reopened.componentInstance.placedCount()).toBe(1);
    expect(reopened.componentInstance.resumed()).toBe(true);
    click(reopened, '.board-footer button');
    expect(reopened.componentInstance.roundIndex()).toBe(0);
    expect(reopened.componentInstance.placedCount()).toBe(0);
    expect(reopened.componentInstance.resumed()).toBe(false);
    reopened.destroy();
  });
});
