import { promises as fs } from "fs";
import path from "path";
import type { Quiz, QuizQuestion } from "@/types";

const MAX_QUESTIONS = 10;
const OPTION_COUNT = 4;
const MIN_TERM_LENGTH = 2;
const MAX_TERM_LENGTH = 50;

export async function getQuiz(
  course: string,
  lecture: string,
  markdown: string
): Promise<Quiz> {
  const file = path.join(
    process.cwd(),
    "content",
    "learn",
    course,
    "quizzes",
    `${lecture}.json`
  );
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(file, "utf8"));
    if (isValidQuiz(parsed)) return parsed;
  } catch {
    // no generated quiz file for this lecture — use the deterministic one
  }
  return buildQuiz(markdown);
}

function isValidQuiz(value: unknown): value is Quiz {
  if (typeof value !== "object" || value === null) return false;
  const quiz = value as Record<string, unknown>;
  return isQuestionArray(quiz.content) && isQuestionArray(quiz.terms);
}

function isQuestionArray(value: unknown): boolean {
  if (!Array.isArray(value)) return false;
  return value.every((question) => {
    if (typeof question !== "object" || question === null) return false;
    const q = question as Record<string, unknown>;
    return (
      typeof q.prompt === "string" &&
      q.prompt.length > 0 &&
      Array.isArray(q.options) &&
      q.options.length >= 2 &&
      q.options.every((option) => typeof option === "string") &&
      typeof q.answerIndex === "number" &&
      Number.isInteger(q.answerIndex) &&
      q.answerIndex >= 0 &&
      q.answerIndex < q.options.length
    );
  });
}

export function buildQuiz(markdown: string): Quiz {
  const lines = markdown.split("\n");
  const { bodyLines, termEntries } = splitSections(lines);
  const termPool = collectBoldTerms(bodyLines);
  return {
    content: buildContentQuestions(bodyLines, termPool),
    terms: buildTermQuestions(termEntries),
  };
}

type TermEntry = {
  term: string;
  definition: string;
};

function splitSections(lines: string[]) {
  const keyTermsIndex = lines.findIndex((line) =>
    /^##\s+Key Terms\s*$/i.test(line)
  );
  const bodyLines = keyTermsIndex === -1 ? lines : lines.slice(0, keyTermsIndex);
  const termsLines =
    keyTermsIndex === -1 ? [] : lines.slice(keyTermsIndex + 1);
  const termEntries = termsLines
    .map(parseTermLine)
    .filter((entry): entry is TermEntry => entry !== null);
  return { bodyLines, termEntries };
}

function parseTermLine(line: string): TermEntry | null {
  const match = line.match(/^-\s+\*\*(.+?)\*\*\s*[—–-]\s*(.+)$/);
  if (!match) return null;
  return { term: cleanText(match[1]), definition: cleanText(match[2]) };
}

function cleanText(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`/g, "")
    .trim();
}

function isTermLike(term: string) {
  return term.length >= MIN_TERM_LENGTH && term.length <= MAX_TERM_LENGTH;
}

function collectBoldTerms(lines: string[]): string[] {
  const terms: string[] = [];
  const seen = new Set<string>();
  let inFence = false;
  for (const line of lines) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const trimmed = line.trim();
    if (/^#{1,6}\s/.test(trimmed) || trimmed.startsWith("|")) continue;
    for (const match of trimmed.matchAll(/\*\*([^*]+?)\*\*/g)) {
      const term = cleanText(match[1]);
      if (!isTermLike(term)) continue;
      const key = term.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      terms.push(term);
    }
  }
  return terms;
}

function buildContentQuestions(
  lines: string[],
  termPool: string[]
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const usedTerms = new Set<string>();
  let inFence = false;
  for (const line of lines) {
    if (questions.length >= MAX_QUESTIONS) break;
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const trimmed = line.trim();
    if (
      !trimmed ||
      /^#{1,6}\s/.test(trimmed) ||
      trimmed.startsWith("|") ||
      /^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)
    ) {
      continue;
    }
    const matches = [...trimmed.matchAll(/\*\*([^*]+?)\*\*/g)];
    if (matches.length !== 1) continue;
    const term = cleanText(matches[0][1]);
    if (!isTermLike(term)) continue;
    const key = term.toLowerCase();
    if (usedTerms.has(key)) continue;
    usedTerms.add(key);

    const sentence = cleanText(trimmed.replace(/^[-*]\s+/, ""));
    const blanked = cleanText(
      trimmed.replace(matches[0][0], "______").replace(/^[-*]\s+/, "")
    );
    const distractors = seededShuffle(
      termPool.filter((candidate) => candidate.toLowerCase() !== key),
      key
    ).slice(0, OPTION_COUNT - 1);
    const options = seededShuffle([term, ...distractors], blanked);
    questions.push({
      prompt: blanked,
      options,
      answerIndex: options.indexOf(term),
      explanation: sentence,
    });
  }
  return questions;
}

function buildTermQuestions(entries: TermEntry[]): QuizQuestion[] {
  return entries.slice(0, MAX_QUESTIONS).map((entry) => {
    const distractors = seededShuffle(
      entries
        .filter(
          (other) =>
            other.term !== entry.term &&
            other.definition !== entry.definition
        )
        .map((other) => other.definition),
      entry.term
    ).slice(0, OPTION_COUNT - 1);
    const options = seededShuffle(
      [entry.definition, ...distractors],
      entry.term
    );
    return {
      prompt: `What is **${entry.term}**?`,
      options,
      answerIndex: options.indexOf(entry.definition),
    };
  });
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
}

function seededShuffle<T>(items: T[], seed: string): T[] {
  const result = [...items];
  let state = hashString(seed) || 1;
  for (let i = result.length - 1; i > 0; i--) {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    const j = state % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

