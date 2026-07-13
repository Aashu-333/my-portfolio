import { useState, useEffect, useRef, useCallback } from 'react'
import './Toolkit.css'
import InteractiveAvatar from './InteractiveAvatar'

// ── Flat 3D Isometric Icon Renderer ──
const Flat3DIcon = ({ name, color }) => {
  // Simple, recognizable SVG vector paths for each tool
  const renderLogo = () => {
    switch (name) {
      case 'Figma':
      case 'Figma Make':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <path d="M8 5C8 6.65685 6.65685 8 5 8C3.34315 8 2 6.65685 2 5C2 3.34315 3.34315 2 5 2C6.65685 2 8 3.34315 8 5Z" fill="#F24E1E"/>
            <path d="M8 11C8 12.6569 6.65685 14 5 14C3.34315 14 2 12.6569 2 11C2 9.34315 3.34315 8 5 8C6.65685 8 8 9.34315 8 11Z" fill="#A259FF"/>
            <path d="M8 17C8 18.6569 6.65685 20 5 20C3.34315 20 2 18.6569 2 17C2 15.3431 3.34315 14 5 14C6.65685 14 8 15.3431 8 17Z" fill="#0ACF83"/>
            <path d="M14 5C14 6.65685 12.6569 8 11 8H8V2H11C12.6569 2 14 3.34315 14 5Z" fill="#FF7262"/>
            <path d="M14 11C14 12.6569 12.6569 14 11 14H8V8H11C12.6569 8 14 9.34315 14 11Z" fill="#1ABCFE"/>
            {name === 'Figma Make' && (
              <path d="M17 14L18.5 17L21.5 18.5L18.5 20L17 23L15.5 20L12.5 18.5L15.5 17L17 14Z" fill="#FFD700" className="ai-sparkle"/>
            )}
          </svg>
        )
      case 'FigJam':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12V2H12Z" fill="#F2994A"/>
            <circle cx="12" cy="12" r="4" fill="#FFF"/>
          </svg>
        )
      case 'Photoshop':
        return <span className="flat-3d-text font-ps">Ps</span>
      case 'Illustrator':
        return <span className="flat-3d-text font-ai">Ai</span>
      case 'Framer':
      case 'Framer AI':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <path d="M5 2H19V9H12L5 2Z" fill="#0055FF"/>
            <path d="M5 9H19L12 16H5V9Z" fill="#00A2FF"/>
            <path d="M5 16L12 23V16H5Z" fill="#00D4FF"/>
            {name === 'Framer AI' && (
              <path d="M18 13L19 15L21 16L19 17L18 19L17 17L15 16L17 15L18 13Z" fill="#FFF" className="ai-sparkle"/>
            )}
          </svg>
        )
      case 'Webflow':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="flat-3d-svg color-webflow">
            <path d="M12.1 4.2L8.5 15.6L5.9 8.2L3.1 14.1L1.2 5.9H0L2.3 19.8H3.5L6.6 13L9.2 19.8H10.5L14.7 5.9H12.1ZM22.8 5.9H20.5L18.1 13.5L15.7 5.9H13.4L17 16.9L15.1 19.8H16.4L24 5.9H22.8Z"/>
          </svg>
        )
      case 'Miro':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <path d="M12 2L2 22H22L12 2Z" fill="#FFD600"/>
            <circle cx="12" cy="14" r="3" fill="#050038"/>
          </svg>
        )
      case 'Maze':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <circle cx="12" cy="12" r="10" stroke="#8338EC" strokeWidth="3" />
            <path d="M12 7V17M7 12H17" stroke="#8338EC" strokeWidth="3" strokeLinecap="round" />
          </svg>
        )
      case 'Dovetail':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <path d="M4 4C4 4 10 6 12 12C14 6 20 4 20 4C20 4 18 10 12 12C6 10 4 4 4 4Z" fill="#8359FF"/>
            <circle cx="12" cy="15" r="3" fill="#8359FF"/>
          </svg>
        )
      case 'Hotjar':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <path d="M12 2C12 2 17 7 17 12C17 17 12 22 12 22C12 22 7 17 7 12C7 7 12 2Z" fill="#FF3838"/>
            <path d="M12 6C12 6 15 9 15 12C15 15 12 18 12 18C12 18 9 15 9 12C9 9 12 6Z" fill="#FFA800"/>
          </svg>
        )
      case 'Stark':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="#FFC800"/>
          </svg>
        )
      case 'Google Analytics':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <rect x="3" y="14" width="4" height="8" rx="1" fill="#FFA800" />
            <rect x="10" y="8" width="4" height="14" rx="1" fill="#FFCD00" />
            <rect x="17" y="2" width="4" height="20" rx="1" fill="#FFE100" />
          </svg>
        )
      case 'Jira':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <path d="M11.5 3L3 11.5L5.5 14L11.5 8L17.5 14L20 11.5L11.5 3Z" fill="#0052CC"/>
            <path d="M11.5 10L3 18.5L5.5 21L11.5 15L17.5 21L20 18.5L11.5 10Z" fill="#2684FF"/>
          </svg>
        )
      case 'Notion':
        return <span className="flat-3d-text font-notion">N</span>
      case 'ChatGPT':
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="flat-3d-svg color-chatgpt">
            <path d="M21.2 12.3c.1-.5.1-1 .1-1.6 0-3.6-2.9-6.5-6.5-6.5-.8 0-1.6.1-2.3.4C11.6 2.8 9.9 2 8 2 4.4 2 1.5 4.9 1.5 8.5c0 .6.1 1.2.3 1.8C.7 11.2 0 12.8 0 14.5c0 3.6 2.9 6.5 6.5 6.5.6 0 1.2-.1 1.7-.2 1 1.1 2.4 1.7 4 1.7 3.6 0 6.5-2.9 6.5-6.5 0-.5-.1-1-.2-1.5 1.1-1 1.7-2.4 1.7-4 .1-.9-.1-1.7-.4-2.4-.1.1-.1.1-.1.2zm-2.7 6.1c-.2.2-.6.2-.8 0l-5-5-2.1 2.1 3 3c.2.2.2.6 0 .8-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-3-3-2.1 2.1 5 5c.2.2.2.6 0 .8-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-5c-.2-.2-.2-.6 0-.8l2.1-2.1-3-3c-.2-.2-.2-.6 0-.8s.6-.2.8 0l3 3 2.1-2.1-5-5c-.2-.2-.2-.6 0-.8s.6-.2.8 0l5 5 2.1-2.1-3-3c-.2-.2-.2-.6 0-.8s.6-.2.8 0l3 3 2.1-2.1 5 5c.2.2.2.6 0 .8-.1.1-.3.2-.4.2s-.3-.1-.4-.2l-5-5z"/>
          </svg>
        )
      case 'Midjourney':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flat-3d-svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" />
            <path d="M6 14C8 12 10 11 12 12C14 13 16 12 18 10" />
            <path d="M4 11C7 9 9 9 12 10C15 11 17 10 20 8" />
          </svg>
        )
      case 'Adobe Firefly':
        return (
          <svg viewBox="0 0 24 24" fill="none" className="flat-3d-svg">
            <path d="M12 4C14.5 4 19 8.5 19 12C19 15.5 14.5 20 12 20C9.5 20 5 15.5 5 12C5 8.5 9.5 4 12 4Z" fill="url(#butterflyGrad)"/>
            <line x1="12" y1="2" x2="12" y2="22" stroke="#FFF" strokeWidth="1.5"/>
            <defs>
              <linearGradient id="butterflyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF4DC4"/>
                <stop offset="100%" stopColor="#7C3AED"/>
              </linearGradient>
            </defs>
          </svg>
        )
      case 'Relume':
        return <span className="flat-3d-text font-relume">R</span>
      case 'Uizard':
        return <span className="flat-3d-text font-uizard">U</span>
      default:
        return <span className="flat-3d-text">{name.substring(0, 2)}</span>
    }
  }

  // Determine background depth color based on tool color
  const baseColor = color.replace('0.2', '0.85')
  const extrudeColor = color.replace('0.2', '0.6')

  return (
    <div className="flat-3d-icon" style={{ '--icon-color': baseColor, '--extrude-color': extrudeColor }}>
      {/* Floating shadow below */}
      <div className="flat-3d-shadow" />
      {/* Extruded 3D base plates */}
      <div className="flat-3d-face flat-3d-base-plate" />
      <div className="flat-3d-face flat-3d-extrude" />
      {/* Front/Top plate with logo */}
      <div className="flat-3d-face flat-3d-front">
        {renderLogo()}
      </div>
    </div>
  )
}

