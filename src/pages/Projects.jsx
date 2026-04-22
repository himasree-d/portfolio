import { useEffect, useRef, useState, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Academa',
    tagline: 'A full university, wired into one platform',
    description:
      'Developed a full-stack academic platform with dedicated dashboards for students, faculty, and administrators. Implemented course management, assignment tracking, announcements, and real-time messaging. Integrated backend APIs with Node.js and designed relational database schema using MySQL, with JWT-based authentication in progress.',
    tech: ['React', 'Node.js', 'MySQL', 'JWT Auth'],
    github: 'https://github.com/himasree-d/uni_portal',
    live: null,
    year: '2026',
    type: 'Full Stack',
    number: '01',
    accentDir: 'left',
  },
  {
    id: 2,
    title: 'Task Manager',
    tagline: 'Persistence without a database — just intent',
    description:
      'Developed a frontend-only task management application using HTML, CSS, and JavaScript. Implemented task creation, editing, deletion, and status tracking with a clean and responsive interface. Integrated browser local storage to persist tasks across sessions, ensuring data remains available even after refreshing the page.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/himasree-d/Task-Management-Web-Application',
    live: 'https://himasree-d.github.io/Task-Management-Web-Application/',
    year: '2025',
    type: 'Frontend',
    number: '02',
    accentDir: 'right',
  },
  {
    id: 3,
    title: 'Cell Interaction Prediction',
    tagline: 'Teaching machines to read biological language',
    description:
      'Developed a deep learning pipeline to predict cell-cell interactions from gene expression data using a two-stage ANN → CNN architecture. Extracted compact feature representations and applied multiple CNN models (LeNet, AlexNet, ResNet) for classification. Evaluated using accuracy, precision, recall, and F1-score on real biological datasets.',
    tech: ['Python', 'PyTorch', 'NumPy', 'Pandas', 'Deep Learning'],
    github: 'https://github.com/himasree-d/Deep-Neural-Networks-cell-to-cell-interaction-',
    live: null,
    year: '2026',
    type: 'ML / Deep Learning',
    number: '03',
    accentDir: 'left',
  },
  {
    id: 4,
    title: 'Predictive Maintenance',
    tagline: 'Anticipating engine failure before it speaks',
    description:
      'Developed a hybrid predictive maintenance system using NASAs CMAPSS dataset to model aircraft engine degradation. Implemented K-Means clustering to define health stages, followed by Random Forest and XGBoost for stage classification, and regression models to predict remaining useful life.',
    tech: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'NumPy'],
    github: 'https://github.com/himasree-d/Predictive-Maintenance-System',
    live: null,
    year: '2025',
    type: 'ML / Data Science',
    number: '04',
    accentDir: 'right',
  },
  {
    id: 5,
    title: 'Subtitle Generator',
    tagline: 'Speech transcribed across 80 languages, silently',
    description:
      'Developed an end-to-end NLP pipeline to generate synchronized subtitles from audio and video files. Implemented audio preprocessing with noise reduction, silence removal, and chunking, followed by multilingual transcription using the Whisper model. Generated accurate SRT files with timestamp alignment.',
    tech: ['Python', 'Whisper', 'Librosa', 'FFmpeg', 'NumPy'],
    github: 'https://github.com/himasree-d/NLP-Project',
    live: null,
    year: '2025',
    type: 'NLP / ML',
    number: '05',
    accentDir: 'left',
  },
]

/* ─── Floating ambient orb ─────────────────────────────── */
function AmbientOrb({ style }) {
  return <div className="ambient-orb" style={style} />
}

/* ─── Modal / Spotlight ─────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <span />
          <span />
        </button>

        <div className="modal-noise" />

        <div className="modal-meta-row">
          <span className="modal-number">{project.number}</span>
          <span className="modal-type-badge">{project.type}</span>
          <span className="modal-year">{project.year}</span>
        </div>

        <h2 className="modal-title">{project.title}</h2>
        <p className="modal-tagline">{project.tagline}</p>

        <div className="modal-divider" />

        <p className="modal-desc">{project.description}</p>

        <div className="modal-tech">
          {project.tech.map((t) => (
            <span className="modal-tech-tag" key={t}>{t}</span>
          ))}
        </div>

        <div className="modal-links">
          <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary">
            <GithubIcon /> View on GitHub
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" className="btn-ghost">
              Live Demo ↗
            </a>
          )}
        </div>

        <div className="modal-corner modal-corner-tl" />
        <div className="modal-corner modal-corner-br" />
      </div>
    </div>
  )
}

/* ─── SVG icons ─────────────────────────────────────────── */
function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

