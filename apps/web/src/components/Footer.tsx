import { PortfolioProfile } from '../types';

interface FooterProps {
  profile: PortfolioProfile;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="portfolio-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Get in Touch</h4>
          <div className="footer-links">
            <a href={`mailto:${profile.email}`} className="footer-link">
              Email
            </a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="footer-link">
              GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="footer-link">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <div className="footer-links">
            <a href="#home" className="footer-link">Home</a>
            <a href="#skills" className="footer-link">Skills</a>
            <a href="#experience" className="footer-link">Experience</a>
            <a href="#projects" className="footer-link">Projects</a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="footer-info">
            <p>{profile.email}</p>
            <p>{profile.location}</p>
            <p className="availability">{profile.availability}</p>
          </div>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>© {currentYear} {profile.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
