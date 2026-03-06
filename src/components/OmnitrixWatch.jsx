import { useRef, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ALIENS } from '../data/aliens'
import { triggerTransform } from './TransformEffect'

const SNAP_ANGLE = 360 / ALIENS.length // 90 degrees per alien

// SVG silhouettes for each alien
const SILHOUETTES = {
  heatblast: (
    <svg viewBox="0 0 80 110" fill="#FF6B35" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px #FF6B35)' }}>
      <ellipse cx="40" cy="50" rx="22" ry="26" />
      <rect x="20" y="72" width="10" height="24" rx="3" />
      <rect x="50" y="72" width="10" height="24" rx="3" />
      <rect x="22" y="96" width="12" height="10" rx="2" />
      <rect x="46" y="96" width="12" height="10" rx="2" />
      <rect x="4" y="52" width="16" height="10" rx="4" />
      <rect x="60" y="52" width="16" height="10" rx="4" />
      <polygon points="34,26 40,6 46,26" />
      <polygon points="30,28 35,14 40,28" opacity="0.6" />
      <polygon points="44,28 48,16 52,28" opacity="0.6" />
    </svg>
  ),
  fourarms: (
    <svg viewBox="0 0 100 110" fill="#CC0000" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px #CC0000)' }}>
      <ellipse cx="50" cy="36" rx="24" ry="28" />
      <rect x="28" y="60" width="44" height="34" rx="4" />
      <rect x="30" y="94" width="14" height="14" rx="3" />
      <rect x="56" y="94" width="14" height="14" rx="3" />
      <rect x="2" y="46" width="26" height="12" rx="4" />
      <rect x="72" y="46" width="26" height="12" rx="4" />
      <rect x="2" y="66" width="24" height="12" rx="4" />
      <rect x="74" y="66" width="24" height="12" rx="4" />
      <rect x="0" y="52" width="8" height="10" rx="3" />
      <rect x="92" y="52" width="8" height="10" rx="3" />
    </svg>
  ),
  upgrade: (
    <svg viewBox="0 0 80 110" fill="#8B00FF" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px #8B00FF)' }}>
      <ellipse cx="40" cy="28" rx="20" ry="24" />
      <circle cx="40" cy="22" r="6" fill="#000" opacity="0.5" />
      <rect x="22" y="48" width="36" height="32" rx="3" />
      <rect x="24" y="80" width="12" height="26" rx="3" />
      <rect x="44" y="80" width="12" height="26" rx="3" />
      <rect x="8" y="50" width="14" height="8" rx="3" />
      <rect x="58" y="50" width="14" height="8" rx="3" />
      <line x1="28" y1="58" x2="52" y2="58" stroke="#000" strokeWidth="3" opacity="0.5" />
      <line x1="28" y1="66" x2="52" y2="66" stroke="#000" strokeWidth="3" opacity="0.5" />
      <line x1="28" y1="74" x2="52" y2="74" stroke="#000" strokeWidth="3" opacity="0.5" />
    </svg>
  ),
  xlr8: (
    <svg viewBox="0 0 80 110" fill="#0088FF" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 8px #0088FF)' }}>
      <ellipse cx="40" cy="22" rx="17" ry="18" />
      <ellipse cx="40" cy="18" rx="11" ry="6" fill="#000" opacity="0.6" />
      <rect x="26" y="36" width="28" height="30" rx="4" />
      <rect x="24" y="66" width="10" height="28" rx="3" />
      <rect x="46" y="66" width="10" height="28" rx="3" />
      <path d="M40 66 Q58 80 62 100" stroke="#0088FF" strokeWidth="5" fill="none" opacity="0.7" />
      <line x1="2" y1="48" x2="22" y2="48" stroke="#0088FF" strokeWidth="3" opacity="0.6" />
      <line x1="2" y1="54" x2="18" y2="54" strokeWidth="2" opacity="0.4" />
      <line x1="58" y1="48" x2="78" y2="48" stroke="#0088FF" strokeWidth="3" opacity="0.6" />
      <line x1="62" y1="54" x2="78" y2="54" strokeWidth="2" opacity="0.4" />
    </svg>
  ),
}

