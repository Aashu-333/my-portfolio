import { useEffect, useRef, useCallback } from 'react'
import './CustomCursor.css'

/* Inline SVG 4-pointed chrome star — guaranteed transparent background */
const StarCursor = () => (
  <svg
    className="cursor-dot-img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100%"
    height="100%"
  >
    <defs>
      {/* Main chrome gradient (vertical) */}
      <linearGradient id="chrome" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#f0f0f0" />
        <stop offset="25%" stopColor="#d8d8d8" />
        <stop offset="45%" stopColor="#a8a8a8" />
        <stop offset="55%" stopColor="#e8e8e8" />
        <stop offset="75%" stopColor="#b0b0b0" />
        <stop offset="100%" stopColor="#e0e0e0" />
      </linearGradient>
      {/* Highlight gradient for 3D effect */}
      <linearGradient id="highlight" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
        <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
      </linearGradient>
      {/* Edge gradient for depth */}
      <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#c0c0c0" />
        <stop offset="50%" stopColor="#f5f5f5" />
        <stop offset="100%" stopColor="#909090" />
      </linearGradient>
    </defs>

    {/* Shadow layer */}
    <polygon
      points="50,2 54,42 98,50 54,58 50,98 46,58 2,50 46,42"
      fill="rgba(0,0,0,0.12)"
      transform="translate(1.5, 2)"
    />

    {/* Main star shape */}
    <polygon
      points="50,2 54,42 98,50 54,58 50,98 46,58 2,50 46,42"
      fill="url(#chrome)"
      stroke="#999"
      strokeWidth="0.5"
    />

    {/* Left-top facet highlight */}
    <polygon
      points="50,2 46,42 2,50 50,50"
      fill="url(#highlight)"
    />

    {/* Right-bottom facet shadow */}
    <polygon
      points="50,50 54,58 50,98 46,58"
      fill="rgba(0,0,0,0.08)"
    />

    {/* Center highlight dot */}
    <circle cx="50" cy="50" r="3" fill="#fff" opacity="0.4" />
  </svg>
)

const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  const animate = useCallback(() => {
    // Smooth lerp for the ring (trails behind the star)
    ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15
    ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, .grid-card')
      if (target) {
        dotRef.current?.classList.add('cursor-dot--hover')
        ringRef.current?.classList.add('cursor-ring--hover')
      }
    }

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, .grid-card')
      if (target) {
        dotRef.current?.classList.remove('cursor-dot--hover')
        ringRef.current?.classList.remove('cursor-ring--hover')
      }
    }

    const handleMouseDown = () => {
      dotRef.current?.classList.add('cursor-dot--click')
      ringRef.current?.classList.add('cursor-ring--click')
    }

    const handleMouseUp = () => {
      dotRef.current?.classList.remove('cursor-dot--click')
      ringRef.current?.classList.remove('cursor-ring--click')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    rafId.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(rafId.current)
    }
  }, [animate])

  return (
    <>
      <div className="cursor-dot" ref={dotRef}>
        <StarCursor />
      </div>
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

export default CustomCursor
