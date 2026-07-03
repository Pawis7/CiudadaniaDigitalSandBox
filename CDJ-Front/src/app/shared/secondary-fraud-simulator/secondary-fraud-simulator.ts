import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SECONDARY_FRAUD_SIMULATOR_DATA, FraudCase } from '../../core/data/secondary-fraud-simulator.data';

@Component({
  selector: 'app-secondary-fraud-simulator',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './secondary-fraud-simulator.html',
  styleUrl: './secondary-fraud-simulator.css',
})
export class SecondaryFraudSimulatorComponent {
  readonly cases = SECONDARY_FRAUD_SIMULATOR_DATA;

  // Sound control
  readonly soundOn = signal<boolean>(true);

  // Simulation states
  readonly currentCase = signal<FraudCase | null>(null);
  readonly turnIndex = signal<number>(0);
  readonly score = signal<number>(0);
  readonly maxScore = signal<number>(0);
  readonly awaiting = signal<boolean>(false);
  readonly history = signal<any[]>([]);
  readonly scores = signal<Record<string, number>>({}); // caseId -> stars
  readonly coachAlerts = signal<any[]>([]);
  readonly coachDrawerOpen = signal<boolean>(false);
  readonly resultOpen = signal<boolean>(false);
  readonly isTyping = signal<boolean>(false);
  readonly chatMessages = signal<any[]>([]);
  readonly currentOptions = signal<any[]>([]);
  readonly fieldText = signal<string>('Escribe tu mensaje…');
  readonly isFieldPlaceholder = signal<boolean>(true);

  // Result overlay variables
  readonly stars = signal<number>(0);
  readonly tier = signal<string>('');
  readonly face = signal<string>('');
  readonly grad = signal<string>('');
  readonly finalTip = signal<string>('');

  // Mobile game HUD
  readonly lastChoiceLevel = signal<string>('');
  readonly activeMobileFeedback = signal<any | null>(null);
  readonly livesLost = computed(() =>
    Math.min(3, this.history().filter(h => h.level === 'danger').length)
  );

  // Web Audio Context
  private actx: AudioContext | null = null;

  // Get score values mapping
  private getLevelScore(level: string): number {
    const LEVEL_MAP: Record<string, number> = { safe: 2, careful: 1, risky: -1, danger: -2 };
    return LEVEL_MAP[level] ?? 0;
  }

  // Get current system time
  nowTime(): string {
    const d = new Date();
    let h = d.getHours();
    const m = d.getMinutes();
    if (h > 12) h -= 12;
    if (h === 0) h = 12;
    return h + ":" + String(m).padStart(2, "0");
  }

