import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appImageLoader]',
  standalone: true
})
export class ImageLoaderDirective implements OnInit {
  private placeholder: HTMLElement | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // If image is already cached/loaded, show it immediately
    if (this.el.nativeElement.complete && this.el.nativeElement.naturalWidth > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      return;
    }

    // Hide image initially and set fade-in transition
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'opacity 0.4s ease-in-out');

    const parent = this.renderer.parentNode(this.el.nativeElement);
    if (parent) {
      // Create dynamic skeleton overlay
      this.placeholder = this.renderer.createElement('div');
      this.renderer.addClass(this.placeholder, 'absolute');
      this.renderer.addClass(this.placeholder, 'inset-0');
      this.renderer.addClass(this.placeholder, 'z-10');
      this.renderer.addClass(this.placeholder, 'animate-pulse');
      this.renderer.addClass(this.placeholder, 'bg-slate-200');
      this.renderer.addClass(this.placeholder, 'dark:bg-slate-800');

      // Ensure parent is relative and overflow-hidden
      this.renderer.addClass(parent, 'relative');
      this.renderer.addClass(parent, 'overflow-hidden');

      // Insert placeholder into parent
      this.renderer.appendChild(parent, this.placeholder);
    }
  }

  @HostListener('load')
  onLoad() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
    if (this.placeholder) {
      const parent = this.renderer.parentNode(this.el.nativeElement);
      if (parent) {
        this.renderer.removeChild(parent, this.placeholder);
      }
      this.placeholder = null;
    }
  }

  @HostListener('error')
  onError() {
    this.onLoad();
  }
}
