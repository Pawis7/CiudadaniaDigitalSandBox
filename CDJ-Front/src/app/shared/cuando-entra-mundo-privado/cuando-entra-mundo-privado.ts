import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SignalCard {
  icon: string;
  title: string;
  short: string;
  child: string;
  means: string;
  ask: string;
  adult: string;
}

@Component({
  selector: 'app-cuando-entra-mundo-privado',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cuando-entra-mundo-privado.html',
  styleUrl: './cuando-entra-mundo-privado.css',
})
export class CuandoEntraMundoPrivadoComponent {
  readonly steps = [
    { title: 'Videojuegos 101', sub: 'Entender el entorno' },
    { title: 'Señales para mirar', sub: 'Interacción útil' },
    { title: 'Qué no hacer', sub: 'Evitar regaños' },
    { title: 'Practicar respuesta', sub: 'Elige tono' },
    { title: 'Guion', sub: 'Conversación' },
  ];

  readonly signals: SignalCard[] = [
    {
      icon: 'door_open',
      title: '“Ven a mi sala privada”',
      short: 'Invitación a otro espacio',
      child: 'Ve una puerta a otro mundo o una invitación directa.',
      means: 'No es mala por sí sola, pero puede separar al niño del grupo público.',
      ask: '¿Iba a entrar alguien más o solo tú?',
      adult: 'Acordar que las salas privadas se usan solo con personas conocidas o con permiso previo.',
    },
    {
      icon: 'visibility_off',
      title: '“No le digas a nadie”',
      short: 'Secreto',
      child: 'Alguien le pide ocultar la conversación o la invitación.',
      means: 'El secreto hace más difícil pedir ayuda o contar lo que pasa.',
      ask: '¿Te pidió que no me contaras o que no le dijeras a tus amigos?',
      adult: 'Decir con calma: si alguien pide secreto en un juego, me puedes contar sin castigo.',
    },
    {
      icon: 'schedule',
      title: '“Rápido, entra ya”',
      short: 'Prisa',
      child: 'Siente presión para decidir de inmediato sin pensar.',
      means: 'La prisa reduce la capacidad del niño para pausar y revisar la seguridad.',
      ask: '¿Te dio tiempo de pensarlo o te metió prisa y presión?',
      adult: 'Practicar una frase de freno: “espera, lo reviso primero con mi papá/mamá”.',
    },
    {
      icon: 'badge',
      title: '“¿Cuántos años tienes?”',
      short: 'Edad',
      child: 'La pregunta puede parecer muy normal, casual o amigable.',
      means: 'La edad también es un dato de carácter personal que no debe darse a la ligera.',
      ask: '¿Te preguntó tu edad, nombre real o grado escolar?',
      adult: 'Explicar que para jugar en línea no hace falta compartir datos personales.',
    },
    {
      icon: 'location_on',
      title: '“¿A qué escuela vas?”',
      short: 'Escuela o ubicación',
      child: 'La pregunta puede venir disfrazada de curiosidad para "ser amigos".',
      means: 'La escuela, colonia, horarios u ubicación pueden situar físicamente al niño.',
      ask: '¿Preguntó dónde estudias, dónde vives o a qué hora juegas en la tarde?',
      adult: 'Acordar la regla de oro: la escuela, ubicación y rutinas reales nunca se comparten.',
    },
    {
      icon: 'mood_bad',
      title: '“Si no entras, eres mala onda”',
      short: 'Presión emocional',
      child: 'Quiere caerle bien al grupo y evitar verse tímido o grosero.',
      means: 'La presión del grupo no debe forzar la seguridad o incomodidad del niño.',
      ask: '¿Sentiste que tenías que decir que sí para no quedar mal con los demás?',
      adult: 'Reforzar su seguridad: decir "no" con calma no es ser grosero, es ponerse a salvo.',
    },
  ];

  // Component States
  readonly started = signal<boolean>(false);
  readonly finished = signal<boolean>(false);
  readonly currentStep = signal<number>(0);
  
  // Start with first signal selected by default
  readonly selectedSignalIndex = signal<number>(0);
  
