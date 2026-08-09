# mercillo.com

Personal portfolio for Marlon ercillo — software engineer and DJ based in San Diego.

**Live:** [mercillo.com](https://mercillo.com)

## About

A single-page portfolio built around a DJ-booth concept: an interactive mixer
that crossfades between the "software engineer by day" and "DJ by night" sides
as you scroll, with spinning turntables and channel faders that follow along.
Below the booth are career history, projects, and contact.

## Tech

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 with a small custom design-token system
- Deployed on [Vercel](https://vercel.com)

## Highlights

- Scroll-driven crossfader built on a custom `useScrollSpy` hook — no animation library
- Every animation respects `prefers-reduced-motion`
- Content and presentation kept separate (`content/` data, `types/` shared types, `components/` UI)
- Accessible by default: semantic headings, skip link, visible focus rings, WCAG AA contrast

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/          routes, layout, global styles
components/    UI — layout and page sections
content/       site data (career, projects, contact, nav)
types/         shared domain types
lib/           hooks and helpers
public/        static assets
```
