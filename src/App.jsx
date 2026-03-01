import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Navbar   from './components/Navbar'
import Hero     from './components/Hero'
import About    from './components/About'
import Services from './components/Services'
import Work     from './components/Work'
import Process  from './components/Process'
import Contact  from './components/Contact'
import Footer   from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const cursorRef      = useRef(null)
  const cursorTrailRef = useRef(null)

  /* ── Custom Cursor ──────────────────────────── */
  useEffect(() => {
    const cursor      = cursorRef.current
    const cursorTrail = cursorTrailRef.current
    if (!cursor || !cursorTrail) return

    const onMove = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top  = e.clientY + 'px'
      setTimeout(() => {
        cursorTrail.style.left = e.clientX + 'px'
        cursorTrail.style.top  = e.clientY + 'px'
      }, 85)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Scanlines overlay */}
      <div className="scanlines" aria-hidden="true" />

      {/* Custom cursor */}
      <div className="cursor"       ref={cursorRef}      aria-hidden="true" />
      <div className="cursor-trail" ref={cursorTrailRef} aria-hidden="true" />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