export default function OmnitrixWatch({ overlayRef }) {
  const navigate = useNavigate()
  const dialRef = useRef()
  const dragState = useRef({ active: false, startX: 0, startY: 0, startAngle: 0, currentAngle: 0 })
  const [dialAngle, setDialAngle] = useState(0)
  const [snappedIndex, setSnappedIndex] = useState(0)
  const [activating, setActivating] = useState(false)
  const [pressDown, setPressDown] = useState(false)

  // Which alien is currently selected (the one at top = angle 0)
  const selectedAlien = ALIENS[snappedIndex]

  function getAlienAtTop(angle) {
    // Normalize angle and find which alien is at top
    const normalized = ((angle % 360) + 360) % 360
    const idx = Math.round(normalized / SNAP_ANGLE) % ALIENS.length
    return idx
  }

  function snapAngle(angle) {
    return Math.round(angle / SNAP_ANGLE) * SNAP_ANGLE
  }

  // Drag start
  const onDragStart = useCallback((clientX, clientY) => {
    dragState.current = {
      active: true,
      startX: clientX,
      startY: clientY,
      startAngle: dialAngle,
      currentAngle: dialAngle,
    }
  }, [dialAngle])

  // Drag move
  const onDragMove = useCallback((clientX) => {
    if (!dragState.current.active) return
    const dx = clientX - dragState.current.startX
    const delta = dx * 0.4 // sensitivity
    const newAngle = dragState.current.startAngle + delta
    dragState.current.currentAngle = newAngle
    setDialAngle(newAngle)
    setSnappedIndex(getAlienAtTop(newAngle))
  }, [])

  // Drag end — snap
  const onDragEnd = useCallback(() => {
    if (!dragState.current.active) return
    dragState.current.active = false
    const snapped = snapAngle(dragState.current.currentAngle)
    setDialAngle(snapped)
    setSnappedIndex(getAlienAtTop(snapped))
  }, [])

  // Mouse events
  const onMouseDown = (e) => onDragStart(e.clientX, e.clientY)
  useEffect(() => {
    const onMouseMove = (e) => onDragMove(e.clientX)
    const onMouseUp = () => onDragEnd()
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [onDragMove, onDragEnd])

  // Touch events
  const onTouchStart = (e) => onDragStart(e.touches[0].clientX, e.touches[0].clientY)
  const onTouchMove = (e) => { e.preventDefault(); onDragMove(e.touches[0].clientX) }
  const onTouchEnd = () => onDragEnd()

  // Activate button
  function handleActivate() {
    if (activating) return
    setActivating(true)
    setPressDown(true)
    setTimeout(() => setPressDown(false), 200)
    setTimeout(() => {
      triggerTransform(overlayRef, () => navigate(selectedAlien.route))
      setTimeout(() => setActivating(false), 800)
    }, 300)
  }

  const alien = selectedAlien
  const color = alien.primaryColor
  const glowColor = alien.glowColor

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      perspective: '1200px',
      userSelect: 'none',
    }}>
      {/* Watch wrapper with perspective tilt */}
      <div style={{
        transform: 'rotateX(14deg)',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease',
      }}>
        {/* Watch body */}
        <div style={{
          position: 'relative',
          width: 300,
          height: 340,
          background: 'linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 50%, #111 100%)',
          borderRadius: 32,
          border: '3px solid #00FF41',
          boxShadow: `
            0 0 0 1px #003300,
            0 6px 20px rgba(0,0,0,0.8),
            0 20px 60px rgba(0,0,0,0.5),
            0 0 40px ${glowColor},
            inset 0 1px 0 rgba(255,255,255,0.05),
            inset 0 -2px 0 rgba(0,0,0,0.3)
          `,
        }}>
          {/* Side band connectors */}
          <div style={{
            position: 'absolute', top: 28, left: -16, width: 16, height: 24,
            background: 'linear-gradient(90deg, #111, #1a1a1a)',
            borderRadius: '4px 0 0 4px',
            border: '1px solid #00FF41', borderRight: 'none',
            boxShadow: '-4px 0 10px rgba(0,0,0,0.5)',
          }} />
          <div style={{
            position: 'absolute', top: 28, right: -16, width: 16, height: 24,
            background: 'linear-gradient(90deg, #1a1a1a, #111)',
            borderRadius: '0 4px 4px 0',
            border: '1px solid #00FF41', borderLeft: 'none',
            boxShadow: '4px 0 10px rgba(0,0,0,0.5)',
          }} />
          <div style={{
            position: 'absolute', bottom: 28, left: -16, width: 16, height: 24,
            background: 'linear-gradient(90deg, #111, #1a1a1a)',
            borderRadius: '4px 0 0 4px',
            border: '1px solid #00FF41', borderRight: 'none',
            boxShadow: '-4px 0 10px rgba(0,0,0,0.5)',
          }} />
          <div style={{
            position: 'absolute', bottom: 28, right: -16, width: 16, height: 24,
            background: 'linear-gradient(90deg, #1a1a1a, #111)',
            borderRadius: '0 4px 4px 0',
            border: '1px solid #00FF41', borderLeft: 'none',
            boxShadow: '4px 0 10px rgba(0,0,0,0.5)',
          }} />

          {/* Top label */}
          <div style={{
            textAlign: 'center',
            padding: '10px 0 6px',
            fontSize: '0.55rem',
            letterSpacing: '0.4em',
            color: 'rgba(0,255,65,0.4)',
            textTransform: 'uppercase',
          }}>
            Omnitrix
          </div>

          {/* Circular watch face */}
          <div style={{
            position: 'relative',
            margin: '0 auto',
            width: 256,
            height: 256,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 35%, #0d1a0d, #020802)',
            border: '4px solid #00FF41',
            boxShadow: `
              0 0 0 2px #003300,
              0 0 30px ${glowColor},
              inset 0 0 30px rgba(0,0,0,0.8),
              inset 0 0 60px rgba(0,255,65,0.03)
            `,
            overflow: 'hidden',
          }}>

            {/* Draggable outer ring */}
            <div
              ref={dialRef}
              onMouseDown={onMouseDown}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                cursor: 'grab',
                transform: `rotate(${-dialAngle}deg)`,
                transition: dragState.current.active ? 'none' : 'transform 0.35s cubic-bezier(0.34, 1.2, 0.64, 1)',
              }}
            >
              {/* Outer ring track */}
              <div style={{
                position: 'absolute',
                inset: 6,
                borderRadius: '50%',
                border: '2px solid rgba(0,255,65,0.25)',
                background: 'transparent',
              }} />
              <div style={{
                position: 'absolute',
                inset: 20,
                borderRadius: '50%',
                border: '1px solid rgba(0,255,65,0.12)',
                background: 'transparent',
              }} />

              {/* Alien segments on the ring */}
              {ALIENS.map((a, i) => {
                const angle = i * SNAP_ANGLE * (Math.PI / 180)
                const r = 96
                const cx = 128 + r * Math.sin(angle)
                const cy = 128 - r * Math.cos(angle)
                const isSelected = i === snappedIndex
                return (
                  <div
                    key={a.id}
                    style={{
                      position: 'absolute',
                      left: cx - 22,
                      top: cy - 22,
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: isSelected ? `rgba(${hexToRgb(a.primaryColor)}, 0.25)` : 'rgba(0,20,0,0.7)',
                      border: `2px solid ${isSelected ? a.primaryColor : 'rgba(0,255,65,0.3)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      boxShadow: isSelected ? `0 0 16px ${a.glowColor}` : 'none',
                      transition: 'all 0.3s',
                      transform: `rotate(${dialAngle}deg)`, // counter-rotate to keep icons upright
                    }}
                  >
                    {a.symbol}
                  </div>
                )
              })}

              {/* Tick marks */}
              {Array.from({ length: 32 }).map((_, i) => {
                const angle = (i / 32) * 360
                const rad = angle * (Math.PI / 180)
                const r1 = 118, r2 = i % 4 === 0 ? 110 : 114
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: 128 + r1 * Math.sin(rad) - 1,
                      top: 128 - r1 * Math.cos(rad) - 1,
                      width: 2,
                      height: 128 - r2,
                      background: i % 4 === 0 ? 'rgba(0,255,65,0.5)' : 'rgba(0,255,65,0.2)',
                      transformOrigin: '1px 0',
                      transform: `rotate(${angle}deg) translateY(-${128 - r1}px) rotate(180deg)`,
                      display: 'none',
                    }}
                  />
                )
              })}
            </div>

            {/* Selector indicator at top */}
            <div style={{
              position: 'absolute',
              top: 10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: `10px solid ${color}`,
              filter: `drop-shadow(0 0 4px ${color})`,
              zIndex: 10,
            }} />

            {/* Inner face — always visible, centered */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #050f05 0%, #020802 100%)',
              border: `2px solid ${color}`,
              boxShadow: `0 0 0 1px rgba(0,0,0,0.5), 0 0 20px ${glowColor}, inset 0 0 20px rgba(0,0,0,0.8)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.4s, box-shadow 0.4s',
              zIndex: 5,
              overflow: 'hidden',
            }}>
              {/* Alien silhouette */}
              <div style={{
                width: 54,
                height: 66,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.3s',
              }}>
                {SILHOUETTES[alien.id]}
              </div>
            </div>
          </div>

          {/* Alien name + section below face */}
          <div style={{
            textAlign: 'center',
            padding: '10px 0 6px',
          }}>
            <div style={{
              fontSize: '0.95rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: color,
              textShadow: `0 0 10px ${color}`,
              transition: 'color 0.4s, text-shadow 0.4s',
            }}>
              {alien.name}
            </div>
            <div style={{
              fontSize: '0.58rem',
              letterSpacing: '0.2em',
              color: 'rgba(0,255,65,0.4)',
              textTransform: 'uppercase',
              marginTop: 2,
            }}>
              {alien.section}
            </div>
          </div>

          {/* Activate button */}
          <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 14 }}>
            <button
              onClick={handleActivate}
              style={{
                width: 70,
                height: 28,
                background: pressDown
                  ? `rgba(${hexToRgb(color)}, 0.5)`
                  : `rgba(${hexToRgb(color)}, 0.12)`,
                border: `2px solid ${color}`,
                borderRadius: 6,
                color: color,
                fontFamily: 'Courier New, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.15s',
                boxShadow: `0 0 12px ${glowColor}, inset 0 0 8px rgba(0,0,0,0.3)`,
                transform: pressDown ? 'translateY(2px)' : 'none',
              }}
            >
              GO
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div style={{
        marginTop: 28,
        fontSize: '0.62rem',
        letterSpacing: '0.25em',
        color: 'rgba(0,255,65,0.3)',
        textTransform: 'uppercase',
        animation: 'flicker 6s infinite',
      }}>
        Swipe dial · press go
      </div>
    </div>
  )
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 255, 65'
}
