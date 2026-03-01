import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const GAMES = [
  {
    img:     'https://i.ibb.co/1ZZ0V1n/rocket-logo-frenzy.png',
    meta:    'ARCADE PLATFORMER · PC / MAC',
    title:   'Rocket Frenzy!',
    desc:    'Arcade platformer with fun levels and explosions big enough to rattle your speakers. Available on Windows & Mac.',
    tags:    [{ label: 'Shipped', cls: '' }, { label: 'Platformer', cls: '' }],
    overlay: { label: 'SHIPPED', cls: '' },
  },
  {
    img:     'https://i.ibb.co/sCqJQDr/invader-Kill-poster-large.png',
    meta:    'RAILROAD SHOOTER · IN DEVELOPMENT',
    title:   'Invader Kills',
    desc:    'A railroad shooter loaded with explosions and bosses that don\'t play fair. Still cookin\'. Stay tuned.',
    tags:    [{ label: 'WIP', cls: 'wip' }, { label: 'Shooter', cls: '' }],
    overlay: { label: 'IN PROGRESS', cls: 'wip' },
  },
  {
    img:     'https://i.ibb.co/c6tPqdT/hacker-large.png',
    meta:    'WORD PUZZLE · PC / MAC',
    title:   'V20 Hacker',
    desc:    'A jumbled word puzzle that\'s actually fun — even for kids. Sneaks in learning without the boring part.',
    tags:    [{ label: 'Shipped', cls: '' }, { label: 'Puzzle', cls: '' }],
    overlay: { label: 'SHIPPED', cls: '' },
  },
]

export default function Games() {
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
    <section className="section" id="games" ref={sectionRef}>
      <div className="section-header">
        <p className="chapter-tag">CHAPTER III</p>
        <h2 className="section-title">The Quest Log</h2>
        <p className="section-sub">Games I've shipped. Each one a new mission completed.</p>
      </div>

      <div className="projects-grid">
        {GAMES.map((g, i) => (
          <div
            key={g.title}
            className="project-card"
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="project-img-wrap">
              <img src={g.img} alt={g.title} loading="lazy" />
              <div className={`project-overlay ${g.overlay.cls}`}>
                {g.overlay.label}
              </div>
            </div>
            <div className="project-info">
              <p className="project-meta">{g.meta}</p>
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
              <div className="tags">
                {g.tags.map(t => (
                  <span key={t.label} className={`tag ${t.cls}`}>{t.label}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-cta">
        <a
          href="https://saturnswamp.itch.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <i className="bi bi-controller" /> Browse All Games
        </a>
      </div>
    </section>
  )
}
