import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../shared/scroll-reveal/scroll-reveal.directive';
import { RouterLink } from '@angular/router';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';

@Component({
  selector: 'app-pantallas-seguras',
  standalone: true,
  imports: [CommonModule, RevealDirective, RouterLink, ImageLoaderDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pantallas-seguras.html',
})
export class PantallasSegurasComponent {
  editorial = {
    title: 'Ley de Pantallas Seguras',
    brief: 'Garantizando los derechos en el entorno digital.',
    explanatory: 'La Ley de Pantallas Seguras (oficialmente Ley para Garantizar los Derechos de Niñas, Niños y Adolescentes en Entornos Digitales del Estado de Jalisco y sus Municipios) tiene como fin proteger el bienestar de la infancia y la adolescencia frente a riesgos cibernéticos, estableciendo un marco de corresponsabilidad en el hogar, el aula y la sociedad.'
  };
}
