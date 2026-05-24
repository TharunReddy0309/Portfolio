import { PortfolioProfile } from '../types';
import Tilt from 'react-parallax-tilt';

interface ProfileSectionProps {
  profile: PortfolioProfile;
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  if (!profile) {
    return <div className="error">Profile data not available</div>;
  }

  const roleImages: Record<string, string> = {
    'Full Stack Dev': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&auto=format&fit=crop&q=80',
    'System Engineer': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=80',
    'AI / ML Engineer': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&auto=format&fit=crop&q=80',
    'Problem Solver': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80',
  };

  return (
    <section className="profile-section" id="about">
      <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable glareMaxOpacity={0.15} glarePosition="all" scale={1.01} className="tilt-wrapper">
        <div className="profile-card inner-3d">
          <div className="profile-grid-container">

            {/* Left Column */}
            <div className="profile-left-col">
              <span className="profile-kicker">Who I Am</span>
              <h1>{profile.name}</h1>
              <p className="tagline">{profile.tagline}</p>
              <p className="title">{profile.title}</p>
              <p className="location">📍 {profile.location}</p>

              <div className="profile-info-grid">
                <div className="info-item">
                  <strong>Email</strong>
                  <span>{profile.email}</span>
                </div>
                <div className="info-item">
                  <strong>Education</strong>
                  <span>{profile.education}</span>
                </div>
                <div className="info-item">
                  <strong>Availability</strong>
                  <span>{profile.availability}</span>
                </div>
                <div className="info-item">
                  <strong>Response Time</strong>
                  <span>{profile.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="profile-right-col">
              <div className="profile-bio-header">
                <span className="purple-dash" />
                <h4>About Me</h4>
              </div>

              <div className="profile-bio-content">
                {profile.bio.map((paragraph, index) => (
                  <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>

              {/* Elevated Roles Grid */}
              <div className="elevated-roles-grid">
                {profile.roles.map((role) => (
                  <div key={role.title} className="elevated-role-card">
                    <div
                      className="role-bg-image"
                      style={{ backgroundImage: `url(${roleImages[role.title] || roleImages['Problem Solver']})` }}
                    />
                    <div className="role-overlay">
                      <span className="role-title">{role.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </Tilt>
    </section>
  );
}