/* ─── Full-width alternating project section ────────────── */
function ProjectSection({ project, index }) {
  const sectionRef = useRef(null)
  const [ref, visible] = useScrollReveal()
  const [modal, setModal] = useState(false)
  const [hovered, setHovered] = useState(false)
  const isEven = index % 2 === 0

  /* subtle parallax on scroll */
  const glowRef = useRef(null)
  useEffect(() => {
    const el = sectionRef.current
    const glow = glowRef.current
    if (!el || !glow) return
    const handler = () => {
      const rect = el.getBoundingClientRect()
      const pct = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      glow.style.transform = `translateY(${(pct - 0.5) * -40}px)`
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {modal && <ProjectModal project={project} onClose={() => setModal(false)} />}

      <article
        ref={sectionRef}
        className={`proj-section ${isEven ? 'ps-left' : 'ps-right'} ${visible ? 'ps-visible' : ''}`}
      >
        {/* ambient glow that parallaxes */}
        <div ref={glowRef} className={`ps-glow ps-glow-${isEven ? 'l' : 'r'}`} />

        <div
          ref={ref}
          className={`ps-inner reveal-block ${visible ? 'revealed' : ''}`}
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          {/* ── Visual panel (left or right) ── */}
          <div
            className={`ps-visual ${hovered ? 'ps-visual-hovered' : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => setModal(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setModal(true)}
            aria-label={`Open ${project.title} details`}
          >
            <div className="ps-visual-noise" />
            <div className="ps-number-bg">{project.number}</div>

            <div className="ps-visual-content">
              <span className="ps-type-tag">{project.type}</span>
              <div className="ps-title-large">{project.title}</div>
              <div className="ps-click-hint">Click to explore →</div>
            </div>

            {/* corner accents */}
            <div className="ps-corner ps-corner-tl" />
            <div className="ps-corner ps-corner-br" />
            {/* scan line */}
            <div className={`ps-scan ${hovered ? 'ps-scan-active' : ''}`} />
          </div>

          {/* ── Text panel ── */}
          <div className="ps-text">
            <div className="ps-text-meta">
              <span className="ps-meta-num">{project.number}</span>
              <span className="ps-meta-sep" />
              <span className="ps-meta-year">{project.year}</span>
            </div>

            <h2 className="ps-title">{project.title}</h2>
            <p className="ps-tagline">{project.tagline}</p>
            <p className="ps-desc">{project.description}</p>

            <div className="ps-tech-row">
              {project.tech.map((t) => (
                <span className="ps-tech-pill" key={t}>{t}</span>
              ))}
            </div>

            <div className="ps-actions">
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-primary">
                <GithubIcon /> GitHub
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer" className="btn-ghost">
                  Live ↗
                </a>
              )}
              <button className="ps-spotlight-btn" onClick={() => setModal(true)}>
                Spotlight ⊕
              </button>
            </div>
          </div>
        </div>

        {/* horizontal rule between sections */}
        <div className="ps-rule" />
      </article>
    </>
  )
}

/* ─── Horizontal scroll strip ──────────────────────────── */
function HScrollStrip() {
  const trackRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = (e) => {
    setDragging(true)
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
  }
  const onMouseMove = useCallback((e) => {
    if (!dragging) return
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }, [dragging])
  const stopDrag = () => setDragging(false)

  return (
    <section className="hscroll-section">
      <div className="container">
        <p className="section-label">Quick View</p>
        <h2 className="section-title">All Projects<br /><em>at a glance</em></h2>
      </div>

      <div
        className={`hscroll-track ${dragging ? 'dragging' : ''}`}
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        <div className="hscroll-hint">← drag to explore →</div>
        {projects.map((p, i) => (
          <div className="hscroll-card" key={p.id} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="hc-noise" />
            <span className="hc-num">{p.number}</span>
            <h3 className="hc-title">{p.title}</h3>
            <p className="hc-tagline">{p.tagline}</p>
            <div className="hc-tags">
              {p.tech.slice(0, 3).map(t => <span key={t}>{t}</span>)}
            </div>
            <span className="hc-type">{p.type}</span>
            <div className="hc-corner-tl" />
            <div className="hc-corner-br" />
          </div>
        ))}
        <div className="hscroll-end-card">
          <a href="https://github.com/himasree-d" target="_blank" rel="noreferrer">
            <span className="hec-icon">→</span>
            <span>All on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function Projects() {
  return (
    <div className="projects-page">

      {/* ── ambient background orbs ── */}
      <AmbientOrb style={{ top: '8%', right: '5%', width: 600, height: 600, animationDelay: '0s' }} />
      <AmbientOrb style={{ top: '40%', left: '-10%', width: 500, height: 500, animationDelay: '-4s' }} />
      <AmbientOrb style={{ top: '75%', right: '15%', width: 400, height: 400, animationDelay: '-8s' }} />

      {/* ── HERO ── */}
      <header className="proj-hero">
        <div className="proj-hero-texture" />
        <div className="proj-hero-inner">
          <div className="proj-hero-left">
            <p className="section-label" style={{ animation: 'fadeUp 0.5s ease 0.1s both' }}>
              Selected Work
            </p>
            <h1 className="proj-hero-title" style={{ animation: 'fadeUp 0.7s ease 0.25s both' }}>
              Things I've<br />
              <em>Built &amp; Broken</em>
            </h1>
            <p className="proj-hero-sub" style={{ animation: 'fadeUp 0.7s ease 0.45s both' }}>
              Each project is a chapter. Some are clean. Some are
              experiments. All of them taught me something.
            </p>
          </div>

          <div className="proj-hero-right" style={{ animation: 'fadeIn 1s ease 0.5s both' }}>
            <div className="proj-hero-counter">
              <span className="phc-num">{String(projects.length).padStart(2, '0')}</span>
              <span className="phc-label">projects</span>
            </div>
            <div className="proj-hero-stats">
              {[
                ['Stack', 'Full Stack + ML'],
                ['Period', '2023 – present'],
                ['Status', 'Active'],
              ].map(([l, v]) => (
                <div className="phs-row" key={l}>
                  <span className="phs-label">{l}</span>
                  <span className="phs-value">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* marquee - same as home */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {['React', 'Node.js', 'Python', 'PyTorch', 'Deep Learning', 'NLP', 'MySQL', 'Data Science', 'Full Stack', 'ML Pipeline', 'REST APIs', 'Whisper', ...['React', 'Node.js', 'Python', 'PyTorch', 'Deep Learning', 'NLP', 'MySQL', 'Data Science', 'Full Stack', 'ML Pipeline', 'REST APIs', 'Whisper']].map((item, i) => (
              <span key={i} className="marquee-item">
                <span className="marquee-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      

      {/* ── ALTERNATING PROJECT SECTIONS ── */}
      <section className="all-projects-section">
        <div className="aps-label-row">
          <p className="section-label">All Work</p>
          <div className="aps-line" />
        </div>
        {projects.map((project, i) => (
          <ProjectSection key={project.id} project={project} index={i} />
        ))}
      </section>

      {/* ── HORIZONTAL SCROLL ── */}
      <HScrollStrip />

      {/* ── CTA ── */}
      <section className="projects-cta">
        <div className="cta-grain" />
        <div className="cta-orb" />
        <div className="cta-inner reveal-block"
          ref={(el) => {
            if (el) {
              const obs = new IntersectionObserver(([e]) => {
                if (e.isIntersecting) { el.classList.add('revealed'); obs.unobserve(el) }
              }, { threshold: 0.2 })
              obs.observe(el)
            }
          }}
        >
          {/* LEFT — existing copy */}
          <div className="cta-left">
            <p className="section-label">More Work</p>
            <h2 className="section-title">See the full<br /><em>picture</em></h2>
            <p className="cta-desc">
              All my projects, experiments, and contributions live on GitHub.
              Feel free to explore, star, or fork anything you find useful.
            </p>
            <a href="https://github.com/himasree-d" target="_blank" rel="noreferrer" className="btn-primary">
              All Repositories →
            </a>
          </div>
 
          {/* RIGHT — typographic stat block */}
          <div className="cta-right">
            <div className="cta-stat">
              <span className="cta-stat-num" data-val="05">05</span>
              <span className="cta-stat-label">Projects shipped</span>
              <span className="cta-stat-accent">& counting</span>
            </div>
            <div className="cta-stat">
              <span className="cta-stat-num" data-val="03+">03+</span>
              <span className="cta-stat-label">Domains explored</span>
              <span className="cta-stat-accent">Full Stack · ML · NLP</span>
            </div>
            <div className="cta-stat">
              <span className="cta-stat-num" data-val="2+">2+</span>
              <span className="cta-stat-label">Years building</span>
              <span className="cta-stat-accent">2023 – present</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
