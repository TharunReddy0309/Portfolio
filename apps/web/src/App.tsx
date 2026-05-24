import { useEffect, useState } from 'react';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProfileSection } from './components/ProfileSection';
import { SidebarContact } from './components/SidebarContact';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ThreeBackdrop } from './components/ThreeBackdrop';
import { apiClient } from './services/api';
import { PortfolioProfile } from './types';
import './styles/app.css';

export function App() {
  const [profile, setProfile] = useState<PortfolioProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await apiClient.getProfile();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          background: '#0f0f12',
          color: '#646c7e',
          fontFamily: 'Inter, sans-serif',
          fontSize: '16px',
          gap: '12px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7c5cfc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          Loading portfolio...
        </div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      </>
    );
  }

  if (error || !profile) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#0f0f12',
        color: '#fca5a5',
        fontFamily: 'Inter, sans-serif',
        fontSize: '16px'
      }}>
        Failed to load portfolio: {error}
      </div>
    );
  }

  return (
    <>
      <ThreeBackdrop />
      {/* Full sidebar */}
      <SidebarContact profile={profile} />

      {/* Main content shifted right of sidebar */}
      <main>
        {/* Hero */}
        <section className="hero" id="home">
          <div>
            <span className="eyebrow">{profile.tagline}</span>
            <h1>{profile.name}</h1>
            <p>{profile.title}</p>
            {profile.bio[0] && (
              <p dangerouslySetInnerHTML={{ __html: profile.bio[0] }} className="bio-text" />
            )}
            <div className="hero-actions">
              <a href="#projects">View Projects</a>
              <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href="#contact">Contact Me</a>
            </div>
          </div>
        </section>

        {/* About */}
        <ProfileSection profile={profile} />

        {/* Skills */}
        <SkillsSection />

        {/* Experience */}
        <ExperienceSection />

        {/* Projects */}
        <ProjectsSection username={profile.githubUsername} />

        {/* Contact */}
        <ContactSection profile={profile} />

        {/* Footer */}
        <Footer profile={profile} />
      </main>

      {/* Floating resume download */}
      <a
        href={profile.links.resume}
        download
        target="_blank"
        rel="noreferrer"
        className="floating-resume-btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span>RESUME</span>
      </a>
    </>
  );
}
