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
import { SecondaryPeerPressureSimulatorComponent } from '../shared/secondary-peer-pressure-simulator/secondary-peer-pressure-simulator';
import { LimitesChatsComponent } from '../shared/limites-chats/limites-chats';
import { AdultPresenceComponent } from '../shared/adult-presence/adult-presence';
import { RiesgosRealesComponent } from '../shared/riesgos-reales/riesgos-reales';
import { PresenciaJovenesComponent } from '../shared/presencia-jovenes/presencia-jovenes';
import { PrivacidadDineroComponent } from '../shared/privacidad-dinero/privacidad-dinero';
import { StickerControlComponent } from '../shared/sticker-control/sticker-control';
import { AppNoSeAcabaComponent } from '../shared/app-no-se-acaba/app-no-se-acaba';
import { ElCarinoNoPideContrasenasComponent } from '../shared/el-carino-no-pide-contrasenas/el-carino-no-pide-contrasenas';
import { ChatEnLlamasComponent } from '../shared/chat-en-llamas/chat-en-llamas';
import { LaVozEnElSquadComponent } from '../shared/la-voz-en-el-squad/la-voz-en-el-squad';
import { NoLoHagasViralComponent } from '../shared/no-lo-hagas-viral/no-lo-hagas-viral';
import { PerfilFantasmaComponent } from '../shared/perfil-fantasma/perfil-fantasma';
import { MonedasGratisComponent } from '../shared/monedas-gratis/monedas-gratis';
import { JugadaProblemaComponent } from '../shared/jugada-problema/jugada-problema';
import { ReconozcoEmocionesComponent } from '../shared/reconozco-emociones/reconozco-emociones';
import { ElMercadoGamerComponent } from '../shared/el-mercado-gamer/el-mercado-gamer';
import { ElServidorDeDiscorComponent } from '../shared/el-servidor-de-discor/el-servidor-de-discor';

export type WidgetId =
  | 'fraud-simulator'
  | 'candado-rapido'
  | 'peer-pressure'
  | 'limites-chats'
  | 'adult-presence'
  | 'riesgos-reales'
  | 'presencia-jovenes'
  | 'privacidad-dinero'
  | 'sticker-control'
  | 'app-no-se-acaba'
  | 'el-carino-no-pide-contrasenas'
  | 'chat-en-llamas'
  | 'la-voz-en-el-squad'
  | 'no-lo-hagas-viral'
  | 'perfil-fantasma'
  | 'monedas-gratis'
  | 'jugada-problema'
  | 'reconozco-emociones'
  | 'el-mercado-gamer'
  | 'el-servidor-de-discor';

export const WIDGET_REGISTRY: Record<WidgetId, Type<unknown>> = {
  'fraud-simulator': SecondaryFraudSimulatorComponent,
  'candado-rapido': CandadoRapidoComponent,
  'peer-pressure': SecondaryPeerPressureSimulatorComponent,
  'limites-chats': LimitesChatsComponent,
  'adult-presence': AdultPresenceComponent,
  'riesgos-reales': RiesgosRealesComponent,
  'presencia-jovenes': PresenciaJovenesComponent,
  'privacidad-dinero': PrivacidadDineroComponent,
  'sticker-control': StickerControlComponent,
  'app-no-se-acaba': AppNoSeAcabaComponent,
  'el-carino-no-pide-contrasenas': ElCarinoNoPideContrasenasComponent,
  'chat-en-llamas': ChatEnLlamasComponent,
  'la-voz-en-el-squad': LaVozEnElSquadComponent,
  'no-lo-hagas-viral': NoLoHagasViralComponent,
  'perfil-fantasma': PerfilFantasmaComponent,
  'monedas-gratis': MonedasGratisComponent,
  'jugada-problema': JugadaProblemaComponent,
  'reconozco-emociones': ReconozcoEmocionesComponent,
  'el-mercado-gamer': ElMercadoGamerComponent,
  'el-servidor-de-discor': ElServidorDeDiscorComponent,
};
