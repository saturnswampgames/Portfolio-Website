import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_ITEMS = [
  {
    icon: 'bi-envelope-fill',
    label: 'DIRECT LINE',
    text: 'saturnswamp@gmail.com',
    href: 'mailto:saturnswamp@gmail.com',
  },
  {
    icon: 'bi-discord',
    label: 'THE SERVER',
    text: 'Join the Discord',
    href: 'https://discord.gg/z96Wk8Smb9',
  },
  {
    icon: 'bi-cup-hot-fill',
    label: 'FUEL THE GRIND',
    text: 'Buy Me a Coffee',
    href: 'https://buymeacoffee.com/saturnswamp',
  },
]

const SOCIALS = [
  { icon: 'bi-instagram',  label: 'Instagram',  href: 'https://www.instagram.com/saurabhsetia360/' },
  { icon: 'bi-twitter-x', label: 'Twitter / X', href: 'https://twitter.com/saturnswamp' },
  { icon: 'bi-github',    label: 'GitHub',      href: 'https://github.com/saturnswampgames' },
  { icon: 'bi-facebook',  label: 'Facebook',    href: 'https://www.facebook.com/Saturnswamp-Games-113295560487336' },
  { icon: 'bi-linkedin',  label: 'LinkedIn',    href: 'https://www.linkedin.com/in/saurabh-setia-52813b20b/' },
  { icon: 'bi-brush-fill', label: 'DeviantArt', href: 'https://www.deviantart.com/saturnswamp' },
  { icon: 'bi-shop',      label: 'RedBubble',   href: 'https://www.redbubble.com/people/saturnswamp/shop?asc=u' },
  { icon: 'bi-controller', label: 'itch.io',    href: 'https://saturnswamp.itch.io/' },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const leftRef    = useRef(null)
  const rightRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
      gsap.from(rightRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        x: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="contact" ref={sectionRef}>
      <div className="section-header">
        <p className="chapter-tag">FINAL CHAPTER</p>
        <h2 className="section-title">Let's Create</h2>
        <p className="section-sub">
          Got a brand to build? A project that needs a creative eye? Let's talk.
        </p>
      </div>

      <div style={styles.grid}>
        {/* Left — contact items */}
        <div ref={leftRef} style={styles.contactList}>
          {CONTACT_ITEMS.map((item) => (
            <div key={item.label} style={styles.contactItem}>
              <i className={`bi ${item.icon}`} style={styles.contactIcon} />
              <div>
                <p className="pixel-text pixel-xxs" style={{ color: 'var(--text-muted)', marginBottom: '0.3rem', fontSize: '0.35rem' }}>
                  {item.label}
                </p>
                <a
                  href={item.href}
                  target={item.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={styles.contactLink}
                >
                  {item.text}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right — social grid */}
        <div ref={rightRef} style={styles.socialGrid}>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              style={styles.socialCard}
            >
              <i className={`bi ${s.icon}`} style={styles.socialIcon} />
              <span style={styles.socialLabel}>{s.label}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .social-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.95rem 1.2rem;
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-subtle);
          text-decoration: none;
          transition: border-color 0.25s, color 0.25s, transform 0.25s;
        }
        .social-card:hover {
          border-color: var(--purple);
          color: var(--text);
          transform: translateX(5px);
        }
        @media (max-width: 860px) {
          .contact-grid-inner { grid-template-columns: 1fr !important; }
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
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2.2rem',
  },
  contactItem: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
  },
  contactIcon: {
    fontSize: '1.5rem',
    color: 'var(--purple-light)',
    marginTop: '0.2rem',
    flexShrink: 0,
  },
  contactLink: {
    fontSize: '1.05rem',
    color: 'var(--text)',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  socialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.7rem',
  },
  socialCard: {},
  socialIcon: {
    fontSize: '1.2rem',
    color: 'var(--purple-light)',
  },
  socialLabel: {},
}
