import { useEffect } from 'react'

export default function Footer() {
  /* Load Ko-fi widget */
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js'
    script.async = true
    script.onload = () => {
      if (window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw('saturnswamp', {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#7c3aed',
          'floating-chat.donateButton.text-color': '#fff',
        })
      }
    }
    document.body.appendChild(script)
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script)
    }
  }, [])

  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <p className="pixel-text pixel-sm" style={{ color: 'var(--purple)', opacity: 0.65, letterSpacing: '0.15em' }}>
          [ GAME SAVED — CHECKPOINT REACHED ]
        </p>
        <p style={styles.copy}>
          © {new Date().getFullYear()} Saturnswamp. All rights reserved. Probably.
        </p>
        <p className="pixel-text pixel-xxs" style={{ color: 'var(--text-muted)', opacity: 0.4, letterSpacing: '0.15em', fontSize: '0.35rem' }}>
          POWERED BY CREATIVITY, CAFFEINE &amp; ANIME
        </p>
      </div>

      <style>{`
        .pixel-xxs { font-size: 0.35rem; }
      `}</style>
    </footer>
  )
}

const styles = {
  footer: {
    background: 'var(--bg-2)',
    borderTop: '1px solid var(--border-purple)',
    padding: '3.5rem 2rem',
    textAlign: 'center',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '0 auto',
  },
  copy: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
  },
}
