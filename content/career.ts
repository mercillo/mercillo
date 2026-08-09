import type { CareerEntry } from "@/types";

export const careerEntries: CareerEntry[] = [
  {
    role: "Software Engineer II",
    company: "Intuit",
    period: "2022 — 2026",
    summary:
      "Internal platform team building developer tooling and tax form infrastructure across Intuit’s products.",
    notes: [
      "Used AI-driven CI/CD workflows to migrate 389 tax forms ~90% faster, saving $1M+ and finishing 2 years ahead of schedule.",
      "Built a Claude Code plugin marketplace with MCP servers and reusable AI skills to orchestrate the migration pipeline.",
      "Helped open-source the Server-Driven UI (Player) engine (TypeScript, React) across web, iOS, and Android, growing repo engagement 25%.",
    ],
    stack: [
      "TypeScript",
      "React",
      "Kotlin",
      "Python",
      "Vite",
      "Bazel",
      "Java",
      "Splunk",
      "AWS",
      "GCP",
      "CI/CD",
      "Claude Code",
      "MCP",
    ],
  },
  {
    role: "Senior Front End Engineer",
    company: "Spectator Health",
    period: "2021 — 2022",
    summary:
      "Early-stage telehealth startup focused on remote patient monitoring for nursing home care.",
    notes: [
      "Used React and hardware API integrations to stream live patient data into the app for remote clinical monitoring.",
      "Built authentication and role-based access control to meet healthcare compliance.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Python",
      "REST APIs",
      "GCP",
      "Material-UI",
    ],
  },
  {
    role: "Software Engineer",
    company: "Circadence",
    period: "2018 — 2021",
    summary:
      "Cybersecurity startup providing hands-on, cloud-based attack simulation and training environments for government clients.",
    notes: [
      "Used React, Go, and gRPC to build a training platform where learners SSH into live, intentionally vulnerable VMs.",
      "Orchestrated dynamic per-session VM deployments with Kubernetes, Docker, and Istio.",
    ],
    stack: ["React", "Go", "Kubernetes", "Docker", "gRPC"],
  },
  {
    role: "Full Stack Web Developer",
    company: "Flash Point Communications",
    period: "2016 — 2018",
    summary:
      "Digital marketing agency specializing in automotive dealer campaigns and lead generation.",
    notes: [
      "Used JavaScript, HTML, and .NET to build lead-gen microsites and behavioral ad funnels for auto dealers (Ford, Mazda, GM), routing users to targeted offers.",
    ],
    stack: ["JavaScript", "HTML", "CSS", ".NET"],
  },
  {
    role: "Network Engineer",
    company: "Secured Retail Networks",
    period: "2014 — 2016",
    summary:
      "Network infrastructure deployment and configuration firm supporting retail and restaurant clients across the nation.",
    notes: [
      "Used custom Perl, Python, and TCL scripts to automate network config across 20+ devices per site.",
    ],
    stack: ["Perl", "Python", "TCL"],
  },
];
