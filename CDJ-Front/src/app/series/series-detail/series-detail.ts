import { ChangeDetectionStrategy, Component, OnDestroy, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ContentService } from '../../core/services/content.service';
import { RevealDirective } from '../../shared/scroll-reveal/scroll-reveal.directive';
import { ImageEditService } from '../../core/services/image-edit.service';
import { FeatureCardComponent } from '../../shared/feature-card/feature-card';
import { VideoModalComponent } from '../../shared/video-modal/video-modal';
import { PEQUENOS_CIBERNAUTAS_CARDS } from '../../core/data/audience-extensions.data';

interface MemoryCard {
  id: number;
  pairId: number;
  imageUrl: string;
  accessibleText: string;
  isFaceUp: boolean;
  isMatched: boolean;
}

const MEMORY_CARD_TEXT: Record<number, string> = {
  1: 'Pregunta: ¿Quién juega conmigo?',
  2: 'Consejo: Solo mis amigos que conozco en persona.',
  3: 'Pregunta: ¿Qué hago si algo me asusta?',
  4: 'Consejo: Corro a buscar a una persona adulta.',
  5: 'Consejo: Apago y cierro mi sesión.',
  6: 'Pregunta: ¿Puedo hacer clic?',
  7: 'Consejo: Primero pregunto a una persona adulta; así evito virus.',
  8: 'Pregunta: ¿Puedo compartir mis fotos?',
  9: 'Consejo: Primero pido permiso.',
  10: 'Pregunta: ¿Qué hago al terminar de jugar?',
  11: 'Consejo: Es mi secreto; nadie más debe saberlo.',
  12: 'Pregunta: ¿Dónde puedo entrar?',
  13: 'Consejo: Solo donde mi familia me deja.',
  14: 'Consejo: Mejor pongo un dibujo o un avatar.',
  15: 'Pregunta: ¿Uso mi foto en el juego?',
  16: 'Una contraseña protegida y representada con equis.',
  17: 'Tema: Mis datos personales.',
  18: 'Consejo: No digo mi nombre ni dónde vivo.',
  19: 'Pregunta: ¿Qué escribo?',
  20: 'Consejo: Solo digo cosas bonitas y amables.',
};

/** Parejas del memorama consecutivas (1-2, 3-4, 5-6, 7-8, 9-10, 11-12, 13-14, 15-16, 17-18, 19-20). */
const MEMORY_PAIR_IDS: Record<number, number> = {
  1: 1, 2: 1,
  3: 2, 4: 2,
  5: 3, 6: 3,
  7: 4, 8: 4,
  9: 5, 10: 5,
  11: 6, 12: 6,
  13: 7, 14: 7,
  15: 8, 16: 8,
  17: 9, 18: 9,
  19: 10, 20: 10,
};

@Component({
  selector: 'app-series-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, RevealDirective, FeatureCardComponent, VideoModalComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './series-detail.html',
  styleUrl: './series-detail.css',
})
export class SeriesDetailComponent implements OnDestroy {
  private route   = inject(ActivatedRoute);
  private content = inject(ContentService);
  private imgEdit = inject(ImageEditService);

  isPequenosCibernautas = computed(() => this.slug() === 'pequenos-cibernautas');
  memoryCards = signal<MemoryCard[]>(this.createMemoryDeck());
  memoryAttempts = signal(0);
  memoryAnnouncement = signal('Partida lista. Elige una tarjeta para comenzar.');
  isMemoryLocked = signal(false);
  private firstMemoryCardId = signal<number | null>(null);
  private mismatchTimer: ReturnType<typeof setTimeout> | null = null;

  memoryMatches = computed(() => this.memoryCards().filter((card) => card.isMatched).length / 2);
  isMemoryComplete = computed(() => this.memoryMatches() === PEQUENOS_CIBERNAUTAS_CARDS.length / 2);

