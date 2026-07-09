import { useEffect, useRef, useState, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'Chirp',
    tagline: 'Real-time, calm, and refreshingly un-addictive',
    description:
      'A full-stack social platform built with MERN and Socket.io. Chronological feed, no engagement-bait mechanics. Real-time notifications via private Socket.io rooms, JWT auth, Cloudinary image pipeline, and a full light/dark design system on CSS custom properties.',
    tech: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
    github: 'https://github.com/himasree-d/chirp_social_media_app',
    live: 'https://chirp-frontend-six.vercel.app',
    year: '2026',
    type: 'Full Stack',
    number: '01',
    accentDir: 'left',
  },
  {
    id: 2,
    title: 'CV Inference Dashboard',
    tagline: 'Upload. Infer. Watch it think.',
    description:
      'A production-style computer vision app running YOLOv8 detection and segmentation. FastAPI backend with Celery + Redis for async job queuing, Dockerized end-to-end, with a React dashboard polling job status and rendering annotated results with per-frame metadata.',
    tech: ['FastAPI', 'Celery', 'Redis', 'YOLOv8', 'React', 'Docker'],
    github: 'https://github.com/himasree-d/cv-dashboard',
    live: null,
    year: '2026',
    type: 'CV / Full Stack',
    number: '02',
    accentDir: 'right',
  },
  {
    id: 3,
    title: 'Zest',
    tagline: 'Personal finance, taken seriously',
    description:
      'A full-stack personal finance tracker with JWT auth and refresh token rotation, Groq-powered AI spending insights, and Recharts visualizations. Rebuilt data layer from Prisma/PostgreSQL to Mongoose, with a warm stone-and-teal design system and INR locale support. Underwent a full senior-level code audit.',
    tech: ['React', 'TypeScript', 'Express', 'MongoDB', 'Groq API', 'Zustand'],
    github: 'https://github.com/himasree-d/zest_finance_tracker',
    live: 'https://zest-finance-tracker.vercel.app',
    year: '2026',
    type: 'Full Stack',
    number: '03',
    accentDir: 'left',
  },
  {
    id: 4,
    title: 'Code Review Companion',
    tagline: 'Four AI reviewers, one pipeline, zero repeated mistakes',
    description:
      'An agentic code review tool running four parallel Groq API calls — bugs, security, style, suggestions — plus a fifth summary pass. Persists submissions to MongoDB and flags recurring issue patterns across your review history, no login required.',
    tech: ['React', 'Node.js', 'Express', 'Groq API', 'MongoDB'],
    github: 'https://github.com/himasree-d/CodeReviewCompanionBot',
    live: 'https://code-review-companion-bot.vercel.app/',
    year: '2026',
    type: 'AI / Agentic',
    number: '04',
    accentDir: 'right',
  },
  {
    id: 5,
    title: 'MeshNet',
    tagline: 'A network that needs no network',
    description:
      'A serverless, offline-first emergency relay app — every phone becomes a mesh node. QR-based visual relay works in any browser; the Android build adds true P2P via Nearby Connections. Multi-hop propagation, expiring messages, communal QR Drop point. 1st place, Hackathon 418.',
    tech: ['React 19', 'Vite', 'Tailwind', 'Capacitor', 'WebCrypto'],
    github: 'https://github.com/himasree-d/MeshNet',
    live: 'https://himasree-d.github.io/MeshNet',
    year: '2025',
    type: 'Systems / PWA',
    number: '05',
    accentDir: 'left',
  },
  {
    id: 6,
    title: 'Privacy Policy Grader',
    tagline: "Reads the fine print so you don't have to",
    description:
      'Scores any privacy policy 0–100 across 5 weighted dimensions. Custom NLP pipeline (5 readability formulas from scratch, 150+ term jargon dictionary, 15+ dark-pattern detectors) feeds a Groq LLM, cross-checked by a difflib hallucination guard. 23 passing tests.',
    tech: ['Flask', 'Groq', 'NLTK', 'SQLAlchemy', 'BeautifulSoup4'],
    github: 'https://github.com/himasree-d/PrivacyPolicyGrader',
    live: 'https://privacy-policy-grader.onrender.com/',
    year: '2026',
    type: 'AI / NLP',
    number: '06',
    accentDir: 'right',
  },
]

