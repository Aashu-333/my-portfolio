import { useState, useEffect, useRef } from 'react'
import './Contact.css'

const Contact = () => {
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('contact-section--visible')
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

  const copyEmail = () => {
    navigator.clipboard.writeText('aayushkanojia@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socials = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/aayush-kanojia-65b5b015b/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/theshreddedartist',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
  ]

  return (
    <section className="contact-section" id="contact-section" ref={sectionRef}>
      <div className="contact-container">
        {/* Header */}
        <div className="contact-header">
          <span className="contact-index">02 / CONTACT</span>
          <h2 className="contact-title">Let's create something together</h2>
        </div>

        {/* Content Layout */}
        <div className="contact-content">
          <div className="contact-left">
            <p className="contact-lead">
              Have an exciting project, a role suggestion, or just want to chat? Drop me an email or connect through my social channels.
            </p>
            
            {/* Interactive Email Box */}
            <div className="email-box" onClick={copyEmail} title="Click to copy email address">
              <div className="email-box-left">
                <span className="email-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="email-address">
                  aayushknojia1999@gmail.com
                </span>
              </div>
              <button className="copy-btn" aria-label="Copy email address">
                {copied ? (
                  <span className="copy-feedback">Copied!</span>
                ) : (
                  <svg className="copy-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M5.333 2.667h6.667c.736 0 1.333.597 1.333 1.333v6.667c0 .736-.597 1.333-1.333 1.333H5.333a1.333 1.333 0 01-1.333-1.333V4c0-.736.597-1.333 1.333-1.333z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2.667 5.333V12c0 .736.597 1.333 1.333 1.333h6.667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="contact-right">
            <div className="socials-grid">
              {socials.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-card"
                >
                  <div className="social-card-left">
                    <span className="social-icon-wrapper">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </div>
                  <span className="social-arrow">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3.5 10.5L10.5 3.5M10.5 3.5H5.25M10.5 3.5V8.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="contact-footer">
          <p className="copyright">© {new Date().getFullYear()} Aayush Kanojia. All rights reserved.</p>
          <div className="footer-meta">
            <span>Designed &amp; Coded in India</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
