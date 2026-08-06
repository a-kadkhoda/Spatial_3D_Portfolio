export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  year: string;
  url: string;
  site?: string;
  image?: string;
  featured?: boolean;
}

export interface StackGroup {
  label: string;
  dot: string;
  items: string[];
}

export interface ExperienceItem {
  id: string;
  years: string;
  role: string;
  blurb: string;
  current?: boolean;
}

export interface WritingItem {
  id: string;
  title: string;
  blurb: string;
  url: string;
  date: string;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  kicker: string;
  bio: string;
  aboutParagraphs: [string, string];
  heroChips: string[];
  projects: Project[];
  stack: StackGroup[];
  experience: ExperienceItem[];
  writing: WritingItem[];
  socials: SocialLink[];
  email: string;
  availability: string;
  location: string;
  focus: string;
  status: string;
  contactHeadline: string;
  contactHighlight: string;
  contactSubtext: string;
  resumeUrl: string;
}
