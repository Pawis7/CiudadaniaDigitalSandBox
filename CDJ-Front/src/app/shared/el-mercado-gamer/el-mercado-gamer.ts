import { ChangeDetectionStrategy, Component, computed, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MERCADO_GAME_DATA, DiscorMission, DiscorOption } from '../../core/data/el-mercado-gamer.data';

@Component({
  selector: 'app-el-mercado-gamer',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './el-mercado-gamer.html',
  styleUrl:    './el-mercado-gamer.css',
})
export class ElMercadoGamerComponent implements OnDestroy {
  readonly gameData = MERCADO_GAME_DATA;
  readonly missions = MERCADO_GAME_DATA.missions;

  // Screens: 'intro' | 'game' | 'result'
  readonly currentScreen   = signal<'intro' | 'game' | 'result'>('intro');
  readonly showProfileModal = signal<boolean>(false);

  // Profile
  readonly profile = signal<{ name: string; avatar: string }>({ name: 'AlexVector', avatar: 'A' });

  // Game state
  readonly curIndex            = signal<number>(0);
  readonly score               = signal<number>(0);
  readonly answers             = signal<Record<string, DiscorOption>>({});
  readonly activeFeedbackOption = signal<DiscorOption | null>(null);
  readonly foundSignals         = signal<number[]>([]);
  readonly activeDebriefTab     = signal<number>(0);
  readonly copiedRules          = signal<boolean>(false);
  readonly soundOn              = signal<boolean>(true);

  // Toast
  readonly toastText  = signal<string>('');
  readonly showToast  = signal<boolean>(false);

  // Dimensions
  readonly dimensions = signal({ datos: 0, limites: 0, convivencia: 0, ayuda: 0 });

  // Shuffled options
  readonly currentOptions = signal<DiscorOption[]>([]);

  // Audio Context
  private actx: AudioContext | null = null;

  // Computed properties
  readonly currentMission  = computed<DiscorMission>(() => this.missions[this.curIndex()]);
  readonly progressPercent = computed(() => Math.round((this.curIndex() / this.missions.length) * 100));

  readonly finalRank = computed(() => {
    const s = this.score();
    const ranks = this.gameData.results.ranks;
    const rank = ranks.find(r => s >= r.min && s <= r.max);
    
    let emoji = '🧭';
    if (s >= 21) emoji = '🛡️';
    else if (s >= 15) emoji = '🧭';
    else if (s >= 8) emoji = '💬';
    else emoji = '⚠️';

    const base = rank || ranks[ranks.length - 1];
    return {
      icon: emoji,
      title: base.title,
      desc: base.desc
    };
  });

  // Normalization for the 4 dimensions based on maximum possible scores:
  // datos: 8 (M1+M5), limites: 4 (M3), convivencia: 8 (M2+M4), ayuda: 4 (M6)
  readonly dimensionScores = computed(() => {
    const d = this.dimensions();
    return {
      datos: Math.min(100, Math.max(0, Math.round((d.datos / 8) * 100))),
      limites: Math.min(100, Math.max(0, Math.round((d.limites / 4) * 100))),
      convivencia: Math.min(100, Math.max(0, Math.round((d.convivencia / 8) * 100))),
      ayuda: Math.min(100, Math.max(0, Math.round((d.ayuda / 4) * 100))),
    };
  });

  // Typing Simulator Effect
  readonly visiblePostCount = signal<number>(0);
  readonly typedTexts = signal<Record<number, string>>({});
  readonly isTyping = signal<boolean>(false);
  readonly typingUser = signal<string>('');
  readonly typingAvatar = signal<string>('');
  private typingTimer: any = null;
  private typingInterval: any = null;
  private lastTypingMissionId: string = '';

  constructor() {
    // Angular effect to shuffle options on index/screen change, and cancel TTS
    effect(() => {
      if (this.currentScreen() === 'game') {
        const mission = this.currentMission();
        this.currentOptions.set(this.shuffleArray([...mission.options]));
        if (this.lastTypingMissionId !== mission.id) {
          this.lastTypingMissionId = mission.id;
          setTimeout(() => this.startMissionTypingSequence(), 60);
        }
      }

      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    });
  }

