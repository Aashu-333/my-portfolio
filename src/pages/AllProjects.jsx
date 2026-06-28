import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { projects } from '../data/projects'
import './AllProjects.css'

const AllProjects = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0])
  const detailsRef = useRef(null)
  const navigate = useNavigate()

  /* Animation for details view change */
  useEffect(() => {
    if (detailsRef.current) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [selectedProject])

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="all-projects-page">
      <div className="all-projects-header">
        <h1>All Projects</h1>
        <p>A complete look at all of our featured case studies, designs, and development work.</p>
      </div>

      <div className="projects-grid-wrapper">
        <div className="projects-grid">
          {projects.map((p) => (
            <button
              key={p.id}
              className={`grid-card ${selectedProject.id === p.id ? 'grid-card--active' : ''}`}
              onClick={() => setSelectedProject(p)}
              style={{ '--proj-gradient': p.gradient, '--proj-accent': p.accent }}
            >
              <span className="grid-card-title">{p.title}</span>
            </button>
          ))}
        </div>

        <div className="project-details-panel">
          <div
            className="details-panel-inner"
            ref={detailsRef}
            style={{ '--proj-gradient': selectedProject.gradient, '--proj-accent': selectedProject.accent }}
          >
            <div className="details-glow" />
            <div className="details-content">
              <span className="details-category">{selectedProject.category}</span>
              <h3 className="details-title">{selectedProject.title}</h3>
              <p className="details-description">{selectedProject.description}</p>
              <button 
                className="details-btn"
                onClick={() => navigate(`/project/${selectedProject.id}`)}
              >
                View Case Study
              </button>
            </div>
            <div className="details-visual">
              <div className="details-mockup">
                <div className="mockup-browser-bar">
                  <div className="mockup-dot" />
                  <div className="mockup-dot" />
                  <div className="mockup-dot" />
                  <div className="mockup-url-bar" />
                </div>
                {selectedProject.image ? (
                  <img src={selectedProject.image} alt={selectedProject.title} className="mockup-image-large" />
                ) : (
                  <div className="mockup-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="mockup-hero-block" style={{ height: '120px' }} />
                    <div className="mockup-text-lines">
                      <div className="mockup-line mockup-line--long" />
                      <div className="mockup-line mockup-line--medium" />
                      <div className="mockup-line mockup-line--short" />
                    </div>
                    <div className="mockup-grid" style={{ marginTop: 'auto' }}>
                      <div className="mockup-grid-item" style={{ height: '70px' }} />
                      <div className="mockup-grid-item" style={{ height: '70px' }} />
                      <div className="mockup-grid-item" style={{ height: '70px' }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllProjects
