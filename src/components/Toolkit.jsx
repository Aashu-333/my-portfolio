import { useState, useEffect, useRef, useCallback } from 'react'
import './Toolkit.css'
import InteractiveAvatar from './InteractiveAvatar'

// ── SVG Assets ──
import figmaIcon from '../assets/toolkit/figma.svg'
import figjamIcon from '../assets/toolkit/figjam.svg'
import photoshopIcon from '../assets/toolkit/photoshop.svg'
import illustratorIcon from '../assets/toolkit/illustrator.svg'
import framerIcon from '../assets/toolkit/framer.svg'
import webflowIcon from '../assets/toolkit/webflow.svg'
import miroIcon from '../assets/toolkit/miro.svg'
import mazeIcon from '../assets/toolkit/maze.svg'
import dovetailIcon from '../assets/toolkit/dovetail.svg'
import hotjarIcon from '../assets/toolkit/hotjar.svg'
import starkIcon from '../assets/toolkit/stark.svg'
import googleanalyticsIcon from '../assets/toolkit/googleanalytics.svg'
import jiraIcon from '../assets/toolkit/jira.svg'
import notionIcon from '../assets/toolkit/notion.svg'
import chatgptIcon from '../assets/toolkit/chatgpt.svg'
import midjourneyIcon from '../assets/toolkit/midjourney.svg'
import fireflyIcon from '../assets/toolkit/firefly.svg'
import figmamakeIcon from '../assets/toolkit/figmamake.svg'
import frameraiIcon from '../assets/toolkit/framerai.svg'
import relumeIcon from '../assets/toolkit/relume.svg'
import uizardIcon from '../assets/toolkit/uizard.svg'

// ── Flat 3D Isometric Icon Renderer ──
const Flat3DIcon = ({ name, icon, color }) => {
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
        <img src={icon} alt={name} className="flat-3d-svg" loading="lazy" />
      </div>
    </div>
  )
}

const lineColors = [
  '#00d4aa', '#7c3aed', '#3b82f6', '#10b981', '#a78bfa',
  '#06b6d4', '#f472b6', '#34d399', '#818cf8', '#2dd4bf', '#c084fc',
]

const leftTools = [
  { name: 'Figma', icon: figmaIcon, color: 'rgba(162, 89, 255, 0.2)' },
  { name: 'FigJam', icon: figjamIcon, color: 'rgba(242, 153, 74, 0.2)' },
  { name: 'Photoshop', icon: photoshopIcon, color: 'rgba(49, 168, 255, 0.2)' },
  { name: 'Illustrator', icon: illustratorIcon, color: 'rgba(255, 154, 0, 0.2)' },
  { name: 'Framer', icon: framerIcon, color: 'rgba(5, 150, 255, 0.2)' },
  { name: 'Webflow', icon: webflowIcon, color: 'rgba(67, 83, 255, 0.2)' },
  { name: 'Miro', icon: miroIcon, color: 'rgba(255, 214, 0, 0.2)' },
  { name: 'Maze', icon: mazeIcon, color: 'rgba(131, 56, 236, 0.2)' },
  { name: 'Dovetail', icon: dovetailIcon, color: 'rgba(131, 89, 255, 0.2)' },
  { name: 'Hotjar', icon: hotjarIcon, color: 'rgba(255, 56, 56, 0.2)' },
  { name: 'Stark', icon: starkIcon, color: 'rgba(255, 200, 0, 0.2)' },
]

const rightTools = [
  { name: 'Google Analytics', icon: googleanalyticsIcon, color: 'rgba(255, 168, 0, 0.2)' },
  { name: 'Jira', icon: jiraIcon, color: 'rgba(0, 82, 204, 0.2)' },
  { name: 'Notion', icon: notionIcon, color: 'rgba(255, 255, 255, 0.12)' },
  { name: 'ChatGPT', icon: chatgptIcon, color: 'rgba(16, 163, 127, 0.2)' },
  { name: 'Midjourney', icon: midjourneyIcon, color: 'rgba(255, 255, 255, 0.12)' },
  { name: 'Adobe Firefly', icon: fireflyIcon, color: 'rgba(255, 77, 196, 0.2)' },
  { name: 'Figma Make', icon: figmamakeIcon, color: 'rgba(162, 89, 255, 0.2)' },
  { name: 'Framer AI', icon: frameraiIcon, color: 'rgba(5, 150, 255, 0.2)' },
  { name: 'Relume', icon: relumeIcon, color: 'rgba(255, 255, 255, 0.12)' },
  { name: 'Uizard', icon: uizardIcon, color: 'rgba(124, 77, 255, 0.2)' },
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
              style={{
                '--pill-delay': `${i * 0.06}s`,
                '--wiggle-x': `${(i % 3 === 0 ? 3 : i % 3 === 1 ? -2 : 2.5)}px`,
                '--wiggle-y': `${(i % 2 === 0 ? -3.5 : 4)}px`,
                '--wiggle-dur': `${6.5 + (i % 4) * 2}s`,
                '--wiggle-delay': `${i * -0.7}s`
              }}
            >
              <div className="tool-pill-float-wrapper">
                <Flat3DIcon name={tool.name} icon={tool.icon} color={tool.color} />
                <span className="tool-pill-name">{tool.name}</span>
              </div>
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
              style={{
                '--pill-delay': `${(i + leftTools.length) * 0.06}s`,
                '--wiggle-x': `${(i % 3 === 0 ? -2.5 : i % 3 === 1 ? 3 : -3)}px`,
                '--wiggle-y': `${(i % 2 === 0 ? 4 : -3.5)}px`,
                '--wiggle-dur': `${7 + (i % 4) * 1.8}s`,
                '--wiggle-delay': `${i * -0.6}s`
              }}
            >
              <span className="tool-pill-dot" />
              <div className="tool-pill-float-wrapper">
                <Flat3DIcon name={tool.name} icon={tool.icon} color={tool.color} />
                <span className="tool-pill-name">{tool.name}</span>
              </div>
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
              <Flat3DIcon name={tool.name} icon={tool.icon} color={tool.color} />
              <span className="tool-pill-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Toolkit
