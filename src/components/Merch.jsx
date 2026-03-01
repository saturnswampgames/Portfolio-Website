import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MERCH = [
  {
    img:   'https://i.ibb.co/gP7j9W8/merch1.png',
    meta:  'MERCH · APPAREL',
    title: 'Shirts & T-Shirts',
    desc:  'Complete package — shirts, Ts, long sleeves. Your favourite characters, embroidered. Built to drip.',
    tags:  ['Apparel', 'Embroidered'],
  },
  {
    img:   'https://i.ibb.co/7r6G5H0/merch2.png',
    meta:  'MERCH · APPAREL',
    title: 'Hoodies',
    desc:  'That anime hoodie you\'ve been looking for? Found it. Check, follow, and like — the best designs are still loading.',
    tags:  ['Hoodie', 'Anime'],
  },
  {
    img:   'https://i.ibb.co/0jw7r8R/merch3.png',
    meta:  'MERCH · ACCESSORIES',
    title: 'Covers',
    desc:  'Mobile, laptop, tablet — all covered. Literally. Wide variety that\'ll actually make you like your device again.',
    tags:  ['Accessories', 'Custom'],
  },
]

export default function Merch() {
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
    <section className="section-dark" id="merch" ref={sectionRef}>
      <div className="inner">
        <div className="section-header">
          <p className="chapter-tag">CHAPTER VI</p>
          <h2 className="section-title">The Shop</h2>
          <p className="section-sub">Wear the vibe. Carry the culture.</p>
        </div>

        <div className="projects-grid">
          {MERCH.map((m, i) => (
            <div
              key={m.title}
              className="project-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <div className="project-img-wrap square">
                <img src={m.img} alt={m.title} loading="lazy" />
              </div>
              <div className="project-info">
                <p className="project-meta">{m.meta}</p>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <div className="tags">
                  {m.tags.map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta">
          <a
            href="https://www.redbubble.com/people/saturnswamp/shop?asc=u"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <i className="bi bi-bag" /> Buy the Merch
          </a>
        </div>
      </div>
    </section>
  )
}
