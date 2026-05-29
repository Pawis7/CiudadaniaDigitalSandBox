/**
 * Registro central de widgets interactivos disponibles para audiencias.
 *
 * Para agregar un nuevo widget:
 *  1. Crear el componente en src/app/shared/<nombre>/<nombre>.ts
 *  2. Registrarlo aquí con un ID de tipo string literal.
 *  3. Asignarlo a un nivel en audiencia-config.ts → levelWidgets.
 *  La plantilla audiencia.html no requiere ningún cambio.
 */
import { Type } from '@angular/core';
import { SecondaryFraudSimulatorComponent } from '../shared/secondary-fraud-simulator/secondary-fraud-simulator';

export type WidgetId =
  | 'fraud-simulator';
  // | 'footprint-3d'           // futuro
  // | 'acuerdos-digitales'     // futuro

export const WIDGET_REGISTRY: Record<WidgetId, Type<unknown>> = {
  'fraud-simulator': SecondaryFraudSimulatorComponent,
};
