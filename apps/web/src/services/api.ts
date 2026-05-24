import {
  PortfolioProfile,
  SkillCategory,
  ExperienceEntry,
  ProjectsResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
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
    } catch (error) {
      console.error(`Failed to fetch ${endpoint}:`, error);
      throw error;
    }
  }

  async getProfile(): Promise<PortfolioProfile> {
    return this.fetch<PortfolioProfile>('/api/profile');
  }

  async getSkills(): Promise<SkillCategory[]> {
    return this.fetch<SkillCategory[]>('/api/skills');
  }

  async getSkillsByCategory(category: string): Promise<any[]> {
    return this.fetch<any[]>(`/api/skills/${encodeURIComponent(category)}`);
  }

  async getExperience(): Promise<ExperienceEntry[]> {
    return this.fetch<ExperienceEntry[]>('/api/experience');
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
    return this.fetch<ProjectsResponse>(`/api/projects?username=${encodeURIComponent(username)}`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
