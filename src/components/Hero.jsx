import { useEffect, useRef, useCallback } from 'react';
import './Hero.css';
import heroBg from '../assets/hero.JPG';

const Hero = () => {
  const heroRef = useRef(null)
  const portraitRef = useRef(null)
  const glowRef = useRef(null)

  // Parallax effect on portrait
  const handleMouseMove = useCallback((e) => {
    if (!portraitRef.current || !heroRef.current) return

    const rect = heroRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    requestAnimationFrame(() => {
      if (portraitRef.current) {
        portraitRef.current.style.transform = `scale(1.05) translate(${x * 12}px, ${y * 8}px)`
      }
    })

    // Cursor glow
    if (glowRef.current) {
      requestAnimationFrame(() => {
        if (glowRef.current) {
          glowRef.current.style.left = e.clientX + 'px'
          glowRef.current.style.top = e.clientY + 'px'
          glowRef.current.style.opacity = '1'
        }
      })
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (portraitRef.current) {
      portraitRef.current.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      portraitRef.current.style.transform = 'scale(1.05)'
      setTimeout(() => {
        if (portraitRef.current) {
          portraitRef.current.style.transition = ''
        }
      }, 600)
    }
    if (glowRef.current) {
      glowRef.current.style.opacity = '0'
    }
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <section className="hero" id="hero-section" ref={heroRef}>
      {/* Ambient Glow Effects */}
      <div className="ambient-glow ambient-glow--1" />
      <div className="ambient-glow ambient-glow--2" />
      <div className="grain-overlay" />

      {/* Cursor Follow Glow */}
      <div className="cursor-glow" ref={glowRef} />

      {/* Hero Background Image */}
      <div className="hero-bg" id="hero-bg" ref={portraitRef}>
        <img
          src={heroBg}
          alt="Aayush Kanojia — Creative UI/UX Designer"
          loading="eager"
          draggable="false"
        />
        <div className="hero-bg-overlay" />
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        {/* Left Column */}
        <div className="hero-left" id="hero-left">
          <div className="status-badge" id="status-badge">
            <span className="status-dot" />
            <span className="status-text">Available for Work</span>
          </div>

          <h1 className="hero-heading" id="hero-heading">
            <span className="calligraphy-text">Creative</span>
            <br />
            <span className="big-text">UI<span className="big-text-slash">/</span>UX</span>
            <br />
            <span className="sub-text">
              &amp; Visual Designer
              <br />
              based in <span style={{ color: 'var(--color-accent)' }}>Delhi</span>
            </span>
          </h1>
        </div>

        {/* Right Column */}
        <div className="hero-right" id="hero-right">
          <p className="hero-description" id="hero-description">
            Hi, I'm Aayush Kanojia — a creative designer
            passionate about building modern digital experiences that combine
            aesthetics and functionality.
          </p>

          <a href="#experience-section" onClick={(e) => { e.preventDefault(); document.getElementById('experience-section')?.scrollIntoView({ behavior: 'smooth' }) }} className="cta-button" id="cta-view-work">
            <span className="cta-arrow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="cta-text">View My Work</span>
          </a>
        </div>
      </div>

      {/* Large Name Typography */}
      <div className="hero-name-container" id="hero-name">
        {'AAYUSH'.split('').map((letter, i) => (
          <span key={i} className="hero-name-letter" style={{ animationDelay: `${0.5 + i * 0.08}s` }}>
            {letter}
          </span>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" id="scroll-indicator">
        <div className="scroll-line" />
        <span className="scroll-text">Scroll</span>
      </div>
    </section>
  )
}

export default Hero
