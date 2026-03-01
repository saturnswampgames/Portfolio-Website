import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MODELS = [
  {
    img:   'https://i.ibb.co/tJc5Sfq/spaceship-large.png',
    meta:  '3D MODEL · BLENDER',
    title: 'Alien Space Ship',
    desc:  'Started as a game asset, ended up too cool for just one game. A well-crafted ship that vibes with the cosmos.',
    tags:  ['3D', 'Sci-Fi'],
  },
  {
    img:   'https://i.ibb.co/s352c6V/rocket-large.png',
    meta:  '3D MODEL · BLENDER',
    title: 'Space Rocket',
    desc:  'First model I ever made — and it went straight into Rocket Frenzy. The OG. Still holds up beautifully.',
    tags:  ['3D', 'Game Asset'],
  },
]

export default function Models() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 55,
        opacity: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-dark" id="models" ref={sectionRef}>
      <div className="inner">
        <div className="section-header">
          <p className="chapter-tag">CHAPTER IV</p>
          <h2 className="section-title">The Blueprints</h2>
          <p className="section-sub">
            3D models crafted in Blender. Every polygon placed with purpose.
          </p>
        </div>

        <div className="projects-grid">
          {MODELS.map((m, i) => (
            <div
              key={m.title}
              className="project-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="project-img-wrap">
                <img src={m.img} alt={m.title} loading="lazy" />
                <div className="project-overlay">COMPLETE</div>
              </div>
              <div className="project-info">
                <p className="project-meta">{m.meta}</p>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <div className="tags">
                  {m.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Coming soon */}
          <div className="project-card coming-soon-card" ref={(el) => (cardRefs.current[2] = el)}>
            <p className="pixel-text" style={{ fontSize: '0.45rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              LOADING...
            </p>
            <h3>More Incoming</h3>
            <p>New blueprints being drafted. The workshop never sleeps.</p>
          </div>
        </div>

        <div className="section-cta">
          <a
            href="https://sketchfab.com/saturnswamp"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <i className="bi bi-box" /> View on Sketchfab
          </a>
        </div>
      </div>
    </section>
  )
}