  selectMemoryCard(cardId: number): void {
    if (this.isMemoryLocked()) return;

    const selectedCard = this.memoryCards().find((card) => card.id === cardId);
    if (!selectedCard || selectedCard.isFaceUp || selectedCard.isMatched) return;

    this.memoryCards.update((cards) => cards.map((card) => (
      card.id === cardId ? { ...card, isFaceUp: true } : card
    )));

    const firstId = this.firstMemoryCardId();
    if (firstId === null) {
      this.firstMemoryCardId.set(cardId);
      this.memoryAnnouncement.set(`${selectedCard.accessibleText} Busca la tarjeta que forma su pareja.`);
      return;
    }

    const firstCard = this.memoryCards().find((card) => card.id === firstId);
    if (!firstCard) return;

    this.memoryAttempts.update((attempts) => attempts + 1);

    if (firstCard.pairId === selectedCard.pairId) {
      this.memoryCards.update((cards) => cards.map((card) => (
        card.id === firstId || card.id === cardId
          ? { ...card, isMatched: true, isFaceUp: true }
          : card
      )));
      this.firstMemoryCardId.set(null);

      const nextMatchCount = this.memoryMatches();
      this.memoryAnnouncement.set(
        nextMatchCount === PEQUENOS_CIBERNAUTAS_CARDS.length / 2
          ? `¡Completaste el memorama en ${this.memoryAttempts()} intentos!`
          : `¡Encontraste la pareja ${selectedCard.pairId}! Llevas ${nextMatchCount} de 10.`,
      );
      return;
    }

    this.isMemoryLocked.set(true);
    this.memoryAnnouncement.set('Estas tarjetas no forman pareja. Obsérvalas: se ocultarán de nuevo.');
    this.mismatchTimer = setTimeout(() => {
      this.memoryCards.update((cards) => cards.map((card) => (
        card.id === firstId || card.id === cardId
          ? { ...card, isFaceUp: false }
          : card
      )));
      this.firstMemoryCardId.set(null);
      this.isMemoryLocked.set(false);
      this.memoryAnnouncement.set('Las tarjetas se ocultaron. Elige otra para continuar.');
      this.mismatchTimer = null;
    }, 1100);
  }

  resetMemoryGame(): void {
    this.clearMismatchTimer();
    this.memoryCards.set(this.createMemoryDeck());
    this.memoryAttempts.set(0);
    this.firstMemoryCardId.set(null);
    this.isMemoryLocked.set(false);
    this.memoryAnnouncement.set('Nueva partida lista. Elige una tarjeta para comenzar.');
  }

  memoryCardAriaLabel(card: MemoryCard, position: number): string {
    if (card.isMatched) return `Tarjeta ${position}, pareja encontrada: ${card.accessibleText}`;
    if (card.isFaceUp) return `Tarjeta ${position}, visible: ${card.accessibleText}`;
    return `Tarjeta ${position}, oculta. Selecciona para voltearla.`;
  }

  private createMemoryDeck(): MemoryCard[] {
    const cards = PEQUENOS_CIBERNAUTAS_CARDS.map((card) => ({
      id: card.id,
      pairId: MEMORY_PAIR_IDS[card.id],
      imageUrl: card.frontImgUrl,
      accessibleText: MEMORY_CARD_TEXT[card.id] ?? `Tarjeta ${card.id}`,
      isFaceUp: false,
      isMatched: false,
    }));

    for (let index = cards.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
    }
    return cards;
  }

  private clearMismatchTimer(): void {
    if (this.mismatchTimer !== null) {
      clearTimeout(this.mismatchTimer);
      this.mismatchTimer = null;
    }
  }

  ngOnDestroy(): void {
    this.clearMismatchTimer();
  }


  resolvedCoverUrl = computed(() => {
    const s = this.serie();
    if (!s) return '';
    return this.imgEdit.getOverride(s.id + '-banner') ?? s.bannerImageUrl ?? '';
  });

  private slug = toSignal(
    this.route.paramMap.pipe(map((p) => p.get('slug') ?? '')),
    { initialValue: '' },
  );

  serie  = computed(() => this.content.getSeriesBySlug(this.slug()));
  videos = computed(() => this.serie()?.videos ?? []);

  /** Video activo para el modal emergente */
  activeVideo = signal<any>(null);

  /** Extrae la URL del thumbnail de alta calidad de YouTube */
  getYoutubeThumb(url: string): string {
    if (!url) return '';
    const trimmed = url.trim();
    if (trimmed.length === 11 && /^[\w-]{11}$/.test(trimmed)) {
      return `https://img.youtube.com/vi/${trimmed}/hqdefault.jpg`;
    }
    let vid = '';
    try {
      const urlObj = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
      if (urlObj.hostname.includes('youtube.com')) {
        vid = urlObj.searchParams.get('v') || '';
      }
    } catch (e) {}
    if (!vid) {
      const match = trimmed.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|\/watch\?v=))([\w-]{11})/);
      vid = match ? match[1] : '';
    }
    if (!vid) {
      const match = trimmed.match(/(?:\/|vi\/|v=)([\w-]{11})(?:[?&]|$)/);
      vid = match ? match[1] : '';
    }
    return vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : '';
  }

  /** Otras series como FeatureCard para usar app-feature-card */
  relatedCards = computed(() => {
    const current = this.serie();
    if (!current) return [];
    return this.content
      .videoSeries()
      .filter((s) => s.id !== current.id)
      .slice(0, 3)
      .map((s) => this.content.seriesAsCard(s));
  });
}
