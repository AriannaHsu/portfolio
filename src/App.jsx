import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import CaseStudy from './pages/CaseStudy'
import { BasketProvider } from './context/BasketContext'

export default function App() {
  return (
    <BasketProvider>
      <Nav />
      <div style={{ flex: 1, width: '100%', maxWidth: '1126px', margin: '0 auto', boxSizing: 'border-box' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
        </Routes>
      </div>
      <Footer />
    </BasketProvider>
  )
}
