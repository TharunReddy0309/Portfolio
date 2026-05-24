/* Profile Types */
export interface ProfileLink {
  github: string;
  linkedin: string;
  leetcode: string;
  resume: string;
}

export interface ProfileRole {
  title: string;
  icon: string;
}

export interface PortfolioProfile {
  name: string;
  shortName: string;
  tagline: string;
  title: string;
  location: string;
  email: string;
  availability: string;
  responseTime: string;
  education: string;
  githubUsername: string;
  links: ProfileLink;
  bio: string[];
  roles: ProfileRole[];
}

/* Skills Types */
export interface SkillItem {
  name: string;
  logo?: string;
  logoUrl?: string;
}

export interface SkillCategory {
  category: string;
  color: string;
  bg: string;
  items: SkillItem[];
}

/* Experience Types */
export interface ExperienceEntry {
  role: string;
  company: string;
  type: 'Full-time' | 'Internship' | 'Part-time' | 'Freelance';
  period: string;
  location: string;
  url: string;
  description: string;
  skills: string[];
}

/* Project Types */
export type ProjectSource = 'pinned' | 'recent' | 'manual';

export interface PortfolioProject {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  liveUrl?: string;
  image?: string;
  language?: string;
  stars?: number;
  forks?: number;
  featured?: boolean;
  wip?: boolean;
  source?: ProjectSource;
  dynamicSource?: ProjectSource;
}

export interface ProjectsResponse {
  username: string;
  source: ProjectSource;
  count: number;
  projects: PortfolioProject[];
}

/* API Response Types */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}
