import { useState, useEffect, useRef } from 'react'
import './Navbar.css'

const navItems = [
  { id: 'hero-section', label: 'Home' },
  { id: 'experience-section', label: 'Experience' },
  { id: 'about-section', label: 'About' },
  { id: 'contact-section', label: 'Contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero-section')
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 })

  const navRefs = useRef([])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    navItems.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updatePill = () => {
      const targetIdx = hoveredIdx !== null ? hoveredIdx : navItems.findIndex(item => item.id === activeSection)
      if (targetIdx !== -1 && navRefs.current[targetIdx]) {
        const targetEl = navRefs.current[targetIdx]
        setPillStyle({
          left: targetEl.offsetLeft,
          width: targetEl.offsetWidth,
          opacity: 1
        })
      } else {
        setPillStyle(prev => ({ ...prev, opacity: 0 }))
      }
    }
    updatePill()
    window.addEventListener('resize', updatePill)
    return () => window.removeEventListener('resize', updatePill)
  }, [activeSection, hoveredIdx])

  const handleLinkClick = (e, targetId) => {
    e.preventDefault()
    setMenuOpen(false)
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${menuOpen ? 'navbar--menu-open' : ''}`} id="navbar">
        <div className="navbar-container">
          {/* Scroll Progress Bar at the bottom of the container */}
          <div className="nav-progress">
            <div className="nav-progress-bar" style={{ '--scroll-progress': `${scrollProgress}%` }} />
          </div>

          <a href="#hero-section" onClick={(e) => handleLinkClick(e, 'hero-section')} className="nav-brand" id="nav-brand">
            <div className="brand-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="3" fill="#FF7A1A" />
                <circle cx="10" cy="10" r="7" stroke="#FF7A1A" strokeWidth="1.5" opacity="0.5" />
                <circle cx="10" cy="10" r="9.5" stroke="#FF7A1A" strokeWidth="0.8" opacity="0.25" />
              </svg>
            </div>
            <div className="brand-text-group">
              <span className="brand-name">Aayush</span>
              <div className="brand-status">
                <span className="status-dot" />
                <span className="status-label">Available for work</span>
              </div>
            </div>
          </a>

          {/* Desktop Menu links with sliding pill highlight */}
          <div className="nav-desktop-menu">
            <div className="nav-hover-pill" style={pillStyle} />
            {navItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                ref={el => navRefs.current[idx] = el}
                onClick={(e) => handleLinkClick(e, item.id)}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`nav-link ${activeSection === item.id ? 'nav-link--active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Let's Talk Button */}
          <div className="nav-actions">
            <a
              href="#contact-section"
              onClick={(e) => handleLinkClick(e, 'contact-section')}
              className="nav-cta-btn"
            >
              <span>Let's Talk</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Hamburger trigger */}
          <button
            className={`nav-menu-btn ${menuOpen ? 'nav-menu-btn--active' : ''}`}
            id="nav-menu-btn"
            aria-label="Toggle navigation menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="menu-line" />
            <span className="menu-line" />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Menu Overlay */}
      <div className={`nav-overlay ${menuOpen ? 'nav-overlay--open' : ''}`}>
        <div className="nav-overlay-content">
          <div className="nav-overlay-links">
            {navItems.map((item, idx) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`overlay-link ${activeSection === item.id ? 'overlay-link--active' : ''}`}
                style={{ '--idx': idx + 1 }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="nav-overlay-footer" style={{ '--idx': navItems.length + 1 }}>
            <span className="overlay-footer-title">GET IN TOUCH</span>
            <a href="mailto:aayushkanojia@gmail.com" className="overlay-email">aayushkanojia@gmail.com</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar

