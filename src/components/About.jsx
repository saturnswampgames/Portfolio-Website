import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HP_BARS = [
  { label: 'BRANDING',         pct: 95, color: 'var(--gold)'       },
  { label: 'PACKAGING',        pct: 88, color: 'var(--purple-light)'},
  { label: 'SOCIAL MEDIA',     pct: 92, color: 'var(--cyan)'        },
  { label: 'MOTION GRAPHICS',  pct: 78, color: 'var(--pink)'        },
  { label: 'WEB DESIGN',       pct: 85, color: 'var(--cyan)'        },
]

export default function About() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)
  const barsRef    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      })
      gsap.from(rightRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: 60, opacity: 0, duration: 1, ease: 'power3.out',
      })
      barsRef.current.forEach((bar, i) => {
        if (!bar) return
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: bar.dataset.pct + '%',
            duration: 1.2,
            ease: 'power2.out',
            delay: i * 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="about" ref={sectionRef}>
      <div className="section-header">
        <p className="chapter-tag">CHAPTER I</p>
        <h2 className="section-title">The Creator</h2>
        <p className="section-sub">The person behind the work — and why it matters.</p>
      </div>

      <div style={styles.grid}>
        {/* Left — Bio */}
        <div ref={leftRef} style={styles.bio}>
          <p style={styles.highlight}>
            Hey. I'm{' '}
            <span className="accent-gold">Saurabh Setia</span> — the creative
            force behind{' '}
            <span className="accent-purple">Saturnswamp</span>.
          </p>
          <p style={styles.body}>
            I'm a designer who operates at the intersection of strategy and
            aesthetics. Not just someone who makes things look good — someone
            who makes things{' '}
            <em>work</em> and look good at the same time.
          </p>
          <p style={styles.body}>
            Anime-obsessed, gamer-brained, and design-driven. The same eye that
            obsesses over manga panel composition is the same one laying out your{' '}
            <span className="accent-cyan">brand identity</span>.
          </p>
          <p style={styles.body}>
            Brands, packaging, social, motion, web — I treat every brief like a
            new quest. The mission is always the same:{' '}
            <span className="accent-gold">make it impossible to ignore</span>.
          </p>

          <div style={styles.stats}>
            <div style={styles.statItem}>
              <span style={styles.statNum} className="accent-gold">50+</span>
              <span style={styles.statLabel}>Projects</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNum} className="accent-purple">3+</span>
              <span style={styles.statLabel}>Years</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statNum} className="accent-cyan">1</span>
              <span style={styles.statLabel}>Big Vision</span>
            </div>
          </div>
        </div>

        {/* Right — Character card */}
        <div ref={rightRef}>
          <div style={styles.card}>
            <div style={styles.cardGradientBorder} aria-hidden="true" />
            <div style={styles.cardInner}>
              <div style={styles.badge}>
                <img
                  src="https://i.ibb.co/0tFBvMW/ssg-icon.png"
                  alt="Saturnswamp icon"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <div style={styles.profileInfo}>
                {[
                  ['NAME',   'SAURABH SETIA'],
                  ['ALIAS',  'SATURNSWAMP'],
                  ['CLASS',  'CREATIVE DESIGNER'],
                  ['STATUS', null],
                  ['FOCUS',  'BRAND · PACK · MOTION'],
                ].map(([key, val]) => (
                  <p key={key} className="pixel-text pixel-xs" style={{ color: 'var(--text-subtle)', marginBottom: '0.55rem' }}>
                    {key}:{' '}
                    {key === 'STATUS' ? (
                      <span style={{ color: 'var(--green)', animation: 'pulse 2s infinite' }}>ACTIVE ●</span>
                    ) : (
                      <span style={{ color: 'var(--text)' }}>{val}</span>
                    )}
                  </p>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {HP_BARS.map(({ label, pct, color }, i) => (
                  <div key={label}>
                    <p className="pixel-text" style={{ fontSize: '0.35rem', color: 'var(--text-muted)', marginBottom: '0.3rem', letterSpacing: '0.12em' }}>
                      {label}
                    </p>
                    <div style={styles.hpTrack}>
                      <div
                        ref={el => barsRef.current[i] = el}
                        data-pct={pct}
                        style={{
                          ...styles.hpFill,
                          background: color,
                          boxShadow: `0 0 8px ${color}`,
                          width: '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
        @media (max-width: 900px) {
          #about > .section > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'start',
  },
  bio: {},
  highlight: {
    fontSize: '1.3rem',
    fontWeight: 500,
    color: 'var(--text)',
    lineHeight: 1.6,
    marginBottom: '1.25rem',
  },
  body: {
    fontSize: '1.02rem',
    color: 'var(--text-muted)',
    lineHeight: 1.82,
    marginBottom: '1.15rem',
  },
  stats: {
    display: 'flex',
    gap: '2.5rem',
    marginTop: '2.5rem',
    paddingTop: '2rem',
    borderTop: '1px solid var(--border)',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  statNum: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 900,
    fontSize: '2.6rem',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.05em',
  },
  card: {
    position: 'relative',
    background: 'var(--bg-card)',
    borderRadius: '14px',
    overflow: 'hidden',
  },
  cardGradientBorder: {
    position: 'absolute',
    inset: 0,
    borderRadius: '14px',
    padding: '1px',
    background: 'linear-gradient(135deg, var(--purple) 0%, transparent 50%, var(--gold) 100%)',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
  },
  cardInner: {
    padding: '2rem',
  },
  badge: {
    width: '76px',
    height: '76px',
    borderRadius: '10px',
    overflow: 'hidden',
    border: '2px solid var(--purple)',
    background: 'var(--bg-3)',
    marginBottom: '1.5rem',
  },
  profileInfo: {
    marginBottom: '1.5rem',
  },
  hpTrack: {
    height: '6px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  hpFill: {
    height: '100%',
    borderRadius: '3px',
    transition: 'width 1.2s ease',
  },
}
