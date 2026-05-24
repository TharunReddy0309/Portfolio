import { Injectable } from '@nestjs/common';
import { manualProjects } from '../data/manual-projects';
import { projectOverrides } from '../data/project-overrides';
import type { GithubRepo, PortfolioProject, ProjectSource } from './project.types';

type CachedValue<T> = {
  savedAt: number;
  value: T;
};

@Injectable()
export class ProjectsService {
  private readonly cache = new Map<string, CachedValue<unknown>>();
  private readonly cacheMs = Number(process.env.PROJECT_CACHE_MS ?? 20 * 60 * 1000);

  async getProjects(username: string) {
    const cleanUsername = username.trim();
    const source = 'manual';

    // Map project-overrides into an array of projects
    const allProjects = Object.entries(projectOverrides).map(([name, override]) => {
      return {
        name,
        displayName: override.displayName || name,
        description: override.description || '',
        category: override.category || 'Projects',
        tags: override.tags || [],
        url: override.url || `https://github.com/${cleanUsername}/${name}`,
        liveUrl: override.liveUrl,
        image: override.image || `https://opengraph.githubassets.com/portfolio/${cleanUsername}/${name}`,
        language: override.tags?.[0],
        stars: override.stars || 0,
        forks: override.forks || 0,
        dynamicSource: 'manual' as const,
        featured: override.featured,
        wip: override.wip,
      };
    });

    return {
      username: cleanUsername,
      source,
      count: allProjects.length,
      projects: allProjects,
    };
  }

  private async fetchPinnedProjects(username: string): Promise<PortfolioProject[]> {
    const pinnedRepos = await this.scrapePinnedRepositoryNames(username);
    const projects = await Promise.all(
      pinnedRepos.map((repo) => this.fetchGithubRepo(repo.owner, repo.name, 'pinned')),
    );

    return projects.filter((project): project is PortfolioProject => Boolean(project));
  }

  private async fetchRecentProjects(username: string): Promise<PortfolioProject[]> {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&direction=desc&per_page=6`;
    const repos = await this.fetchJson<GithubRepo[]>(url);

    return repos
      .filter((repo) => !repo.fork)
      .slice(0, 6)
      .map((repo) => this.normalizeRepo(repo, 'recent'));
  }

  private async scrapePinnedRepositoryNames(username: string) {
    const html = await this.fetchText(`https://github.com/${encodeURIComponent(username)}`);
    const itemMatches = [...html.matchAll(/<li[\s\S]*?pinned-item-list-item[\s\S]*?<\/li>/g)];
    const seen = new Set<string>();

    return itemMatches
      .map((match) => {
        const href = match[0].match(/href="\/([^/"\s]+)\/([^/"\s]+)"/);
        if (!href) return null;

        const owner = this.decodeHtml(href[1]);
        const name = this.decodeHtml(href[2]).replace(/\.git$/i, '');
        const key = `${owner}/${name}`.toLowerCase();
        if (seen.has(key)) return null;
        seen.add(key);

        return { owner, name };
      })
      .filter((repo): repo is { owner: string; name: string } => Boolean(repo))
      .slice(0, 6);
  }

  private async fetchGithubRepo(owner: string, name: string, source: ProjectSource) {
    try {
      const repo = await this.fetchJson<GithubRepo>(
        `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
      );
      return this.normalizeRepo(repo, source);
    } catch {
      return null;
    }
  }

  private normalizeRepo(repo: GithubRepo, source: ProjectSource): PortfolioProject {
    const tags = this.inferTags(repo);
    const name = repo.name;
    const fullName = repo.full_name;

    return {
      name,
      displayName: name,
      description: repo.description ?? '',
      category: this.inferCategory(`${name} ${repo.description ?? ''} ${tags.join(' ')}`),
      tags,
      url: repo.html_url,
      liveUrl: repo.homepage || undefined,
      image: `https://opengraph.githubassets.com/portfolio/${fullName}`,
      language: repo.language ?? undefined,
      stars: repo.stargazers_count ?? 0,
      forks: repo.forks_count ?? 0,
      dynamicSource: source,
    };
  }

  private applyOverride(project: PortfolioProject): PortfolioProject {
    const override = projectOverrides[project.name] ?? projectOverrides[project.displayName] ?? {};
    const tags = override.tags ?? project.tags;

    return {
      ...project,
      ...override,
      displayName: override.displayName ?? project.displayName,
      description: override.description ?? project.description,
      tags,
      category: override.category ?? project.category,
      url: override.url ?? project.url,
      liveUrl: override.liveUrl ?? project.liveUrl,
      image: override.image ?? project.image,
      stars: override.stars ?? project.stars,
      forks: override.forks ?? project.forks,
      dynamicSource: project.dynamicSource,
    };
  }

  private inferTags(repo: GithubRepo) {
    const tags = new Set<string>();
    const language = repo.language?.trim();

    for (const topic of repo.topics ?? []) {
      const mapped = this.mapTopic(topic);
      if (mapped) tags.add(mapped);
    }

    if (language) tags.add(language);
    return [...tags].slice(0, 5);
  }

  private mapTopic(topic: string) {
    const map: Record<string, string> = {
      nestjs: 'NestJS',
      nodejs: 'Node.js',
      react: 'React',
      typescript: 'TypeScript',
      javascript: 'JavaScript',
      python: 'Python',
      postgresql: 'PostgreSQL',
      mysql: 'MySQL',
      mongodb: 'MongoDB',
      openai: 'OpenAI API',
      langchain: 'LangChain',
      streamlit: 'Streamlit',
      pytorch: 'PyTorch',
      mne: 'MNE',
      html: 'HTML',
      css: 'CSS',
      express: 'Express',
      'deep-learning': 'Deep Learning',
      'machine-learning': 'Machine Learning',
    };

    return map[topic.toLowerCase()] ?? topic;
  }

  private inferCategory(text: string) {
    const value = text.toLowerCase();

    if (/(ai|ml|machine learning|deep learning|eeg|bci|openai|langchain|pytorch|tensorflow|data science)/.test(value)) {
      return 'AI / ML';
    }

    if (/(api|server|database|backend|nestjs|node|express|mongo|postgres|mysql|full stack|react|html|css|javascript|typescript)/.test(value)) {
      return 'Full Stack';
    }

    return 'Projects';
  }

  private async fetchJson<T>(url: string): Promise<T> {
    return this.cached(url, async () => {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'dynamic-portfolio-api',
        },
      });

      if (!response.ok) throw new Error(`GitHub request failed: ${response.status}`);
      return (await response.json()) as T;
    });
  }

  private async fetchText(url: string): Promise<string> {
    return this.cached(url, async () => {
      const response = await fetch(url, {
        headers: {
          Accept: 'text/html',
          'User-Agent': 'dynamic-portfolio-api',
        },
      });

      if (!response.ok) throw new Error(`GitHub profile request failed: ${response.status}`);
      return response.text();
    });
  }

  private async cached<T>(key: string, load: () => Promise<T>): Promise<T> {
    const cached = this.cache.get(key) as CachedValue<T> | undefined;
    if (cached && Date.now() - cached.savedAt < this.cacheMs) return cached.value;

    const value = await load();
    this.cache.set(key, { savedAt: Date.now(), value });
    return value;
  }

  private decodeHtml(value: string) {
    return value
      .replace(/&amp;/g, '&')
      .replace(/&#x2F;/g, '/')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"');
  }
}