  ngOnDestroy(): void {
    this.clearTypingTimers();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // ---- Typing Engine ----
  startMissionTypingSequence(): void {
    this.clearTypingTimers();
    this.visiblePostCount.set(0);
    this.typedTexts.set({});
    this.isTyping.set(false);

    const posts = this.currentMission().posts;
    if (!posts || posts.length === 0) return;

    this.typeNextPost(0);
  }

  private clearTypingTimers(): void {
    if (this.typingTimer) {
      clearTimeout(this.typingTimer);
      this.typingTimer = null;
    }
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
  }

  private typeNextPost(postIndex: number): void {
    const posts = this.currentMission().posts;
    if (postIndex >= posts.length) {
      this.isTyping.set(false);
      return;
    }

    const post = posts[postIndex];

    if (post.type === 'system') {
      this.visiblePostCount.set(postIndex + 1);
      this.typedTexts.update(map => ({ ...map, [postIndex]: post.text }));
      this.typingTimer = setTimeout(() => this.typeNextPost(postIndex + 1), 250);
      return;
    }

    const author = ('from' in post && post.from) ? post.from : 'NovaRush';
    const avatar = ('avatar' in post && post.avatar) ? post.avatar : 'N';

    this.isTyping.set(true);
    this.typingUser.set(author);
    this.typingAvatar.set(avatar);

    this.typingTimer = setTimeout(() => {
      this.isTyping.set(false);
      this.visiblePostCount.set(postIndex + 1);

      if (post.type === 'text') {
        const fullText = post.text;
        let charIdx = 0;
        const speed = 16;

        this.typingInterval = setInterval(() => {
          charIdx++;
          const currentSub = fullText.slice(0, charIdx);
          this.typedTexts.update(map => ({ ...map, [postIndex]: currentSub }));

          if (charIdx % 6 === 0) {
            this.playBeep(380 + (charIdx % 4) * 30, 0.015, 'sine', 0.02);
          }

          if (charIdx >= fullText.length) {
            clearInterval(this.typingInterval);
            this.typingInterval = null;
            this.typingTimer = setTimeout(() => this.typeNextPost(postIndex + 1), 350);
          }
        }, speed);
      } else {
        this.typingTimer = setTimeout(() => this.typeNextPost(postIndex + 1), 450);
      }
    }, 450);
  }

  skipTyping(): void {
    this.clearTypingTimers();
    const posts = this.currentMission().posts;
    if (!posts) return;

    this.isTyping.set(false);
    this.visiblePostCount.set(posts.length);

    const fullMap: Record<number, string> = {};
    posts.forEach((p, idx) => {
      if ('text' in p && p.text) {
        fullMap[idx] = p.text;
      }
    });
    this.typedTexts.set(fullMap);
  }

  // Utility to shuffle array
  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }


  // ---- Audio ----
  private playBeep(freq: number, dur = 0.08, type: OscillatorType = 'sine', vol = 0.18): void {
    if (!this.soundOn()) return;
    try {
      this.actx = this.actx || new (window.AudioContext || (window as any).webkitAudioContext)();
      const o = this.actx.createOscillator();
      const g = this.actx.createGain();
      o.type = type;
      o.frequency.value = freq;
      o.connect(g);
      g.connect(this.actx.destination);
      g.gain.setValueAtTime(vol, this.actx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, this.actx.currentTime + dur);
      o.start();
      o.stop(this.actx.currentTime + dur);
    } catch { }
  }

  sndGood() { this.playBeep(660, 0.07, 'triangle', 0.14); setTimeout(() => this.playBeep(784, 0.09, 'sine', 0.14), 65); }
  sndBad()  { this.playBeep(200, 0.12, 'square',   0.10); setTimeout(() => this.playBeep(150, 0.14, 'square', 0.10), 90); }
  sndNav()  { this.playBeep(420, 0.06, 'sine',     0.12); }
  sndSig()  { this.playBeep(520, 0.06, 'sine',     0.14); setTimeout(() => this.playBeep(660, 0.08, 'sine', 0.12), 60); }

  toggleSound(): void {
    this.soundOn.set(!this.soundOn());
    if (this.soundOn()) this.sndNav();
  }

