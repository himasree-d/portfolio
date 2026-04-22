import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

export default function PageTransition({ children }) {
  const location = useLocation()
  const overlayRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    overlay.classList.add('pt-entering')
    content.classList.add('pt-content-hidden')

    const t1 = setTimeout(() => {
      overlay.classList.remove('pt-entering')
      overlay.classList.add('pt-leaving')
      content.classList.remove('pt-content-hidden')
      content.classList.add('pt-content-reveal')
    }, 400)

    const t2 = setTimeout(() => {
      overlay.classList.remove('pt-leaving')
      content.classList.remove('pt-content-reveal')
    }, 900)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [location.pathname])

  return (
    <>
      <div ref={overlayRef} className="pt-overlay" />
      <div ref={contentRef} className="pt-content">
        {children}
      </div>
    </>
  )
}
