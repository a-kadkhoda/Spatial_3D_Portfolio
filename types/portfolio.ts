export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  url: string; // internal case-study link
  site?: string; // external live link
  image?: string;
}

export interface StackGroup {
  label: string; // "FRONTEND"
  dot: string; // hex color, e.g. "#FF6B4D"
  items: string[]; // ["TypeScript", "Next.js", "Tailwind"]
}

export interface ExperienceItem {
  id: string;
  years: string; // "2023 — Present"
  role: string;
  blurb: string;
}

export interface WritingItem {
  id: string;
  title: string;
  blurb: string;
  url: string;
  date: string;
}

export interface SocialLink {
  label: string; // "GITHUB"
  url: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  bio: string; // short — Hero
  aboutText: string; // longer — About
  projects: Project[];
  stack: StackGroup[];
  experience: ExperienceItem[];
  writing: WritingItem[];
  socials: SocialLink[];
  email: string;
  kicker: string;
  contactHeadline: string; // "Let's build something with"
  contactHighlight: string; // "depth" — the gradient-highlighted word
  contactSubtext: string;
  resumeUrl: string;
  // replace aboutText with:
  aboutParagraphs: [string, string]; // two paragraphs, different sizes
  location: string;
  focus: string;
  status: string; // "Open to work"
}