const lineColors = [
  '#00d4aa', '#7c3aed', '#3b82f6', '#10b981', '#a78bfa',
  '#06b6d4', '#f472b6', '#34d399', '#818cf8', '#2dd4bf', '#c084fc',
]

const leftTools = [
  { name: 'Figma', color: 'rgba(162, 89, 255, 0.2)' },
  { name: 'FigJam', color: 'rgba(242, 153, 74, 0.2)' },
  { name: 'Photoshop', color: 'rgba(49, 168, 255, 0.2)' },
  { name: 'Illustrator', color: 'rgba(255, 154, 0, 0.2)' },
  { name: 'Framer', color: 'rgba(5, 150, 255, 0.2)' },
  { name: 'Webflow', color: 'rgba(67, 83, 255, 0.2)' },
  { name: 'Miro', color: 'rgba(255, 214, 0, 0.2)' },
  { name: 'Maze', color: 'rgba(131, 56, 236, 0.2)' },
  { name: 'Dovetail', color: 'rgba(131, 89, 255, 0.2)' },
  { name: 'Hotjar', color: 'rgba(255, 56, 56, 0.2)' },
  { name: 'Stark', color: 'rgba(255, 200, 0, 0.2)' },
]

const rightTools = [
  { name: 'Google Analytics', color: 'rgba(255, 168, 0, 0.2)' },
  { name: 'Jira', color: 'rgba(0, 82, 204, 0.2)' },
  { name: 'Notion', color: 'rgba(255, 255, 255, 0.12)' },
  { name: 'ChatGPT', color: 'rgba(16, 163, 127, 0.2)' },
  { name: 'Midjourney', color: 'rgba(255, 255, 255, 0.12)' },
  { name: 'Adobe Firefly', color: 'rgba(255, 77, 196, 0.2)' },
  { name: 'Figma Make', color: 'rgba(162, 89, 255, 0.2)' },
  { name: 'Framer AI', color: 'rgba(5, 150, 255, 0.2)' },
  { name: 'Relume', color: 'rgba(255, 255, 255, 0.12)' },
  { name: 'Uizard', color: 'rgba(124, 77, 255, 0.2)' },
]

