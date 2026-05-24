import { PortfolioProfile } from '../types';
import Tilt from 'react-parallax-tilt';

interface ContactSectionProps {
  profile: PortfolioProfile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <section className="contact-section" id="contact">
      <div className="section-heading">
        <span>Get in Touch</span>
        <h2>Contact.</h2>
        <p>Let's collaborate on research roles, internship opportunities, or interesting software projects.</p>
      </div>

      <div className="contact-grid">
        {/* Column 1: Contact details */}
        <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable glareMaxOpacity={0.15} scale={1.01} className="tilt-wrapper">
          <div className="contact-col-card inner-3d">
            <div className="col-header-line">
              <span className="purple-dash" />
              <h4>Contact Me</h4>
            </div>
            
            <div className="contact-main-links">
              <a href={`mailto:${profile.email}`} className="contact-email-link">
                {profile.email}
              </a>
              <p className="contact-phone-text">IIIT Sri City Campus</p>
              <p className="contact-desc-text">B.Tech CSE Student & SDE Aspirant</p>
            </div>

            <div className="contact-details-list">
              <div className="details-box">
                <span className="box-title">Location</span>
                <span className="box-value">{profile.location}</span>
              </div>
              
              <div className="details-box">
                <span className="box-title">Availability</span>
                <span className="box-value">{profile.availability}</span>
              </div>
              
              <div className="details-box">
                <span className="box-title">Response</span>
                <span className="box-value">{profile.responseTime}</span>
              </div>
            </div>
          </div>
        </Tilt>

        {/* Column 2: Profiles */}
        <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable glareMaxOpacity={0.15} scale={1.01} className="tilt-wrapper">
          <div className="contact-col-card inner-3d">
            <div className="col-header-line">
              <span className="purple-dash" />
              <h4>Profiles</h4>
            </div>
            
            <p className="profiles-desc">Explore my coding profiles and professional platforms.</p>

            <div className="profiles-buttons-grid">
              <a 
                href={profile.links.github} 
                target="_blank" 
                rel="noreferrer" 
                className="profile-grid-btn"
              >
                <img src="https://skillicons.dev/icons?i=github" alt="GitHub" />
                <span>GitHub</span>
              </a>
              
              <a 
                href={profile.links.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="profile-grid-btn"
              >
                <img src="https://skillicons.dev/icons?i=linkedin" alt="LinkedIn" />
                <span>LinkedIn</span>
              </a>
              
              <a 
                href={profile.links.leetcode} 
                target="_blank" 
                rel="noreferrer" 
                className="profile-grid-btn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" fill="#FFA116"/>
                </svg>
                <span>LeetCode</span>
              </a>
              
              <a 
                href={profile.links.resume} 
                download 
                target="_blank" 
                rel="noreferrer" 
                className="profile-grid-btn"
              >
                <div className="resume-grid-icon">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="28" 
                    height="28" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
                    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
                    <path d="M10 9H8"/>
                    <path d="M16 13H8"/>
                    <path d="M16 17H8"/>
                  </svg>
                </div>
                <span>Resume</span>
              </a>
            </div>
          </div>
        </Tilt>

        {/* Column 3: Collaboration Call-to-action */}
        <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} glareEnable glareMaxOpacity={0.15} scale={1.01} className="tilt-wrapper cta-tilt">
          <div className="contact-col-card cta-card inner-3d">
            <h3 className="cta-title">Ready to start a project?</h3>
            <p className="cta-desc">
              From polished frontend experiences to scalable backend systems, let's build something sharp and reliable.
            </p>

            <div className="cta-tags-list">
              <span className="cta-tag">WEB APPS</span>
              <span className="cta-tag">REALTIME SYSTEMS</span>
              <span className="cta-tag">AI INTEGRATIONS</span>
              <span className="cta-tag">BACKEND APIS</span>
            </div>

            <div className="cta-button-container">
              <a href={`mailto:${profile.email}`} className="cta-touch-btn">
                Get in Touch
              </a>
              <span className="cta-subtext">Fast replies. Clear communication.</span>
            </div>
          </div>
        </Tilt>
      </div>
    </section>
  );
}
