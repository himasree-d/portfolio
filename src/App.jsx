import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Projects from './pages/Projects'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="app">
        <Cursor />
        <Navbar />
        <main className="main-content">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </PageTransition>
        </main>
        <footer className="footer">
          <p>Crafted with intention — <span className="footer-name">Himasree Dintakurthy</span></p>
        </footer>
      </div>
    </HashRouter>
  )
}