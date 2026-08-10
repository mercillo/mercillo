import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs tracking-[0.2em] text-subtle">02 — PROJECTS</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Things I&apos;ve built.
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className={`rounded-xl border bg-surface p-6 ${
                project.featured ? "border-accent sm:col-span-2" : "border-line"
              }`}
            >
              {project.featured && (
                <p className="mb-2 text-xs tracking-wide text-accent">
                  FEATURED
                </p>
              )}
              <h3 className="text-lg font-medium text-foreground">
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {project.name} ↗
                  </a>
                ) : (
                  project.name
                )}
              </h3>
              <p className="mt-2 text-sm text-muted">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-background px-3 py-1 text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-sm text-accent transition-colors hover:text-foreground"
                >
                  GitHub ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
