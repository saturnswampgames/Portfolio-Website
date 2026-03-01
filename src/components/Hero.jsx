import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'

/* ── 3D Objects ──────────────────────────────────────────── */
function FloatingTorusKnot() {
  const meshRef = useRef()
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.18
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.28
  })
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[3.2, 0.5, -1.5]}>
        <torusKnotGeometry args={[0.9, 0.3, 128, 16]} />
        <MeshDistortMaterial
          color="#7c3aed"
          emissive="#4a1d96"
          emissiveIntensity={0.6}
          distort={0.25}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
    </Float>
  )
}

function FloatingOctahedron() {
  const meshRef = useRef()
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.22
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.15
  })
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[-3, -0.8, -2]}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#92400e"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.9}
          wireframe={false}
        />
      </mesh>
    </Float>
  )
}

function FloatingSphere() {
  const meshRef = useRef()
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.12
  })
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, -2.8, -3]}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#0e4f5e"
          emissiveIntensity={0.55}
          roughness={0.2}
          metalness={0.7}
          wireframe
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]}  color="#7c3aed" intensity={3} />
      <pointLight position={[-4, -2, 2]} color="#f59e0b" intensity={2} />
      <pointLight position={[0, 0, 3]}  color="#06b6d4" intensity={1.5} />
      <Stars
        radius={80}
        depth={60}
        count={2500}
        factor={3}
        saturation={0}
        fade
        speed={0.6}
      />
      <FloatingTorusKnot />
      <FloatingOctahedron />
      <FloatingSphere />
    </>
  )
}

/* ── Typing animation (vanilla) ──────────────────────────── */
const PHRASES = [
  "Branding that hits different.",
  "Packaging that sells before you open it.",
  "Social content that stops the scroll.",
  "Motion that makes ideas move.",
  "Web design with actual personality.",
]

function useTyping(elRef) {
  useEffect(() => {
    let idx    = 0
    let charIdx = 0
    let deleting = false
    let timer

    const tick = () => {
      const el = elRef.current
      if (!el) return
      const phrase = PHRASES[idx]

      if (!deleting) {
        el.textContent = phrase.slice(0, charIdx + 1)
        charIdx++
        if (charIdx === phrase.length) {
          deleting = true
          timer = setTimeout(tick, 2200)
          return
        }
      } else {
        el.textContent = phrase.slice(0, charIdx - 1)
        charIdx--
        if (charIdx === 0) {
          deleting = false
          idx = (idx + 1) % PHRASES.length
        }
      }
      timer = setTimeout(tick, deleting ? 38 : 75)
    }

    timer = setTimeout(tick, 700)
    return () => clearTimeout(timer)
  }, [elRef])
}

/* ── Hero Component ──────────────────────────────────────── */
export default function Hero() {
  const titleRef    = useRef(null)
  const subtitleRef = useRef(null)
  const tagRef      = useRef(null)
  const descRef     = useRef(null)
  const ctaRef      = useRef(null)

  useTyping(subtitleRef)

  /* GSAP entrance animation */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(tagRef.current,   { opacity: 0, y: 20, duration: 0.7 })
      .from(titleRef.current, { opacity: 0, y: 50, duration: 1 }, '-=0.3')
      .from(descRef.current,  { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
      .from(ctaRef.current,   { opacity: 0, y: 20, duration: 0.7 }, '-=0.4')
  }, [])

  return (
    <section id="hero" style={styles.hero}>
      {/* Three.js Canvas */}
      <div style={styles.canvasWrap} aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Radial vignette */}
      <div style={styles.vignette} aria-hidden="true" />

      {/* Text content */}
      <div style={styles.content}>
        <p
          ref={tagRef}
          className="pixel-text pixel-xs"
          style={{ color: 'var(--cyan)', letterSpacing: '0.3em', marginBottom: '1.5rem' }}
        >
          [ CREATIVE STUDIO — EST. 2020 ]
        </p>

        <h1 ref={titleRef} style={styles.title}>
          SATURNSWAMP
        </h1>

        <p style={styles.subtitle}>
          <span
            ref={subtitleRef}
            className="pixel-text pixel-sm"
            style={{ color: 'var(--gold)' }}
          />
          <span className="cursor-blink" style={styles.blink}>|</span>
        </p>

        <p
          ref={descRef}
          style={styles.desc}
        >
          Branding &nbsp;·&nbsp; Packaging &nbsp;·&nbsp; Social Media &nbsp;·&nbsp; Motion &nbsp;·&nbsp; Web
        </p>

        <div ref={ctaRef} style={styles.cta}>
          <a href="#work"    className="btn-primary">See the Work</a>
          <a href="#contact" className="btn-ghost">Start a Project</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={styles.scrollIndicator}>
        <span className="pixel-text pixel-xxs" style={{ color: 'var(--text-muted)', letterSpacing: '0.2em' }}>
          SCROLL
        </span>
        <div style={styles.arrow} />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes bounce-arrow {
          0%,100% { transform: rotate(45deg) translate(0,0); }
          50%      { transform: rotate(45deg) translate(4px,4px); }
        }
      `}</style>
    </section>
  )
}

const styles = {
  hero: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden',
    paddingTop: 'var(--nav-h)',
  },
  canvasWrap: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    background: 'radial-gradient(ellipse at center, transparent 30%, rgba(8,8,14,0.85) 100%)',
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: '860px',
    padding: '2rem',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontWeight: 900,
    fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
    letterSpacing: '-0.02em',
    lineHeight: 0.95,
    background: 'linear-gradient(135deg, #e2e8f0 0%, #9333ea 50%, #f59e0b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '1.5rem',
    textShadow: 'none',
  },
  subtitle: {
    minHeight: '2.2em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    marginBottom: '1.25rem',
  },
  blink: {
    color: 'var(--gold)',
    animation: 'blink 0.85s step-end infinite',
    fontFamily: 'var(--font-pixel)',
    fontSize: '0.7rem',
  },
  desc: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.05rem',
    color: 'var(--text-subtle)',
    letterSpacing: '0.08em',
    marginBottom: '3rem',
  },
  cta: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    opacity: 0.45,
  },
  arrow: {
    width: '18px',
    height: '18px',
    borderRight: '2px solid var(--text)',
    borderBottom: '2px solid var(--text)',
    animation: 'bounce-arrow 1.6s ease-in-out infinite',
  },
}
