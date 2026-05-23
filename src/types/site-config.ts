export type Photo = {
  src: string;
  alt: string;
  title: string;
  caption: string;
  featured?: boolean;
};

export type QuizAnswer =
  | { type: "name"; value: string }
  | { type: "full-date"; day: number; month: number; year: number }
  | { type: "day-month"; day: number; month: number };

export type QuizQuestionConfig = {
  id: string;
  question: string;
  answer: QuizAnswer;
};

export type QualityItem = {
  icon: string;
  title: string;
  description?: string;
};

export type SiteConfig = {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  couple: {
    fromName: string;
    toName: string;
    toNameLines: string[];
    footerTagline?: string;
  };
  quiz: {
    questions: QuizQuestionConfig[];
  };
  quizGate: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    successTitle: string;
    successSubtitle: string;
    footerCredit: string;
  };
  hero: {
    eyebrow: string;
    subtitle: string;
  };
  story: {
    sectionLabel: string;
    titleHighlight: string;
    paragraphs: string[];
    quote: string;
  };
  qualities: {
    sectionLabel: string;
    titleHighlight: string;
    subtitle?: string;
    items: QualityItem[];
  };
  gallery: {
    sectionLabel: string;
    titleHighlight: string;
    subtitle: string;
    photos: Photo[];
  };
  letter: {
    sectionLabel: string;
    titleHighlight: string;
    paragraphs: string[];
    closing: string;
  };
};
