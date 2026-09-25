export type AudiobookTextKind = 'body' | 'dialogue' | 'quote' | 'moral';
export type AudiobookPaperTone = 'sunshine' | 'sky' | 'peach' | 'mint' | 'lilac';

export interface AudiobookTextBlock {
  kind?: AudiobookTextKind;
  text: string;
}

export interface AudiobookIllustration {
  src: string;
  alt: string;
  pageNumber?: number;
  objectPosition?: string;
}

export interface AudiobookNarrationSegment {
  text: string;
  pauseMs?: number;
  rate?: number;
  pitch?: number;
}

export interface AudiobookNarration {
  /** MP3 generated for this spread. Keep one file per spread so page navigation stays deterministic. */
  audioSrc?: string;
  /** Human-readable duration shown beside the audio controls, for example "1:08". */
  durationLabel?: string;
  /** Full narration used by the browser-voice fallback when the recorded MP3 is unavailable. */
  fallbackSegments: AudiobookNarrationSegment[];
}

export interface AudiobookSpread {
  id: string;
  kind: 'cover' | 'scene';
  paperTone?: AudiobookPaperTone;
  title?: string;
  lead?: string;
  leftPage: AudiobookIllustration;
  /** Optional second illustration. When omitted, the right-hand page becomes a clean text page. */
  rightPage?: AudiobookIllustration;
  blocks?: AudiobookTextBlock[];
  textTone?: 'dark' | 'light';
  pageLabel: string;
  narration: AudiobookNarration;
}

export interface AudiobookEnding {
  title: string;
  subtitle: string;
  ruleLabel: string;
  rule: string;
  illustration?: AudiobookIllustration;
}

export interface IllustratedAudiobookConfig {
  id: string;
  title: string;
  /** Present the same illustrated reader without narration controls or playback. */
  readingOnly?: boolean;
  collectionLabel?: string;
  accent?: string;
  accentStrong?: string;
  spreads: readonly AudiobookSpread[];
  ending: AudiobookEnding;
}
