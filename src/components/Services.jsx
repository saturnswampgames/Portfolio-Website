import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: '✦',
    title: 'Branding & Identity',
    desc: 'Logos, brand guidelines, visual systems — built to tell a story before a single word is read. The kind of brand that people remember.',
    glow: 'var(--gold-glow)',
    border: 'var(--gold)',
  },
  {
    icon: '📦',
    title: 'Packaging Design',
    desc: "Packaging that earns a second look on the shelf — and then a purchase. Because great packaging doesn't just contain a product, it sells it.",
    glow: 'var(--purple-glow)',
    border: 'var(--purple-light)',
  },
  {
    icon: '📱',
    title: 'Social Media Design',
    desc: 'Feed aesthetics, post templates, campaign visuals. Content crafted to stop the scroll mid-thumb and make people actually want to engage.',
    glow: 'var(--cyan-glow)',
    border: 'var(--cyan)',
  },
  {
    icon: '🎬',
    title: 'Motion Graphics',
    desc: 'Animations, transitions, reels, intros. Ideas that move — literally. Because static is fine, but motion is memorable.',
    glow: 'var(--pink-glow)',
    border: 'var(--pink)',
  },
  {
    icon: '🌐',
    title: 'Web Design & Dev',
    desc: 'Websites that actually have a personality. Built to function, designed to be remembered. No cookie-cutter templates, no boring layouts.',
    glow: 'var(--gold-glow)',
    border: 'var(--gold)',
  },
]

function ServiceCard({ service, cardRef }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const card = ref.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width  / 2
    const y = e.clientY - rect.top  - rect.height / 2
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
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
          <p className="chapter-tag">CHAPTER II</p>
          <h2 className="section-title">What I Build</h2>
          <p className="section-sub">
            Five disciplines. One vision. Zero compromise.
          </p>
        </div>

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
    fontSize: '1.15rem',
    color: 'var(--text)',
    marginBottom: '0.7rem',
  },
  cardDesc: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: 1.75,
  },
  badge: {
    fontSize: '0.35rem',
    letterSpacing: '0.15em',
    color: 'var(--green)',
    opacity: 0.65,
    marginTop: '1.2rem',
  },
}
