import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Projects.css'
import { gsap } from 'gsap'
import { projects } from '../data/projects'

const Projects = () => {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)
  const cursorRef = useRef(null)
  const tweenRef = useRef(null)
  const cursorPos = useRef({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const navigate = useNavigate()

  /* Reveal header on scroll */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('projects-section--visible')
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])

  /* GSAP infinite auto-scroll */
  useLayoutEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Measure width of one set of cards (half the track since we duplicate)
    const halfWidth = track.scrollWidth / 2

    // Create a repeating tween: slide left by exactly one set width, then loop
    tweenRef.current = gsap.to(track, {
      x: -halfWidth,
      duration: 40,
      ease: 'none',
      repeat: -1, // infinite
      modifiers: {
        // Seamless wrap — reset position once it scrolls past one set
        x: gsap.utils.unitize((x) => {
          return parseFloat(x) % halfWidth
        }),
      },
    })

    return () => {
      tweenRef.current?.kill()
    }
  }, [])

  /* Pause/resume on hover */
  const handleWrapperEnter = useCallback(() => {
    setCursorVisible(true)
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 0, duration: 0.6, ease: 'power2.out' })
    }
  }, [])

  const handleWrapperLeave = useCallback(() => {
    setCursorVisible(false)
    if (tweenRef.current) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.8, ease: 'power2.inOut' })
    }
  }, [])

  /* GSAP-driven cursor follow with lerping */
  const handleMouseMove = useCallback((e) => {
    const wrapper = wrapperRef.current
    const cursor = cursorRef.current
    if (!wrapper || !cursor) return

    const rect = wrapper.getBoundingClientRect()
    cursorPos.current.x = e.clientX - rect.left
    cursorPos.current.y = e.clientY - rect.top

    gsap.to(cursor, {
      left: cursorPos.current.x,
      top: cursorPos.current.y,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  }, [])

  /* Scale cursor on card hover for extra feedback */
  const handleCardEnter = useCallback(() => {
    gsap.to(cursorRef.current, { scale: 1.15, duration: 0.3, ease: 'power2.out' })
  }, [])
  const handleCardLeave = useCallback(() => {
    gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' })
  }, [])

  const renderCard = (project, keyPrefix) => (
    <div
      key={`${keyPrefix}-${project.id}`}
      className="project-card"
      style={{
        '--proj-accent': project.accent,
        '--proj-gradient': project.gradient,
      }}
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="project-card-glass">
        {/* Gradient glow */}
        <div className="project-card-glow" />

        {/* Background image at 30% opacity */}
        {project.image && (
          <div
            className="project-card-bg-image"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        )}
        {/* Mock screen content */}
        <div className="project-card-mockup">
          <div className="mockup-browser-bar">
            <div className="mockup-dot" />
            <div className="mockup-dot" />
            <div className="mockup-dot" />
            <div className="mockup-url-bar" />
          </div>
          {project.image ? (
            <img src={project.image} alt={project.title} className="mockup-image" />
          ) : (
            <div className="mockup-content">
              <div className="mockup-hero-block" />
              <div className="mockup-text-lines">
                <div className="mockup-line mockup-line--long" />
                <div className="mockup-line mockup-line--medium" />
                <div className="mockup-line mockup-line--short" />
              </div>
              <div className="mockup-grid">
                <div className="mockup-grid-item" />
                <div className="mockup-grid-item" />
                <div className="mockup-grid-item" />
              </div>
            </div>
          )}
        </div>

        {/* Card title overlay at bottom */}
        <div className="project-card-bottom">
          <span className="project-card-category">{project.category}</span>
          <h3 className="project-card-title">{project.title}</h3>
        </div>
      </div>
    </div>
  )

  return (
    <section
      className="projects-section"
      id="projects-section"
      ref={sectionRef}
    >
      {/* Ambient background effects */}
      <div className="projects-ambient projects-ambient--1" />
      <div className="projects-ambient projects-ambient--2" />

      {/* Section Header */}
      <div className="projects-header">
        <div className="projects-header-inner">
          <div className="projects-header-left">
            <span className="projects-index">04 / PROJECTS</span>
            <h2 className="projects-title">
              Selected <span className="projects-title-accent">Works</span>
            </h2>
          </div>
          <div className="projects-header-right">
            <p className="projects-subtitle">
              A curated collection of projects that showcase creative problem-solving and polished design execution.
            </p>
            <Link to="/projects" className="projects-view-all">
              <span>View all projects</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel — GSAP auto-scroll */}
      <div
        className="projects-carousel-wrapper"
        ref={wrapperRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleWrapperEnter}
        onMouseLeave={handleWrapperLeave}
      >
        {/* Glassmorphism circle cursor */}
        <div
          className={`projects-cursor ${cursorVisible ? 'projects-cursor--active' : ''}`}
          ref={cursorRef}
        >
          <span>View</span>
        </div>

        {/* Auto-scrolling track — duplicated for seamless loop */}
        <div className="projects-carousel-track" ref={trackRef}>
          {projects.map((p) => renderCard(p, 'a'))}
          {projects.map((p) => renderCard(p, 'b'))}
        </div>
      </div>

      {/* Decorative bottom markers */}
      <div className="projects-markers">
        {projects.map((_, i) => (
          <span key={i} className="projects-marker">+</span>
        ))}
      </div>
    </section>
  )
}

export default Projects
