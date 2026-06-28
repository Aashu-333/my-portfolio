import { useEffect, useRef, useState } from 'react'
import './About.css'
import characterVideo from '../assets/portfolio/Animate_3D_character_design_202606290203.mp4'

const About = () => {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('about-section--visible')

            // Play audio on first intersection only
            if (!hasPlayedAudio && videoRef.current) {
              videoRef.current.muted = false
              videoRef.current.play().catch(() => {
                // Autoplay with audio blocked — keep muted
                videoRef.current.muted = true
              })
              setHasPlayedAudio(true)
            }
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
  }, [hasPlayedAudio])

  // After first play completes, mute for subsequent loops
  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.muted = true
      setIsMuted(true)
      videoRef.current.play()
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

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
      {/* Ambient glows */}
      <div className="about-ambient about-ambient--1" />
      <div className="about-ambient about-ambient--2" />

      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          <span className="about-index">01 / ABOUT ME</span>
          <h2 className="about-title">
            Designing digital realities with <span className="highlight-text">elegance</span> and <span className="highlight-text">precision</span>.
          </h2>
        </div>

        {/* Main Layout */}
        <div className="about-main-layout">
          {/* Left: 3D Character Video */}
          <div className="about-video-zone">
            <div className="video-wrapper">
              <video
                ref={videoRef}
                src={characterVideo}
                className="about-character-video"
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnded}
              />

              {/* Audio toggle */}
              <button className="video-mute-btn" onClick={toggleMute} aria-label="Toggle audio">
                {isMuted ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>

            {/* Floating 3D GenZ elements */}
            <div className="floating-element floating-el-1">
              <span>✦</span>
            </div>
            <div className="floating-element floating-el-2">
              <span>⚡</span>
            </div>
            <div className="floating-element floating-el-3">
              <span>◆</span>
            </div>
            <div className="floating-element floating-el-4">
              <span>✧</span>
            </div>
            <div className="floating-element floating-el-5">
              <span>△</span>
            </div>
            <div className="floating-element floating-el-6">
              <span>🎨</span>
            </div>

            {/* Glass tag badges */}
            <div className="glass-tag glass-tag-0">Meet my AI Avatar ✨</div>
            <div className="glass-tag glass-tag-1">Designer</div>
            <div className="glass-tag glass-tag-2">Creative Lead</div>
            <div className="glass-tag glass-tag-3">3+ Years</div>
          </div>

          {/* Right: Bio + Capabilities */}
          <div className="about-info-side">
            {/* Biography */}
            <div className="about-bio">
              <p className="bio-lead">
                I am Aayush Kanojia, a designer dedicated to crafting bespoke digital experiences. I believe that design should not only look premium but feel organic and alive.
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
      </div>
    </section>
  )
}

export default About
