import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Environment } from '@react-three/drei'
import OmnitrixCore from './OmnitrixCore'
import HolographicRing from './HolographicRing'

export default function OmnitrixScene({ overlayRef }) {
  return (
    <div className="home-canvas-wrapper">
      <Canvas
        camera={{ position: [0, 5, 9], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: '#000000' }}
      >
        <Suspense fallback={null}>
          {/* Ambient green-tinted light */}
          <ambientLight color="#001a00" intensity={0.8} />
          <directionalLight
            color="#00FF41"
            intensity={0.4}
            position={[5, 10, 5]}
          />

          {/* Stars in background */}
          <Stars
            radius={80}
            depth={50}
            count={2000}
            factor={2}
            saturation={0}
            fade
            speed={0.3}
          />

          {/* Omnitrix center */}
          <OmnitrixCore />

          {/* Rotating alien ring */}
          <HolographicRing overlayRef={overlayRef} />

          {/* Camera controls — limited orbit, auto-rotate */}
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate={false}
            dampingFactor={0.08}
            enableDamping
            rotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
