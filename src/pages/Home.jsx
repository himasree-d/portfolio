import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './Home.css'

const skills = [
  { name: 'Python', tag: 'lang' },
  { name: 'JavaScript', tag: 'lang' },
  { name: 'React', tag: 'framework' },
  { name: 'Node.js', tag: 'runtime' },
  { name: 'Spring Boot', tag: 'framework' },
  { name: 'Java', tag: 'lang' },
  { name: 'FastAPI', tag: 'framework' },
  { name: 'SQL', tag: 'data' },
  { name: 'Machine Learning', tag: 'ai' },
  { name: 'Clustering', tag: 'ai' },
  { name: 'Data Structures', tag: 'cs' },
  { name: 'Git', tag: 'tool' },
  { name: 'HTML/CSS', tag: 'web' },
  { name: 'REST APIs', tag: 'web' },
  { name: 'C/C++', tag: 'lang' },
  { name: 'Linux', tag: 'tool' },
]

const researchInterests = [
  {
    num: '01',
    title: 'Full-Stack Development',
    desc: 'I enjoy building complete web experiences from clean, interactive frontends to efficient backend systems that actually scale.',
    glyph: '⌬',
  },
  {
    num: '02',
    title: 'Artificial Intelligence',
    desc: 'I’m curious about how machines learn and think, especially in areas like NLP and real world AI applications that go beyond theory.',
    glyph: '⌘',
  },
  {
    num: '03',
    title: 'Data & ML',
    desc: 'I like working with data to uncover patterns and build models that turn raw information into something useful and meaningful.',
    glyph: '◎',
  },
]

const roles = ['AI Student', 'Web Developer', 'ML Enthusiast', 'Problem Solver']

