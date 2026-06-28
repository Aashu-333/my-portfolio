import { useEffect, useRef } from 'react'
import './Experience.css'

import logoNIFT from '../assets/icons/NIFT_Logo.svg'

/* 3D icon images */
import iconFigma from '../assets/icons/figma.png'
import iconClaude from '../assets/icons/claude.png'
import iconAdobeCC from '../assets/icons/adobecc.png'
import iconIllustrator from '../assets/icons/illustrator.png'
import iconPhotoshop from '../assets/icons/photoshop.png'
import iconChatGPT from '../assets/icons/chatgpt.png'
import iconLovable from '../assets/icons/lovable.png'
import iconStitch from '../assets/icons/stitch.png'
import iconFramer from '../assets/icons/framer.png'
import iconWebflow from '../assets/icons/webflow.png'


const experiences = [
  {
    id: 1,
    role: 'UI/UX Designer',
    company: 'SIEC Education Pvt Ltd',
    period: 'Jan 2024 — Present',
    type: 'Full-time',
    highlights: [
      'Cross-Functional Collaboration: Partner closely with Product Managers, Engineers, and Marketing teams to translate complex business requirements and high-level user needs into intuitive, user-centric interface designs.',
      'Design Systems & Consistency: Conceptualize, build, and maintain scalable design systems, component libraries, and style guides to ensure visual consistency and seamless brand experiences across all digital touchpoints.',
      'End-to-End Product Design: Own the full product design lifecycle, from mapping out comprehensive user flows and creating low-fidelity wireframes to delivering interactive, high-fidelity prototypes ready for engineering handoff.',
      'User Journey Optimization: Conduct iterative user flow analysis to identify friction points within the educational platform, refining layouts and interactions to delight users and improve overall conversion rates.',
    ],
    tags: ['Figma', 'Design Systems', 'User Research', 'Prototyping'],
    accent: 'var(--color-accent)',
  },
  {
    id: 2,
    role: 'Graphic / UI Designer',
    company: 'Scale Up Your Brand',
    period: 'Nov 2023 — Dec 2023',
    type: 'Contract',
    highlights: [
      'Brand Identity Elevation: Spearheaded the creation of high-impact graphic assets and modern UI concepts that aligned with client goals and significantly elevated their digital visual identity.',
      'Visual Storytelling: Crafted compelling visual narratives and responsive digital layouts across web and mobile surfaces, ensuring a cohesive and engaging user experience.',
      'Rapid Prototyping: Ideated and rapidly executed multiple visual directions and interface concepts using Figma and Adobe Creative Suite, effectively presenting design iterations to stakeholders.',
    ],
    tags: ['Adobe Suite', 'Brand Identity', 'UI Concepts'],
    accent: '#a78bfa',
  },
  {
    id: 3,
    role: 'Conceptual Artist',
    company: 'P.P Jewellers Pvt Ltd',
    period: 'Jan 2023 — April 2023',
    type: 'Internship',
    highlights: [
      'Luxury Visual Strategy: Developed high-end conceptual designs, mood boards, and sophisticated visual storytelling elements tailored for luxury retail branding and physical/digital exhibition spaces.',
      'Creative Ideation: Translated intricate cultural and premium product narratives into tangible design assets, bridging traditional luxury aesthetics with modern design principles.',
      'Design Execution: Collaborated with creative directors to ensure that all conceptual art and illustration assets perfectly matched the prestigious brand guidelines and campaign objectives of the firm.',
    ],
    tags: ['Concept Design', 'Visual Storytelling', 'Luxury Branding'],
    accent: '#f472b6',
  },
]

