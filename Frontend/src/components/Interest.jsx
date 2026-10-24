import React, { useEffect, useRef, useState } from 'react'
import interestImage from '../assets/interest_image.png'
import './Interest.css'

export default function Interest({ onBack, onNavigateSection }) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isSoundOn, setIsSoundOn] = useState(false)
  const audioContextRef = useRef(null)

  // Subtle mouse parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth - 0.5) * 14
    const y = (e.clientY / innerHeight - 0.5) * 10
    setMousePos({ x, y })
  }

  // Interactive Web Audio ambient sound toggle
  const toggleSound = () => {
    if (!isSoundOn) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (AudioCtx) {
          const ctx = new AudioCtx()
          audioContextRef.current = ctx

          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sine'
          osc.frequency.setValueAtTime(220, ctx.currentTime) // A3 drone
          gain.gain.setValueAtTime(0.018, ctx.currentTime)

          const filter = ctx.createBiquadFilter()
          filter.type = 'lowpass'
          filter.frequency.setValueAtTime(450, ctx.currentTime)

          osc.connect(gain)
          gain.connect(filter)
          filter.connect(ctx.destination)
          osc.start()
        }
      } catch (err) {
        console.warn('Web Audio error:', err)
      }
      setIsSoundOn(true)
    } else {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
      setIsSoundOn(false)
    }
  }

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const handleNavClick = (section) => {
    if (onNavigateSection) {
      onNavigateSection(section)
    } else if (onBack) {
      onBack(section)
    }
  }

  const handleScrollToExplore = () => {
    const target = document.getElementById('interest-content-section')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={containerRef}
      className="interest-page-container"
      onMouseMove={handleMouseMove}
    >
      {/* Fine Film / Paper Grain Texture Overlay */}
      <div className="interest-grain-overlay" aria-hidden="true"></div>

      {/* Scattered Celestial Stars & Stardust */}
      <div className="interest-stars-layer" aria-hidden="true">
        {/* Diamond star on upper-left */}
        <div className="tiny-diamond-star" style={{ top: '28%', left: '11%' }}></div>
        {/* Soft dot stars */}
        <span className="star-dot s1" style={{ top: '6%', left: '31%' }}></span>
        <span className="star-dot s2" style={{ top: '16%', left: '71%' }}></span>
        <span className="star-dot s1" style={{ top: '57%', left: '25.5%' }}></span>
        <span className="star-dot s2" style={{ top: '55%', left: '72%' }}></span>
        <span className="star-dot s3" style={{ top: '68%', left: '84%' }}></span>
      </div>

      {/* HERO STAGE (100% Exact match to user UI) */}
      <section className="interest-hero-stage">
        {/* TOP NAVIGATION BAR */}
        <header className="interest-nav-header">
          <button
            type="button"
            className="interest-nav-title"
            onClick={() => handleNavClick('#home')}
            title="Return to Portfolio"
          >
            INTEREST
          </button>

          <div className="interest-nav-right">
            {/* Audio Waveform Pill Toggle */}
            <button
              type="button"
              className={`interest-sound-pill ${isSoundOn ? 'is-active' : ''}`}
              onClick={toggleSound}
              aria-label="Toggle ambient audio"
            >
              <span className="sound-wave-icon" aria-hidden="true">
                <span className="wave-dot">·</span>
                <span className={`wave-bar bar-1 ${isSoundOn ? 'playing' : ''}`}></span>
                <span className={`wave-bar bar-2 ${isSoundOn ? 'playing' : ''}`}></span>
                <span className={`wave-bar bar-3 ${isSoundOn ? 'playing' : ''}`}></span>
                <span className="wave-dot">·</span>
              </span>
              <span className="sound-pill-text">{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
            </button>

            <nav className="interest-nav-links" aria-label="Main Navigation">
              <button
                type="button"
                className="interest-nav-link"
                onClick={() => handleNavClick('#projects')}
              >
                WORK
              </button>
              <button
                type="button"
                className="interest-nav-link"
                onClick={() => handleNavClick('#about')}
              >
                ABOUT
              </button>
              <button
                type="button"
                className="interest-nav-link"
                onClick={() => handleNavClick('#contact')}
              >
                CONTACT
              </button>
            </nav>
          </div>
        </header>

        {/* FAINT CELESTIAL ORBIT ARC (Right side in background) */}
        <div className="interest-celestial-orbit-w" aria-hidden="true">
          <svg className="interest-celestial-orbit-svg" viewBox="0 0 900 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 680 -50 C 850 150, 920 380, 830 580 C 760 740, 600 840, 480 860"
              stroke="rgba(255, 255, 255, 0.16)"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </div>

        {/* 4-POINT DIAMOND STAR SPARKLE (Right side sitting on the orbit curve) */}
        <div
          className="interest-sparkle-wrapper"
          style={{
            transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`
          }}
          aria-hidden="true"
        >
          <svg className="interest-sparkle-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="sparkle-glow-exact" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(225, 220, 255, 0.6)" />
                <stop offset="60%" stopColor="rgba(225, 220, 255, 0.15)" />
                <stop offset="100%" stopColor="rgba(225, 220, 255, 0)" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#sparkle-glow-exact)" />
            <path
              d="M50 8 Q50 50 92 50 Q50 50 50 92 Q50 50 8 50 Q50 50 50 8 Z"
              fill="rgba(255, 255, 255, 0.9)"
            />
          </svg>
        </div>

        {/* 4 FLYING BIRDS SILHOUETTE (Left side ascending toward center) */}
        <div
          className="interest-birds-wrapper"
          style={{
            transform: `translate3d(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px, 0)`
          }}
          aria-hidden="true"
        >
          <svg className="interest-birds-svg" viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Bird 1 (bottom left) */}
            <path
              d="M12 65 C24 53, 38 53, 50 61 C62 53, 76 53, 88 65 C76 59, 62 61, 50 67 C38 61, 24 59, 12 65 Z"
              fill="rgba(255, 255, 255, 0.72)"
            />
            {/* Bird 2 */}
            <path
              d="M56 46 C66 36, 78 36, 88 43 C98 36, 110 36, 120 46 C110 41, 98 43, 88 48 C78 43, 66 41, 56 46 Z"
              fill="rgba(255, 255, 255, 0.75)"
            />
            {/* Bird 3 */}
            <path
              d="M98 30 C107 21, 118 21, 127 28 C136 21, 147 21, 156 30 C147 26, 136 27, 127 32 C118 27, 107 26, 98 30 Z"
              fill="rgba(255, 255, 255, 0.75)"
            />
            {/* Bird 4 (upper right) */}
            <path
              d="M142 16 C150 8, 160 8, 168 14 C176 8, 186 8, 194 16 C186 12, 176 14, 168 18 C160 14, 150 12, 142 16 Z"
              fill="rgba(255, 255, 255, 0.68)"
            />
          </svg>
        </div>

        {/* BACKGROUND TYPOGRAPHY (Centered behind subject) */}
        <div
          className="interest-typography-bg"
          style={{
            transform: `translate3d(${mousePos.x * 0.18}px, ${mousePos.y * 0.12}px, 0)`
          }}
        >
          {/* Main Huge Title: INTEREST */}
          <h1 className="interest-title">INTEREST</h1>

          {/* Line 2: BUILDING DIGITAL EXPERIENCES */}
          <div className="interest-subtitle">BUILDING DIGITAL EXPERIENCES</div>

          {/* Line 3: Full-stack development • AI experiments • Creative coding */}
          <div className="interest-tagline">
            Full-stack development &bull; AI experiments &bull; Creative coding
          </div>
        </div>

        {/* CENTER SUBJECT (Exact interest_image.png) */}
        <div
          className="interest-subject-wrapper"
          style={{
            transform: `translate3d(${mousePos.x * -0.18}px, ${mousePos.y * -0.12}px, 0)`
          }}
        >
          <img
            src={interestImage}
            alt="Nisarg Darji"
            className="interest-subject-img"
          />
        </div>

        {/* BOTTOM LEFT: SCROLL TO EXPLORE WITH L-BRACKET GUIDE */}
        <div
          className="interest-scroll-indicator"
          onClick={handleScrollToExplore}
          role="button"
          tabIndex={0}
          aria-label="Scroll to explore"
        >
          <span className="scroll-indicator-text">SCROLL TO EXPLORE</span>
          <div className="scroll-indicator-bracket" aria-hidden="true">
            <span className="bracket-vert"></span>
          </div>
        </div>

        {/* BOTTOM TECH RULER: CONTINUOUS RULER WITH CODE • DESIGN • AI • EXPERIMENTS */}
        <footer className="interest-bottom-ruler-bar" aria-hidden="true">
          {/* 4 Category Labels floating right above ruler */}
          <div className="ruler-labels-row">
            <span className="ruler-category-label col-code">CODE</span>
            <span className="ruler-category-label col-design">DESIGN</span>
            <span className="ruler-category-label col-ai">AI</span>
            <span className="ruler-category-label col-experiments">EXPERIMENTS</span>
          </div>

          {/* Continuous Full-Width Ruler Axis with calibrated vertical tick marks */}
          <div className="ruler-axis-wrapper">
            <div className="ruler-axis-track">
              {Array.from({ length: 85 }).map((_, idx) => {
                const isTall = idx % 10 === 0
                const isMid = idx % 5 === 0 && !isTall
                return (
                  <span
                    key={idx}
                    className={`ruler-tick ${isTall ? 'is-tall' : isMid ? 'is-mid' : ''}`}
                  ></span>
                )
              })}
            </div>
          </div>
        </footer>
      </section>

      {/* STEP INSIDE: INTERACTIVE SHOWCASE (Revealed upon scroll) */}
      <section id="interest-content-section" className="interest-detail-section">
        <div className="detail-header-w">
          <div className="detail-eyebrow">CURATED DISCIPLINES &amp; PASSIONS</div>
          <h2 className="detail-title">WHAT DRIVES MY CRAFT</h2>
          <p className="detail-intro">
            A confluence of avant-garde design aesthetics, computational precision, and human-centric digital architecture.
          </p>
        </div>

        {/* 4 Cards matching CODE, DESIGN, AI, EXPERIMENTS */}
        <div className="interest-cards-grid">
          {/* Card 1: CODE */}
          <div className="interest-card">
            <div className="card-top-num">01 / CODE</div>
            <h3 className="card-heading">Full-Stack Architecture &amp; Performance</h3>
            <p className="card-desc">
              Engineered with clean RESTful backends, React 19 component trees, Vite speed, and modular maintainability.
            </p>
            <div className="card-tags">
              <span>React 19</span>
              <span>Node.js</span>
              <span>Full-Stack</span>
              <span>Clean Architecture</span>
            </div>
          </div>

          {/* Card 2: DESIGN */}
          <div className="interest-card">
            <div className="card-top-num">02 / DESIGN</div>
            <h3 className="card-heading">Editorial &amp; Swiss Grid Systems</h3>
            <p className="card-desc">
              Obsessed with editorial typography, brutalist clarity, Swiss grid structures, and harmonious serif-sans pairings.
            </p>
            <div className="card-tags">
              <span>Editorial Typography</span>
              <span>Swiss Grid</span>
              <span>Visual Hierarchy</span>
            </div>
          </div>

          {/* Card 3: AI */}
          <div className="interest-card">
            <div className="card-top-num">03 / AI</div>
            <h3 className="card-heading">Autonomous Agents &amp; AI Experiments</h3>
            <p className="card-desc">
              Building intelligent workflows with generative AI, multi-agent frameworks, context retrieval, and developer productivity tools.
            </p>
            <div className="card-tags">
              <span>AI Agents</span>
              <span>LLM Orchestration</span>
              <span>Microsoft Certified</span>
            </div>
          </div>

          {/* Card 4: EXPERIMENTS */}
          <div className="interest-card">
            <div className="card-top-num">04 / EXPERIMENTS</div>
            <h3 className="card-heading">Creative Coding, WebGL &amp; GSAP</h3>
            <p className="card-desc">
              Creating fluid physics-based interactions, smooth 60fps animations with GSAP/Lenis, and Three.js spatial environments.
            </p>
            <div className="card-tags">
              <span>GSAP</span>
              <span>Three.js</span>
              <span>Lenis Scroll</span>
              <span>Kinetic Motion</span>
            </div>
          </div>
        </div>

        {/* Back to Home CTA */}
        <div className="detail-cta-row">
          <button
            type="button"
            className="interest-back-btn"
            onClick={() => handleNavClick('#home')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            BACK TO PORTFOLIO
          </button>
        </div>
      </section>
    </div>
  )
}
