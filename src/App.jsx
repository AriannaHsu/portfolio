import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import CaseStudy from './pages/CaseStudy'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
    </div>
  )
}
