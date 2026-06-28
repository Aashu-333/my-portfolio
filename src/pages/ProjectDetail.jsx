import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'
import './ProjectDetail.css'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const project = projects.find(p => p.id === parseInt(id))

  useEffect(() => {
    window.scrollTo(0, 0)
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
              <span className="meta-value">Confidential</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Role</span>
              <span className="meta-value">Lead Designer</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Year</span>
              <span className="meta-value">2024</span>
            </div>
          </div>
          
          <div className="detail-actions">
            <a href="#" className="detail-launch-btn">Launch Project</a>
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
    </div>
  )
}

export default ProjectDetail
