"use client";

import Deck from "./about/Deck";
import { useScrollSpy } from "@/lib/useScrollSpy";
import { careerEntries } from "@/content/career";

export default function About() {
  const { setRef, activeIndex } = useScrollSpy<HTMLDivElement>(3);
  const crossfaderStops = [0, 1, 0.5];
  const progress = crossfaderStops[activeIndex] ?? 0;

  const knobLeft = `${4 + progress * 82}%`;
  const dayOpacity = 1 - progress * 0.5;
  const nightOpacity = 0.5 + progress * 0.5;

  const dayFaderTop = `${4 + progress * 28}px`;
  const nightFaderTop = `${32 - progress * 28}px`;

  return (
    <section id="about" className="scroll-mt-20 pb-24">
      <div className="mx-auto max-w-5xl px-6 pt-24">
        <p className="text-xs tracking-[0.2em] text-subtle">01 — ABOUT</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Software engineer by day.{" "}
          <span className="text-accent">DJ by night.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-muted">
          I’m a software engineer based in San Diego. I’ve always connected with
          Bruce Lee’s “be water” philosophy, staying adaptable and flowing
          around problems instead of forcing them. I also live by kaizen, always
          finding small ways to get better. At heart, I love learning and will
          forever be a student.
        </p>
      </div>

      <div className="sticky top-20 z-10 mt-12 border-y border-line bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-8 px-6 py-8 sm:gap-20">
          <div
            className="flex-1 transition-opacity duration-500"
            style={{ opacity: dayOpacity }}
          >
            <Deck
              channel="DECK A · BY DAY"
              title="Software Engineer"
              tags="TypeScript · React · Node"
              variant="day"
            />
          </div>

          <div
            className="w-20 flex-shrink-0 rounded-lg border border-line bg-surface p-3 sm:w-24"
            aria-hidden="true"
          >
            <div className="mb-3 flex justify-between gap-3">
              <div className="relative h-11 w-1 flex-1 rounded bg-line">
                <span
                  className="absolute -left-1.5 h-1.5 w-3.5 rounded bg-accent transition-[top] duration-500 ease-out"
                  style={{ top: dayFaderTop }}
                />
              </div>
              <div className="relative h-11 w-1 flex-1 rounded bg-line">
                <span
                  className="absolute -left-1.5 h-1.5 w-3.5 rounded bg-muted transition-[top] duration-500 ease-out"
                  style={{ top: nightFaderTop }}
                />
              </div>
            </div>
            <div className="mb-2 border-t border-line" />
            <p className="mb-1 text-center text-[11px] tracking-wide text-subtle">
              XFADER
            </p>
            <div className="relative h-1.5 rounded border border-line bg-background">
              <span
                className="absolute -top-1 h-3.5 w-3 rounded bg-accent transition-[left] duration-500 ease-out"
                style={{ left: knobLeft }}
              />
            </div>
          </div>

          <div
            className="flex-1 transition-opacity duration-500"
            style={{ opacity: nightOpacity }}
          >
            <Deck
              channel="DECK B · BY NIGHT"
              title="DJ"
              tags="Hip Hop · RnB · House · Techno"
              variant="night"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl space-y-32 px-6 pt-16">
        <div ref={setRef(0)}>
          <h2 className="mb-4 text-sm tracking-[0.2em] text-subtle">CAREER</h2>
          <ol className="border-t border-line">
            {careerEntries.map((entry, index) => (
              <li
                key={entry.period}
                className="flex gap-4 border-b border-line py-8"
              >
                <span className="pt-1.5 font-mono text-xs text-subtle">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium text-foreground">
                      {entry.company}
                    </h3>
                    <span className="whitespace-nowrap text-xs text-subtle">
                      {entry.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-accent">{entry.role}</p>
                  <p className="mt-2 text-sm text-muted">{entry.summary}</p>

                  <ul className="mt-4 space-y-2">
                    {entry.notes.map((note) => (
                      <li
                        key={note}
                        className="flex gap-2.5 text-sm text-muted"
                      >
                        <span aria-hidden="true" className="text-accent">
                          —
                        </span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {entry.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div ref={setRef(1)}>
          <h2 className="mb-4 text-xs tracking-[0.2em] text-subtle">
            THE DJ SET
          </h2>
          <p className="text-muted">
            I’ve been DJing for over 10 years, and it’s taken me to all kinds of
            stages. I’ve gotten to play clubs and festivals, and open for
            artists like Ella Mai, P-Lo, Madeon, and Iamsu. I grew up wanting to
            be a scratch DJ, so I’m known for playing Hip Hop, RnB, Throwbacks
            and Bay Slaps. However, I love to dabble in House, KPop, and techno
            now.
          </p>
          <p className="mt-4 text-muted">
            These days I mostly play weddings, I’ve done over 40 weddings
            throughout San Diego, Orange County and LA. I’m one of the resident
            Dj’s at FruitCraft for their wedding venue. Some of my favorite
            venues have been in the olympic village in Lake Tahoe, and Kualoa
            Ranch in Hawaii!
          </p>
        </div>

        <div ref={setRef(2)}>
          <h2 className="mb-4 text-xs tracking-[0.2em] text-subtle">
            OFF THE CLOCK
          </h2>
          <p className="text-muted">
            My fur baby Twix runs the house, and I happily let him. I’m a dog
            lover through and through, and he keeps me on a schedule whether I
            like it or not.
          </p>
          <p className="mt-4 text-muted">
            I’m not the most athletic guy, but I love playing pickleball, golf,
            and tennis. I grew up playing Counter-Strike, Dota, and JRPGs, and I
            still game and catch up on anime whenever I get the chance. Some of
            my favorite anime has been Death Note, Full Metal Alchemist, Demon
            Slayer, and Sakomoto days.
          </p>
        </div>
      </div>
    </section>
  );
}