  // Track check state for each signal, first is checked by default
  readonly signalsChecked = signal<boolean[]>([true, false, false, false, false, false]);

  // Step 4 Answer Feedback Kind
  readonly selectedChoiceKind = signal<'ok' | 'mid' | 'bad' | null>(null);

  // Toast alert system
  readonly toastText = signal<string>('');
  readonly showToast = signal<boolean>(false);

  // Computations
  readonly activeSignal = computed<SignalCard | null>(() => {
    const idx = this.selectedSignalIndex();
    return this.signals[idx];
  });

  readonly progressPercent = computed(() => {
    return Math.round(((this.currentStep() + 1) / this.steps.length) * 100);
  });

  readonly isAllSignalsChecked = computed(() => {
    return this.signalsChecked().every(checked => checked);
  });

  readonly checkedCount = computed(() => {
    return this.signalsChecked().filter(c => c).length;
  });

  readonly isNextDisabled = computed(() => {
    // Disable Siguiente button on Step 4 if no option is chosen yet
    return this.currentStep() === 3 && this.selectedChoiceKind() === null;
  });

  readonly activeChoiceFeedback = computed(() => {
    const kind = this.selectedChoiceKind();
    if (!kind) return null;

    const feedbackMap = {
      ok: {
        icon: 'check_circle',
        colorClass: 'text-emerald-500 dark:text-emerald-400',
        title: 'Buena primera respuesta',
        desc: 'Primero hiciste que tu hijo se siente seguro para contar. Recuerda: primero se cuida la confianza, después se revisa la configuración y se acuerdan reglas.',
      },
      mid: {
        icon: 'warning',
        colorClass: 'text-amber-500 dark:text-amber-400',
        title: 'Puede servir, pero cuida el tono',
        desc: 'Revisar es importante, pero si suena a interrogatorio policial o regaño implícito, el niño puede ocultar información la próxima vez.',
      },
      bad: {
        icon: 'cancel',
        colorClass: 'text-red-500 dark:text-red-400',
        title: 'Mejor cambiar la reacción',
        desc: 'El pánico o la amenaza de quitar el juego cierran el canal de comunicación. Lo más probable es que el niño prefiera no decirte nada si vuelve a pasar.',
      },
    };

    return feedbackMap[kind];
  });

  start(): void {
    this.started.set(true);
    this.finished.set(false);
    this.currentStep.set(0);
    this.selectedSignalIndex.set(0);
    this.signalsChecked.set([true, false, false, false, false, false]);
    this.selectedChoiceKind.set(null);
  }

  goToStep(index: number): void {
    if (index >= 0 && index < this.steps.length) {
      this.currentStep.set(index);
    }
  }

  nextStep(): void {
    if (this.currentStep() < this.steps.length - 1) {
      this.currentStep.update(s => s + 1);
    } else {
      this.finished.set(true);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update(s => s - 1);
    }
  }

  restart(): void {
    this.started.set(false);
    this.finished.set(false);
    this.currentStep.set(0);
    this.selectedSignalIndex.set(0);
    this.signalsChecked.set([true, false, false, false, false, false]);
    this.selectedChoiceKind.set(null);
  }

  selectSignal(index: number): void {
    this.selectedSignalIndex.set(index);
    this.signalsChecked.update(state => {
      const next = [...state];
      next[index] = true;
      return next;
    });

    const seen = this.checkedCount();
    if (seen === 3) {
      this.triggerToast('Has revisado 3 señales de alerta');
    } else if (seen === 6) {
      this.triggerToast('Has revisado todas las señales');
    }
  }

  chooseChoice(kind: 'ok' | 'mid' | 'bad'): void {
    this.selectedChoiceKind.set(kind);
  }

  async copyText(text: string, message: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.triggerToast(message);
    } catch (err) {
      // Fallback
    }
  }

  private triggerToast(text: string): void {
    this.toastText.set(text);
    this.showToast.set(true);
    setTimeout(() => {
      this.showToast.set(false);
    }, 2000);
  }
}
