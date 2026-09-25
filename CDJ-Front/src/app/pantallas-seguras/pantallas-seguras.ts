import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageLoaderDirective } from '../shared/image-loader/image-loader.directive';
import {
  FAMILY_STAGES,
  JALISCO_REFERENCES,
  LAW_ANSWERS,
  OFFICIAL_LAW_REFERENCE,
  PRACTICAL_REFERENCES,
  SCHOOL_GUIDANCE,
  SCHOOL_RESOURCES,
  SOCIAL_NETWORKS_NOTE,
} from './pantallas-seguras.data';

@Component({
  selector: 'app-pantallas-seguras',
  standalone: true,
  imports: [ImageLoaderDirective, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pantallas-seguras.html',
  styleUrl: './pantallas-seguras.css',
})
export class PantallasSegurasComponent {
  readonly editorial = {
    title: 'Pantallas Seguras',
    heroLine:
      'Conoce qué establece la ley de Jalisco y cómo acompañar desde la familia y la escuela.',
    official:
      'Ley para Garantizar los Derechos de Niñas, Niños y Adolescentes en Entornos Digitales del Estado de Jalisco y sus Municipios',
  };

  readonly lawAnswers = LAW_ANSWERS;
  readonly familyStages = FAMILY_STAGES;
  readonly schoolGuidance = SCHOOL_GUIDANCE;
  readonly schoolResources = SCHOOL_RESOURCES;
  readonly socialNetworksNote = SOCIAL_NETWORKS_NOTE;
  readonly officialLawReference = OFFICIAL_LAW_REFERENCE;
  // Referencia retirada temporalmente; sus datos se conservan para poder restituirla.
  readonly jaliscoReferences = JALISCO_REFERENCES.filter(
    (item) => item.title !== 'Protocolo de actuación escolar de Jalisco',
  );
  readonly practicalReferences = PRACTICAL_REFERENCES;
  readonly updatedAt = {
    iso: '2026-09-22',
    label: '22 de septiembre de 2026',
  };
}
