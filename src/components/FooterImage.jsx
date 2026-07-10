import { useEffect, useRef } from 'react'
import footerImage from '../assets/footer_image.jpeg'
import './FooterImage.css'

const FooterImage = () => {
  const wrapperRef = useRef(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const thresholds = Array.from({ length: 101 }, (_, i) => i / 100)

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio
        // Scale from 0.5 to 1 as the element scrolls into view
        const scale = 0.5 + ratio * 0.5
        // Opacity from 0 to 1
        const opacity = ratio
        // Border radius from 48px to 0 as it scales up
        const radius = 48 * (1 - ratio)

        el.style.transform = `scale(${scale})`
        el.style.opacity = opacity
        el.style.borderRadius = `${radius}px`
      },
      { threshold: thresholds }
    )

    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  return (
    <section className="footer-image-section">
      <div className="footer-image-wrapper" ref={wrapperRef}>
        <img src={footerImage} alt="Footer visual" className="footer-img" />
        <div className="footer-image-overlay" />
      </div>
    </section>
  )
}

export default FooterImage
