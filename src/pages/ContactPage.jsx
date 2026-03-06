import { useEffect, useRef, useState } from 'react'
import NavBack from '../components/NavBack'
import gsap from 'gsap'

export default function ContactPage({ overlayRef }) {
  const pageRef = useRef()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="alien-page" ref={pageRef} style={{ background: 'radial-gradient(ellipse at center, #000a1a 0%, #000000 70%)' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(ellipse at 50% 30%, rgba(0,136,255,0.08) 0%, transparent 60%)',
        pointerEvents: 'none', zIndex: 1,
        animation: 'bgPulse 3s ease-in-out infinite',
      }} />

      <div className="alien-topbar" style={{ borderBottomColor: '#0088FF', boxShadow: '0 4px 20px rgba(0,136,255,0.3)' }}>
        <div>
          <div className="glow-text" style={{ color: '#0088FF', textShadow: '0 0 12px #0088FF', fontSize: '0.7rem' }}>
            Kineceleran — Kinet
          </div>
          <div className="alien-name glow-text" style={{ color: '#0088FF', textShadow: '0 0 16px #0088FF' }}>
            ⚡ XLR8
          </div>
        </div>
        <div style={{ color: '#0088FF', fontSize: '0.7rem', letterSpacing: '0.2em', opacity: 0.6 }}>
          CONTACT.EXE
        </div>
      </div>

      <div className="alien-content">
        <div style={{ maxWidth: 560, margin: '0 auto' }}>

          <div className="holo-panel" style={{ borderColor: 'rgba(0,136,255,0.5)', padding: '24px', marginBottom: '20px' }}>
            <div className="section-heading" style={{ color: 'rgba(0,136,255,0.6)', borderBottomColor: 'rgba(0,136,255,0.2)' }}>
              Transmission
            </div>

            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '32px',
                color: '#0088FF',
                textShadow: '0 0 12px #0088FF',
                letterSpacing: '0.2em',
                animation: 'flicker 1s ease',
              }}>
                ⚡ MESSAGE RECEIVED — TRANSMISSION COMPLETE
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="[ YOUR NAME ]"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  style={{ borderColor: 'rgba(0,136,255,0.4)', color: '#0088FF' }}
                />
                <input
                  type="email"
                  placeholder="[ YOUR EMAIL ]"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  style={{ borderColor: 'rgba(0,136,255,0.4)', color: '#0088FF' }}
                />
                <textarea
                  placeholder="[ YOUR MESSAGE ]"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  style={{ borderColor: 'rgba(0,136,255,0.4)', color: '#0088FF' }}
                />
                <button
                  type="submit"
                  className="submit-btn"
                  style={{ borderColor: '#0088FF', color: '#0088FF', boxShadow: '0 0 10px rgba(0,136,255,0.4)' }}
                >
                  ⚡ Send Transmission
                </button>
              </form>
            )}
          </div>

          <div className="holo-panel" style={{ borderColor: 'rgba(0,136,255,0.4)', padding: '20px', marginBottom: '24px' }}>
            <div className="section-heading" style={{ color: 'rgba(0,136,255,0.5)', borderBottomColor: 'rgba(0,136,255,0.2)' }}>
              Direct Links
            </div>
            <div className="social-links">
              <a className="social-link" href="#" style={{ borderColor: 'rgba(0,136,255,0.4)', color: '#0088FF' }}>YouTube</a>
              <a className="social-link" href="#" style={{ borderColor: 'rgba(0,136,255,0.4)', color: '#0088FF' }}>Twitter / X</a>
              <a className="social-link" href="#" style={{ borderColor: 'rgba(0,136,255,0.4)', color: '#0088FF' }}>Discord</a>
              <a className="social-link" href="#" style={{ borderColor: 'rgba(0,136,255,0.4)', color: '#0088FF' }}>Email</a>
            </div>
          </div>

          <NavBack overlayRef={overlayRef} />
        </div>
      </div>
    </div>
  )
}
