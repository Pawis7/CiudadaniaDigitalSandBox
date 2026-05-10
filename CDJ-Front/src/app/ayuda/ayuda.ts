import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HELP_CHANNELS, HELP_SITUATIONS } from '../core/data/page-content';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { AudIllustrationComponent } from '../shared/aud-illustration/aud-illustration';

@Component({
  selector: 'app-ayuda',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, AudIllustrationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ayuda.html',
})
export class AyudaComponent {
  situations = HELP_SITUATIONS;
  channels = HELP_CHANNELS;
  steps = [
    { icon: 'pause_circle',       title: 'Detente y respira',   description: 'No respondas en caliente. Toma distancia.' },
    { icon: 'screenshot_monitor', title: 'Guarda evidencia',    description: 'Captura mensajes, links y nombres de usuario.' },
    { icon: 'block',              title: 'Bloquea y reporta',   description: 'Usa los reportes de la plataforma para frenar el contacto.' },
    { icon: 'support_agent',      title: 'Pide apoyo',          description: 'Habla con alguien de confianza y llama a una línea oficial.' },
  ];

  utiles = [
    { icon: 'bolt',         title: 'Guía rápida',           description: 'Pasos esenciales si no sabes por dónde empezar.' },
    { icon: 'fact_check',   title: 'Checklist',             description: 'Lista para revisar y actuar paso a paso.' },
    { icon: 'help',         title: 'Preguntas frecuentes',  description: 'Las dudas más comunes resueltas.' },
    { icon: 'menu_book',    title: 'Ruta de atención',      description: 'A dónde acudir según el caso.' },
  ];
}
