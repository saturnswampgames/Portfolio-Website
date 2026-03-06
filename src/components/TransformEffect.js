import gsap from 'gsap'

export function triggerTransform(overlayRef, onNavigate) {
  const overlay = overlayRef?.current
  if (!overlay) {
    onNavigate()
    return
  }

  const tl = gsap.timeline()
  tl.set(overlay, { opacity: 0 })
    .to(overlay, { opacity: 1, duration: 0.25, ease: 'power2.in' })
    .call(onNavigate)
    .to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.out', delay: 0.05 })
}

export function triggerTransformBack(overlayRef, onNavigate) {
  const overlay = overlayRef?.current
  if (!overlay) {
    onNavigate()
    return
  }

  const tl = gsap.timeline()
  tl.set(overlay, { opacity: 0 })
    .to(overlay, { opacity: 0.7, duration: 0.2, ease: 'power2.in' })
    .call(onNavigate)
    .to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.out', delay: 0.05 })
}
