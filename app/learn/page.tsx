import type { Metadata } from "next";
import Link from "next/link";
import { listCourses } from "@/lib/learn/notes";

export const metadata: Metadata = {
  title: "Learn — Mercillo",
  robots: { index: false, follow: false },
};

export default async function LearnPage() {
  const courses = await listCourses();

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-xs tracking-[0.2em] text-subtle">UNLISTED</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        Learn
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        Study notes and quizzes. Each lecture renders the full note and ends
        with a content quiz and a terms quiz.
      </p>

      {courses.length === 0 ? (
        <p className="mt-12 text-muted">
          No courses yet. Drop a folder of markdown notes into{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 text-xs text-accent">
            content/learn/
          </code>
          .
        </p>
      ) : (
        courses.map((course) => (
          <section key={course.slug} className="mt-12">
            <h2 className="text-xl font-semibold text-foreground">
              {course.title}
            </h2>
            <ol className="mt-4 space-y-2">
              {course.lectures.map((lecture) => (
                <li key={lecture.slug}>
                  <Link
                    href={`/learn/${course.slug}/${lecture.slug}`}
                    className="text-accent underline-offset-2 hover:underline"
                  >
                    {lecture.title}
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))
      )}
    </div>
  );
}
