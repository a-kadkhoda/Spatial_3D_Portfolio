import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Aliakbar Kadkhoda",
  role: "Front-end Developer",
  kicker: "PORTFOLIO — 2026 · FRONT-END DEVELOPER",
  bio: "Front-end developer crafting spatial, 3D-native interfaces — where layout, motion and dimension meet production-grade code.",

  aboutParagraphs: [
    "I'm Aliakbar — a front-end developer who treats the browser as a place, not a page. I build interfaces with real depth: WebGL environments, spatial navigation, and motion that explains rather than decorates.",
    "Under the visuals, I care about the unglamorous parts: type-safe code, design systems, accessibility, and frame budgets. Ship fast, render faster.",
  ],

  heroChips: ["React", "Three.js", "TypeScript", "WebGL "],

  projects: [
    {
      id: "assessment-app",
      title: "Assessment App",
      description:
        "Cross-platform mobile app built with Expo and React Native, covering onboarding, scoring, and offline-first sync.",
      tags: ["React Native", "Expo", "TypeScript"],
      year: "2026",
      url: "/projects#assessment-app",
      site: "https://example.com",
      featured: true,
    },
    {
      id: "spatial-portfolio",
      title: "Spatial Portfolio",
      description:
        "A 3D-native portfolio site built with React Three Fiber and scroll-driven camera navigation.",
      tags: ["Next.js", "Three.js", "GSAP"],
      year: "2026",
      url: "/projects#spatial-portfolio",
      site: "https://example.com",
      featured: true,
    },
    {
      id: "dashboard-redesign",
      title: "Dashboard Redesign",
      description:
        "Rebuilt an internal analytics dashboard with a component library and real-time data views.",
      tags: ["Next.js", "Tailwind", "Recharts"],
      year: "2025",
      url: "/projects#dashboard-redesign",
      featured: true,
    },
    {
      id: "motion-lab",
      title: "Motion Lab",
      description:
        "A collection of shader and layout-animation experiments, each one a self-contained demo with source.",
      tags: ["GLSL", "WebGL", "Canvas"],
      year: "2025",
      url: "/projects#motion-lab",
    },
  ],

  stack: [
    {
      label: "FRONTEND",
      dot: "#FF6B4D",
      items: ["TypeScript", "React", "Next.js", "React Native", "Tailwind"],
    },
    {
      label: "3D / WEBGL",
      dot: "#6EE7FF",
      items: ["Three.js", "React Three Fiber", "GSAP"],
    },
    {
      label: "TOOLS",
      dot: "#A78BFA",
      items: ["Git", "Figma"],
    },
  ],

  experience: [
    {
      id: "freelance",
      years: "2024 — Present",
      role: "Frontend Developer — Freelance",
      blurb:
        "Building cross-platform apps and 3D-native web experiences for clients, from first prototype through production release.",
      current: true,
    },
    {
      id: "mobile-dev",
      years: "2022 — 2024",
      role: "Mobile Developer",
      blurb:
        "Shipped and maintained Expo / React Native apps end to end — offline sync, release pipelines, and store submissions.",
    },
  ],

  writing: [
    {
      id: "scroll-hijacked-deck",
      title: "Building a scroll-hijacked 3D deck in Next.js",
      blurb:
        "Notes on perspective, camera travel, and getting the transitions to feel intentional.",
      url: "/writing#scroll-hijacked-deck",
      date: "2026",
    },
    {
      id: "expo-on-windows",
      title: "Expo release builds on Windows, the hard parts",
      blurb: "Gradle, local.properties, and everything that goes wrong.",
      url: "/writing#expo-on-windows",
      date: "2025",
    },
    {
      id: "motion-that-explains",
      title: "Motion that explains, not decorates",
      blurb:
        "When an animation earns its frame budget — and when it's just noise.",
      url: "/writing#motion-that-explains",
      date: "2025",
    },
  ],

  socials: [
    { label: "GITHUB", url: "https://github.com" },
    { label: "LINKEDIN", url: "https://linkedin.com" },
    { label: "X", url: "https://x.com" },
  ],

  email: "aliakbarkadkhoda@proton.me",
  availability: "OPEN TO WORK — ROLES & FREELANCE",
  location: "Remote — worldwide",
  focus: "Spatial UI · WebGL",
  status: "Open to work",

  contactHeadline: "Let's build something with",
  contactHighlight: "depth",
  contactSubtext:
    "Hiring for a role, or have a project that needs another dimension? My inbox is open.",
  resumeUrl: "/resume",
};
