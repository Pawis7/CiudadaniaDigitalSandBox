export interface IllustratedActivityImage {
  src: string;
  alt: string;
}

export interface IllustratedActivityChoice {
  id: string;
  label: string;
  feedback: string;
  correct: boolean;
}

export interface IllustratedActivityEvidence {
  id: string;
  label: string;
  text: string;
}

export interface IllustratedActivityScene {
  id: string;
  title: string;
  image: IllustratedActivityImage;
  paragraphs: string[];
  prompt: string;
  choices: IllustratedActivityChoice[];
  takeaway: string;
  paperTone?: 'sunshine' | 'sky' | 'peach' | 'mint' | 'lilac';
  evidence?: IllustratedActivityEvidence[];
  requiredEvidenceIds?: string[];
}

export interface IllustratedActivityConfig {
  id: string;
  title: string;
  ageLabel: string;
  intro: string;
  cover: IllustratedActivityImage;
  scenes: IllustratedActivityScene[];
  ending: {
    title: string;
    message: string;
    rule: string;
    image: IllustratedActivityImage;
  };
  sources?: { label: string; url: string }[];
}
