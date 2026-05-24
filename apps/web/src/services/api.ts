import {
  PortfolioProfile,
  SkillCategory,
  ExperienceEntry,
  ProjectsResponse,
} from '../types';
import {
  FALLBACK_PROFILE,
  FALLBACK_SKILLS,
  FALLBACK_EXPERIENCE,
  getFallbackProjects,
} from './fallbackData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getProfile(): Promise<PortfolioProfile> {
    try {
      return await this.fetch<PortfolioProfile>('/api/profile');
    } catch (error) {
      console.warn('Failed to fetch profile from API, falling back to local static data:', error);
      return FALLBACK_PROFILE;
    }
  }

  async getSkills(): Promise<SkillCategory[]> {
    try {
      return await this.fetch<SkillCategory[]>('/api/skills');
    } catch (error) {
      console.warn('Failed to fetch skills from API, falling back to local static data:', error);
      return FALLBACK_SKILLS;
    }
  }

  async getSkillsByCategory(category: string): Promise<any[]> {
    try {
      return await this.fetch<any[]>(`/api/skills/${encodeURIComponent(category)}`);
    } catch (error) {
      console.warn(`Failed to fetch skills category ${category} from API, falling back to local static data:`, error);
      const cat = FALLBACK_SKILLS.find((c) => c.category === category);
      return cat ? cat.items : [];
    }
  }

  async getExperience(): Promise<ExperienceEntry[]> {
    try {
      return await this.fetch<ExperienceEntry[]>('/api/experience');
    } catch (error) {
      console.warn('Failed to fetch experience from API, falling back to local static data:', error);
      return FALLBACK_EXPERIENCE;
    }
  }

  async addExperience(experience: ExperienceEntry): Promise<ExperienceEntry> {
    return this.fetch<ExperienceEntry>('/api/experience', {
      method: 'POST',
      body: JSON.stringify(experience),
    });
  }

  async updateExperience(id: number, experience: Partial<ExperienceEntry>): Promise<ExperienceEntry> {
    return this.fetch<ExperienceEntry>(`/api/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(experience),
    });
  }

  async getProjects(username: string): Promise<ProjectsResponse> {
    try {
      return await this.fetch<ProjectsResponse>(`/api/projects?username=${encodeURIComponent(username)}`);
    } catch (error) {
      console.warn('Failed to fetch projects from API, falling back to local static data:', error);
      return getFallbackProjects(username);
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
