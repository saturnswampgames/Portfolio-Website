import { useEffect, useRef } from 'react'
import NavBack from '../components/NavBack'
import gsap from 'gsap'

const PROJECTS = [
  {
    title: 'Sekiro: Shadows Die Twice',
    desc: 'Cinematic gameplay captures showcasing precision combat, parry mechanics, and the brutal beauty of Hirata Estate and Ashina Castle.',
    tags: ['Gameplay', 'Video Edit', 'Cinematic'],
  },
  {
    title: 'God of War',
    desc: 'Epic storytelling through gameplay footage — Kratos and Atreus journey through the Nine Realms, captured in high-fidelity cinematic cuts.',
    tags: ['Gameplay', 'Narrative', 'PS5'],
  },
  {
    title: 'Call of Duty',
    desc: 'Tactical multiplayer highlights and warzone gameplay edits with custom motion graphics and audio synchronization.',
    tags: ['FPS', 'Highlights', 'Motion Graphics'],
  },
  {
    title: 'SaturnSwamp Intro',
    desc: 'Brand identity intro animation — the signature opening sequence representing the SaturnSwamp universe.',
    tags: ['Branding', 'Animation', 'Identity'],
  },
]

export default function ProjectsPage({ overlayRef }) {
  const pageRef = useRef()

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }, [])

  return (
    <div className="alien-page" ref={pageRef} style={{ background: 'radial-gradient(ellipse at center, #1a0000 0%, #000000 70%)' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(204,0,0,0.08) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 1,
        animation: 'bgPulse 3s ease-in-out infinite',
      }} />

      <div className="alien-topbar" style={{ borderBottomColor: '#CC0000', boxShadow: '0 4px 20px rgba(204,0,0,0.3)' }}>
        <div>
          <div className="glow-text" style={{ color: '#CC0000', textShadow: '0 0 12px #CC0000', fontSize: '0.7rem' }}>
            Tetramand — Khoros
          </div>
          <div className="alien-name glow-text" style={{ color: '#CC0000', textShadow: '0 0 16px #CC0000' }}>
            💪 Four Arms
          </div>
        </div>
        <div style={{ color: '#CC0000', fontSize: '0.7rem', letterSpacing: '0.2em', opacity: 0.6 }}>
          PROJECTS.EXE
        </div>
      </div>

      <div className="alien-content">
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div className="section-heading" style={{ color: 'rgba(204,0,0,0.6)', borderBottomColor: 'rgba(204,0,0,0.2)', marginBottom: '20px' }}>
            Portfolio — Game Content
          </div>

          {PROJECTS.map((project, i) => (
            <div
              key={i}
              className="project-card holo-panel"
              style={{ borderColor: 'rgba(204,0,0,0.5)' }}
            >
              <h3 style={{ color: '#CC0000', textShadow: '0 0 10px rgba(204,0,0,0.5)' }}>
                {project.title}
              </h3>
              <p>{project.desc}</p>
              <div>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag" style={{ borderColor: 'rgba(204,0,0,0.4)', color: 'rgba(204,0,0,0.8)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div style={{ marginTop: '8px' }}>
            <NavBack overlayRef={overlayRef} />
          </div>
        </div>
      </div>
    </div>
  )
}
