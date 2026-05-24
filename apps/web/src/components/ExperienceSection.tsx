import { useEffect, useState } from 'react';
import { apiClient } from '../services/api';
import { ExperienceEntry } from '../types';
import Tilt from 'react-parallax-tilt';

export function ExperienceSection() {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExperience = async () => {
      try {
        const data = await apiClient.getExperience();
        setExperiences(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load experience');
      } finally {
        setLoading(false);
      }
    };

    loadExperience();
  }, []);

  if (loading) return <div className="loading">Loading experience...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <section className="experience-section" id="experience">
      <h2>Experience</h2>
      <div className="experience-timeline">
        {experiences.map((exp, index) => (
          <Tilt 
            key={index} 
            tiltMaxAngleX={4} 
            tiltMaxAngleY={4} 
            glareEnable 
            glareMaxOpacity={0.1} 
            scale={1.01} 
            className="tilt-wrapper"
          >
            <div className="experience-item inner-3d">
              <div className="exp-header">
                <div>
                  <h3>{exp.role}</h3>
                  <p className="company">
                    <a href={exp.url} target="_blank" rel="noreferrer">
                      {exp.company}
                    </a>
                  </p>
                </div>
                <div className="exp-meta">
                  <span className="type">{exp.type}</span>
                  <span className="period">{exp.period}</span>
                </div>
              </div>
              <p className="location">{exp.location}</p>
              <p className="description" dangerouslySetInnerHTML={{ __html: exp.description }} />
              <div className="skills-tags">
                {exp.skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
