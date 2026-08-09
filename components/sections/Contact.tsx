import { contactLinks } from "@/content/contact";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs tracking-[0.2em] text-subtle">03 — CONTACT</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Let&apos;s talk.
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          If you’re interested in connecting, whether that’s about my projects or
          you want to inquire about a DJ or mixes/edits for a dance team, please
          reach out below.
        </p>

        <ul className="mt-8 flex flex-wrap gap-4">
          {contactLinks.map((link) => {
            const isExternal = !link.href.startsWith("mailto:");
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                  className="inline-block rounded-lg border border-line px-4 py-2 text-sm text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
