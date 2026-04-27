import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class InicioComponent {
  categories = [
    { name: 'Niñas y niños', image: 'https://images.unsplash.com/photo-1502086223501-7ea2493954b9?auto=format&fit=crop&q=80&w=400' },
    { name: 'Adolescentes', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400' },
    { name: 'Familias', image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=400' },
    { name: 'Docentes', image: 'https://images.unsplash.com/photo-1544717297-fa154ddad021?auto=format&fit=crop&q=80&w=400' }
  ];
}