function RevealSection({ children, className = '', delay = 0 }) {
  const [ref, visible] = useScrollReveal()
  return (
    <div ref={ref} className={`reveal-block ${visible ? 'revealed' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function TypeWriter() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIdx]
    let timeout
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 45)
    } else {
      setDeleting(false)
      setRoleIdx((roleIdx + 1) % roles.length)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, roleIdx])

  return <span className="typewriter">{text}<span className="tw-cursor">|</span></span>
}

function MagneticChip({ skill }) {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.28
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.28
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }

  return (
    <div ref={ref} className="skill-chip" data-tag={skill.tag} onMouseMove={onMove} onMouseLeave={onLeave}>
      <span className="chip-tag">{skill.tag}</span>
      {skill.name}
    </div>
  )
}

function MarqueeStrip() {
  const items = ['React', 'Node.js', 'Python', 'SQL', 'REST APIs', 'Machine Learning', 'NLP', 'Data Analysis', 'Algorithms', 'Git', 'Linux', 'C']
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const heroNameRef = useRef(null)

  useEffect(() => {
    const el = heroNameRef.current
    if (!el) return
    const text = el.dataset.name
    el.innerHTML = text.split('').map((l, i) =>
      l === ' '
        ? '<span style="display:inline-block">&nbsp;</span>'
        : `<span class="hero-letter" style="animation-delay:${i * 0.055 + 0.35}s">${l}</span>`
    ).join('')
  }, [])

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-texture" />

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-eyebrow" style={{ animation: 'fadeUp 0.5s ease 0.1s both' }}>
              <span className="eyebrow-dot" />
              <span className="eyebrow-text">Open to opportunities</span>
            </div>

            <p className="hero-greeting" style={{ animation: 'fadeUp 0.5s ease 0.25s both' }}>
              Hi, I'm
            </p>

            <h1
              ref={heroNameRef}
              data-name="Himasree       Dintakurthy"
              className="hero-name"
              style={{ animation: 'none' }}
            />

            <div className="hero-tagline-wrap" style={{ animation: 'fadeUp 0.6s ease 0.6s both' }}>
              <span className="tagline-dash">—</span>
              <span className="hero-role"><TypeWriter /></span>
            </div>

            <p className="hero-desc" style={{ animation: 'fadeUp 0.6s ease 0.75s both' }}>
              I build things for the web and explore the boundaries of what
              technology can solve. Passionate about turning complex problems
              into elegant, human-centred solutions.
            </p>

            <div className="hero-cta-row" style={{ animation: 'fadeUp 0.6s ease 0.9s both' }}>
              <a href="https://github.com/himasree-d" target="_blank" rel="noreferrer" className="btn-primary">
                <span>GitHub Profile</span>
                <div className="btn-shimmer" />
              </a>
              <a
                href="https://www.linkedin.com/in/himasree-d/"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                LinkedIn
              </a>
              <a
                href="overlay_resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                Resume ↓
              </a>
              <a href="mailto:himasree2507@gmail.com" className="btn-ghost">Get in Touch</a>
            </div>

            <div className="hero-stats" style={{ animation: 'fadeUp 0.6s ease 1.05s both' }}>
              {[['5+', 'Projects Built'], ['3+', 'Years Coding'], ['∞', 'Curiosity']].map(([n, l]) => (
                <div className="stat-item" key={l}>
                  <span className="stat-num">{n}</span>
                  <span className="stat-label">{l}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right" style={{ animation: 'fadeIn 1s ease 0.4s both' }}>
            <div className="profile-frame">
              <div className="profile-inner">
              <img
              src="photo_1.jpeg"
              alt="Himasree"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              </div>
              <div className="frame-accent fa-tl" />
              <div className="frame-accent fa-br" />
              <div className="profile-scan-line" />
              <div className="floating-tag ft-1">
                <span className="ft-dot" />AI Student
              </div>
              <div className="floating-tag ft-2">
                <span className="ft-dot" />Hyderabad
              </div>
            </div>
          </div>
        </div>

        <MarqueeStrip />
      </section>

      {/* ABOUT */}
      <section className="about-section">
        <div className="container">
          <RevealSection>
            <p className="section-label">About Me</p>
            <h2 className="section-title">A little about<br /><em>who I am</em></h2>
          </RevealSection>
          <div className="about-grid">
            <RevealSection delay={100}>
              <div className="about-text">
                <p>
                I’m an AI student who enjoys building things that live on the web.
                </p>
                <p>
                Lately, I’ve been focusing on full-stack development — creating applications that are not just functional, but smooth, interactive, and enjoyable to use. I like working across the stack, turning ideas into real products with clean design and solid logic.
                </p>
                <p>
                I still explore machine learning, especially where it can enhance real user experiences, but what excites me most is bringing everything together into something people can actually use.
                </p>
                <p>
                When I’m not building, I’m usually experimenting with new tech, refining my projects, or solving problems just for the challenge of it.
                </p>
                <div className="about-pills">
                  {['Full-Stack Builder', 'AI + ML', 'User-Focused', 'Always Building'].map(t => (
                    <span className="about-pill" key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </RevealSection>
            <RevealSection delay={180}>
              <div className="about-card">
                <div className="about-card-header">
                  <span className="about-card-title">Personal Details</span>
                  <span className="about-card-status"><span />Active</span>
                </div>
                {[
                  ['Name', 'Himasree Dintakurthy'],
                  ['Phone', '+91 86392 89187'],
                  ['Personal Email', 'himasree2507@gmail.com'],
                  ['College Email', 'se23uari032@mahindrauniversity.edu.in'],
                  ['GitHub', 'github.com/himasree-d', true],
                  ['LinkedIn', 'linkedin.com/in/himasree-d/', true],
                  ['Location', 'Hyderabad, India'],
                ].map(([label, value, isLink]) => (
                  <div className="detail-row" key={label}>
                    <span className="detail-label">{label}</span>
                    {isLink
                      ? <a href={`https://${value}`} target="_blank" rel="noreferrer" className="detail-link">{value}</a>
                      : <span className="detail-value">{value}</span>
                    }
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* INTERESTS */}
      <section className="interests-section">
        <div className="container">
          <RevealSection>
            <p className="section-label">What Drives Me</p>
            <h2 className="section-title">Research<br /><em>Interests</em></h2>
          </RevealSection>
          <div className="interests-grid">
            {researchInterests.map((item, i) => (
              <RevealSection key={i} delay={i * 110}>
                <div className="interest-card">
                  <div className="interest-card-top">
                    <span className="interest-num">{item.num}</span>
                    <span className="interest-glyph">{item.glyph}</span>
                  </div>
                  <h3 className="interest-title">{item.title}</h3>
                  <p className="interest-desc">{item.desc}</p>
                  <div className="interest-arrow">→</div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section">
        <div className="container">
          <RevealSection>
            <p className="section-label">Technical Proficiency</p>
            <h2 className="section-title">Skills &amp;<br /><em>Technologies</em></h2>
          </RevealSection>
          <div className="skills-grid">
            {skills.map((skill, i) => (
              <RevealSection key={skill.name} delay={i * 45}>
                <MagneticChip skill={skill} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}