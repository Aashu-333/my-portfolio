import { useEffect, useRef, useLayoutEffect } from 'react'
import './Services.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import iconWebDesign from '../assets/icons/web_design_3d.png'
import iconUiUx from '../assets/icons/ui_ux_3d.png'
import iconVisualDirection from '../assets/icons/visual_direction_3d.png'
import iconMotionInteraction from '../assets/icons/motion_interaction_3d.png'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    id: 1,
    num: '01',
    title: 'Website Design',
    subheading: 'Turning complex business goals into high-performing digital spaces.',
    description:
      'A great website is more than just a pretty layout — it\'s a growth engine. I design responsive, modern, and lightning-fast web experiences tailored specifically to your target audience. By balancing content hierarchy with clean layouts, I ensure your site looks flawless on any screen size while actively guiding visitors toward your primary call to action.',
    focus: ['Responsive Web Layouts', 'Landing Page Optimization', 'Content Hierarchy', 'E-commerce Interfaces'],
    icon: iconWebDesign,
    accent: '#3b82f6',
    gradientFrom: 'rgba(59,130,246,0.15)',
    gradientTo:   'rgba(99,102,241,0.05)',
  },
  {
    id: 2,
    num: '02',
    title: 'UI/UX Design',
    subheading: 'Crafting intuitive, frictionless journeys that users love.',
    description:
      'Good design is invisible — it just feels right. I dive deep into user psychology and solid UX principles to map out seamless user flows, wireframes, and interactive prototypes. By testing assumptions early and focusing on accessibility, I build interfaces that feel completely natural to navigate, reducing drop-off rates and boosting user satisfaction.',
    focus: ['User Research & Mapping', 'Wireframing', 'High-Fidelity Prototyping', 'Usability Testing', 'Accessibility (WCAG)'],
    icon: iconUiUx,
    accent: '#6366f1',
    gradientFrom: 'rgba(99,102,241,0.15)',
    gradientTo:   'rgba(139,92,246,0.05)',
  },
  {
    id: 3,
    num: '03',
    title: 'Visual Direction',
    subheading: 'Establishing a distinct, scalable aesthetic identity for your brand.',
    description:
      'Every product needs a soul. I define the artistic vision of your digital product from scratch — starting with cohesive mood boards, curated typography, and intentional color psychology. To ensure your product can grow effortlessly, I translate this direction into comprehensive, scalable design systems and UI kits that development teams can implement with absolute ease.',
    focus: ['Brand Identity Systems', 'Mood Boards', 'UI Style Guides', 'Component Libraries', 'Typography & Color Systems'],
    icon: iconVisualDirection,
    accent: '#8b5cf6',
    gradientFrom: 'rgba(139,92,246,0.15)',
    gradientTo:   'rgba(236,72,153,0.05)',
  },
  {
    id: 4,
    num: '04',
    title: 'Motion & Interaction',
    subheading: 'Elevating the experience through purposeful animation.',
    description:
      "Motion is the bridge between a static screen and a living product. I design dynamic transitions and functional micro-interactions that don't just look cool, but actually delight users and provide subtle feedback. Whether it's a smooth page transition, a satisfying button click, or an engaging scroll effect, I add the final layer of polish that makes an interface feel premium.",
    focus: ['Micro-interactions', 'Functional Animation', 'Page Transitions', 'Interactive States', 'Lottie/SVG Animation Specs'],
    icon: iconMotionInteraction,
    accent: '#ec4899',
    gradientFrom: 'rgba(236,72,153,0.15)',
    gradientTo:   'rgba(239,68,68,0.05)',
  },
]

