import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num:   '01',
    icon:  '🔍',
    title: 'Discover',
    desc:  "Brief, research, references. Understanding what you need — and what you actually mean. No assumptions, no shortcuts.",
  },
  {
    num:   '02',
    icon:  '📐',
    title: 'Define',
    desc:  'Strategy, moodboards, direction locked in. No guessing games, no back-and-forth. Just a clear creative path forward.',
  },
  {
    num:   '03',
    icon:  '✦',
    title: 'Design',
    desc:  "Execution with intent. Every element earns its place. No filler, no fluff — just work that actually does something.",
  },
  {
    num:   '04',
    icon:  '🚀',
    title: 'Deliver',
    desc:  'Final assets, clean handoff, and something worth showing off. On time. On brand. On point.',
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const stepRefs   = useRef([])
  const lineRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(stepRefs.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power3.out',
      })
      gsap.from(lineRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.4,
        ease: 'power2.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-dark" id="process" ref={sectionRef}>
      <div className="inner">
        <div className="section-header">
          <p className="chapter-tag">CHAPTER IV</p>
          <h2 className="section-title">The Process</h2>
          <p className="section-sub">
            Four steps. Zero guesswork. Every time.
          </p>
        </div>

        <div style={styles.wrapper}>
          {/* Connecting line */}
          <div style={styles.lineTrack}>
            <div ref={lineRef} style={styles.line} />
          </div>

          {/* Steps */}
          <div style={styles.grid}>
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => (stepRefs.current[i] = el)}
                style={styles.step}
              >
                {/* Number + dot */}
                <div style={styles.stepTop}>
                  <p className="pixel-text" style={styles.num}>{step.num}</p>
                  <div style={styles.dot} />
                </div>

                {/* Icon */}
                <div style={styles.iconWrap}>
                  <span style={styles.icon}>{step.icon}</span>
                </div>

                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const styles = {
  wrapper: {
    position: 'relative',
  },
  lineTrack: {
    position: 'absolute',
    top: '60px',
    left: 'calc(12.5% + 16px)',
    right: 'calc(12.5% + 16px)',
    height: '1px',
    background: 'var(--border)',
    overflow: 'hidden',
    zIndex: 0,
  },
  line: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, var(--purple) 0%, var(--gold) 100%)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
    position: 'relative',
    zIndex: 1,
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  stepTop: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: '1.5rem',
  },
  num: {
    fontSize: '0.45rem',
    color: 'var(--text-muted)',
    letterSpacing: '0.15em',
    marginBottom: '0.75rem',
  },
  dot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    background: 'var(--purple)',
    border: '2px solid var(--bg-2)',
    boxShadow: '0 0 12px var(--purple-glow)',
  },
  iconWrap: {
    width: '52px',
    height: '52px',
    borderRadius: '12px',
    background: 'rgba(124,58,237,0.1)',
    border: '1px solid rgba(124,58,237,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  icon: {
    fontSize: '1.4rem',
  },
  stepTitle: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 700,
    fontSize: '1.15rem',
    color: 'var(--text)',
    marginBottom: '0.6rem',
  },
  stepDesc: {
    fontSize: '0.875rem',
    color: 'var(--text-muted)',
    lineHeight: 1.72,
  },
}
