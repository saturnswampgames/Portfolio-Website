import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num:   '01',
    icon:  '📜',
    title: 'Accept Quest',
    desc:  "You send the brief. I read it — actually read it, not skim it. Then I ask the questions you didn't know needed asking. We start right, or we don't start.",
  },
  {
    num:   '02',
    icon:  '🗺️',
    title: 'Plan the Run',
    desc:  'Before a single pixel moves, we know what we\'re making and why. Moodboards, references, strategy. Direction locked. No back-and-forth, no wasted rounds.',
  },
  {
    num:   '03',
    icon:  '⚡',
    title: 'Do the Thing',
    desc:  "Head down, in the zone. Every element placed on purpose. If it doesn't earn its place, it doesn't get one. No filler, no fluff — just work that actually does something.",
  },
  {
    num:   '04',
    icon:  '🚀',
    title: 'Ship It',
    desc:  "Final files. Clean handoff. Something real in the world that wasn't there before. On time, on brief, and something you're actually proud of.",
  },
]

export default function Process() {
  const sectionRef = useRef(null)
  const stepRefs   = useRef([])
  const lineRef    = useRef(null)
  const seqRef     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(seqRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        y: 14, opacity: 0, duration: 0.5, ease: 'power2.out',
      })
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
          <p className="chapter-tag">CHAPTER IV — THE PLAYBOOK</p>
          <h2 className="section-title">How It Goes Down</h2>
          <p className="section-sub">
            Four moves. Every time. No mystery.
          </p>
        </div>

        <p
          ref={seqRef}
          className="pixel-text pixel-xxs"
          style={styles.seqLabel}
        >
          [ SEQUENCE LOADED — READY TO RUN ]
        </p>

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
  seqLabel: {
    textAlign: 'center',
    color: 'var(--cyan)',
    opacity: 0.5,
    letterSpacing: '0.2em',
    marginBottom: '3rem',
  },
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
    fontWeight: 800,
    fontSize: '1.15rem',
    color: 'var(--text)',
    marginBottom: '0.6rem',
    letterSpacing: '0.01em',
  },
  stepDesc: {
    fontSize: '0.875rem',
    color: 'var(--text-muted)',
    lineHeight: 1.78,
  },
}
