import { useState, useEffect, useRef, useCallback } from 'react'
import './Services.css'

import imgWebDesign from '../assets/Services/Website_design.PNG'
import imgUiUx from '../assets/Services/UiUx_design.PNG'
import imgVisualDirection from '../assets/Services/Visual_direction.PNG'
import imgMotionInteraction from '../assets/Services/Motion_interaction.PNG'
import imgInfoArch from '../assets/Services/Information_architecture.PNG'

const services = [
  {
    id: 1,
    num: '01',
    title: 'Website Design',
    subtitle: 'High-performing digital experiences',
    description:
      'Responsive, modern, lightning-fast web experiences tailored to your audience — balancing content hierarchy with clean layouts.',
    image: imgWebDesign,
    accent: '#3b82f6',
  },
  {
    id: 2,
    num: '02',
    title: 'UI/UX Design',
    subtitle: 'Intuitive, frictionless journeys',
    description:
      'Seamless user flows, wireframes, and interactive prototypes built on deep user research and solid UX principles.',
    image: imgUiUx,
    accent: '#6366f1',
  },
  {
    id: 3,
    num: '03',
    title: 'Visual Direction',
    subtitle: 'Scalable aesthetic identity',
    description:
      'Cohesive mood boards, curated typography, and color psychology translated into comprehensive, scalable design systems.',
    image: imgVisualDirection,
    accent: '#8b5cf6',
  },
  {
    id: 4,
    num: '04',
    title: 'Motion & Interaction',
    subtitle: 'Purposeful animation design',
    description:
      'Dynamic transitions and micro-interactions that delight users, providing subtle feedback and a premium feel.',
    image: imgMotionInteraction,
    accent: '#ec4899',
  },
  {
    id: 5,
    num: '05',
    title: 'Information Architecture',
    subtitle: 'Structuring complex data flows',
    description:
      'Organizing content, user journeys, and hierarchy logically to ensure users find information quickly and seamlessly.',
    image: imgInfoArch,
    accent: '#10b981',
  },
]

// ─── iPhone Frame Component ───────────────────────────────────────────────────
const IPhoneFrame = ({ children, accent }) => (
  <div className="iphone-frame" style={{ '--active-accent': accent }}>
    {/* Outer gold bezel */}
    <div className="iphone-bezel">
      {/* Side buttons */}
      <div className="iphone-btn iphone-btn--silent" />
      <div className="iphone-btn iphone-btn--volup" />
      <div className="iphone-btn iphone-btn--voldown" />
      <div className="iphone-btn iphone-btn--power" />

      {/* Inner screen area */}
      <div className="iphone-screen">
        {/* Dynamic Island */}
        <div className="iphone-island" />
        {/* Content */}
        <div className="iphone-screen-content">
          {children}
        </div>
      </div>
    </div>
  </div>
)

// ─── Navigation Arrow ─────────────────────────────────────────────────────────
const NavArrow = ({ direction, onClick }) => (
  <button
    className={`svc-nav-arrow svc-nav-arrow--${direction}`}
    onClick={onClick}
    aria-label={`${direction === 'left' ? 'Previous' : 'Next'} service`}
  >
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
)

// ─── Services Section ─────────────────────────────────────────────────────────
const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) section.classList.add('services--visible')
      },
      { threshold: 0.08 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  const goTo = useCallback((index) => {
    const n = services.length
    setActiveIndex(((index % n) + n) % n)
  }, [])

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  const getOffset = (index) => {
    const n = services.length
    let diff = index - activeIndex
    if (diff > n / 2) diff -= n
    if (diff < -n / 2) diff += n
    return diff
  }

  return (
    <section className="services-section" id="services-section" ref={sectionRef}>
      {/* Ambient glows */}
      <div className="services-ambient services-ambient--1" />
      <div className="services-ambient services-ambient--2" />

      {/* Section Header */}
      <div className="services-header">
        <span className="services-index">05 / SERVICES</span>
        <h2 className="services-title">
          Core <span className="services-title-accent">Capabilities</span>
        </h2>
        <p className="services-subtitle">
          Providing tailored creative solutions to scale your business and elevate your digital brand.
        </p>
      </div>

      {/* Carousel */}
      <div className="svc-carousel">
        <NavArrow direction="left" onClick={goPrev} />

         <div className="svc-carousel-track">
          {/* 1. Horizontal track of side cards (plain preview boxes) */}
          <div className="svc-side-cards-track">
            {services.map((service, i) => {
              const offset = getOffset(i)
              const isCenter = offset === 0
              const absOffset = Math.abs(offset)

              return (
                <div
                  key={service.id}
                  className={`svc-carousel-item ${isCenter ? 'svc-carousel-item--active' : ''}`}
                  style={{
                    '--offset': offset,
                    '--abs-offset': absOffset,
                    '--card-accent': service.accent,
                  }}
                  onClick={() => goTo(i)}
                >
                  <div className="svc-preview-card">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="svc-preview-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* 2. Stationary iPhone frame in the center */}
          <div className="svc-center-frame-container">
            <IPhoneFrame accent="var(--color-accent)">
              <div className="svc-screen-slider">
                {services.map((service, idx) => {
                  const slideOffset = getOffset(idx)
                  const absOffset = Math.abs(slideOffset)
                  const isHidden = absOffset > 1
                  return (
                    <img
                      key={service.id}
                      src={service.image}
                      alt={service.title}
                      className={`svc-screen-slide-img ${isHidden ? 'svc-screen-slide-img--hidden' : ''}`}
                      style={{
                        transform: `translateX(${slideOffset * 100}%)`,
                      }}
                      loading="lazy"
                    />
                  )
                })}
              </div>
            </IPhoneFrame>

            {/* Hover details overlay for the active card */}
            <div className="svc-card-overlay">
              <h3 className="svc-card-title">{services[activeIndex].title}</h3>
              <p className="svc-card-subtitle">{services[activeIndex].subtitle}</p>
              <p className="svc-card-desc">{services[activeIndex].description}</p>
            </div>
          </div>
        </div>

        <NavArrow direction="right" onClick={goNext} />
      </div>

      {/* Dots indicator */}
      <div className="svc-dots">
        {services.map((_, i) => (
          <button
            key={i}
            className={`svc-dot ${i === activeIndex ? 'svc-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to service ${i + 1}`}
          />
        ))}
      </div>

      {/* Active service info below carousel */}
      <div className="svc-active-info" key={activeIndex}>
        <span className="svc-active-num">{services[activeIndex].num}</span>
        <h3 className="svc-active-title">{services[activeIndex].title}</h3>
        <p className="svc-active-subtitle">{services[activeIndex].subtitle}</p>
      </div>
    </section>
  )
}

export default Services
