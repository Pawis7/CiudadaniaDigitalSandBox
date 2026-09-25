import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AUDIENCE_PAGES, LevelResource } from '../../core/data/page-content';
import { ResourceCardComponent } from './resource-card';

describe('ResourceCardComponent illustrated posters', () => {
  let fixture: ComponentFixture<ResourceCardComponent>;
  let story: LevelResource;
  let card: HTMLElement;
  let cover: HTMLButtonElement;
  let panel: HTMLElement;
  let action: HTMLButtonElement;
  let opened: string[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ResourceCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(ResourceCardComponent);
    story = AUDIENCE_PAGES.find((page) => page.slug === 'ninas-y-ninos')!
      .subLevels.find((level) => level.id === 'preescolar')!
      .levelResources!.find((resource) => resource.id === 'bit-hojas')!;
    fixture.componentRef.setInput('item', story);
    opened = [];
    fixture.componentInstance.actionClicked.subscribe((resource) => opened.push(resource.id));
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    card = element.querySelector<HTMLElement>('.story-card')!;
    cover = element.querySelector<HTMLButtonElement>('.story-card__cover')!;
    panel = element.querySelector<HTMLElement>('.story-card__panel')!;
    action = panel.querySelector<HTMLButtonElement>('button')!;
  });

  function pointer(target: HTMLElement, type: string, pointerType: 'mouse' | 'touch'): void {
    const event = new Event(type, { bubbles: type === 'pointerdown' });
    Object.defineProperty(event, 'pointerType', { value: pointerType });
    target.dispatchEvent(event);
    fixture.detectChanges();
  }

  it('slides the panel away on mouse leave even after clicking and focusing the cover', () => {
    expect(panel.hasAttribute('inert')).toBe(true);
    expect(panel.getAttribute('aria-hidden')).toBe('true');
    expect(action.tabIndex).toBe(-1);

    pointer(card, 'pointerenter', 'mouse');
    expect(cover.getAttribute('aria-expanded')).toBe('true');
    expect(cover.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.hasAttribute('inert')).toBe(false);
    expect(action.tabIndex).toBe(0);

    pointer(cover, 'pointerdown', 'mouse');
    cover.focus();
    cover.click();
    fixture.detectChanges();
    expect(document.activeElement).toBe(cover);
    expect(opened).toEqual([story.id]);

    pointer(card, 'pointerleave', 'mouse');
    expect(cover.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hasAttribute('inert')).toBe(true);
    expect(action.tabIndex).toBe(-1);
    expect(document.activeElement).toBe(cover);
  });

  it('opens the activity through cover click or button action', () => {
    let launchFocus: Element | null = null;
    fixture.componentInstance.actionClicked.subscribe(() => {
      launchFocus = document.activeElement;
    });

    pointer(cover, 'pointerdown', 'touch');
    cover.click();
    fixture.detectChanges();
    expect(opened).toEqual([story.id]);
    expect(launchFocus).toBe(cover);

    action.click();
    fixture.detectChanges();
    expect(opened).toEqual([story.id, story.id]);
  });

  it('reveals on keyboard focus, returns focus on Escape, and closes when focus leaves', () => {
    // jsdom does not infer keyboard modality from programmatic focus. Simulate only
    // the browser's :focus-visible match while preserving native focus events.
    const nativeMatches = cover.matches.bind(cover);
    const keyboardFocus = vi
      .spyOn(cover, 'matches')
      .mockImplementation((selector) =>
        selector === ':focus-visible' ? document.activeElement === cover : nativeMatches(selector),
      );
    cover.focus();
    fixture.detectChanges();
    expect(cover.getAttribute('aria-expanded')).toBe('true');

    action.focus();
    fixture.detectChanges();
    expect(document.activeElement).toBe(action);
    expect(cover.getAttribute('aria-expanded')).toBe('true');

    action.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(document.activeElement).toBe(cover);
    expect(cover.getAttribute('aria-expanded')).toBe('false');
    expect(panel.hasAttribute('inert')).toBe(true);

    cover.click();
    fixture.detectChanges();
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    outside.focus();
    fixture.detectChanges();
    expect(cover.getAttribute('aria-expanded')).toBe('false');
    outside.remove();
    expect(opened).toEqual([story.id]);
    keyboardFocus.mockRestore();
  });
});
