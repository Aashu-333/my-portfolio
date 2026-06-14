import { useEffect, useRef } from 'react'
import './About.css'

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-section--visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const section = sectionRef.current
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  const capabilities = [
    {
      num: '01',
      title: 'UI & UX Design',
      desc: 'Crafting intuitive, user-centric wireframes and polished interface designs with pixel-perfect accuracy.',
    },
    {
      num: '02',
      title: 'Interaction Design',
      desc: 'Defining interactive patterns, micro-animations, and dynamic transitions that elevate user delight.',
    },
    {
      num: '03',
      title: 'Brand System Design',
      desc: 'Establishing coherent visual languages, typography rules, color tokens, and structural design systems.',
    },
    {
      num: '04',
      title: 'Creative Web Dev',
      desc: 'Bridging design and technology with performant, clean frontend code and responsive structures.',
    },
  ]

  return (
    <section className="about-section" id="about-section" ref={sectionRef}>
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <span className="about-index">01 / ABOUT ME</span>
          <h2 className="about-title">
            Designing digital realities with <span className="highlight-text">elegance</span> and <span className="highlight-text">precision</span>.
          </h2>
        </div>

        {/* Content Grid */}
        <div className="about-grid">
          {/* Biography/Philosophy */}
          <div className="about-bio">
            <p className="bio-lead">
              I am Aayush Kanojia, a designer and developer dedicated to crafting bespoke digital experiences. I believe that design should not only look premium but feel organic and alive.
            </p>
            <p className="bio-body">
              Based in Delhi, India, I specialize in combining rigorous user research with bold, expressive aesthetics. My approach balances minimalistic elegance with micro-interactivity, ensuring every interface is as functional as it is memorable.
            </p>
            <div className="bio-stats">
              <div className="stat-card">
                <span className="stat-value">3+</span>
                <span className="stat-label">Years of Craft</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">20+</span>
                <span className="stat-label">Projects Guided</span>
              </div>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="about-capabilities">
            <h3 className="capabilities-title">Core Disciplines</h3>
            <div className="capabilities-list">
              {capabilities.map((item, idx) => (
                <div key={idx} className="capability-item">
                  <div className="capability-num">{item.num}</div>
                  <div className="capability-content">
                    <h4 className="capability-name">{item.title}</h4>
                    <p className="capability-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
