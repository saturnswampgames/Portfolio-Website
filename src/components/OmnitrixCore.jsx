import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function OmnitrixCore() {
  const coreRef = useRef()
  const glowRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.15 + Math.sin(t * 1.5) * 0.08
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3
    }
  })

  return (
    <group ref={coreRef}>
      {/* Main disc */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.15, 64]} />
        <meshStandardMaterial color="#050f05" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Outer rim */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.85, 0.08, 16, 64]} />
        <meshStandardMaterial
          color="#00FF41"
          emissive="#00FF41"
          emissiveIntensity={1.2}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Hourglass top triangle */}
      <mesh position={[0, 0.42, 0.09]} rotation={[0, 0, 0]}>
        <coneGeometry args={[0.52, 0.7, 3, 1]} />
        <meshStandardMaterial
          color="#00FF41"
          emissive="#00FF41"
          emissiveIntensity={1.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Hourglass bottom triangle (inverted) */}
      <mesh position={[0, -0.42, 0.09]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.52, 0.7, 3, 1]} />
        <meshStandardMaterial
          color="#00FF41"
          emissive="#00FF41"
          emissiveIntensity={1.5}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Center dot */}
      <mesh position={[0, 0, 0.1]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="#00FF41"
          emissive="#00FF41"
          emissiveIntensity={3}
        />
      </mesh>

      {/* Glow halo */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <circleGeometry args={[2.2, 64]} />
        <meshBasicMaterial
          color="#00FF41"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Spinning inner ring */}
      <mesh ref={ringRef} position={[0, 0, 0.05]}>
        <ringGeometry args={[1.5, 1.6, 48]} />
        <meshBasicMaterial
          color="#00FF41"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Core point light */}
      <pointLight color="#00FF41" intensity={3} distance={6} decay={2} position={[0, 0, 1]} />
    </group>
  )
}