const ExperienceCard = ({ exp, index }) => {
  return (
    <div
      className="exp-card"
      id={`exp-card-${exp.id}`}
      style={{ '--card-accent': exp.accent }}
    >
      {/* Card content */}
      <div className="exp-card-inner">
        {/* Header row */}
        <div className="exp-card-header">
          <div className="exp-card-meta">
            <span className="exp-type-badge" style={{ borderColor: exp.accent }}>
              {exp.type}
            </span>
            <span className="exp-period">{exp.period}</span>
          </div>
          <div className="exp-card-index">
            <span>{String(index + 1).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Title area */}
        <h3 className="exp-role">{exp.role}</h3>
        <p className="exp-company">
          <span className="exp-company-at">@</span> {exp.company}
        </p>

        {/* Highlights */}
        <div className="exp-highlights-container">
          <ul className="exp-highlights">
            {exp.highlights.slice(0, 1).map((h, i) => (
              <li key={i} className="exp-highlight-item">
                <span className="exp-highlight-bullet" style={{ background: exp.accent }} />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {exp.highlights.length > 1 && (
            <>
              <div className="exp-highlights-collapsed-section">
                <div className="exp-highlights-collapsed-inner">
                  <ul className="exp-highlights">
                    {exp.highlights.slice(1).map((h, i) => (
                      <li key={i + 1} className="exp-highlight-item">
                        <span className="exp-highlight-bullet" style={{ background: exp.accent }} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="exp-highlights-expand-hint">
                <span className="exp-expand-icon">+</span> {exp.highlights.length - 1} more {exp.highlights.length - 1 === 1 ? 'achievement' : 'achievements'}
              </div>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="exp-tags">
          {exp.tags.map((tag, i) => (
            <span key={i} className="exp-tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Decorative floating orb */}
      <div className="exp-card-orb" style={{ background: exp.accent }} />
    </div>
  )
}

/* Floating tool icons config — position, size, animation */
const iconMap = {
  figma: iconFigma,
  claude: iconClaude,
  adobecc: iconAdobeCC,
  illustrator: iconIllustrator,
  photoshop: iconPhotoshop,
  chatgpt: iconChatGPT,
  lovable: iconLovable,
  stitch: iconStitch,
  framer: iconFramer,
  webflow: iconWebflow,
}

const floatingIcons = [
  { name: 'figma', top: '3%', left: '8%', size: 100, delay: 0, dur: 7 },
  { name: 'claude', top: '8%', left: '72%', size: 90, delay: 1.2, dur: 9 },
  { name: 'adobecc', top: '22%', left: '85%', size: 95, delay: 0.5, dur: 8 },
  { name: 'illustrator', top: '18%', left: '18%', size: 88, delay: 2, dur: 7.5 },
  { name: 'photoshop', top: '40%', left: '12%', size: 105, delay: 0.8, dur: 9.5 },
  { name: 'chatgpt', top: '38%', left: '78%', size: 92, delay: 1.5, dur: 8.5 },
  { name: 'lovable', top: '58%', left: '88%', size: 85, delay: 2.5, dur: 7 },
  { name: 'stitch', top: '55%', left: '5%', size: 90, delay: 0.3, dur: 10 },
  { name: 'framer', top: '75%', left: '15%', size: 88, delay: 1.8, dur: 8 },
  { name: 'webflow', top: '80%', left: '75%', size: 110, delay: 0.7, dur: 9 },
]


const Experience = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('experience--visible')
          }
        })
      },
      { threshold: 0.08 }
    )

    const section = sectionRef.current
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  return (
    <>
      <section className="experience" id="experience-section" ref={sectionRef}>
        {/* Ambient background elements */}
        <div className="exp-ambient exp-ambient--1" />
        <div className="exp-ambient exp-ambient--2" />
        {/* Breathing grid glows */}
        <div className="grid-glow grid-glow--1" />
        <div className="grid-glow grid-glow--2" />
        <div className="grid-glow grid-glow--3" />
        <div className="exp-grid-bg" />

        {/* Floating Tool Icons */}
        {floatingIcons.map((icon) => (
          <div
            key={icon.name}
            className="floating-icon"
            style={{
              top: icon.top,
              left: icon.left,
              right: icon.right,
              '--float-dur': `${icon.dur}s`,
              '--float-delay': `${icon.delay}s`,
              width: icon.size + 'px',
              height: icon.size + 'px',
            }}
          >
            <img
              src={iconMap[icon.name]}
              alt={icon.name}
              className="floating-icon-img"
              width={icon.size}
              height={icon.size}
              draggable="false"
            />
          </div>
        ))}

        <div className="experience-container">
          {/* Section Header */}
          <div className="experience-header">
            <span className="experience-index">02 / EXPERIENCE</span>
            <h2 className="experience-title">
              Professional <span className="experience-title-accent">Journey</span>
            </h2>
            <p className="experience-subtitle">
              Crafting digital experiences across brands — from luxury retail to edtech platforms.
            </p>
          </div>

          {/* Experience Cards Column */}
          <div className="experience-cards">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} exp={exp} index={index} />
            ))}
          </div>

          {/* Education & Achievements Section */}
          <div className="edu-achievements-section">
            <h3 className="edu-section-title">Education & Achievements</h3>
            <div className="edu-achievements-grid">
              {/* B.Des Card (Left, wider) */}
              <div className="edu-big-card">
                <div className="edu-big-card-glow" />
                <div className="edu-big-card-inner">
                  <div className="edu-big-card-content">
                    <span className="edu-label">Education</span>
                    <h3 className="edu-degree-title">B.Des</h3>
                    <h4 className="edu-degree-subtitle">Bachelor of Design</h4>
                    <p className="edu-institution-name">
                      National Institute of Fashion Technology (NIFT)
                    </p>
                    <span className="edu-year-badge">2019 — 2023</span>
                    <p className="edu-description">
                      Specialized in User Experience, Visual Communication, and Interactive Product Design. Combined classic design sensibilities with modern digital execution.
                    </p>
                  </div>
                  <div className="edu-logo-container">
                    <img src={logoNIFT} alt="NIFT Logo" className="nift-logo" />
                  </div>
                </div>
              </div>

              {/* Tall Schooling Card (Right, narrower) */}
              <div className="tall-certification-card">
                <div className="tall-certification-glow" />
                <div className="tall-certification-inner">
                  <div className="cert-content">
                    <span className="cert-label">Schooling</span>
                    <h4 className="cert-title">Class XII</h4>
                    <p className="cert-org">Senior Secondary Education, CBSE</p>
                    <div className="cert-capsules">
                      <span className="cert-capsule">Science & Math</span>
                      <span className="cert-capsule">CBSE Board</span>
                      <span className="cert-capsule">2017 — 2019</span>
                    </div>
                  </div>
                  <div className="cert-graphic-area">
                    <div className="cert-arrow-btn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cert-arrow-icon">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </div>
                    <div className="cert-badge-vertical">
                      Schooling
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement 1: Photography Club President */}
              <div className="achievement-card">
                <div className="ach-card-glow" />
                <div className="ach-card-inner">
                  <div className="ach-header-vertical">
                    <div className="ach-vertical-text">Leadership</div>
                    <div className="ach-header-content">
                      <span className="ach-label">Club President</span>
                      <h4 className="ach-title">Photography Club</h4>
                      <p className="ach-org">NIFT Delhi</p>
                    </div>
                  </div>
                  <div className="ach-footer">
                    <span className="ach-badge-pill">President</span>
                  </div>
                </div>
              </div>

              {/* Achievement 2: 10+ Digital Projects */}
              <div className="achievement-card">
                <div className="ach-card-glow" />
                <div className="ach-card-inner">
                  <div className="ach-header-vertical">
                    <div className="ach-vertical-text">Impact</div>
                    <div className="ach-header-content">
                      <span className="ach-label">Freelance & Client Works</span>
                      <h4 className="ach-title">10+ Projects</h4>
                      <p className="ach-org">Branding & Ad Campaign Projects</p>
                    </div>
                  </div>
                  <div className="ach-footer">
                    <span className="ach-badge-pill">Completed</span>
                  </div>
                </div>
              </div>

              {/* Achievement 3: UI Design Certification */}
              <div className="achievement-card">
                <div className="ach-card-glow" />
                <div className="ach-card-inner">
                  <div className="ach-header-vertical">
                    <div className="ach-vertical-text">Certification</div>
                    <div className="ach-header-content">
                      <span className="ach-label">Govt. of India</span>
                      <h4 className="ach-title">UI Design</h4>
                      <p className="ach-org">Ministry of Electronics & IT</p>
                    </div>
                  </div>
                  <div className="ach-footer">
                    <span className="ach-badge-pill">Certified</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ach-star-icon">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Experience
