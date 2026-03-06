import { useEffect, useRef } from 'react'
import NavBack from '../components/NavBack'
import gsap from 'gsap'

export default function AboutPage({ overlayRef }) {
  const pageRef = useRef()

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }, [])

  return (
    <div className="alien-page" ref={pageRef} style={{ background: 'radial-gradient(ellipse at center, #1a0500 0%, #000000 70%)' }}>
      {/* Background fire glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(255,107,53,0.08) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 1,
        animation: 'bgPulse 3s ease-in-out infinite',
      }} />

      <div className="alien-topbar" style={{ borderBottomColor: '#FF6B35', boxShadow: '0 4px 20px rgba(255,107,53,0.3)' }}>
        <div>
          <div className="glow-text" style={{ color: '#FF6B35', textShadow: '0 0 12px #FF6B35', fontSize: '0.7rem' }}>
            Pyronite — Pyros
          </div>
          <div className="alien-name glow-text" style={{ color: '#FF6B35', textShadow: '0 0 16px #FF6B35' }}>
            🔥 Heatblast
          </div>
        </div>
        <div style={{ color: '#FF6B35', fontSize: '0.7rem', letterSpacing: '0.2em', opacity: 0.6 }}>
          ABOUT.EXE
        </div>
      </div>

      <div className="alien-content">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="about-avatar" style={{ borderColor: '#FF6B35', boxShadow: '0 0 24px rgba(255,107,53,0.5)' }}>
            🔥
          </div>

          <div className="stat-row">
            <div className="stat-box" style={{ borderColor: 'rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.05)' }}>
              <span className="stat-val" style={{ color: '#FF6B35' }}>3+</span>
              <span className="stat-label" style={{ color: 'rgba(255,107,53,0.5)' }}>Years Exp.</span>
            </div>
            <div className="stat-box" style={{ borderColor: 'rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.05)' }}>
              <span className="stat-val" style={{ color: '#FF6B35' }}>20+</span>
              <span className="stat-label" style={{ color: 'rgba(255,107,53,0.5)' }}>Projects</span>
            </div>
            <div className="stat-box" style={{ borderColor: 'rgba(255,107,53,0.3)', background: 'rgba(255,107,53,0.05)' }}>
              <span className="stat-val" style={{ color: '#FF6B35' }}>∞</span>
              <span className="stat-label" style={{ color: 'rgba(255,107,53,0.5)' }}>Passion</span>
            </div>
          </div>

          <div className="holo-panel" style={{ borderColor: 'rgba(255,107,53,0.5)', padding: '24px', marginBottom: '20px' }}>
            <div className="section-heading" style={{ color: 'rgba(255,107,53,0.5)', borderBottomColor: 'rgba(255,107,53,0.2)' }}>
              Identity
            </div>
            <p className="about-bio">
              SaturnSwampGames — game content creator, developer, and digital artist fueled by pure
              creative fire. I build immersive experiences at the intersection of gaming culture,
              visual storytelling, and interactive design.
            </p>
            <p className="about-bio">
              From cinematic game clips to full-scale web experiences, every project burns with the
              same intensity. When I pick up a project, I go all in — no half-measures.
            </p>
          </div>

          <div className="holo-panel" style={{ borderColor: 'rgba(255,107,53,0.5)', padding: '24px', marginBottom: '24px' }}>
            <div className="section-heading" style={{ color: 'rgba(255,107,53,0.5)', borderBottomColor: 'rgba(255,107,53,0.2)' }}>
              Connect
            </div>
            <div className="social-links">
              <a className="social-link" href="#" style={{ borderColor: 'rgba(255,107,53,0.4)', color: '#FF6B35' }}>YouTube</a>
              <a className="social-link" href="#" style={{ borderColor: 'rgba(255,107,53,0.4)', color: '#FF6B35' }}>Twitter / X</a>
              <a className="social-link" href="#" style={{ borderColor: 'rgba(255,107,53,0.4)', color: '#FF6B35' }}>Discord</a>
              <a className="social-link" href="#" style={{ borderColor: 'rgba(255,107,53,0.4)', color: '#FF6B35' }}>GitHub</a>
            </div>
          </div>

          <NavBack overlayRef={overlayRef} />
        </div>
      </div>
    </div>
  )
}
