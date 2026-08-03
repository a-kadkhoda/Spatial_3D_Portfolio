import type { PortfolioData } from "@/types/portfolio";

export const portfolioData: PortfolioData = {
  name: "Aliakbar Kadkhoda",
  role: "Your title here",
  bio: "Short one-liner for Hero",
  aboutText: "Longer paragraph(s) for About",

  projects: [
    {
      id: "1",
      title: "Assessment App",
      description:
        "Cross-platform mobile app built with Expo and React Native, covering onboarding, scoring, and offline-first sync.",
      tags: ["React Native", "Expo", "TypeScript"],
      year: "2026",
      url: "#",
      site: "https://example.com",
    },
    {
      id: "2",
      title: "Spatial Portfolio",
      description:
        "A 3D-native portfolio site built with React Three Fiber and GSAP-driven scroll navigation.",
      tags: ["Next.js", "Three.js", "GSAP"],
      year: "2026",
      url: "#",
      site: "https://example.com",
    },
    {
      id: "3",
      title: "Dashboard Redesign",
      description:
        "Rebuilt an internal analytics dashboard with a component library and real-time data views.",
      tags: ["Next.js", "Tailwind", "Recharts"],
      year: "2025",
      url: "#",
    },
  ],

  stack: [
    {
      label: "FRONTEND",
      dot: "#FF6B4D",
      items: ["TypeScript", "Next.js", "React Native", "Tailwind"],
    },
    {
      label: "3D / WEBGL",
      dot: "#6EE7FF",
      items: ["Three.js", "React Three Fiber", "GSAP"],
    },
    { label: "TOOLS", dot: "#A78BFA", items: ["Git", "Figma", "Expo"] },
  ],

  experience: [
    {
      id: "1",
      years: "2024 — Present",
      role: "Frontend Developer — Freelance",
      blurb:
        "Building cross-platform apps and 3D-native web experiences for clients.",
    },
    {
      id: "2",
      years: "2022 — 2024",
      role: "Mobile Developer",
      blurb: "Shipped and maintained Expo/React Native apps end to end.",
    },
  ],

  writing: [
    {
      id: "1",
      title: "Building a scroll-hijacked 3D deck in Next.js",
      blurb:
        "Notes on GSAP, React Three Fiber, and getting the transitions right.",
      url: "#",
      date: "2026",
    },
    {
      id: "2",
      title: "Expo release builds on Windows, the hard parts",
      blurb: "Gradle, local.properties, and everything that goes wrong.",
      url: "#",
      date: "2025",
    },
  ],

  contactHeadline: "Let's build something with",
  contactHighlight: "depth",
  contactSubtext:
    "Hiring for a role, or have a project that needs another dimension? My inbox is open.",
  resumeUrl: "#",
  socials: [
    { label: "GITHUB", url: "https://github.com" },
    { label: "LINKEDIN", url: "https://linkedin.com" },
    { label: "X", url: "https://x.com" },
  ],

  aboutParagraphs: [
    "I'm Aliakbar — a front-end developer who treats the browser as a place, not a page. I build interfaces with real depth: WebGL environments, spatial navigation, and motion that explains rather than decorates.",
    "Under the visuals, I care about the unglamorous parts: type-safe code, design systems, accessibility, and frame budgets.",
  ],
  location: "Remote — worldwide",
  focus: "Spatial UI · WebGL",
  status: "Open to work",
  email: "you@example.com",
  kicker: "PORTFOLIO — 2026 · FRONT-END DEVELOPER",
};
