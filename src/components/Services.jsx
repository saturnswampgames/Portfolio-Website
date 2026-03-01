import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon:    '✦',
    rarity:  '● LEGENDARY',
    rarityColor: 'var(--gold)',
    title:   'Branding & Identity',
    desc:    "Not just a logo. A whole universe — marks, type, colour, personality. The stuff people recognise in a thumbnail before they even read the name.",
    glow:    'var(--gold-glow)',
    border:  'var(--gold)',
  },
  {
    icon:    '📦',
    rarity:  '● EPIC',
    rarityColor: 'var(--purple-light)',
    title:   'Packaging Design',
    desc:    "The unboxing is part of the product. I design packaging that earns its shelf space and makes people reach for it without thinking.",
    glow:    'var(--purple-glow)',
    border:  'var(--purple-light)',
  },
  {
    icon:    '📱',
    rarity:  '● EPIC',
    rarityColor: 'var(--cyan)',
    title:   'Social Media Design',
    desc:    "Your feed should feel like a vibe, not a mood board dump. Templates, campaigns, launches — built to stop the scroll dead.",
    glow:    'var(--cyan-glow)',
    border:  'var(--cyan)',
  },
  {
    icon:    '🎬',
    rarity:  '● RARE',
    rarityColor: 'var(--pink)',
    title:   'Motion Graphics',
    desc:    "Static is forgettable. Motion is memorable. From brand animations to full reels — if it moves, I make it hit.",
    glow:    'var(--pink-glow)',
    border:  'var(--pink)',
  },
  {
    icon:    '🌐',
    rarity:  '● RARE',
    rarityColor: 'var(--cyan)',
    title:   'Web Design & Dev',
    desc:    "Cookie-cutter templates are free. A site with actual personality costs extra. I do the latter — and it's worth it.",
    glow:    'var(--cyan-glow)',
    border:  'var(--cyan)',
  },
]

function ServiceCard({ service, cardRef }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left  - rect.width  / 2
    const y = e.clientY - rect.top   - rect.height / 2
    gsap.to(card, {
      rotateY: x * 0.045,
      rotateX: -y * 0.045,
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
      style={{ ...styles.card, '--glow': service.glow, '--border-col': service.border }}
      className="service-card"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Rarity badge */}
      <p
        className="pixel-text"
        style={{ ...styles.rarity, color: service.rarityColor }}
      >
        {service.rarity}
      </p>

      <div style={styles.iconWrap}>
        <span style={styles.icon}>{service.icon}</span>
      </div>

      <h3 style={styles.cardTitle}>{service.title}</h3>
      <p style={styles.cardDesc}>{service.desc}</p>

      <p className="pixel-text" style={styles.badge}>AVAILABLE ▶</p>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])
  const headerRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      })
      gsap.from(cardRefs.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        y: 55,
        opacity: 0,
        duration: 0.75,
        stagger: 0.13,
        ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-dark" id="services" ref={sectionRef}>
      <div className="inner">
        <div className="section-header">
          <p className="chapter-tag">CHAPTER II — SKILL TREE</p>
          <h2 className="section-title">What I Build</h2>
          <p className="section-sub">
            Five disciplines. No limits. Pick your loadout.
          </p>
        </div>

        <p
          ref={headerRef}
          className="pixel-text pixel-xxs"
          style={styles.unlocked}
        >
          [ ALL SKILLS UNLOCKED ]
        </p>

        <div style={styles.grid}>
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              service={s}
              cardRef={(el) => (cardRefs.current[i] = el)}
            />
          ))}
        </div>
      </div>

      <style>{`
        .service-card {
          transform-style: preserve-3d;
          will-change: transform;
        }
        .service-card:hover {
          box-shadow: 0 14px 44px var(--glow);
          border-color: var(--border-col) !important;
        }
      `}</style>
    </section>
  )
}

const styles = {
  unlocked: {
    textAlign: 'center',
    color: 'var(--green)',
    opacity: 0.55,
    letterSpacing: '0.2em',
    marginBottom: '2.5rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
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
  rarity: {
    fontSize: '0.35rem',
    letterSpacing: '0.18em',
    marginBottom: '1rem',
  },
  iconWrap: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    background: 'rgba(124,58,237,0.1)',
    border: '1px solid rgba(124,58,237,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.2rem',
  },
  icon: {
    fontSize: '1.5rem',
    lineHeight: 1,
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.1rem',
    color: 'var(--text)',
    marginBottom: '0.7rem',
  },
  cardDesc: {
    fontSize: '0.875rem',
    color: 'var(--text-muted)',
    lineHeight: 1.78,
    flexGrow: 1,
  },
  badge: {
    fontSize: '0.35rem',
    letterSpacing: '0.15em',
    color: 'var(--green)',
    opacity: 0.65,
    marginTop: '1.2rem',
  },
}
