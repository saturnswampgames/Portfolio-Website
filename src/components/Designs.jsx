import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DESIGNS = [
  {
    img:   'https://i.ibb.co/2c58gFH/Itadori-aesthetic-icon.png',
    meta:  'DIGITAL ART · ANIME',
    title: 'Aesthetics',
    desc:  'Aesthetic anime images done right. Because the Internet needed more Itadori energy — and I delivered.',
    tags:  [{ label: 'Anime', cls: '' }, { label: 'Aesthetic', cls: 'cyan' }],
  },
  {
    img:   'https://i.ibb.co/dm9TmQ8/design1-large.png',
    meta:  'DIGITAL ART · ORIGINAL',
    title: 'Originals',
    desc:  'Simple vectors with a story. The idea is always mine. The creativity is always front and center.',
    tags:  [{ label: 'Vector', cls: '' }, { label: 'Original', cls: 'cyan' }],
  },
  {
    img:   'https://i.ibb.co/ySBv4nq/gojo-icon.png',
    meta:  'DIGITAL ART · ANIME',
    title: 'Anime Characters',
    desc:  'Anime pfps, stickers, and aesthetics. Gojo, Itadori, and the rest of the roster — edited to perfection.',
    tags:  [{ label: 'Anime', cls: '' }, { label: 'PFP Art', cls: 'cyan' }],
  },
]

export default function Designs() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRefs.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
        y: 55,
        opacity: 0,
        duration: 0.75,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section" id="designs" ref={sectionRef}>
      <div className="section-header">
        <p className="chapter-tag">CHAPTER V</p>
        <h2 className="section-title">The Gallery</h2>
        <p className="section-sub">
          Anime aesthetics, originals &amp; everything in between.
        </p>
      </div>

      <div className="projects-grid">
        {DESIGNS.map((d, i) => (
          <div
            key={d.title}
            className="project-card"
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="project-img-wrap square">
              <img src={d.img} alt={d.title} loading="lazy" />
              <div className="project-overlay art">ART</div>
            </div>
            <div className="project-info">
              <p className="project-meta">{d.meta}</p>
              <h3>{d.title}</h3>
              <p>{d.desc}</p>
              <div className="tags">
                {d.tags.map(t => (
                  <span key={t.label} className={`tag ${t.cls}`}>{t.label}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="section-cta">
        <a
          href="https://www.deviantart.com/saturnswamp"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <i className="bi bi-palette" /> Check My Designs
        </a>
      </div>
    </section>
  )
}
