export type ProjectSource = 'pinned' | 'recent' | 'manual';

export type PortfolioProject = {
  name: string;
  displayName: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
  liveUrl?: string;
  image: string;
  language?: string;
  stars: number;
  forks: number;
  dynamicSource: ProjectSource;
  featured?: boolean;
  wip?: boolean;
};

export type ProjectOverride = Partial<Omit<PortfolioProject, 'name' | 'dynamicSource'>> & {
  displayName?: string;
};

export type GithubRepo = {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage?: string | null;
  language?: string | null;
  topics?: string[];
  stargazers_count?: number;
  forks_count?: number;
  fork?: boolean;
  owner?: {
    login: string;
  };
};
