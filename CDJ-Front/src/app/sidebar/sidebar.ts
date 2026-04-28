import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContentService } from '../core/services/content.service';
import { NavSection } from '../core/models/content.models';
import { CdjLogoComponent } from '../shared/cdj-logo/cdj-logo';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CdjLogoComponent],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  @Input() variant: 'desktop' | 'mobile' = 'desktop';
  @Output() navigate = new EventEmitter<void>();

  private content = inject(ContentService);
  branding = this.content.branding;
  sections = this.content.navSections;

  toggleSection(section: NavSection) {
    section.expanded = !section.expanded;
  }

  onNavigate() {
    this.navigate.emit();
  }
}
