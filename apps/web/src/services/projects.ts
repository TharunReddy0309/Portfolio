import type { ProjectsResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';
const USERNAME = import.meta.env.VITE_GITHUB_USERNAME ?? 'TharunReddy0309';

export async function fetchProjects() {
  const url = new URL('/projects', API_URL);
  url.searchParams.set('username', USERNAME);

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Project API failed: ${response.status}`);

  return (await response.json()) as ProjectsResponse;
}
