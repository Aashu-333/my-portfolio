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
    description: 'A great website is more than just a pretty layout; it\u2019s a growth engine. I design responsive, modern, and lightning-fast web experiences tailored specifically to your target audience. By balancing content hierarchy with clean layouts, I ensure your site looks flawless on any screen size while actively guiding visitors toward your primary call to action.',
    focus: ['Responsive Web Layouts', 'Landing Page Optimization', 'Content Hierarchy', 'E-commerce Interfaces'],
    icon: iconWebDesign,
    accent: '#3b82f6',
  },
  {
    id: 2,
    num: '02',
    title: 'UI/UX Design',
    subheading: 'Crafting intuitive, frictionless journeys that users love.',
    description: 'Good design is invisible\u2014it just feels right. I dive deep into user psychology and solid UX principles to map out seamless user flows, wireframes, and interactive prototypes. By testing assumptions early and focusing on accessibility, I build interfaces that feel completely natural to navigate, reducing drop-off rates and boosting user satisfaction.',
    focus: ['User Research & Mapping', 'Wireframing', 'High-Fidelity Prototyping', 'Usability Testing', 'Accessibility (WCAG)'],
    icon: iconUiUx,
    accent: '#6366f1',
  },
  {
    id: 3,
    num: '03',
    title: 'Visual Direction',
    subheading: 'Establishing a distinct, scalable aesthetic identity for your brand.',
    description: 'Every product needs a soul. I define the artistic vision of your digital product from scratch\u2014starting with cohesive mood boards, curated typography, and intentional color psychology. To ensure your product can grow effortlessly, I translate this direction into comprehensive, scalable design systems and UI kits that development teams can implement with absolute ease.',
    focus: ['Brand Identity Systems', 'Mood Boards', 'UI Style Guides', 'Component Libraries', 'Typography & Color Systems'],
    icon: iconVisualDirection,
    accent: '#8b5cf6',
  },
  {
    id: 4,
    num: '04',
    title: 'Motion & Interaction',
    subheading: 'Elevating the experience through purposeful animation.',
    description: 'Motion is the bridge between a static screen and a living product. I design dynamic transitions and functional micro-interactions that don\'t just look cool, but actually delight users and provide subtle feedback. Whether it\'s a smooth page transition, a satisfying button click, or an engaging scroll effect, I add the final layer of polish that makes an interface feel premium.',
    focus: ['Micro-interactions', 'Functional Animation', 'Page Transitions', 'Interactive States', 'Lottie/SVG Animation Specs'],
    icon: iconMotionInteraction,
    accent: '#ec4899',
  },
]

const Services = () => {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  /* Reveal header on scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('services-section--visible')
          }
        })
      },
      { threshold: 0.05 }
    )

    const section = sectionRef.current
    if (section) observer.observe(section)

    return () => {
      if (section) observer.unobserve(section)
    }
  }, [])

  /* GSAP: visual polish only — CSS sticky handles the actual stacking */
  useLayoutEffect(() => {
    const cards = cardsRef.current.filter(Boolean)
    if (!cards.length) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 769px)', () => {
      cards.forEach((wrapper, i) => {
        const card = wrapper.querySelector('.services-card')
        if (!card) return

        /* When the NEXT card's wrapper starts overlapping this one,
           scale this card down slightly and dim it to create depth. */
        if (i < cards.length - 1) {
          const nextWrapper = cards[i + 1]

          gsap.to(card, {
            scale: 0.95,
            filter: 'brightness(0.5)',
            scrollTrigger: {
              trigger: nextWrapper,
              start: 'top bottom',   // next card enters viewport
              end: 'top 20%',        // next card reaches near top
              scrub: true,
            },
          })
        }
      })
    })

    return () => mm.revert()
  }, [])

  return (
    <section className="services-section" id="services-section" ref={sectionRef}>
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

        {/* Stacked Cards Container — CSS sticky handles stacking */}
        <div className="services-cards-stack">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="services-card-wrapper"
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                '--index': index,
                '--accent-color': service.accent,
              }}
            >
              <div className="services-card">
                {/* Folder Tab Shape */}
                <div className="services-card-folder-tab">
                  <div className="services-card-folder-tab-fill" />
                  <div className="services-card-folder-tab-curve" />
                </div>
                <div className="services-card-inner">
                  {/* Card Glow Effect */}
                  <div className="services-card-glow" />

                  {/* Header Row: 3D Icon & Outline Number */}
                  <div className="services-card-header">
                    <div className="services-icon-box">
                      <img
                        src={service.icon}
                        alt={`${service.title} Icon`}
                        className="services-icon-img"
                      />
                    </div>
                    <div className="services-outline-num">
                      <span>{service.num}</span>
                    </div>
                  </div>

                  {/* Title & Subheading */}
                  <div className="services-title-group">
                    <h3 className="services-card-title">{service.title}</h3>
                    <p className="services-card-subheading">{service.subheading}</p>
                  </div>

                  {/* Description */}
                  <p className="services-card-desc">{service.description}</p>

                  {/* Focus Areas */}
                  <div className="services-focus-section">
                    <h4 className="services-focus-title">Focus Areas:</h4>
                    <div className="services-focus-tags">
                      {service.focus.map((item, idx) => (
                        <span key={idx} className="services-focus-tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
