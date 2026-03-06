import OmnitrixScene from '../components/OmnitrixScene'

export default function Home({ overlayRef }) {
  return (
    <>
      <div className="home-title">
        <h1 className="glow-text">Omnitrix</h1>
      </div>

      <OmnitrixScene overlayRef={overlayRef} />

      <p className="home-instruction">
        Hover &amp; click an alien to transform
      </p>
    </>
  )
}
