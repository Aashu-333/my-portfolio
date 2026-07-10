import { useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import './ProjectDetail.css'


const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const showcaseRef = useRef(null)

  const project = projects.find(p => p.id === parseInt(id))
  const hasShowcase = project?.showcaseImages || project?.features || project?.palette

  const projectLinks = project.liveUrl.split(",");
  console.log(projectLinks);
  

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('sc-visible')
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -20px 0px' }
    )
    const els = document.querySelectorAll('.sc-reveal')
    els.forEach(el => observer.observe(el))
    return () => els.forEach(el => observer.unobserve(el))
  }, [id])

  // Scroll Timeline Arrow tracking effect
  useEffect(() => {
    const handleScroll = () => {
      const lineEl = document.querySelector('.sc-timeline-line')
      const arrowEl = document.querySelector('.sc-timeline-arrow')
      if (!lineEl || !arrowEl) return

      const rect = lineEl.getBoundingClientRect()
      const viewHeight = window.innerHeight

      // Track scroll depth relative to the vertical line
      const totalHeight = rect.height
      const scrolled = (viewHeight / 2) - rect.top

      // Calculate percentage and update translate/position
      const pct = Math.max(0, Math.min(100, (scrolled / totalHeight) * 100))
      arrowEl.style.top = `${pct}%`
    }

    window.addEventListener('scroll', handleScroll)
    // Run once on load/mount
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [id])

  if (!project) {
    return (
      <div className="project-detail-error">
        <h2>Project not found</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    )
  }

  return (
    <div
      className="project-detail-page"
      style={{
        '--proj-gradient': project.gradient,
        '--proj-accent': project.accent
      }}
    >
      {/* Dynamic Background Glow */}
      <div className="detail-bg-glow" />

      {/* Header / Navigation */}
      <div className="detail-header-nav">
        <button onClick={() => navigate(-1)} className="detail-back-btn">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      <div className="detail-main-container">
        {/* Left Side: Text Content */}
        <div className="detail-text-content">
          <span className="detail-category">{project.category}</span>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-description">{project.description}</p>

          <div className="detail-meta">
            <div className="meta-item">
              <span className="meta-label">Client</span>
              <span className="meta-value">{project.client || 'Confidential'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Role</span>
              <span className="meta-value">{project.role || 'Lead Designer'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Year</span>
              <span className="meta-value">{project.year || '2024'}</span>
            </div>
            {project.platform && (
              <div className="meta-item">
                <span className="meta-label">Platform</span>
                <span className="meta-value">{project.platform}</span>
              </div>
            )}
          </div>

          <div className="detail-actions">
            {project.liveUrl ? (
              projectLinks.map((ele, index) => (
              <a key={index} href={ele} target="_blank" rel="noopener noreferrer" className="detail-launch-btn">
                View Live Site {projectLinks.length > 1 ? `${index + 1}` : ''} ↗
              </a>
              ))
            ) : (
              <a href="#" className="detail-launch-btn">Launch Project</a>
            )}
            {hasShowcase && (
              <button
                className="detail-scroll-btn"
                onClick={() => showcaseRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Showcase ↓
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Visual Mockup */}
        <div className="detail-visual-content">
          <div className="detail-mockup-large">
            <div className="mockup-browser-bar">
              <div className="mockup-dot" />
              <div className="mockup-dot" />
              <div className="mockup-dot" />
              <div className="mockup-url-bar" />
            </div>
            {project.image ? (
              <img src={project.image} alt={project.title} className="mockup-image-large" />
            ) : (
              <div className="mockup-body">
                <div className="mockup-hero" />
                <div className="mockup-text-lines">
                  <div className="mockup-line mockup-line--long" />
                  <div className="mockup-line mockup-line--medium" />
                  <div className="mockup-line mockup-line--short" />
                </div>
                <div className="mockup-grid-large">
                  <div className="mockup-box" />
                  <div className="mockup-box" />
                  <div className="mockup-box" />
                  <div className="mockup-box" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ═══════════ SHOWCASE SECTIONS (only for projects with extended data) ═══════════ */}
      {hasShowcase && (
        <div className="showcase-container" ref={showcaseRef}>

          {/* ── Key Features ── */}
          {project.features && project.features.length > 0 && (
            <section className="sc-section sc-features-section">
              <div className="sc-wrap">
                <div className="sc-section-head sc-reveal">
                  <span className="sc-eyebrow">Key Features</span>
                  <h2 className="sc-title">What Makes It Work</h2>
                </div>
                <div className="sc-features-grid">
                  {project.features.map((feat, i) => (
                    <div className="sc-feature-card sc-reveal" key={i}>
                      <div className="sc-feature-num">{String(i + 1).padStart(2, '0')}</div>
                      <h4>{feat.title}</h4>
                      <p>{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Design Highlights ── */}
          {project.designHighlights && project.designHighlights.length > 0 && (
            <section className="sc-section sc-highlights-section">
              <div className="sc-wrap">
                <div className="sc-section-head sc-reveal">
                  <span className="sc-eyebrow">Design Decisions</span>
                  <h2 className="sc-title">UX Details That Matter</h2>
                </div>
                <div className="sc-highlights-list">
                  {project.designHighlights.map((hl, i) => (
                    <div className="sc-highlight-item sc-reveal" key={i}>
                      <div className="sc-hl-marker" />
                      <p>{hl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ── Showcase Images Gallery ── */}
          {project.showcaseImages && project.showcaseImages.length > 0 && (
            <section className="sc-section sc-images-section">
              <div className="sc-wrap">
                <div className="sc-section-head sc-reveal">
                  <span className="sc-eyebrow">Design Showcase</span>
                  <h2 className="sc-title">Visual Presentation</h2>
                  <p className="sc-subtitle">High-fidelity design mockups showcasing the shipped interface across devices and contexts.</p>
                </div>

                {project.mockups && project.mockups.length > 0 && (
                  <div className="sc-mockups-bento sc-reveal">
                    <div className="sc-bento-item sc-bento-item--large">
                      <img src={project.mockups[0]} alt="Hero Design Mockup" loading="lazy" />
                    </div>
                    <div className="sc-bento-item sc-bento-item--small-1">
                      <img src={project.mockups[1]} alt="Services Mockup" loading="lazy" />
                    </div>
                    <div className="sc-bento-item sc-bento-item--small-2">
                      <img src={project.mockups[2]} alt="Features Mockup" loading="lazy" />
                    </div>
                  </div>
                )}

                
                <div className="sc-timeline-container">
                  <div className="sc-timeline-line">
                    <div className="sc-timeline-arrow">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M19 12L12 19L5 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  <div className="sc-timeline-items">
                    {project.showcaseImages.map((img, i) => {
                      const isEven = i % 2 === 0
                      return (
                        <div className={`sc-timeline-row sc-reveal ${isEven ? 'row-normal' : 'row-reversed'}`} key={i}>
                          <div className="sc-timeline-visual">
                            <img src={img.src} alt={img.label} loading="lazy" />
                          </div>

                          <div className="sc-timeline-divider-dot">
                            <span className="sc-dot-glow" style={{ background: 'var(--proj-accent)' }} />
                          </div>

                          <div className="sc-timeline-text">
                            <div className="sc-image-label">
                              <span className="sc-image-dot" style={{ background: 'var(--proj-accent)' }} />
                              {img.label}
                            </div>
                            {img.explanation && (
                              <p className="sc-image-explanation">{img.explanation}</p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Color Palette ── */}
          {project.palette && project.palette.length > 0 && (
            <section className="sc-section sc-palette-section">
              <div className="sc-wrap">
                <div className="sc-section-head sc-reveal">
                  <span className="sc-eyebrow">Visual Identity</span>
                  <h2 className="sc-title">Color Palette</h2>
                </div>
                <div className="sc-palette-grid sc-reveal">
                  {project.palette.map((color, i) => {
                    const isLight = ['#EEF2F0', '#FFFFFF', '#F7F9F8', '#FAF6EE'].includes(color.hex.toUpperCase())
                    return (
                      <div
                        className="sc-swatch"
                        style={{ background: color.hex }}
                        key={i}
                      >
                        <span className="sc-swatch-name" style={{ color: isLight ? '#0B2A4A' : '#fff' }}>{color.name}</span>
                        <span className="sc-swatch-hex" style={{ color: isLight ? 'rgba(11,42,74,0.6)' : 'rgba(255,255,255,0.65)' }}>{color.hex}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          )}


          {/* ── CTA Footer ── */}
          {project.liveUrl && (
            <section className="sc-section sc-cta-section sc-reveal">
              <div className="sc-wrap">
                <div className="sc-cta-card">
                  <h2>See it live.</h2>
                  <p>This project is live and serving real users right now.</p>
                  {projectLinks.map((link, index) => (
                    <a key={index} href={link} target="_blank" rel="noopener noreferrer" className="sc-cta-btn">
                      Visit {project.title} {projectLinks.length > 1 ? `${index + 1}` : ''} ↗
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  )
}

export default ProjectDetail
