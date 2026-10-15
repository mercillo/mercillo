"use client";

import { useState } from "react";
import type { Quiz, QuizQuestion } from "@/types";

type Section = {
  id: string;
  label: string;
  questions: QuizQuestion[];
};

export default function Quiz({ quiz }: { quiz: Quiz }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const sections: Section[] = [
    { id: "content", label: "Content quiz", questions: quiz.content },
    { id: "terms", label: "Terms quiz", questions: quiz.terms },
  ].filter((section) => section.questions.length > 0);

  if (sections.length === 0) {
    return (
      <section aria-label="Quiz" className="mt-16 border-t border-line pt-12">
        <h2 className="text-2xl font-bold text-foreground">Quiz</h2>
        <p className="mt-4 text-muted">
          No quiz available for this lecture yet.
        </p>
      </section>
    );
  }

  const select = (questionId: string, optionIndex: number) => {
    setAnswers((current) =>
      current[questionId] === undefined
        ? { ...current, [questionId]: optionIndex }
        : current
    );
  };

  return (
    <section
      aria-label="Quiz"
      className="mt-16 border-t border-line pt-12"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Quiz</h2>
        <button
          type="button"
          onClick={() => setAnswers({})}
          disabled={Object.keys(answers).length === 0}
          className="rounded-md border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-foreground disabled:opacity-40"
        >
          Retry
        </button>
      </div>

      {sections.map((section) => {
        const correct = section.questions.filter(
          (question, index) =>
            answers[`${section.id}-${index}`] === question.answerIndex
        ).length;
        return (
          <div key={section.id} className="mt-8">
            <h3 className="text-base font-semibold text-foreground">
              {section.label}{" "}
              <span className="font-normal text-subtle">
                {correct}/{section.questions.length}
              </span>
            </h3>
            {section.questions.map((question, index) => {
              const questionId = `${section.id}-${index}`;
              return (
                <Question
                  key={questionId}
                  question={question}
                  selected={answers[questionId]}
                  onSelect={(optionIndex) => select(questionId, optionIndex)}
                />
              );
            })}
          </div>
        );
      })}
    </section>
  );
}

function Question({
  question,
  selected,
  onSelect,
}: {
  question: QuizQuestion;
  selected: number | undefined;
  onSelect: (optionIndex: number) => void;
}) {
  const answered = selected !== undefined;
  const isCorrect = answered && selected === question.answerIndex;

  return (
    <div className="mt-6 rounded-lg border border-line bg-surface p-5">
      <p className="font-medium text-foreground">{renderPrompt(question.prompt)}</p>
      <div className="mt-4 grid gap-2">
        {question.options.map((option, index) => {
          const isAnswer = index === question.answerIndex;
          const isSelected = index === selected;
          const stateClass = !answered
            ? "border-line hover:border-accent"
            : isAnswer
              ? "border-accent bg-accent/10"
              : isSelected
                ? "border-red-500 bg-red-500/10"
                : "border-line opacity-50";
          return (
            <button
              key={index}
              type="button"
              disabled={answered}
              onClick={() => onSelect(index)}
              aria-pressed={isSelected}
              className={`rounded-md border px-4 py-2.5 text-left text-sm text-muted transition-colors ${stateClass}`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <p aria-live="polite" className="mt-3 min-h-5 text-sm">
        {answered && (
          <span className={isCorrect ? "text-accent" : "text-red-400"}>
            {isCorrect ? "Correct." : "Incorrect — the answer is highlighted."}
          </span>
        )}
        {answered && question.explanation && (
          <span className="text-muted"> {question.explanation}</span>
        )}
      </p>
    </div>
  );
}

function renderPrompt(prompt: string) {
  return prompt.split("**").map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="text-foreground">
        {part}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}
