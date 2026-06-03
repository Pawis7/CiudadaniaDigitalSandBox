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
import { CandadoRapidoComponent } from '../shared/candado-rapido/candado-rapido';

export type WidgetId =
  | 'fraud-simulator'
  | 'candado-rapido';

export const WIDGET_REGISTRY: Record<WidgetId, Type<unknown>> = {
  'fraud-simulator': SecondaryFraudSimulatorComponent,
  'candado-rapido': CandadoRapidoComponent,
};

