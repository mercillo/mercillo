import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Lecture from "@/components/learn/Lecture";
import Quiz from "@/components/learn/Quiz";
import { getCourse, getLecture, listCourses } from "@/lib/learn/notes";
import { getQuiz } from "@/lib/learn/quizzes";

type PageProps = {
  params: Promise<{ course: string; lecture: string }>;
};

export async function generateStaticParams() {
  const courses = await listCourses();
  return courses.flatMap((course) =>
    course.lectures.map((lecture) => ({
      course: course.slug,
      lecture: lecture.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { course, lecture } = await params;
  const entry = await getLecture(course, lecture);
  return {
    title: entry ? `${entry.title} — Learn` : "Learn — Mercillo",
    robots: { index: false, follow: false },
  };
}

export default async function LecturePage({ params }: PageProps) {
  const { course, lecture } = await params;
  const courseData = await getCourse(course);
  const entry = courseData ? await getLecture(course, lecture) : null;
  if (!courseData || !entry) notFound();

  const quiz = await getQuiz(course, lecture, entry.markdown);
  const body = entry.markdown.replace(/^#[^\n]*\n+/, "");
  const index = courseData.lectures.findIndex(
    (item) => item.slug === lecture
  );
  const previous = index > 0 ? courseData.lectures[index - 1] : null;
  const next =
    index < courseData.lectures.length - 1
      ? courseData.lectures[index + 1]
      : null;

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-xs tracking-[0.2em] text-subtle">
        {courseData.title}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
        {entry.title}
      </h1>

      <div className="mt-10">
        <Lecture markdown={body} />
      </div>

      <Quiz quiz={quiz} />

      <nav
        aria-label="Lecture navigation"
        className="mt-16 flex items-center justify-between gap-4 border-t border-line pt-8 text-sm"
      >
        {previous ? (
          <Link
            href={`/learn/${course}/${previous.slug}`}
            className="text-accent underline-offset-2 hover:underline"
          >
            ← {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/learn/${course}/${next.slug}`}
            className="text-accent underline-offset-2 hover:underline"
          >
            {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