const allProjects = [
  ...projects,
  {
    id: 7,
    title: 'Cell Interaction Prediction',
    tagline: 'Teaching machines to read biological language',
    description:
      'A deep learning pipeline predicting cell-cell interactions from gene expression data using a two-stage ANN → CNN architecture, evaluating LeNet, AlexNet, and ResNet variants on real biological datasets.',
    tech: ['Python', 'PyTorch', 'NumPy', 'Pandas'],
    github: 'https://github.com/himasree-d/Deep-Neural-Networks-cell-to-cell-interaction-',
    live: null,
    year: '2026',
    number: '07',
    type: 'ML / Deep Learning',
  },
  {
    id: 8,
    title: 'Academa',
    tagline: 'A full university, wired into one platform',
    description:
      'A full-stack academic platform with dedicated dashboards for students, faculty, and administrators — course management, assignment tracking, announcements, and real-time messaging on a MySQL relational schema.',
    tech: ['React', 'Node.js', 'MySQL', 'JWT Auth'],
    github: 'https://github.com/himasree-d/uni_portal',
    live: null,
    year: '2026',
    number: '08',
    type: 'Full Stack',
  },
  {
    id: 9,
    title: 'Predictive Maintenance',
    tagline: 'Anticipating engine failure before it speaks',
    description:
      'A hybrid predictive maintenance system on NASA\u2019s CMAPSS dataset — K-Means clustering for health stages, then Random Forest and XGBoost for stage classification, plus regression for remaining useful life.',
    tech: ['Python', 'Scikit-learn', 'XGBoost'],
    github: 'https://github.com/himasree-d/Predictive-Maintenance-System',
    live: null,
    year: '2025',
    number: '09',
    type: 'ML / Data Science',
  },
  {
    id: 10,
    title: 'Minesweeper — Enhanced Edition',
    tagline: 'A classic, rebuilt with themes, hints, and chords',
    description:
      'A full-featured Minesweeper built in Java Swing — three difficulty levels, safe-first-click, saved best times, three themes, synthesized sound effects, a logical hint system, and save/load support.',
    tech: ['Java', 'Swing'],
    github: 'https://github.com/himasree-d/minesweeper',
    live: null,
    year: '2025',
    number: '10',
    type: 'Desktop / Java',
  },
  {
    id: 11,
    title: 'Subtitle Generator',
    tagline: 'Speech transcribed across 80 languages, silently',
    description:
      'An end-to-end NLP pipeline generating synchronized subtitles from audio and video — noise reduction and chunking, multilingual transcription via Whisper, and timestamp-aligned SRT output.',
    tech: ['Python', 'Whisper', 'Librosa', 'FFmpeg'],
    github: 'https://github.com/himasree-d/NLP-Project',
    live: null,
    year: '2025',
    number: '11',
    type: 'NLP / ML',
  },
  {
    id: 12,
    title: 'Task Manager',
    tagline: 'Persistence without a database — just intent',
    description:
      'A frontend-only task management app with creation, editing, deletion, and status tracking, persisting tasks across sessions via browser local storage.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/himasree-d/Task-Management-Web-Application',
    live: 'https://himasree-d.github.io/Task-Management-Web-Application/',
    year: '2025',
    number: '12',
    type: 'Frontend',
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
          <span className="modal-year">{project.year || '—'}</span>
        </div>

        <h2 className="modal-title">{project.title}</h2>
        <p className="modal-tagline">{project.tagline}</p>

        <div className="modal-divider" />

        <p className="modal-desc">{project.description || project.tagline}</p>

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
  const [spotlight, setSpotlight] = useState(null)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const movedRef = useRef(false)

  const onMouseDown = (e) => {
    setDragging(true)
    movedRef.current = false
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
  }
  const onMouseMove = useCallback((e) => {
    if (!dragging) return
    movedRef.current = true
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }, [dragging])
  const stopDrag = () => setDragging(false)

  const openSpotlight = (p) => {
    if (movedRef.current) return // was a drag, not a click
    setSpotlight(p)
  }

  return (
    <section className="hscroll-section">
      {spotlight && (
        <ProjectModal project={spotlight} onClose={() => setSpotlight(null)} />
      )}

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
        {allProjects.map((p, i) => (
          <div
            className="hscroll-card"
            key={p.id}
            style={{ animationDelay: `${i * 0.1}s` }}
            onClick={() => openSpotlight(p)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openSpotlight(p)}
          >
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
  const yearsBuilding = new Date().getFullYear() - 2023
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
            <span className="phc-num">{String(allProjects.length).padStart(2, '0')}+</span>
            <span className="phc-label">projects</span>
          </div>
            <div className="proj-hero-stats">
              {[
                ['Stack', 'Full Stack + AI/ML'],
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
            <span className="cta-stat-num" data-val={`${allProjects.length}`}>{allProjects.length}+</span>
            <span className="cta-stat-label">Projects shipped</span>
            <span className="cta-stat-accent">& counting</span>
          </div>
            <div className="cta-stat">
              <span className="cta-stat-num" data-val="04+">04+</span>
              <span className="cta-stat-label">Domains explored</span>
              <span className="cta-stat-accent">Full Stack · AI/ML · CV · Systems</span>
            </div>
            <div className="cta-stat">
              <span className="cta-stat-num" data-val={`${yearsBuilding}+`}>{yearsBuilding}+</span>
              <span className="cta-stat-label">Years building</span>
              <span className="cta-stat-accent">2023 – present</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}