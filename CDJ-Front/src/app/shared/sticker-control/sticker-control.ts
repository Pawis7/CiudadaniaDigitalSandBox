import { ChangeDetectionStrategy, Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  STICKER_CONTROL_DATA,
  StickerMoment,
  StickerOption,
  StickerChatMessage
} from '../../core/data/sticker-control.data';

import { CdjLogoComponent } from '../cdj-logo/cdj-logo';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

@Component({
  selector: 'app-sticker-control',
  standalone: true,
  imports: [CommonModule, CdjLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sticker-control.html',
  styleUrl: './sticker-control.css',
})
export class StickerControlComponent {
  readonly data = STICKER_CONTROL_DATA;
  readonly moments = this.data.momentos_interactivos;

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentMomentIndex = signal(0);
  readonly copied = signal(false);

  // Guardar respuesta seleccionada por cada momento
  readonly answers = signal<Record<string, StickerOption>>({});

  // Mezcla de opciones para el momento actual
  readonly currentOptions = signal<StickerOption[]>([]);

  // Feedback y simulación de escritura
  readonly isTyping = signal(false);
  readonly activeFeedbackChoice = signal<StickerOption | null>(null);

  // Computaciones
  readonly currentMoment = computed<StickerMoment>(() => {
    return this.moments[this.currentMomentIndex()];
  });

  readonly progressPercent = computed(() => {
    return Math.round((this.currentMomentIndex() / this.moments.length) * 100);
  });

  readonly totalScore = computed(() => {
    return Object.values(this.answers()).reduce((sum, ans) => sum + ans.puntos, 0);
  });

  // Estado del Dynamic Island ficticio
  readonly activeStatus = computed<'idle' | 'typing' | 'success' | 'alert'>(() => {
    if (this.isTyping()) return 'typing';
    const active = this.activeFeedbackChoice();
    if (active) {
      return active.puntos === 4 ? 'success' : 'alert';
    }
    return 'idle';
  });

  // Diagnóstico final basado en las decisiones
  readonly finalDiagnostic = computed(() => {
    const score = this.totalScore();
    if (score >= 21) {
      return {
        titulo: "Mapa de Reparación Digital: Consistente y Restaurativo",
        mensaje: "Tus decisiones priorizan de manera sobresaliente el respeto, asumen la responsabilidad directa sin justificaciones, detienen la propagación discreta en lugar de generar un espectáculo grupal y brindan un soporte seguro y privado para Dani.",
        claseColor: "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200"
      };
    } else if (score >= 15) {
      return {
        titulo: "Mapa de Reparación Digital: En Construcción",
        mensaje: "Muestras intenciones de ayudar, pero en algunas decisiones has optado por justificaciones secundarias (como la falta de intención de Leo) o has delegado la solución en medidas punitivas o restrictivas, lo que puede perpetuar tensiones en el aula.",
        claseColor: "border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200"
      };
    } else {
      return {
        titulo: "Mapa de Reparación Digital: Requiere Más Pausa y Criterio",
        mensaje: "Varias de tus elecciones minimizan la burla digital llamándola 'un simple juego', proponen cacerías de brujas para culpar o promueven la reexposición involuntaria. Te recomendamos revisar el impacto de cada opción y reflexionar antes de actuar.",
        claseColor: "border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-200"
      };
    }
  });

  // Decisiones tomadas agrupadas por dimensiones del Mapa de Reparación
  readonly repairMapChoices = computed(() => {
    const answersMap = this.answers();
    const choices = Object.values(answersMap);

    const filterByDimension = (dim: 'reconocer' | 'detener' | 'acompanar' | 'prevenir') => {
      return choices.filter(c => c.dimension === dim);
    };

    return {
      reconocer: filterByDimension('reconocer'),
      detener: filterByDimension('detener'),
      acompanar: filterByDimension('acompanar'),
      prevenir: filterByDimension('prevenir')
    };
  });

  constructor() {
    // Sincronizar el mezclado de opciones cada vez que cambiamos de momento
    effect(() => {
      if (this.started() && !this.finished()) {
        const moment = this.currentMoment();
        this.currentOptions.set(shuffleArray(moment.opciones));

        // Scroll the chat container to top
        setTimeout(() => {
          const chatEl = document.querySelector('.wa-chat');
          if (chatEl) {
            chatEl.scrollTop = 0;
          }
        }, 50);
      }
    });
  }

  start(): void {
    this.started.set(true);
    this.finished.set(false);
    this.currentMomentIndex.set(0);
    this.answers.set({});
    this.activeFeedbackChoice.set(null);
    this.isTyping.set(false);
    this.copied.set(false);
  }

  restart(): void {
    this.start();
  }

  choose(choice: StickerOption): void {
    if (this.finished() || this.isTyping()) return;

    this.isTyping.set(true);
    setTimeout(() => {
      this.isTyping.set(false);
      this.activeFeedbackChoice.set(choice);

      this.answers.update((curr) => ({
        ...curr,
        [this.currentMoment().id]: choice
      }));
    }, 900);
  }

  continueFlow(): void {
    const active = this.activeFeedbackChoice();
    if (!active) return;

    if (this.currentMomentIndex() === this.moments.length - 1) {
      this.finished.set(true);
      return;
    }

    this.currentMomentIndex.update((idx) => idx + 1);
    this.activeFeedbackChoice.set(null);
  }

  async copyRepairMap(): Promise<void> {
    const diag = this.finalDiagnostic();
    const choices = this.answers();

    // Compilar el texto del Mapa final
    let textToCopy = `============================================\n`;
    textToCopy += `   MAPA DE REPARACIÓN DIGITAL               \n`;
    textToCopy += `   Caso: El sticker que se salió de control \n`;
    textToCopy += `============================================\n\n`;
    textToCopy += `${diag.titulo.toUpperCase()}\n`;
    textToCopy += `${diag.mensaje}\n\n`;
    textToCopy += `--- DECISIONES CLAVE ---\n`;

    this.moments.forEach(m => {
      const selected = choices[m.id];
      if (selected) {
        textToCopy += `• ${m.momento}:\n`;
        textToCopy += `  Decisión: "${selected.texto_visible}"\n`;
        textToCopy += `  Acción cuida: ${selected.feedback_cuida}\n\n`;
      }
    });

    textToCopy += `--------------------------------------------\n`;
    textToCopy += `"La reparación digital no se logra borrando el archivo; requiere asumir la responsabilidad, frenar la circulación, cuidar de la persona afectada y acordar límites preventivos."\n`;
    textToCopy += `Secretaría de Educación Jalisco · Ciudadanía Digital\n`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1600);
    } catch {
      this.copied.set(false);
    }
  }

  printResults(): void {
    window.print();
  }
}
