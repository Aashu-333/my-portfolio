import { useEffect, useRef, useCallback } from 'react'
import customCursorImg from '../assets/custom-cursor.png'
import './CustomCursor.css'

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
        <img className="cursor-dot-img" src={customCursorImg} alt="" />
      </div>
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

export default CustomCursor