// ─── StackCards Component ────────────────────────────────────────────────────
const StackCards = ({ cards }) => {
  const stackRef  = useRef(null)   // outer container (provides scroll height)
  const cardsRef  = useRef([])     // individual card DOM nodes

  useLayoutEffect(() => {
    const container = stackRef.current
    const cardEls   = cardsRef.current.filter(Boolean)
    if (!container || !cardEls.length) return

    // matchMedia — only run GSAP stacking on desktop (≥ 769 px)
    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      const ctx = gsap.context(() => {
        cardEls.forEach((card, i) => {
          if (i === cardEls.length - 1) return   // last card — nothing below it

          const nextCard = cardEls[i + 1]
          const targetScale = 0.95 - i * 0.01   // each buried card shrinks a little more

          // fromTo explicitly defines BOTH states so reverse-scrub is glitch-free.
          // Without a declared "from", GSAP snapshots the current computed value
          // on first play — which causes a jump when scrolling back up.
          gsap.fromTo(
            card,
            // ── from (card is fully visible, next card hasn't arrived yet)
            { scale: 1, filter: 'brightness(1)' },
            // ── to   (next card has fully settled on top of this one)
            {
              scale:           targetScale,
              filter:          'brightness(0.45)',
              ease:            'none',
              immediateRender: false,   // don't apply "from" state on init
              scrollTrigger: {
                trigger:            nextCard,
                start:              'top 80px',
                end:                'top 10px',
                scrub:              true,          // pure scrub = no lag artifact on reverse
                invalidateOnRefresh: true,         // recalculate positions on resize
              },
            }
          )
        })
      }, container)

      return () => ctx.revert()
    })

    return () => mm.revert()
  }, [])

  return (
    <div className="sc-stack" ref={stackRef}>
      {cards.map((service, index) => (
        <div
          key={service.id}
          className="sc-card-wrap"
          ref={(el) => (cardsRef.current[index] = el)}
          style={{
            '--accent':        service.accent,
            '--grad-from':     service.gradientFrom,
            '--grad-to':       service.gradientTo,
            '--card-index':    index,
            '--card-total':    cards.length,
            // stagger sticky offset so each card stops slightly lower → depth illusion
            top: `calc(80px + ${index * 8}px)`,
            zIndex: 10 + index,
          }}
        >
          <div className="sc-card">
            {/* Folder-tab */}
            <div className="sc-card-tab">
              <div className="sc-card-tab-fill" />
              <div className="sc-card-tab-curve" />
            </div>

            {/* Glass pane */}
            <div className="sc-card-inner">
              {/* Radial glow */}
              <div className="sc-card-glow" />

              {/* Header row */}
              <div className="sc-card-header">
                <div className="sc-icon-box">
                  <img
                    src={service.icon}
                    alt={`${service.title} icon`}
                    className="sc-icon-img"
                  />
                </div>
                <div className="sc-outline-num">
                  <span>{service.num}</span>
                </div>
              </div>

              {/* Title & subheading */}
              <div className="sc-title-group">
                <h3 className="sc-card-title">{service.title}</h3>
                <p  className="sc-card-sub">{service.subheading}</p>
              </div>

              {/* Description */}
              <p className="sc-card-desc">{service.description}</p>

              {/* Focus areas */}
              <div className="sc-focus-section">
                <h4 className="sc-focus-label">Focus Areas:</h4>
                <div className="sc-focus-tags">
                  {service.focus.map((item, idx) => (
                    <span key={idx} className="sc-focus-tag">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Services Section ────────────────────────────────────────────────────────
const Services = () => {
  const sectionRef = useRef(null)

  /* Reveal header on scroll — Intersection Observer */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('services-section--visible')
        })
      },
      { threshold: 0.05 }
    )
    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])

  return (
    <section
      className="services-section"
      id="services-section"
      ref={sectionRef}
    >
      {/* Ambient background glows */}
      <div className="services-ambient services-ambient--1" />
      <div className="services-ambient services-ambient--2" />
      <div className="services-grid-bg" />

      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <span className="services-index">03 / SERVICES</span>
          <h2 className="services-title">
            Core <span className="services-title-accent">Capabilities</span>
          </h2>
          <p className="services-subtitle">
            Providing tailored creative solutions to scale your business and elevate your digital brand.
          </p>
        </div>

        {/* Stacked Cards */}
        <StackCards cards={services} />
      </div>
    </section>
  )
}

export default Services
