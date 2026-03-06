import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import AlienSlot from './AlienSlot'
import { ALIENS } from '../data/aliens'
import { triggerTransform } from './TransformEffect'

const RING_RADIUS = 3.8

export default function HolographicRing({ overlayRef }) {
  const ringRef = useRef()
  const outerRingRef = useRef()
  const navigate = useNavigate()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.18
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -t * 0.08
      outerRingRef.current.material.opacity = 0.2 + Math.sin(t * 0.8) * 0.08
    }
  })

  function handleAlienClick(alien) {
    triggerTransform(overlayRef, () => navigate(alien.route))
  }

  return (
    <group ref={ringRef}>
      {/* Holographic torus ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RING_RADIUS, 0.04, 8, 80]} />
        <meshBasicMaterial color="#00FF41" transparent opacity={0.5} />
      </mesh>

      {/* Second ring slightly larger, slower rotation */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[RING_RADIUS + 0.25, 0.02, 8, 80]} />
        <meshBasicMaterial color="#00FF41" transparent opacity={0.2} />
      </mesh>

      {/* Connecting spokes from center to each alien */}
      {ALIENS.map((alien) => {
        const x = Math.cos(alien.angle) * RING_RADIUS
        const z = Math.sin(alien.angle) * RING_RADIUS
        return (
          <line key={`spoke-${alien.id}`}>
            <bufferGeometry
              onUpdate={(self) => {
                const points = [
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(x, 0, z),
                ]
                self.setFromPoints(points)
              }}
            />
            <lineBasicMaterial color="#00FF41" transparent opacity={0.15} />
          </line>
        )
      })}

      {/* Alien slots placed at ring positions */}
      {ALIENS.map((alien) => {
        const x = Math.cos(alien.angle) * RING_RADIUS
        const z = Math.sin(alien.angle) * RING_RADIUS
        return (
          <AlienSlot
            key={alien.id}
            alien={alien}
            position={[x, 0, z]}
            onClick={() => handleAlienClick(alien)}
          />
        )
      })}
    </group>
  )
}
