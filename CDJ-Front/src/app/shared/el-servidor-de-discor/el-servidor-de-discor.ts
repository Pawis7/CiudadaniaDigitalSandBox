import { ChangeDetectionStrategy, Component, computed, signal, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DISCOR_GAME_DATA, DiscorMission, DiscorOption } from '../../core/data/el-servidor-de-discor.data';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

@Component({
  selector: 'app-el-servidor-de-discor',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './el-servidor-de-discor.html',
  styleUrl: './el-servidor-de-discor.css',
})
export class ElServidorDeDiscorComponent implements OnDestroy {
  readonly gameData = DISCOR_GAME_DATA;
  readonly missions = DISCOR_GAME_DATA.missions;

  // Screens: 'intro' | 'game' | 'result'
  readonly currentScreen = signal<'intro' | 'game' | 'result'>('intro');
  readonly showProfileModal = signal<boolean>(false);

  // Typing Simulator Effect
  readonly visiblePostCount = signal<number>(0);
  readonly typedTexts = signal<Record<number, string>>({});
  readonly isTyping = signal<boolean>(false);
  readonly typingUser = signal<string>('');
  readonly typingAvatar = signal<string>('');
  private typingTimer: any = null;
  private typingInterval: any = null;
  private lastTypingMissionId: string = '';

  // Poster Image Sources with automatic fallback chain
  readonly posterSources = [
    '/banners/CD_DiscorPoster.webp',
    '/banners/el-servidor-de-discor-poster.svg'
  ];
  readonly posterIndex = signal<number>(0);
  readonly posterSrc = computed(() => this.posterSources[this.posterIndex()]);
  readonly usePosterImage = signal<boolean>(false);

  onPosterImageError(): void {
    if (this.posterIndex() < this.posterSources.length - 1) {
      this.posterIndex.update(i => i + 1);
    } else {
      this.usePosterImage.set(false);
    }
  }

  // Profile selection
  readonly profile = signal<{ name: string; avatar: string }>({ name: 'AlexVector', avatar: 'A' });

  // Game state
  readonly curIndex = signal<number>(0);
  readonly score = signal<number>(0);
  readonly answers = signal<Record<string, DiscorOption>>({});
  readonly activeFeedbackOption = signal<DiscorOption | null>(null);
  readonly foundSignals = signal<number[]>([]);
  readonly activeDebriefTab = signal<number>(0);
  readonly copiedRules = signal<boolean>(false);
  readonly soundOn = signal<boolean>(true);

  // Toast notifications
  readonly toastText = signal<string>('');
  readonly showToast = signal<boolean>(false);

  // Accumulators for dimensions
  readonly dimensions = signal({ datos: 0, limites: 0, convivencia: 0, ayuda: 0 });

  // Shuffled options for the active mission
  readonly currentOptions = signal<DiscorOption[]>([]);

  // Web Audio Context
  private actx: AudioContext | null = null;

  // Computed properties
  readonly currentMission = computed<DiscorMission>(() => this.missions[this.curIndex()]);
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

  // Calculate percentage scores for each dimension
  // Max possible: datos: 3, limites: 5, convivencia: 4, ayuda: 5
  readonly dimensionScores = computed(() => {
    const d = this.dimensions();
    return {
      datos: Math.min(100, Math.max(0, Math.round((d.datos / 3) * 100))),
      limites: Math.min(100, Math.max(0, Math.round((d.limites / 5) * 100))),
      convivencia: Math.min(100, Math.max(0, Math.round((d.convivencia / 4) * 100))),
      ayuda: Math.min(100, Math.max(0, Math.round((d.ayuda / 5) * 100))),
    };
  });

  constructor() {
    // Shuffling options and running typing sequence when active mission changes
    effect(() => {
      if (this.currentScreen() === 'game') {
        const mission = this.currentMission();
        this.currentOptions.set(shuffleArray(mission.options));
        if (this.lastTypingMissionId !== mission.id) {
          this.lastTypingMissionId = mission.id;
          setTimeout(() => this.startMissionTypingSequence(), 60);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.clearTypingTimers();
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
      this.typingTimer = setTimeout(() => this.typeNextPost(postIndex + 1), 100);
      return;
    }

    // Determine author & avatar for Discord typing indicator
    const author = ('from' in post && post.from) ? post.from : 'NovaRush';
    const avatar = ('avatar' in post && post.avatar) ? post.avatar : 'N';

    // Show "User is typing..." indicator
    this.isTyping.set(true);
    this.typingUser.set(author);
    this.typingAvatar.set(avatar);

    // After brief typing indicator delay (e.g. 150ms), reveal post and type out text
    this.typingTimer = setTimeout(() => {
      this.isTyping.set(false);
      this.visiblePostCount.set(postIndex + 1);

      if (post.type === 'text') {
        const fullText = post.text;
        let charIdx = 0;
        const speed = 6; // ms per character

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
            this.typingTimer = setTimeout(() => this.typeNextPost(postIndex + 1), 100);
          }
        }, speed);
      } else {
        // Voice or Image embed post
        this.typingTimer = setTimeout(() => this.typeNextPost(postIndex + 1), 150);
      }
    }, 150);
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

  // ---- Audio Synthesizer ----
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

  // ---- Profile Flow ----
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
      datos: d.datos + (option.dims.datos || 0),
      limites: d.limites + (option.dims.limites || 0),
      convivencia: d.convivencia + (option.dims.convivencia || 0),
      ayuda: d.ayuda + (option.dims.ayuda || 0),
    }));

    const idx = this.curIndex();
    if (!this.foundSignals().includes(idx)) {
      this.foundSignals.update(fs => [...fs, idx]);
      // Alert/toast showing signal text
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

  // Audio Playback simulation for voice messages
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

  copyRulesText(): void {
    const txt =
      'Reglas del Squad gamer:\n' +
      '1) Si hay prisa, pausa.\n' +
      '2) Si hay secreto, sospecha.\n' +
      '3) Si piden datos, voz, foto o pago, verifica.\n' +
      '4) Si algo te incomoda, sal y busca apoyo.';
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

  // Helper formatting channel names and times
  getChannelName(i: number): string {
    return this.missions[i]?.channel || '#canal';
  }

  getChannelTime(i: number): string {
    return ['16:02', '16:05', '16:08', '16:11', '16:15', '16:19'][i] ?? 'ahora';
  }

  getIconForLevel(level: string): string {
    return { best: '✅', good: '🟡', partial: '🟡', risk: '🟠', danger: '🔴' }[level] ?? '⬜';
  }

  getLabelForLevel(level: string): string {
    return {
      best: 'Buena jugada',
      good: 'Vas bien',
      partial: 'Puede servir, pero...',
      risk: 'Ojo, riesgo',
      danger: 'Alto riesgo'
    }[level] ?? '';
  }

  getClassForLevel(level: string): string {
    return 'fb-' + level;
  }
}
