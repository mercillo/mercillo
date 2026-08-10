import type { Project } from "@/types";

export const projects: Project[] = [
  {
    name: "PkmnIndx",
    description:
      "Created a social media platform that automatically generates videos based on Pokemon sets and current market trends daily. Ready to upload for Tiktok, Instagram, and Youtube Shorts.",
    tags: ["React", "Remotion", "TypeScript", "GitHub Actions", "APIs"],
    featured: true,
    github: "https://github.com/mercillo/cardIndx-pipeline",
    live: "https://www.tiktok.com/@pkmnindx",
  },
  {
    name: "DJ Song Requester",
    description:
      "It's hard to hear other people when they try to request songs. Have them scan a QR code to request a song for you to play!",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Postgres", "Vercel"],
    github: "https://github.com/mercillo/songRequester",
    live: "https://request.mercillo.com",
  },
  {
    name: "Homebot",
    description:
      "A discordbot for your Home. Be able to assign chores, tasks to users and shopping lists for your home.",
    tags: ["Python", "Shell", "Discord"],
    github: "https://github.com/mercillo/homeBot",
    featured: false,
  },
];
