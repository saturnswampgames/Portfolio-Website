import OmnitrixWatch from '../components/OmnitrixWatch'

export default function Home({ overlayRef }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
    }}>
      <OmnitrixWatch overlayRef={overlayRef} />
    </div>
  )
}
