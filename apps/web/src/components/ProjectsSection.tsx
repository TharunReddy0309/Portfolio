import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../services/api';
import type { PortfolioProject, ProjectsResponse } from '../types';
import { ProjectCard } from './ProjectCard';

const order = ['Full Stack', 'AI / ML', 'Projects'];

function groupProjects(projects: PortfolioProject[]) {
  return projects.reduce<Record<string, PortfolioProject[]>>((groups, project) => {
    const category = project.category || 'Projects';
    groups[category] ??= [];
    groups[category].push(project);
    return groups;
  }, {});
}

interface ProjectsSectionProps {
  username: string;
}

export function ProjectsSection({ username }: ProjectsSectionProps) {
  const [data, setData] = useState<ProjectsResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!username) return;
    
    apiClient
      .getProjects(username)
      .then(setData)
      .catch((err: Error) => setError(err.message));
  }, [username]);

  const groups = useMemo(() => groupProjects(data?.projects ?? []), [data]);
  const categories = [
    ...order.filter((category) => groups[category]?.length),
    ...Object.keys(groups).filter((category) => !order.includes(category)),
  ];

  return (
    <section className="projects-section" id="projects">
      <div className="section-heading">
        <span>Selected Work</span>
        <h2>Projects.</h2>
        <p>
          Driven by a passion for continuous learning,
           I build across the entire software engineering spectrum.
            From scalable full-stack web applications to
             intelligent AI and Machine Learning systems,
             my work reflects a deep commitment to solving complex problems.
              Explore my current projects below to see how
               I translate technical curiosity into impactful solutions.
        </p>
      </div>

      {!data && !error && <div className="loading-card">Loading projects...</div>}
      {error && <div className="error-card">{error}</div>}

      {data && (
        <>
          {categories.map((category) => (
            <div className="project-group" key={category}>
              <div className="group-heading">
                <div>
                  <h3>{category}</h3>
                  <p>{groups[category].length} projects</p>
                </div>
              </div>
              <div className="project-grid">
                {groups[category].map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
