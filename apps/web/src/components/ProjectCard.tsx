import type { PortfolioProject } from '../types';
import Tilt from 'react-parallax-tilt';

const categoryClass: Record<string, string> = {
  'AI / ML': 'project-card aiml-card inner-3d',
  'Full Stack': 'project-card inner-3d',
};

export function ProjectCard({ project }: { project: PortfolioProject }) {
  const title = project.displayName || project.name;

  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.2} scale={1.03} className="tilt-wrapper">
      <article className={categoryClass[project.category] ?? 'project-card inner-3d'}>
        <div className="project-media">
          <img src={project.image} alt={title} loading="lazy" />
          <div className="project-media-shade" />
          {project.featured && <span className="ribbon">Winner</span>}
          {project.wip && <span className="status-badge">Under Development</span>}
          <div className="project-actions">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" title="Live deployment">
                Live
              </a>
            )}
            <a href={project.url} target="_blank" rel="noreferrer" title="Source code">
              Code
            </a>
          </div>
        </div>

        <div className="project-body">
          <div className="project-kicker">
            <span>{project.category}</span>
          </div>
          <h3>{title}</h3>
          <p>{project.description || 'No description available yet.'}</p>
          <div className="tag-list">
            {project.tags.map((tag) => (
              <span key={tag}>#{tag}</span>
            ))}
          </div>
          <footer>
            <span>{project.stars ?? 0} stars</span>
            <span>{project.forks ?? 0} forks</span>
            {project.language && <span>{project.language}</span>}
          </footer>
        </div>
      </article>
    </Tilt>
  );
}
