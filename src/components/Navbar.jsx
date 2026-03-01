import { useEffect, useRef, useState } from 'react'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Services', href: '#services' },
  { label: 'Work',     href: '#work'     },
  { label: 'Process',  href: '#process'  },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const navRef    = useRef(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('scrolled')
      else                      nav.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <nav className="site-nav" ref={navRef} id="siteNav">
      <a href="#hero" className="nav-logo" onClick={closeMenu}>
        <img
          src="https://i.ibb.co/0tFBvMW/ssg-icon.png"
          alt="Saturnswamp logo"
          width={36}
          height={36}
        />
        <span className="nav-brand">Saturnswamp</span>
      </a>

      {/* Desktop links */}
      <ul className={`nav-links${open ? ' open' : ''}`}>
        {links.map(({ label, href }) => (
          <li key={href}>
            <a href={href} onClick={closeMenu}>{label}</a>
          </li>
        ))}
      </ul>

      {/* Hamburger */}
      <button
        className={`nav-toggle${open ? ' active' : ''}`}
        aria-label="Toggle navigation"
        onClick={() => setOpen(o => !o)}
      >
        <span /><span /><span />
      </button>

      <style>{`
        .site-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: var(--nav-h);
          background: transparent;
          transition: background 0.4s, backdrop-filter 0.4s, border-color 0.4s;
          border-bottom: 1px solid transparent;
        }
        .site-nav.scrolled {
          background: rgba(8, 8, 14, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom-color: var(--border-purple);
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          text-decoration: none;
        }
        .nav-logo img {
          width: 36px; height: 36px;
          object-fit: contain;
          border-radius: 8px;
        }
        .nav-brand {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.15rem;
          letter-spacing: 0.04em;
          color: var(--text);
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 2.2rem;
          align-items: center;
        }
        .nav-links a {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: var(--text-subtle);
          position: relative;
          transition: color 0.2s;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 2px;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.25s;
        }
        .nav-links a:hover { color: var(--gold); }
        .nav-links a:hover::after { transform: scaleX(1); }
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 8px;
          z-index: 1001;
        }
        .nav-toggle span {
          display: block;
          width: 24px; height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: all 0.3s;
        }
        .nav-toggle.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nav-toggle.active span:nth-child(2) { opacity: 0; }
        .nav-toggle.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        @media (max-width: 768px) {
          .nav-toggle { display: flex; }
          .nav-links {
            display: none;
            position: fixed;
            inset: 0;
            background: rgba(8, 8, 14, 0.97);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3rem;
            z-index: 1000;
          }
          .nav-links.open { display: flex; }
          .nav-links a { font-size: 1.6rem; }
        }
      `}</style>
    </nav>
  )
}
