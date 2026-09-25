import { ChangeDetectionStrategy, Component, computed, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PERFIL_FANTASMA_DATA, GhostMission, GhostChoice, GhostChatMessage } from '../../core/data/perfil-fantasma.data';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

@Component({
  selector: 'app-perfil-fantasma',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './perfil-fantasma.html',
  styleUrl: './perfil-fantasma.css',
})
export class PerfilFantasmaComponent {
  readonly data = PERFIL_FANTASMA_DATA;
  readonly missions = this.data.missions;

  readonly started = signal(false);
  readonly finished = signal(false);
  readonly currentMomentIndex = signal(0);
  readonly copied = signal(false);
  readonly muted = signal(false);

  // Profile selector inside phone screen state
  readonly profileSelectionActive = signal(false);
  readonly selectedProfile = signal({ name: 'Tú', avatar: 'T' });

  // Store selected option for each mission
  readonly answers = signal<Record<string, GhostChoice>>({});

  // Scrambled options for the current mission
  readonly currentOptions = signal<GhostChoice[]>([]);

  // Feedback and typing simulation states
  readonly isTyping = signal(false);
  readonly activeFeedbackChoice = signal<GhostChoice | null>(null);

  // Active chat feed messages
  readonly activeFeed = signal<GhostChatMessage[]>([]);

  // Debrief Tab State (0 to 4)
  readonly activeTab = signal(0);

  // Audio Context for beeps
  private audioCtx: AudioContext | null = null;

  readonly showScrollIndicator = signal(false);

  // Computations
  readonly currentMoment = computed<GhostMission>(() => {
    return this.missions[this.currentMomentIndex()];
  });

  readonly progressPercent = computed(() => {
    return Math.round((this.currentMomentIndex() / this.missions.length) * 100);
  });

  readonly totalScore = computed(() => {
    return Object.values(this.answers()).reduce((sum, ans) => sum + ans.points, 0);
  });

  // Calculate scores for each dimension (Max: agencia=10, privacidad=8, apoyo=2, comunidad=8)
  readonly dimensionScores = computed(() => {
    let agencia = 0;
    let privacidad = 0;
    let apoyo = 0;
    let comunidad = 0;

    for (const ans of Object.values(this.answers())) {
      agencia += ans.dims.agencia;
      privacidad += ans.dims.privacidad;
      apoyo += ans.dims.apoyo;
      comunidad += ans.dims.comunidad;
    }

    return {
      agencia: Math.min(100, Math.round((agencia / 10) * 100)),
      privacidad: Math.min(100, Math.round((privacidad / 8) * 100)),
      apoyo: Math.min(100, Math.round((apoyo / 2) * 100)),
      comunidad: Math.min(100, Math.round((comunidad / 8) * 100)),
    };
  });

  // Final diagnostic computed
  readonly finalDiagnostic = computed(() => {
    const score = this.totalScore();
    const result = this.data.results.find(r => score >= r.min && score <= r.max);

    let colorClass = "border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-rose-800 dark:text-rose-200";
    if (score >= 21) {
      colorClass = "border-emerald-200 dark:border-emerald-900/40 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-200";
    } else if (score >= 15) {
      colorClass = "border-sky-200 dark:border-sky-900/40 bg-sky-50 dark:bg-sky-950/20 text-sky-800 dark:text-sky-200";
    } else if (score >= 9) {
      colorClass = "border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-200";
    }

    const base = result || this.data.results[3];
    return { ...base, colorClass };
  });

  // List of unlocked signal items
  readonly unlockedSignals = computed(() => {
    const list: string[] = [];
    this.missions.forEach((m) => {
      const choice = this.answers()[m.id];
      if (choice && choice.level === 'best') {
        list.push(m.signal_revealed);
      } else {
        list.push(m.signal_locked);
      }
    });
    return list;
  });

  constructor() {
    // Sync option shuffling and active feed when switching moments
    effect(() => {
      if (this.started() && !this.finished()) {
        const moment = this.currentMoment();
        this.currentOptions.set(shuffleArray(moment.choices));
        this.activeFeed.set([...moment.feed]);

        // Scroll the chat feed to the top
        setTimeout(() => {
          const feedEl = document.querySelector('.wa-chat') as HTMLElement;
          if (feedEl) {
            feedEl.scrollTop = 0;
            const hasScroll = feedEl.scrollHeight > feedEl.clientHeight;
            this.showScrollIndicator.set(hasScroll);
          }
        }, 50);
      }
    });
  }

