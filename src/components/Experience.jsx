import { useEffect, useRef, useCallback } from 'react'
import './Experience.css'

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
      'Cross-Functional Collaboration: Partner closely with Product Managers, Developers, and Marketing teams to translate complex business requirements and high-level user needs into intuitive, user-centric interface designs.',
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
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    requestAnimationFrame(() => {
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }, [])

  return (
    <div
      className="exp-card"
      id={`exp-card-${exp.id}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-accent': exp.accent, animationDelay: `${0.15 * index}s` }}
    >
      {/* Mouse-tracking glow overlay */}
      <div className="exp-card-glow" />


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
        <ul className="exp-highlights">
          {exp.highlights.map((h, i) => (
            <li key={i} className="exp-highlight-item">
              <span className="exp-highlight-bullet" style={{ background: exp.accent }} />
              <span>{h}</span>
            </li>
          ))}
        </ul>

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

          {/* Education & Certifications */}
          <div className="experience-education">
            <div className="edu-card">
              <div className="edu-card-glow" />
              <div className="edu-card-inner">
                <h4 className="edu-label">Education</h4>
                <h3 className="edu-degree">B.Des — Bachelor of Design</h3>
                <p className="edu-institution">National Institute of Fashion Technology (NIFT)</p>
                <span className="edu-period">2019 — 2023</span>
              </div>
            </div>
            <div className="edu-card">
              <div className="edu-card-glow" />
              <div className="edu-card-inner">
                <h4 className="edu-label">Certification</h4>
                <h3 className="edu-degree">UI Design Certification</h3>
                <p className="edu-institution">Ministry of Electronics & IT, Govt. of India</p>
                <span className="edu-period">Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Experience

