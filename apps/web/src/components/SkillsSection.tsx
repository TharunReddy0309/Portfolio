import { useEffect, useState, useMemo } from 'react';
import { apiClient } from '../services/api';
import { SkillCategory } from '../types';
import Tilt from 'react-parallax-tilt';

export function SkillsSection() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await apiClient.getSkills();
        setSkills(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load skills');
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  // Calculate totals
  const totalSkills = useMemo(() => {
    return skills.reduce((sum, cat) => sum + cat.items.length, 0);
  }, [skills]);

  if (loading) return <div className="loading">Loading skills...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Helper to get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case 'backend':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
            <line x1="6" y1="6" x2="6.01" y2="6" />
            <line x1="6" y1="18" x2="6.01" y2="18" />
          </svg>
        );
      case 'ai / ml':
      case 'ai/ml':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1 0-3.12 3 3 0 0 1 0-4.88 2.5 2.5 0 0 1 0-3.12A2.5 2.5 0 0 1 9.5 2Z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 0-3.12 3 3 0 0 0 0-4.88 2.5 2.5 0 0 0 0-3.12A2.5 2.5 0 0 0 14.5 2Z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        );
    }
  };

  return (
    <section className="skills-section" id="skills">
      <div className="skills-header-container">
        <h2>Skills & Tech Stack</h2>
      </div>

      {/* Summary Filter Pills */}
      <div className="skills-summary-pills">
        {skills.map((category) => (
          <a key={category.category} href={`#cat-${category.category.replace(/\s+/g, '-').toLowerCase()}`} className="summary-pill">
            <span className="pill-dot" style={{ backgroundColor: category.color }} />
            <span className="pill-text">{category.items.length} {category.category}</span>
          </a>
        ))}
        <div className="summary-pill total-pill">
          <span className="pill-text">{totalSkills}+ Skills</span>
        </div>
      </div>

      <div className="skills-cards-grid">
        {skills.map((category) => (
          <Tilt 
            key={category.category} 
            tiltMaxAngleX={6} 
            tiltMaxAngleY={6} 
            glareEnable 
            glareMaxOpacity={0.15} 
            scale={1.02} 
            className="tilt-wrapper"
          >
            <div 
              className="skill-card-group inner-3d"
              id={`cat-${category.category.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <div className="skill-card-header">
                <div className="header-left">
                  <div 
                    className="icon-wrapper" 
                    style={{ 
                      color: category.color,
                      backgroundColor: category.bg || 'rgba(255,255,255,0.03)'
                    }}
                  >
                    {getCategoryIcon(category.category)}
                  </div>
                  <div className="title-area">
                    <h3>{category.category}</h3>
                    <span className="subtitle">{category.items.length} technologies</span>
                  </div>
                </div>
                <div className="header-right-badge">
                  {category.items.length}
                </div>
              </div>

              <div className="skills-pill-list">
                {category.items.map((skill) => (
                  <div key={skill.name} className="skill-pill-item" title={skill.name}>
                    <img
                      src={skill.logoUrl}
                      alt={skill.name}
                      className="skill-pill-logo"
                      onError={(e) => {
                        // Fallback if logoUrl fails to load
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://skillicons.dev/icons?i=postman'; // fallback
                      }}
                    />
                    <span className="skill-pill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