  beep(type: 'click' | 'good' | 'bad' | 'signal' = 'click'): void {
    if (this.muted()) return;
    try {
      this.audioCtx = this.audioCtx || new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = this.audioCtx.createOscillator();
      const g = this.audioCtx.createGain();
      o.connect(g);
      g.connect(this.audioCtx.destination);
      o.type = 'sine';
      o.frequency.value = type === 'good' ? 660 : type === 'bad' ? 220 : type === 'signal' ? 520 : 360;

      g.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.28, this.audioCtx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.25);

      o.start();
      o.stop(this.audioCtx.currentTime + 0.25);
    } catch {
      // fail silently
    }
  }

  onChatScroll(event: Event): void {
    const el = event.target as HTMLElement;
    const hasScrollbar = el.scrollHeight > el.clientHeight;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    this.showScrollIndicator.set(hasScrollbar && !isNearBottom);
  }

  start(): void {
    this.profileSelectionActive.set(true);
  }

  confirmProfile(name: string, avatar: string): void {
    this.selectedProfile.set({ name, avatar });
    this.profileSelectionActive.set(false);
    this.started.set(true);
    this.finished.set(false);
    this.currentMomentIndex.set(0);
    this.answers.set({});
    this.activeFeedbackChoice.set(null);
    this.isTyping.set(false);
    this.copied.set(false);
    this.activeTab.set(0);
    this.beep('click');
  }

  restart(): void {
    this.started.set(false);
    this.profileSelectionActive.set(false);
    this.finished.set(false);
    this.currentMomentIndex.set(0);
    this.answers.set({});
    this.activeFeedbackChoice.set(null);
    this.isTyping.set(false);
    this.copied.set(false);
    this.activeTab.set(0);
  }

  choose(choice: GhostChoice): void {
    if (this.finished() || this.isTyping() || this.activeFeedbackChoice()) return;

    this.beep('click');

    // Append the user's choice to the active feed
    const lastMsg = this.activeFeed()[this.activeFeed().length - 1];
    const time = lastMsg ? lastMsg.time : '18:02';
    const myMsg: GhostChatMessage = {
      from: 'me',
      name: this.selectedProfile().name,
      role: '',
      letter: this.selectedProfile().avatar,
      avatarClass: 'av-green',
      text: choice.sentText || choice.text,
      time: time,
      isMe: true
    };
    this.activeFeed.update(feed => [...feed, myMsg]);

    // Scroll to bottom after sending
    setTimeout(() => {
      const feedEl = document.querySelector('.wa-chat');
      if (feedEl) {
        feedEl.scrollTop = feedEl.scrollHeight;
      }
    }, 20);

    this.isTyping.set(true);

    setTimeout(() => {
      this.isTyping.set(false);
      this.activeFeedbackChoice.set(choice);

      this.answers.update((curr) => ({
        ...curr,
        [this.currentMoment().id]: choice
      }));

      // Play sound depending on correctness
      setTimeout(() => {
        this.beep(choice.level === 'best' || choice.level === 'good' ? 'good' : 'bad');
        // Play signal unlock sound
        setTimeout(() => this.beep('signal'), 300);
      }, 50);

      // Scroll to bottom after mobile panel open
      setTimeout(() => {
        const feedEl = document.querySelector('.wa-chat');
        if (feedEl) {
          feedEl.scrollTop = feedEl.scrollHeight;
        }
      }, 100);

    }, 1200);
  }

  continueFlow(): void {
    const active = this.activeFeedbackChoice();
    if (!active) return;

    this.beep('click');

    if (this.currentMomentIndex() === this.missions.length - 1) {
      this.finished.set(true);
      return;
    }

    this.currentMomentIndex.update((idx) => idx + 1);
    this.activeFeedbackChoice.set(null);
  }

  toggleMute(): void {
    this.muted.update(val => !val);
    if (!this.muted()) {
      this.beep('click');
    }
  }

  setTab(idx: number): void {
    this.beep('click');
    this.activeTab.set(idx);
  }

  nextTab(): void {
    this.beep('click');
    if (this.activeTab() < 4) {
      this.activeTab.update(t => t + 1);
    } else {
      this.activeTab.set(0);
    }
  }

  async copyQuickRules(): Promise<void> {
    const text = `Ciudadanía Digital Jalisco · CDJ-GAME-P05 · Perfil fantasma
Guía rápida de privacidad, voz y límites para estudiantes de bachillerato

1. La idea central:
- Privacidad no es desaparecer: es decidir qué compartes, con quién y para qué.
- Cambiar tu perfil o usar cuentas alternativas son herramientas válidas, no obligaciones.

2. Cuatro cosas para mirar en un servidor:
- Perfil: Avatar, nick, historial, estado y datos visibles.
- Voz: Micro, push-to-talk, comentarios personales y presión para hablar.
- DMs: Solicitudes de redes, nombre real, fotos o contacto externo.
- Reglas: Qué modera el grupo y qué deja como “cada quien se cuida”.

3. Frases útiles:
- “Prefiero mantener esto dentro del servidor.”
- “Hablemos de la partida, no de mi voz.”
- “Para jugar no necesito compartir redes, foto, nombre o datos personales.”
- “Que pase mucho no significa que esté bien.”
- “Si esto sigue, usemos el canal de reporte o avisemos a moderación.”

4. Recomendaciones rápidas:
- Revisa DMs, menciones, invitaciones, visibilidad de perfil y voz antes de que haya problemas.
- Usa privacidad como control fino: no todo tiene que estar abierto ni cerrado.
- No juzgues a quien usa un perfil discreto; es una estrategia de cuidado.
- Si el hostigamiento se repite, hacen falta reglas de moderación comunitarias.`;

    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      // Ignore
    }
  }
}
