import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ABILITIES = [
  {
    icon: '🎮',
    title: 'Game Development',
    desc: 'From mechanic design to final build — I prototype fast, iterate faster, and make sure the explosions hit right. Arcade energy. Always.',
    glow: 'var(--gold-glow)',
    border: 'var(--gold)',
  },
  {
    icon: '🎨',
    title: 'Visual Design',
    desc: "Anime aesthetics, brand identities, digital art, merch — if it needs to look fire, I'm in. The vision always comes first; the tool is just a detail.",
    glow: 'var(--purple-glow)',
    border: 'var(--purple-light)',
  },
  {
    icon: '🎬',
    title: 'Video Editing',
    desc: 'Cuts that hit. Transitions that feel right. Audio that actually syncs. I tell stories through video — no sloppy cuts, no lazy edits.',
    glow: 'var(--cyan-glow)',
    border: 'var(--cyan)',
  },
  {
    icon: '🌐',
    title: 'Web Design & Dev',
    desc: 'Websites that actually have a personality — not just a page with Lorem Ipsum. Creative, functional, and dripping with intention.',
    glow: 'var(--pink-glow)',
    border: 'var(--pink)',
  },
  {
    icon: '💡',
    title: 'Vibe Coding',
    desc: "Got an idea? Let's build it. I code less by the book and more by the energy of the project. If it feels right and works — ship it.",
    glow: 'var(--gold-glow)',
    border: 'var(--gold)',
  },
  {
    icon: '📦',
    title: '3D Modeling',
    desc: 'Blender is where ideas get three dimensions. Ships, rockets, and whatever weird concept is living rent-free in my head that week.',
    glow: 'var(--purple-glow)',
    border: 'var(--purple-light)',
  },
]

function ArsenalCard({ ability, cardRef }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width  / 2
    const y = e.clientY - rect.top  - rect.height / 2
    gsap.to(card, {
      rotateY: x * 0.04,
      rotateX: -y * 0.04,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    })
  }

  const onMouseLeave = () => {
    gsap.to(ref.current, {
      rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out',
    })
  }

  return (
    <div
      ref={(el) => { ref.current = el; if (cardRef) cardRef(el) }}
      style={{ ...styles.card, '--glow': ability.glow, '--border-col': ability.border }}
      className="arsenal-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div style={styles.icon}>{ability.icon}</div>
      <h3 style={styles.cardTitle}>{ability.title}</h3>
      <p style={styles.cardDesc}>{ability.desc}</p>
      <p className="pixel-text pixel-xxs" style={styles.equipped}>EQUIPPED ▶</p>
    </div>
  )
}

export default function Arsenal() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-dark" id="arsenal" ref={sectionRef}>
      <div className="inner">
        <div className="section-header">
          <p className="chapter-tag">CHAPTER II</p>
          <h2 className="section-title">The Arsenal</h2>
          <p className="section-sub">
            It's not about the tools. It's about what you build with them.
          </p>
        </div>

        <div style={styles.grid}>
          {ABILITIES.map((a, i) => (
            <ArsenalCard
              key={a.title}
              ability={a}
              cardRef={(el) => (cardRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .arsenal-card {
          transform-style: preserve-3d;
          will-change: transform;
        }
        .arsenal-card:hover {
          box-shadow: 0 12px 40px var(--glow);
          border-color: var(--border-col) !important;
        }
        .pixel-xxs { font-size: 0.35rem; letter-spacing: 0.15em; }
        @media (max-width: 900px) {
          .arsenal-grid-inner { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 580px) {
          .arsenal-grid-inner { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.4rem',
  },
  card: {
    background: 'var(--bg-3)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius)',
    padding: '2rem 1.6rem',
    transition: 'box-shadow 0.3s, border-color 0.3s',
    cursor: 'default',
  },
  icon: {
    fontSize: '2.4rem',
    marginBottom: '1rem',
    display: 'block',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.15rem',
    color: 'var(--text)',
    marginBottom: '0.7rem',
  },
  cardDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: 1.72,
  },
  equipped: {
    color: 'var(--green)',
    opacity: 0.65,
    marginTop: '1.2rem',
  },
}
