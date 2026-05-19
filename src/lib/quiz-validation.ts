import type { QuizAnswer } from "@/types/site-config";

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

function matchesName(answer: string, name: string): boolean {
  return normalize(answer) === normalize(name);
}

export function validateQuizAnswer(answer: string, expected: QuizAnswer): boolean {
  switch (expected.type) {
    case "name":
      return matchesName(answer, expected.value);
    case "full-date":
      return matchesFullDate(
        answer,
        expected.day,
        expected.month,
        expected.year
      );
    case "day-month":
      return matchesDayMonth(answer, expected.day, expected.month);
    default:
      return false;
  }
}

export function quizStorageKey(slug: string): string {
  return `${slug}-quiz-unlocked`;
}
