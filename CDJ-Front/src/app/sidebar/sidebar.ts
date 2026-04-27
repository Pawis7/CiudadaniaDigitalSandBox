import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  sections = [
    {
      title: 'Niñas y niños',
      icon: 'face',
      color: 'bg-teal-500',
      textColor: 'text-teal-600',
      expanded: true,
      items: ['Preescolar', 'Primaria baja', 'Primaria alta']
    },
    {
      title: 'Adolescentes',
      icon: 'smartphone',
      color: 'bg-violet-500',
      textColor: 'text-violet-600',
      expanded: false,
      items: ['Secundaria', 'Preparatoria']
    },
    {
      title: 'Familias',
      icon: 'groups',
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      expanded: false,
      items: ['0-5 Primera infancia', '6-11 Niñez', '12-14 Adolescencia temprana', '15-22 Adolescencia tardía y juventud']
    },
    {
      title: 'Docentes',
      icon: 'school',
      color: 'bg-green-500',
      textColor: 'text-green-600',
      expanded: false,
      items: ['Preescolar', 'Primaria baja', 'Primaria alta', 'Secundaria', 'Preparatoria']
    }
  ];

  toggleSection(section: any) {
    section.expanded = !section.expanded;
  }
}
