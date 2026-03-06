import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

const ALIEN_SHAPES = {
  heatblast: (color) => (
    <svg viewBox="0 0 60 80" width="60" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Heatblast: round rocky head, wide shoulders, flame top */}
      <ellipse cx="30" cy="35" rx="18" ry="20" fill={color} opacity="0.9" />
      <rect x="14" y="52" width="6" height="18" fill={color} opacity="0.85" />
      <rect x="40" y="52" width="6" height="18" fill={color} opacity="0.85" />
      <rect x="20" y="70" width="8" height="8" fill={color} opacity="0.8" />
      <rect x="32" y="70" width="8" height="8" fill={color} opacity="0.8" />
      {/* Arms */}
      <rect x="4" y="40" width="12" height="6" fill={color} opacity="0.8" />
      <rect x="44" y="40" width="12" height="6" fill={color} opacity="0.8" />
      {/* Flame */}
      <polygon points="25,16 30,2 35,16" fill={color} opacity="0.7" />
      <polygon points="22,18 26,8 30,18" fill={color} opacity="0.5" />
    </svg>
  ),
  fourarms: (color) => (
    <svg viewBox="0 0 80 90" width="80" height="90" xmlns="http://www.w3.org/2000/svg">
      {/* Four Arms: huge body, 4 arms */}
      <ellipse cx="40" cy="30" rx="20" ry="22" fill={color} opacity="0.9" />
      <rect x="22" y="50" width="36" height="28" fill={color} opacity="0.88" rx="4" />
      {/* Legs */}
      <rect x="24" y="78" width="10" height="10" fill={color} opacity="0.85" />
      <rect x="46" y="78" width="10" height="10" fill={color} opacity="0.85" />
      {/* Upper arms */}
      <rect x="2" y="38" width="20" height="8" fill={color} opacity="0.82" rx="2" />
      <rect x="58" y="38" width="20" height="8" fill={color} opacity="0.82" rx="2" />
      {/* Lower arms */}
      <rect x="2" y="56" width="18" height="8" fill={color} opacity="0.78" rx="2" />
      <rect x="60" y="56" width="18" height="8" fill={color} opacity="0.78" rx="2" />
      {/* Fists */}
      <rect x="0" y="44" width="6" height="8" fill={color} opacity="0.75" />
      <rect x="74" y="44" width="6" height="8" fill={color} opacity="0.75" />
    </svg>
  ),
  upgrade: (color) => (
    <svg viewBox="0 0 60 80" width="60" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Upgrade: sleek tech body with circuits */}
      <ellipse cx="30" cy="22" rx="16" ry="18" fill={color} opacity="0.9" />
      <rect x="16" y="38" width="28" height="26" fill={color} opacity="0.88" rx="2" />
      <rect x="18" y="64" width="8" height="14" fill={color} opacity="0.82" />
      <rect x="34" y="64" width="8" height="14" fill={color} opacity="0.82" />
      {/* Arms slim */}
      <rect x="6" y="38" width="10" height="5" fill={color} opacity="0.8" />
      <rect x="44" y="38" width="10" height="5" fill={color} opacity="0.8" />
      {/* Circuit lines on body */}
      <line x1="22" y1="44" x2="38" y2="44" stroke="#000" strokeWidth="2" opacity="0.6" />
      <line x1="22" y1="52" x2="38" y2="52" stroke="#000" strokeWidth="2" opacity="0.6" />
      <circle cx="30" cy="18" r="4" fill="#000" opacity="0.5" />
    </svg>
  ),
  xlr8: (color) => (
    <svg viewBox="0 0 60 80" width="60" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* XLR8: insectoid head, slim torso, tail/blur */}
      <ellipse cx="30" cy="18" rx="14" ry="14" fill={color} opacity="0.9" />
      {/* Visor */}
      <ellipse cx="30" cy="16" rx="9" ry="5" fill="#000" opacity="0.7" />
      <rect x="20" y="30" width="20" height="24" fill={color} opacity="0.88" rx="3" />
      {/* Slim legs with speed blur */}
      <rect x="18" y="54" width="8" height="20" fill={color} opacity="0.82" />
      <rect x="34" y="54" width="8" height="20" fill={color} opacity="0.82" />
      {/* Speed lines */}
      <line x1="2" y1="40" x2="16" y2="40" stroke={color} strokeWidth="2" opacity="0.5" />
      <line x1="2" y1="46" x2="12" y2="46" stroke={color} strokeWidth="1.5" opacity="0.35" />
      <line x1="44" y1="40" x2="58" y2="40" stroke={color} strokeWidth="2" opacity="0.5" />
      <line x1="48" y1="46" x2="58" y2="46" stroke={color} strokeWidth="1.5" opacity="0.35" />
      {/* Tail */}
      <path d="M30 54 Q50 65 54 78" stroke={color} strokeWidth="4" fill="none" opacity="0.6" />
    </svg>
  ),
}

function svgToDataUrl(svgString) {
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)))
}

function getAlienSVGUrl(alienId, color) {
  const el = ALIEN_SHAPES[alienId]?.(color)
  if (!el) return null
  const div = document.createElement('div')
  const ReactDOM = { renderToStaticMarkup: null }
  // We'll use a canvas-based approach via THREE.CanvasTexture
  return null
}

export default function AlienSlot({ alien, position, onClick }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(t * 1.2 + alien.angle) * 0.08
      const targetScale = hovered ? 1.25 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = hovered
        ? 0.4 + Math.sin(t * 3) * 0.1
        : 0.12 + Math.sin(t * 1.5) * 0.04
    }
  })

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'crosshair' }}
      onClick={onClick}
    >
      {/* Alien panel */}
      <mesh>
        <planeGeometry args={[1.2, 1.4]} />
        <meshStandardMaterial
          color={hovered ? alien.primaryColor : '#0a1a0a'}
          emissive={hovered ? alien.primaryColor : '#001a00'}
          emissiveIntensity={hovered ? 0.6 : 0.1}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Border */}
      <lineSegments>
        <edgesGeometry args={[new THREE.PlaneGeometry(1.2, 1.4)]} />
        <lineBasicMaterial
          color={hovered ? alien.primaryColor : '#00FF41'}
          linewidth={2}
        />
      </lineSegments>

      {/* Glow halo */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[1.6, 1.8]} />
        <meshBasicMaterial
          color={hovered ? alien.primaryColor : '#00FF41'}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Alien symbol (large text) */}
      <Html center distanceFactor={6} style={{ pointerEvents: 'none' }}>
        <div
          style={{
            fontSize: hovered ? '2.4rem' : '2rem',
            transition: 'font-size 0.2s',
            filter: hovered ? `drop-shadow(0 0 12px ${alien.primaryColor})` : 'drop-shadow(0 0 6px #00FF41)',
            userSelect: 'none',
          }}
        >
          {alien.symbol}
        </div>
      </Html>

      {/* Label shown on hover */}
      {hovered && (
        <Html
          center
          position={[0, -0.95, 0]}
          distanceFactor={6}
          style={{ pointerEvents: 'none' }}
        >
          <div className="alien-label">
            {alien.name}
            <span className="section-sub">{alien.section}</span>
          </div>
        </Html>
      )}

      {/* Alien-colored point light when hovered */}
      {hovered && (
        <pointLight
          color={alien.primaryColor}
          intensity={2}
          distance={3}
          decay={2}
        />
      )}
    </group>
  )
}
