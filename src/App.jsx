import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import AudioToggle from './components/AudioToggle'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import CaseStudy from './pages/CaseStudy'

function GrainOverlay() {
  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.035,
        mixBlendMode: 'multiply',
        pointerEvents: 'none',
        zIndex: 9998,
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="grain-filter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter)" />
    </svg>
  )
}

export default function App() {
  return (
    <>
      <GrainOverlay />
      <Nav />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
        </Routes>
      </div>
      <Footer />
      <AudioToggle />
    </>
  )
}
