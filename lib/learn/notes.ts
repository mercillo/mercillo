import { promises as fs } from "fs";
import type { Dirent } from "fs";
import path from "path";
import type { Course, Lecture, LectureSummary } from "@/types";

const learnRoot = path.join(process.cwd(), "content", "learn");
const safeSlug = /^[a-zA-Z0-9][a-zA-Z0-9-]*$/;

function assertSafeSlug(slug: string) {
  if (!safeSlug.test(slug)) {
    throw new Error(`Unsafe slug: ${slug}`);
  }
}

function extractTitle(markdown: string, fallback: string) {
  const match = markdown.match(/^#{1,6}\s+(.+)$/m);
  if (!match) return fallback;
  const title = match[1].replace(/^\d+\s*[—–-]\s*/, "").trim();
  return title || fallback;
}

function fileToSlug(file: string) {
  return file.replace(/\.md$/, "");
}

function sortLectureFiles(files: string[]) {
  return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export async function listCourses(): Promise<Course[]> {
  let entries: Dirent[];
  try {
    entries = await fs.readdir(learnRoot, { withFileTypes: true });
  } catch {
    return [];
  }
  const slugs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const courses = await Promise.all(slugs.map((slug) => getCourse(slug)));
  return courses.filter((course): course is Course => course !== null);
}

export async function getCourse(slug: string): Promise<Course | null> {
  assertSafeSlug(slug);
  let files: string[];
  try {
    files = await fs.readdir(path.join(learnRoot, slug));
  } catch {
    return null;
  }
  const lectureFiles = sortLectureFiles(
    files.filter((file) => file.endsWith(".md") && file !== "00_index.md")
  );
  const [title, lectures] = await Promise.all([
    getCourseTitle(slug),
    Promise.all(lectureFiles.map((file) => getLectureSummary(slug, file))),
  ]);
  return { slug, title, lectures };
}

async function getCourseTitle(slug: string): Promise<string> {
  try {
    const index = await fs.readFile(
      path.join(learnRoot, slug, "00_index.md"),
      "utf8"
    );
    return extractTitle(index, slug);
  } catch {
    return slug;
  }
}

async function getLectureSummary(
  course: string,
  file: string
): Promise<LectureSummary> {
  const markdown = await fs.readFile(
    path.join(learnRoot, course, file),
    "utf8"
  );
  const slug = fileToSlug(file);
  return { slug, title: extractTitle(markdown, slug) };
}

export async function getLecture(
  course: string,
  slug: string
): Promise<Lecture | null> {
  assertSafeSlug(course);
  assertSafeSlug(slug);
  try {
    const markdown = await fs.readFile(
      path.join(learnRoot, course, `${slug}.md`),
      "utf8"
    );
    return { slug, title: extractTitle(markdown, slug), markdown };
  } catch {
    return null;
  }
}
