import { useNavigate } from 'react-router-dom'
import { triggerTransformBack } from './TransformEffect'

export default function NavBack({ overlayRef }) {
  const navigate = useNavigate()

  function handleBack() {
    triggerTransformBack(overlayRef, () => navigate('/'))
  }

  return (
    <button className="nav-back-btn" onClick={handleBack}>
      &#8617; Transform Back
    </button>
  )
}
