export type QuizQuestion = {
  id: string;
  question: string;
  validate: (answer: string) => boolean;
};

function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "")
    .replace(/[.\-]/g, "/");
}

function parseParts(value: string): number[] {
  const normalized = normalize(value);
  const slashParts = normalized.split("/").filter(Boolean);
  if (slashParts.length >= 2) {
    return slashParts.map((p) => parseInt(p, 10));
  }
  const digits = normalized.replace(/\D/g, "");
  if (digits.length === 8) {
    return [
      parseInt(digits.slice(0, 2), 10),
      parseInt(digits.slice(2, 4), 10),
      parseInt(digits.slice(4), 10),
    ];
  }
  if (digits.length === 4) {
    return [parseInt(digits.slice(0, 2), 10), parseInt(digits.slice(2), 10)];
  }
  return [];
}

function matchesFullDate(
  answer: string,
  day: number,
  month: number,
  year: number
): boolean {
  const parts = parseParts(answer);
  if (parts.length !== 3) return false;
  const [d, m, y] = parts;
  return d === day && m === month && y === year;
}

function matchesDayMonth(answer: string, day: number, month: number): boolean {
  const parts = parseParts(answer);
  if (parts.length < 2) return false;
  const [d, m] = parts;
  return d === day && m === month;
}

export const QUIZ_STORAGE_KEY = "ana-livia-quiz-unlocked";

function matchesName(answer: string, name: string): boolean {
  return normalize(answer) === normalize(name);
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "his-name",
    question: "Qual é o nome de quem fez este presente para você?",
    validate: (answer) => matchesName(answer, "luiz"),
  },
  {
    id: "luiz-birthday",
    question: "Qual é o aniversário do Luiz?",
    validate: (answer) => matchesFullDate(answer, 7, 11, 2008),
  },
  {
    id: "ana-birthday",
    question: "Qual é o aniversário da Ana Lívia?",
    validate: (answer) => matchesFullDate(answer, 14, 2, 2009),
  },
  {
    id: "together-date",
    question: "Em que data vocês ficaram pela primeira vez?",
    validate: (answer) => matchesDayMonth(answer, 5, 3),
  },
];
