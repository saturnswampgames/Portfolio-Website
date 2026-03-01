import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)',
    tag:      'BRANDING',
    title:    'Brand Identity System',
    desc:     'Complete visual identity — logo, type, colour, guidelines. Built to be instantly recognisable.',
    tags:     ['Branding', 'Identity'],
    accent:   'var(--purple-light)',
  },
  {
    gradient: 'linear-gradient(135deg, #92400e 0%, #f59e0b 100%)',
    tag:      'PACKAGING',
    title:    'Packaging Design',
    desc:     "Structural and surface design that makes the product impossible to leave on the shelf.",
    tags:     ['Packaging', 'Print'],
    accent:   'var(--gold)',
  },
  {
    gradient: 'linear-gradient(135deg, #0e4f5e 0%, #06b6d4 100%)',
    tag:      'SOCIAL',
    title:    'Social Media Kit',
    desc:     'Cohesive templates, feed aesthetics, and campaign graphics that make a brand look alive online.',
    tags:     ['Social Media', 'Campaign'],
    accent:   'var(--cyan)',
  },
  {
    gradient: 'linear-gradient(135deg, #831843 0%, #f472b6 100%)',
    tag:      'MOTION',
    title:    'Motion Graphics Reel',
    desc:     'Animated brand assets, reels, and intro sequences. The moving version of great design.',
    tags:     ['Motion', 'Animation'],
    accent:   'var(--pink)',
  },
  {
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #06b6d4 100%)',
    tag:      'WEB',
    title:    'Web Design Project',
    desc:     'End-to-end web design with intent — from wireframe to final UI, built with personality.',
    tags:     ['Web Design', 'UI/UX'],
    accent:   'var(--cyan)',
  },
]

export default function Work() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current.filter(Boolean), {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 55,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="work" ref={sectionRef}>
      <div className="section-header">
        <p className="chapter-tag">CHAPTER III</p>
        <h2 className="section-title">Selected Work</h2>
        <p className="section-sub">
          A taste of what gets built when strategy meets creativity.
        </p>
      </div>

      <div style={styles.grid}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            ref={(el) => (cardRefs.current[i] = el)}
            className="project-card work-card"
          >
            {/* Gradient cover */}
            <div style={{ ...styles.cover, background: p.gradient }}>
              <p
                className="pixel-text"
                style={{ ...styles.coverTag, color: p.accent === 'var(--gold)' ? '#92400e' : '#fff' }}
              >
                {p.tag}
              </p>
              <div style={styles.coverLines} aria-hidden="true">
                <div style={styles.coverLine} />
                <div style={{ ...styles.coverLine, opacity: 0.4 }} />
              </div>
            </div>

            <div className="project-info">
              <p className="project-meta">{p.tag} · SATURNSWAMP</p>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Coming Soon card */}
        <div
          ref={(el) => (cardRefs.current[5] = el)}
          className="project-card coming-soon-card"
        >
          <p className="pixel-text" style={{ fontSize: '0.42rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            LOADING...
          </p>
          <h3>More Work Coming</h3>
          <p>New projects being wrapped up. Check back soon — or just reach out now.</p>
        </div>
      </div>

      <style>{`
        .work-card .project-img-wrap { display: none; }
      `}</style>
    </section>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  },
  cover: {
    height: '180px',
    borderRadius: '10px 10px 0 0',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '1rem 1.25rem',
  },
  coverTag: {
    fontSize: '0.38rem',
    letterSpacing: '0.25em',
    fontWeight: 400,
    position: 'relative',
    zIndex: 2,
    background: 'rgba(0,0,0,0.35)',
    padding: '0.3rem 0.6rem',
    borderRadius: '3px',
  },
  coverLines: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '24px',
    padding: '0 1.25rem',
  },
  coverLine: {
    height: '1px',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '1px',
  },
}