  // Audio synthesis helper
  private playBeep(freq: number, dur: number = 0.07, type: OscillatorType = "sine", vol: number = 0.20): void {
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
    } catch (e) {}
  }

  sndSend() { this.playBeep(660, 0.06, "triangle", 0.18); }
  sndRecv() { this.playBeep(420, 0.08, "sine", 0.18); }
  sndSafe() {
    this.playBeep(523, 0.08, "sine", 0.20);
    setTimeout(() => this.playBeep(784, 0.1, "sine", 0.20), 70);
  }
  sndBad() {
    this.playBeep(200, 0.12, "square", 0.12);
    setTimeout(() => this.playBeep(150, 0.14, "square", 0.12), 90);
  }

  toggleSound(): void {
    this.soundOn.set(!this.soundOn());
    if (this.soundOn()) {
      this.playBeep(660, 0.07, "sine", 0.20);
    }
  }

  // Safety Shield Percentage mapping
  readonly shieldPercent = computed(() => {
    const scoreVal = this.score();
    const maxVal = Math.max(this.maxScore(), 1);
    return Math.max(0, Math.min(100, Math.round(50 + (scoreVal / maxVal) * 50)));
  });

  // Breakdown list for the finish modal
  readonly resultBreakdown = computed(() => {
    const hist = this.history();
    const good = hist.filter(h => h.level === 'safe' || h.level === 'careful');
    const bad = hist.filter(h => h.level === 'risky' || h.level === 'danger');
    const list: { cls: string; ic: string; title: string; text: string }[] = [];

    if (bad.length) {
      bad.slice(-3).forEach(h => {
        list.push({ cls: 'r', ic: '⚠️', title: h.alert.title, text: h.alert.text });
      });
    }
    if (good.length) {
      good.slice(-3).forEach(h => {
        list.push({ cls: 'g', ic: '✅', title: h.alert.title, text: h.alert.text });
      });
    }
    if (bad.length === 0) {
      list.push({ cls: 'g', ic: '🏆', title: 'Sin errores', text: 'No caíste en ninguna trampa. ¡Así se hace!' });
    }
    return list;
  });

  // Start a new case
  async startCase(c: FraudCase): Promise<void> {
    this.currentCase.set(c);
    this.turnIndex.set(0);
    this.score.set(0);
    this.maxScore.set(c.turns.length * 2);
    this.awaiting.set(true);
    this.history.set([]);
    this.coachAlerts.set([]);
    this.chatMessages.set([]);
    this.resultOpen.set(false);
    this.coachDrawerOpen.set(false);
    this.activeMobileFeedback.set(null);
    this.resetField();

    await this.sleep(400);
    await this.botSays(c.intro);
    this.renderOptions();
    this.awaiting.set(false);
  }

  renderOptions(): void {
    const c = this.currentCase();
    if (!c) return;
    const turn = c.turns[this.turnIndex()];
    const order = turn.options.map((_, i) => i);

    // Shuffle options
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    const shuffled = order.map(idx => turn.options[idx]);
    this.currentOptions.set(shuffled);
  }

  async typeIntoField(text: string): Promise<void> {
    this.isFieldPlaceholder.set(false);
    let shown = "";
    for (const ch of text) {
      shown += ch;
      this.fieldText.set(shown);
      if (this.soundOn() && Math.random() < 0.5) {
        this.playBeep(900 + Math.random() * 200, 0.015, "square", 0.015);
      }
      await this.sleep(6 + Math.random() * 8);
    }
    await this.sleep(60);
    this.fieldText.set(text);
  }

  resetField(): void {
    this.isFieldPlaceholder.set(true);
    this.fieldText.set('Escribe tu mensaje…');
  }

  async chooseOption(o: any): Promise<void> {
    if (this.awaiting()) return;
    this.awaiting.set(true);

    await this.typeIntoField(o.txt);
    this.chatMessages.update(msgs => [...msgs, {
      side: 'out',
      text: o.txt,
      time: this.nowTime()
    }]);
    this.sndSend();
    this.resetField();

    // Update score and history
    const gained = this.getLevelScore(o.level);
    this.score.update(s => s + gained);
    this.history.update(h => [...h, { txt: o.txt, level: o.level, alert: o.alert }]);

    this.pushAlert(o.alert);

    // Flash the screen on mobile
    this.lastChoiceLevel.set(o.level);
    setTimeout(() => this.lastChoiceLevel.set(''), 700);

    if (o.level === 'safe' || o.level === 'careful') {
      this.sndSafe();
    } else {
      this.sndBad();
    }

    await this.sleep(400);
    const isMobile = window.innerWidth <= 680;
    if (isMobile) {
      this.activeMobileFeedback.set({
        alert: o.alert,
        level: o.level,
        reply: o.reply
      });
      // Awaiting remains true to block options rendering while feedback is open
    } else {
      await this.botSays(o.reply);

      const nextTurn = this.turnIndex() + 1;
      this.turnIndex.set(nextTurn);
      this.awaiting.set(false);

      const c = this.currentCase();
      if (c && nextTurn >= c.turns.length) {
        this.finish();
      } else {
        this.renderOptions();
      }
    }
  }

  async continueMobileFlow(): Promise<void> {
    const fb = this.activeMobileFeedback();
    if (!fb) return;

    this.activeMobileFeedback.set(null);
    await this.sleep(200);
    await this.botSays(fb.reply);

    const nextTurn = this.turnIndex() + 1;
    this.turnIndex.set(nextTurn);
    this.awaiting.set(false);

    const c = this.currentCase();
    if (c && nextTurn >= c.turns.length) {
      this.finish();
    } else {
      this.renderOptions();
    }
  }

  pushAlert(a: any): void {
    const em = a.type === "safe" ? "✅" : a.type === "danger" ? "🚨" : a.type === "warn" ? "⚠️" : "💡";
    const badge = a.type === "safe" ? "Seguro" : a.type === "danger" ? "Peligro" : a.type === "warn" ? "Cuidado" : "Tip";

    const alertCard = {
      type: a.type,
      em,
      badge,
      title: a.title,
      text: a.text
    };

    this.coachAlerts.update(alerts => [alertCard, ...alerts]);
    // Note: drawer stays closed — user opens it via the FAB button
  }

  async botSays(list: any[]): Promise<void> {
    for (const m of list) {
      if (m.t === "—") continue;
      await this.showTyping(200 + Math.min(m.t.length * 5, 400));
      this.chatMessages.update(msgs => [...msgs, {
        side: 'in',
        text: m.t,
        link: m.link,
        time: this.nowTime()
      }]);
      this.sndRecv();
      await this.sleep(260);
    }
  }

  async showTyping(ms: number): Promise<void> {
    this.isTyping.set(true);
    await this.sleep(ms);
    this.isTyping.set(false);
  }

  openDrawer(): void {
    this.coachDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.coachDrawerOpen.set(false);
  }

  finish(): void {
    const c = this.currentCase();
    if (!c) return;

    const norm = Math.max(0, Math.min(100, Math.round(((this.score() + this.maxScore()) / (2 * this.maxScore())) * 100)));
    let starsCount = 1;
    let tierText = '';
    let faceEmoji = '';
    let gradBg = '';

    if (norm >= 85) {
      starsCount = 3;
      tierText = "Detective Anti-Fraudes 🥇";
      faceEmoji = "😎";
      gradBg = "linear-gradient(145deg,#16a34a,#0c8155)";
    } else if (norm >= 60) {
      starsCount = 2;
      tierText = "Vas por buen camino 👍";
      faceEmoji = "🙂";
      gradBg = "linear-gradient(145deg,#f59e0b,#ea580c)";
    } else {
      starsCount = 1;
      tierText = "Necesitas practicar 💪";
      faceEmoji = "😟";
      gradBg = "linear-gradient(145deg,#ef4444,#b91c1c)";
    }

    this.stars.set(starsCount);
    this.tier.set(tierText);
    this.face.set(faceEmoji);
    this.grad.set(gradBg);
    this.finalTip.set(c.finalTip);

    this.scores.update(s => ({ ...s, [c.id]: starsCount }));
    this.resultOpen.set(true);

    if (starsCount === 3) {
      this.sndSafe();
    } else {
      this.sndBad();
    }
  }

  goHome(): void {
    this.currentCase.set(null);
    this.resultOpen.set(false);
    this.coachDrawerOpen.set(false);
  }

  replay(): void {
    this.resultOpen.set(false);
    const c = this.currentCase();
    if (c) {
      this.startCase(c);
    }
  }

  getStarsString(caseId: string): string {
    const count = this.scores()[caseId];
    return count ? "⭐".repeat(count) : "";
  }

  isCaseDone(caseId: string): boolean {
    return !!this.scores()[caseId];
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(r => setTimeout(r, ms));
  }
}
