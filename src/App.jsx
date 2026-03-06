import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useRef } from 'react'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import SkillsPage from './pages/SkillsPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  const overlayRef = useRef(null)

  return (
    <BrowserRouter>
      <div className="circuit-bg" />
      <div className="scanlines" />
      <div className="transform-overlay" ref={overlayRef} id="transform-overlay" />
      <Routes>
        <Route path="/" element={<Home overlayRef={overlayRef} />} />
        <Route path="/about" element={<AboutPage overlayRef={overlayRef} />} />
        <Route path="/projects" element={<ProjectsPage overlayRef={overlayRef} />} />
        <Route path="/skills" element={<SkillsPage overlayRef={overlayRef} />} />
        <Route path="/contact" element={<ContactPage overlayRef={overlayRef} />} />
      </Routes>
    </BrowserRouter>
  )
}
