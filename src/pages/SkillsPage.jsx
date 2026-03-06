import { useEffect, useRef, useState } from 'react'
import NavBack from '../components/NavBack'
import gsap from 'gsap'

const SKILL_BARS = [
  { name: 'Video Editing', level: 92 },
  { name: 'Motion Graphics', level: 82 },
  { name: 'Color Grading', level: 88 },
  { name: 'React / Three.js', level: 75 },
  { name: 'Game Capture', level: 95 },
  { name: 'Audio Design', level: 70 },
]

const SKILL_CHIPS = [
  'Premiere Pro', 'After Effects', 'DaVinci Resolve',
  'Three.js', 'React', 'GSAP', 'Blender', 'Figma',
  'JavaScript', 'CSS', 'OBS Studio', 'Photoshop',
]

export default function SkillsPage({ overlayRef }) {
  const pageRef = useRef()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
    const timeout = setTimeout(() => setAnimated(true), 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="alien-page" ref={pageRef} style={{ background: 'radial-gradient(ellipse at center, #0d0020 0%, #000000 70%)' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(139,0,255,0.08) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 1,
        animation: 'bgPulse 3s ease-in-out infinite',
      }} />

      <div className="alien-topbar" style={{ borderBottomColor: '#8B00FF', boxShadow: '0 4px 20px rgba(139,0,255,0.3)' }}>
        <div>
          <div className="glow-text" style={{ color: '#8B00FF', textShadow: '0 0 12px #8B00FF', fontSize: '0.7rem' }}>
            Galvanic Mechamorph — Galvan B
          </div>
          <div className="alien-name glow-text" style={{ color: '#8B00FF', textShadow: '0 0 16px #8B00FF' }}>
            ⚙️ Upgrade
          </div>
        </div>
        <div style={{ color: '#8B00FF', fontSize: '0.7rem', letterSpacing: '0.2em', opacity: 0.6 }}>
          SKILLS.EXE
        </div>
      </div>

      <div className="alien-content">
        <div style={{ maxWidth: 640, margin: '0 auto' }}>

          <div className="holo-panel" style={{ borderColor: 'rgba(139,0,255,0.5)', padding: '24px', marginBottom: '20px' }}>
            <div className="section-heading" style={{ color: 'rgba(139,0,255,0.6)', borderBottomColor: 'rgba(139,0,255,0.2)' }}>
              Proficiency Matrix
            </div>
            {SKILL_BARS.map((skill) => (
              <div className="skill-bar-container" key={skill.name}>
                <div className="skill-bar-label">
                  <span style={{ color: '#8B00FF' }}>{skill.name}</span>
                  <span style={{ color: 'rgba(139,0,255,0.6)' }}>{skill.level}%</span>
                </div>
                <div className="skill-bar-track" style={{ borderColor: 'rgba(139,0,255,0.3)', background: 'rgba(139,0,255,0.08)' }}>
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: animated ? `${skill.level}%` : '0%',
                      background: 'linear-gradient(90deg, #2d0050, #8B00FF)',
                      boxShadow: '0 0 10px #8B00FF',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="holo-panel" style={{ borderColor: 'rgba(139,0,255,0.5)', padding: '24px', marginBottom: '24px' }}>
            <div className="section-heading" style={{ color: 'rgba(139,0,255,0.6)', borderBottomColor: 'rgba(139,0,255,0.2)' }}>
              Tech Arsenal
            </div>
            <div className="skills-grid">
              {SKILL_CHIPS.map((chip) => (
                <div
                  key={chip}
                  className="skill-chip"
                  style={{
                    borderColor: 'rgba(139,0,255,0.35)',
                    color: '#8B00FF',
                  }}
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>

          <NavBack overlayRef={overlayRef} />
        </div>
      </div>
    </div>
  )
}