const Toolkit = () => {
  const containerRef = useRef(null)
  const hubRef = useRef(null)
  const leftRefs = useRef([])
  const rightRefs = useRef([])
  const [svgData, setSvgData] = useState({ w: 0, h: 0, paths: [], hubX: 0, hubY: 0 })
  const [isVisible, setIsVisible] = useState(false)

  const computePaths = useCallback(() => {
    const container = containerRef.current
    const hub = hubRef.current
    if (!container || !hub) return

    const cRect = container.getBoundingClientRect()
    const hRect = hub.getBoundingClientRect()
    const hubX = hRect.left + hRect.width / 2 - cRect.left
    const hubY = hRect.top + hRect.height / 2 - cRect.top
    const paths = []

    // Left tools → hub
    leftRefs.current.forEach((ref, i) => {
      if (!ref) return
      const r = ref.getBoundingClientRect()
      const sx = r.right - cRect.left + 2
      const sy = r.top + r.height / 2 - cRect.top
      const dx = hubX - sx

      paths.push({
        d: `M ${sx} ${sy} C ${sx + dx * 0.5} ${sy}, ${hubX - dx * 0.15} ${hubY}, ${hubX} ${hubY}`,
        color: lineColors[i % lineColors.length],
        dotX: sx - 2,
        dotY: sy,
        delay: i * 0.08,
      })
    })

    // Right tools → hub
    rightRefs.current.forEach((ref, i) => {
      if (!ref) return
      const r = ref.getBoundingClientRect()
      const sx = r.left - cRect.left - 2
      const sy = r.top + r.height / 2 - cRect.top
      const dx = sx - hubX

      paths.push({
        d: `M ${sx} ${sy} C ${sx - dx * 0.5} ${sy}, ${hubX + dx * 0.15} ${hubY}, ${hubX} ${hubY}`,
        color: lineColors[(i + leftTools.length) % lineColors.length],
        dotX: sx + 2,
        dotY: sy,
        delay: (i + leftTools.length) * 0.08,
      })
    })

    setSvgData({ w: cRect.width, h: cRect.height, paths, hubX, hubY })
  }, [])

  // Compute SVG paths after paint
  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => {
        computePaths()
      })
      return () => cancelAnimationFrame(raf2)
    })
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(computePaths)
    })
    if (containerRef.current) ro.observe(containerRef.current)
    return () => {
      cancelAnimationFrame(raf1)
      ro.disconnect()
    }
  }, [computePaths])

  // Intersection observer for scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.12 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={`toolkit-section ${isVisible ? 'toolkit-section--visible' : ''}`} id="toolkit-section">
      {/* Ambient Glows */}
      <div className="toolkit-ambient toolkit-ambient--1" />
      <div className="toolkit-ambient toolkit-ambient--2" />

      {/* ── Section Header (on top of mind map) ── */}
      <div className="toolkit-header">
        <span className="toolkit-hub-index">04 / TOOLKIT</span>
        <h2 className="toolkit-hub-title">
          My Creative <span className="toolkit-hub-accent">Toolkit</span>
        </h2>
        <div className="toolkit-hub-bar" style={{ margin: '0.75rem auto 0' }} />
      </div>

      {/* Mind-Map Layout */}
      <div
        className={`toolkit-mindmap ${isVisible ? 'toolkit-mindmap--visible' : ''}`}
        ref={containerRef}
      >
        {/* ── SVG Connecting Lines ── */}
        {svgData.w > 0 && (
          <svg
            className="toolkit-svg"
            viewBox={`0 0 ${svgData.w} ${svgData.h}`}
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="dotGlow">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {svgData.paths.map((p, i) => (
              <g key={i}>
                {/* Glow layer */}
                <path
                  d={p.d}
                  stroke={p.color}
                  strokeWidth="3"
                  fill="none"
                  opacity="0.25"
                  filter="url(#lineGlow)"
                  pathLength="1"
                  className="toolkit-line"
                  style={{ transitionDelay: `${p.delay + 0.3}s` }}
                />
                {/* Main line */}
                <path
                  d={p.d}
                  stroke={p.color}
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.55"
                  pathLength="1"
                  className="toolkit-line"
                  style={{ transitionDelay: `${p.delay + 0.3}s` }}
                />
                {/* Connection dot */}
                <circle
                  cx={p.dotX}
                  cy={p.dotY}
                  r="3.5"
                  fill={p.color}
                  filter="url(#dotGlow)"
                  className="toolkit-dot"
                  style={{ transitionDelay: `${p.delay + 0.2}s` }}
                />
                {/* Traveling particle */}
                <circle r="1.8" fill="#fff" opacity="0" className="toolkit-particle">
                  <animateMotion
                    dur={`${3 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={p.d}
                    begin={`${p.delay + 1.5}s`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0.7;0"
                    dur={`${3 + i * 0.3}s`}
                    repeatCount="indefinite"
                    begin={`${p.delay + 1.5}s`}
                  />
                </circle>
              </g>
            ))}

            {/* Hub convergence glow */}
            <circle
              cx={svgData.hubX}
              cy={svgData.hubY}
              r="8"
              fill="rgba(16, 185, 127, 0.5)"
              filter="url(#lineGlow)"
              className="toolkit-hub-dot"
            />
            <circle
              cx={svgData.hubX}
              cy={svgData.hubY}
              r="4"
              fill="#10b981"
              className="toolkit-hub-dot"
            />
          </svg>
        )}

        {/* ── Left Tools Column ── */}
        <div className="toolkit-col toolkit-col--left">
          {leftTools.map((tool, i) => (
            <div
              key={tool.name}
              className="tool-pill"
              ref={(el) => (leftRefs.current[i] = el)}
              style={{ '--pill-delay': `${i * 0.06}s` }}
            >
              <Flat3DIcon name={tool.name} color={tool.color} />
              <span className="tool-pill-name">{tool.name}</span>
              <span className="tool-pill-dot" />
            </div>
          ))}
        </div>

        {/* ── Center Hub ── */}
        <div className="toolkit-hub">
          <div ref={hubRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <InteractiveAvatar />
          </div>
          <span className="toolkit-hub-count">{leftTools.length + rightTools.length} Tools</span>
        </div>

        {/* ── Right Tools Column ── */}
        <div className="toolkit-col toolkit-col--right">
          {rightTools.map((tool, i) => (
            <div
              key={tool.name}
              className="tool-pill tool-pill--right"
              ref={(el) => (rightRefs.current[i] = el)}
              style={{ '--pill-delay': `${(i + leftTools.length) * 0.06}s` }}
            >
              <span className="tool-pill-dot" />
              <Flat3DIcon name={tool.name} color={tool.color} />
              <span className="tool-pill-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile Fallback Grid (hidden on desktop) ── */}
      <div className="toolkit-mobile">
        <div className="toolkit-mobile-header">
          <span className="toolkit-hub-index">04 / TOOLKIT</span>
          <h2 className="toolkit-hub-title">
            My Creative <span className="toolkit-hub-accent">Toolkit</span>
          </h2>
          <div className="toolkit-hub-bar" style={{ margin: '0.75rem auto 0' }} />
          <InteractiveAvatar />
        </div>
        <div className="toolkit-mobile-grid">
          {[...leftTools, ...rightTools].map((tool) => (
            <div key={tool.name} className="tool-pill-mobile">
              <Flat3DIcon name={tool.name} color={tool.color} />
              <span className="tool-pill-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Toolkit
