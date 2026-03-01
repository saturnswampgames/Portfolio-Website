import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)',
    tag:      'BRANDING',
    title:    'Unnamed Brand',
    desc:     "Identity built from zero. The brief was 'make it feel premium but human.' We went further. Now it's unforgettable.",
    tags:     ['Branding', 'Identity'],
    accent:   '#fff',
  },
  {
    gradient: 'linear-gradient(135deg, #78350f 0%, #f59e0b 100%)',
    tag:      'PACKAGING',
    title:    'The Shelf Problem',
    desc:     "Product was getting ignored. Redesigned the packaging. It stopped getting ignored. Simple as that.",
    tags:     ['Packaging', 'Print'],
    accent:   '#1a0a00',
  },
  {
    gradient: 'linear-gradient(135deg, #0e4f5e 0%, #06b6d4 100%)',
    tag:      'SOCIAL',
    title:    'Feed Overhaul',
    desc:     "Scattered posts, no cohesion, zero engagement. A new system fixed all three. Within weeks.",
    tags:     ['Social Media', 'Campaign'],
    accent:   '#fff',
  },
  {
    gradient: 'linear-gradient(135deg, #831843 0%, #f472b6 100%)',
    tag:      'MOTION',
    title:    'Moving Parts',
    desc:     "The brand needed a heartbeat. Built a motion system that feels alive every time it plays.",
    tags:     ['Motion', 'Animation'],
    accent:   '#fff',
  },
  {
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #06b6d4 100%)',
    tag:      'WEB',
    title:    'The Digital Front',
    desc:     "From wireframe to launched. A site that loads fast, looks intentional, and leaves a mark.",
    tags:     ['Web Design', 'UI/UX'],
    accent:   '#fff',
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
        <p className="chapter-tag">CHAPTER III — QUEST LOG</p>
        <h2 className="section-title">Completed Missions</h2>
        <p className="section-sub">
          Real work. Real briefs. Every project a different kind of quest.
        </p>
      </div>

      <div style={styles.grid}>
        {PROJECTS.map((p, i) => (
          <div
            key={p.title}
            ref={(el) => (cardRefs.current[i] = el)}
            className="project-card"
            style={styles.card}
          >
            {/* Gradient cover with overlay */}
            <div style={{ ...styles.cover, background: p.gradient, position: 'relative', overflow: 'hidden' }}>
              {/* Scanlines on the cover */}
              <div style={styles.scanlines} aria-hidden="true" />

              {/* Category tag */}
              <p
                className="pixel-text"
                style={{
                  ...styles.coverTag,
                  color: p.accent,
                  background: 'rgba(0,0,0,0.4)',
                }}
              >
                {p.tag}
              </p>

              {/* Hover overlay — uses existing .project-overlay CSS class */}
              <div className="project-overlay">VIEW MISSION ▶</div>
            </div>

            <div className="project-info" style={styles.info}>
              <p className="project-meta">MISSION: {p.tag} · SATURNSWAMP</p>
              <h3 style={styles.cardTitle}>{p.title}</h3>
              <p style={styles.cardDesc}>{p.desc}</p>
              <div className="tags" style={styles.tags}>
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Classified / Coming Soon card */}
        <div
          ref={(el) => (cardRefs.current[5] = el)}
          style={styles.classifiedCard}
        >
          <p
            className="pixel-text pixel-xs"
            style={styles.classifiedTag}
          >
            [ NEXT MISSION ]
          </p>
          <h3 style={{ ...styles.cardTitle, color: 'var(--text-subtle)' }}>
            Brief Received
          </h3>
          <p style={{ ...styles.cardDesc, fontSize: '0.875rem' }}>
            Something's in progress. Can't say what yet. ETA: classified.
          </p>
        </div>
      </div>

      <style>{`
        .project-card { position: relative; }
        .project-overlay {
          font-family: var(--font-pixel);
          font-size: 0.42rem;
          letter-spacing: 0.2em;
          color: #fff;
        }
        @keyframes classified-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
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
  card: {
    overflow: 'hidden',
  },
  cover: {
    height: '185px',
    display: 'flex',
    alignItems: 'flex-end',
    padding: '1rem 1.25rem',
  },
  scanlines: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 4px)',
    pointerEvents: 'none',
    zIndex: 1,
  },
  coverTag: {
    fontSize: '0.38rem',
    letterSpacing: '0.25em',
    fontWeight: 400,
    position: 'relative',
    zIndex: 2,
    padding: '0.3rem 0.6rem',
    borderRadius: '3px',
  },
  info: {
    padding: '1.25rem',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.1rem',
    color: 'var(--text)',
    marginBottom: '0.5rem',
    marginTop: '0.4rem',
  },
  cardDesc: {
    color: 'var(--text-muted)',
    lineHeight: 1.72,
    marginBottom: '0.85rem',
  },
  tags: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  classifiedCard: {
    background: 'var(--bg-card)',
    border: '1px dashed rgba(124,58,237,0.25)',
    borderRadius: 'var(--radius)',
    padding: '2rem 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '280px',
  },
  classifiedTag: {
    color: 'var(--purple-light)',
    letterSpacing: '0.2em',
    marginBottom: '1rem',
    animation: 'classified-pulse 2.4s ease-in-out infinite',
    display: 'inline-block',
  },
}
