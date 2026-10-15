export type CareerEntry = {
  role: string;
  company: string;
  period: string;
  summary: string;
  notes: string[];
  stack: string[];
};

export type Project = {
  name: string;
  description: string;
  tags: string[];
  featured?: boolean;
  github?: string;
  live?: string;
};

export type ContactLink = {
  label: string;
  href: string;
};

export type NavLink = {
  label: string;
  href: string;
};

export type Course = {
  slug: string;
  title: string;
  lectures: LectureSummary[];
};

export type LectureSummary = {
  slug: string;
  title: string;
};

export type Lecture = LectureSummary & {
  markdown: string;
};

export type QuizQuestion = {
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation?: string;
};

export type Quiz = {
  content: QuizQuestion[];
  terms: QuizQuestion[];
};