  // ---- Speech voice note synthesizer ----
  playVoice(text: string): void {
    if (!this.soundOn()) return;
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.includes('es-MX')) || voices.find(v => v.lang.startsWith('es'));
    if (esVoice) {
      utterance.voice = esVoice;
    }
    utterance.lang = 'es-MX';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    this.sndNav();
  }

  // ---- Profile ----
  openProfileSelection(): void { this.showProfileModal.set(true); }
  selectProfile(name: string, avatar: string): void { this.profile.set({ name, avatar }); }
  confirmProfile(): void {
    this.showProfileModal.set(false);
    this.currentScreen.set('game');
    this.curIndex.set(0);
    this.sndNav();
  }

  // ---- Interactive Choices ----
  chooseOption(option: DiscorOption): void {
    if (this.activeFeedbackOption()) return;
    this.activeFeedbackOption.set(option);
    this.answers.update(curr => ({ ...curr, [this.currentMission().id]: option }));
    this.score.update(s => s + option.points);
    this.dimensions.update(d => ({
      datos:       d.datos       + (option.dims.datos || 0),
      limites:     d.limites     + (option.dims.limites || 0),
      convivencia: d.convivencia + (option.dims.convivencia || 0),
      ayuda:       d.ayuda       + (option.dims.ayuda || 0),
    }));

    // Unlock signal after response selection (anti-pistas v3)
    const idx = this.curIndex();
    if (!this.foundSignals().includes(idx)) {
      this.foundSignals.update(fs => [...fs, idx]);
      this.triggerToast(this.currentMission().signals[0] || 'Señal detectada');
    }

    if (option.level === 'best' || option.level === 'good') this.sndGood();
    else this.sndBad();
  }

  nextStep(): void {
    const next = this.curIndex() + 1;
    this.activeFeedbackOption.set(null);
    if (next < this.missions.length) {
      this.curIndex.set(next);
      this.sndNav();
    } else {
      this.currentScreen.set('result');
      this.activeDebriefTab.set(0);
      this.sndSig();
    }
  }

  restartGame(): void {
    this.score.set(0);
    this.curIndex.set(0);
    this.answers.set({});
    this.activeFeedbackOption.set(null);
    this.dimensions.set({ datos: 0, limites: 0, convivencia: 0, ayuda: 0 });
    this.foundSignals.set([]);
    this.copiedRules.set(false);
    this.currentScreen.set('intro');
  }

  copyRulesText(): void {
    const txt =
      '4 reglas de mercado seguro:\n' +
      '1) Si hay prisa por cerrar el trato o mandar dinero, haz una pausa. La prisa es el arma del estafador.\n' +
      '2) Si te piden códigos SMS, contraseñas o enlaces de confirmación, sospecha. Ningún trato requiere comprometer la seguridad de tu cuenta.\n' +
      '3) Si te proponen pagar fuera de la plataforma ("amigos y familiares", transferencia directa), detente. Pierdes la protección ante reclamos.\n' +
      '4) Si un trato sale mal, no busques venganza exponiendo datos. Guarda evidencia, reporta internamente y busca apoyo de confianza.';
    navigator.clipboard.writeText(txt)
      .then(() => { this.copiedRules.set(true); setTimeout(() => this.copiedRules.set(false), 2000); })
      .catch(() => {});
  }

  private triggerToast(text: string): void {
    this.toastText.set(text);
    this.showToast.set(true);
    this.sndSig();
    setTimeout(() => this.showToast.set(false), 2800);
  }

  // ---- Helpers ----
  getChannelName(i: number): string {
    return this.missions[i]?.channel ?? 'chat';
  }
  
  getChannelTime(i: number): string {
    return ['12:04', '12:07', '12:10', '12:12', '12:15', '12:18'][i] ?? 'ahora';
  }

  getIconForLevel(level: string): string {
    return { best: '✅', good: '✅', partial: '🟡', risk: '🟠', danger: '🔴' }[level] ?? '⬜';
  }
  
  getLabelForLevel(level: string): string {
    return {
      best: 'Decisión prudente',
      good: 'Decisión útil',
      partial: 'Parcialmente útil',
      risk: 'Riesgo detectado',
      danger: 'Alto riesgo'
    }[level] ?? '';
  }
  
  getClassForLevel(level: string): string {
    return level === 'best' ? 'fb-best' : level === 'good' ? 'fb-good' : level === 'partial' ? 'fb-partial' : level === 'risk' ? 'fb-risk' : 'fb-danger';
  }
}
