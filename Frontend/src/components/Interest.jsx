import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import interestImage from '../assets/interest_image.png'
import './Interest.css'

// Character data for "HI, I'M NISU." with alternating letter tilt
const HELLO_WORDS = [
  {
    word: 'HI,',
    chars: [
      { char: 'H', rot: -4, sm: false },
      { char: 'I', rot: 3, sm: false },
      { char: ',', rot: -2, sm: false },
    ],
  },
  {
    word: "I'M",
    chars: [
      { char: 'I', rot: 5, sm: false },
      { char: "'", rot: -3, sm: false },
      { char: 'M', rot: 2, sm: false },
    ],
  },
  {
    word: 'NISU.',
    chars: [
      { char: 'N', rot: -5, sm: false },
      { char: 'I', rot: 3, sm: true },
      { char: 'S', rot: -3, sm: true },
      { char: 'U', rot: 4, sm: false },
      { char: '.', rot: 3, sm: false },
    ],
  },
]

// Static tick calibration generated once outside React lifecycle
const STATIC_TICKS = Array.from({ length: 85 }).map((_, idx) => ({
  isTall: idx % 10 === 0,
  isMid: idx % 5 === 0 && idx % 10 !== 0,
}))

export default function Interest({ onBack, onNavigateSection }) {
  const containerRef = useRef(null)
  const scrollTrackRef = useRef(null)
  const pinnedStageRef = useRef(null)
  const lenisInstanceRef = useRef(null)
  const timelineRef = useRef(null)

  // STAGE 0: HERO SECTION REFS (Image 1)
  const heroLayerRef = useRef(null)
  const heroInnerRef = useRef(null)
  const heroTitleRef = useRef(null)
  const heroSubtitleRef = useRef(null)
  const heroTaglineRef = useRef(null)
  const heroSubjectRef = useRef(null)
  const heroIndicatorRef = useRef(null)
  const heroTypographyRef = useRef(null)
  const birdsRef = useRef(null)
  const sparkleRef = useRef(null)
  const orbitRef = useRef(null)

  // SQUARE TUNNEL ANIMATION REF
  const tunnelRef = useRef(null)

  // STAGE 1+: NESIL SECTIONS REFS
  const helloLayerRef = useRef(null)
  const hiLineRef = useRef(null)
  const squigRef = useRef(null)
  const hiCapRef = useRef(null)
  const sparksRef = useRef(null)

  const systemsLayerRef = useRef(null)
  const beliefsLayerRef = useRef(null)
  const codingLayerRef = useRef(null)
  const ahmedabadLayerRef = useRef(null)

  // Direct DOM refs to avoid 120fps React re-renders
  const needleRef = useRef(null)
  const rulerFillRef = useRef(null)
  const categoryRowRef = useRef(null)

  const activeSectionRef = useRef('interest')
  const wasScrolledRef = useRef(false)

  // Pure GPU-driven mouse parallax via gsap.quickTo (Zero React state overhead)
  const parallaxX = useRef(null)
  const parallaxY = useRef(null)

  useEffect(() => {
    if (!heroSubjectRef.current || !sparkleRef.current || !birdsRef.current || !heroTypographyRef.current) return
    const xSubj = gsap.quickTo(heroSubjectRef.current, 'x', { duration: 0.5, ease: 'power2.out' })
    const ySubj = gsap.quickTo(heroSubjectRef.current, 'y', { duration: 0.5, ease: 'power2.out' })
    const xSpark = gsap.quickTo(sparkleRef.current, 'x', { duration: 0.5, ease: 'power2.out' })
    const ySpark = gsap.quickTo(sparkleRef.current, 'y', { duration: 0.5, ease: 'power2.out' })
    const xBirds = gsap.quickTo(birdsRef.current, 'x', { duration: 0.5, ease: 'power2.out' })
    const yBirds = gsap.quickTo(birdsRef.current, 'y', { duration: 0.5, ease: 'power2.out' })
    const xTypo = gsap.quickTo(heroTypographyRef.current, 'x', { duration: 0.5, ease: 'power2.out' })
    const yTypo = gsap.quickTo(heroTypographyRef.current, 'y', { duration: 0.5, ease: 'power2.out' })

    parallaxX.current = (x) => {
      xSubj(x * -0.18)
      xSpark(x * 0.3)
      xBirds(x * 0.25)
      xTypo(x * 0.18)
    }
    parallaxY.current = (y) => {
      ySubj(y * -0.12)
      ySpark(y * 0.3)
      yBirds(y * 0.25)
      yTypo(y * 0.12)
    }
  }, [])

  const handleMouseMove = (e) => {
    if (!parallaxX.current) return
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth - 0.5) * 14
    const y = (e.clientY / innerHeight - 0.5) * 10
    parallaxX.current(x)
    parallaxY.current(y)
  }

  const handleBackToPortfolio = () => {
    if (onBack) {
      onBack()
    } else if (onNavigateSection) {
      onNavigateSection('/')
    } else {
      window.location.href = '/'
    }
  }

  const handleNavClick = (section) => {
    if (onNavigateSection) {
      onNavigateSection(section)
    } else if (onBack) {
      onBack(section)
    }
  }

  // Smooth scroll to target progress (0 to 1)
  const scrollToProgress = useCallback((targetProgress) => {
    if (!lenisInstanceRef.current) return
    const limit = lenisInstanceRef.current.limit || (scrollTrackRef.current ? scrollTrackRef.current.offsetHeight - window.innerHeight : 4000)
    const targetScroll = Math.max(0, targetProgress * limit)
    lenisInstanceRef.current.scrollTo(targetScroll, { duration: 1.2 })
  }, [])

  const scrollToTop = () => {
    scrollToProgress(0)
  }

  // Keyboard arrow & page keys support for scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      const lenis = lenisInstanceRef.current
      if (!lenis) return
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault()
        const dist = e.key === 'PageDown' ? window.innerHeight * 0.8 : 160
        lenis.scrollTo(lenis.scroll + dist, { duration: 0.6 })
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        const dist = e.key === 'PageUp' ? window.innerHeight * 0.8 : 160
        lenis.scrollTo(lenis.scroll - dist, { duration: 0.6 })
      } else if (e.key === ' ') {
        e.preventDefault()
        const dist = e.shiftKey ? -window.innerHeight * 0.7 : window.innerHeight * 0.7
        lenis.scrollTo(lenis.scroll + dist, { duration: 0.6 })
      } else if (e.key === 'Home') {
        e.preventDefault()
        lenis.scrollTo(0, { duration: 1.0 })
      } else if (e.key === 'End') {
        e.preventDefault()
        lenis.scrollTo(lenis.limit, { duration: 1.0 })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Master Timeline & Lenis Integration
  useEffect(() => {
    const container = containerRef.current
    const scrollTrack = scrollTrackRef.current
    if (!container || !scrollTrack) return

    // Ensure zero lag clamping from GSAP
    gsap.ticker.lagSmoothing(0)

    // 1. Lenis Smooth Scroller (instantaneous response & frictionless 120fps glide)
    const lenis = new Lenis({
      wrapper: container,
      content: scrollTrack,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.6,
      syncTouch: true,
    })
    lenisInstanceRef.current = lenis

    // Drive Lenis directly via GSAP ticker for frame-locked synchronization
    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateLenis)

    // 2. Build Master Scrubbed Timeline (0 to 100 units) with continuous forward motion
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'none' } })
    timelineRef.current = tl

    // Initial positioning for all subsequent layers
    gsap.set(
      [helloLayerRef.current, systemsLayerRef.current, beliefsLayerRef.current, codingLayerRef.current, ahmedabadLayerRef.current],
      { autoAlpha: 0, scale: 0.5, pointerEvents: 'none' }
    )
    if (tunnelRef.current) {
      gsap.set(tunnelRef.current, { autoAlpha: 0, scale: 0.25 })
    }

    /* =========================================================================
       PHASE 0: HERO SECTION (0% to 17%)
       - Starts 100% visible: "INTEREST", photo, birds, sparkle, subtitle, tagline
       - As user scrolls:
         - Subtitle, tagline, indicator, birds fade out (0 to 5)
         - Center photo scales up & dissolves (0.5 to 11.5)
         - Title "INTEREST" zooms smoothly through viewport (1 to 14)
       ========================================================================= */
    tl
      // Early exits
      .to(heroIndicatorRef.current, { autoAlpha: 0, duration: 3, ease: 'sine.in' }, 0)
      .to([heroSubtitleRef.current, heroTaglineRef.current], { autoAlpha: 0, y: -22, duration: 4.5, ease: 'sine.in' }, 0)
      .to([birdsRef.current, sparkleRef.current, orbitRef.current], { autoAlpha: 0, duration: 5, ease: 'sine.in' }, 0.5)

      // Center subject zooms forward and dissolves smoothly
      .to(heroSubjectRef.current, { scale: 2.1, autoAlpha: 0, duration: 11, ease: 'sine.inOut' }, 0.5)

      // Title "INTEREST" zooms smoothly through viewport
      .to(
        heroTitleRef.current,
        {
          scale: 14,
          transformOrigin: '50% 48%',
          duration: 13,
          ease: 'sine.inOut',
        },
        1
      )
      .to(heroTitleRef.current, { autoAlpha: 0, duration: 5, ease: 'sine.in' }, 8.5)

      /* =========================================================================
         PHASE 1: THE SQUARE ANIMATION (6% to 20%)
         - Concentric perspective wireframe boxes expand continuously
         - Transitions background smoothly to #704567
         ========================================================================= */
      // Single continuous forward scale without stutter or intermediate pause
      .fromTo(
        tunnelRef.current,
        { scale: 0.25 },
        { scale: 7.2, duration: 13, ease: 'sine.inOut', immediateRender: false },
        6
      )
      .fromTo(
        tunnelRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 4.5, ease: 'sine.out', immediateRender: false },
        6
      )
      .to(tunnelRef.current, { autoAlpha: 0, duration: 4.5, ease: 'sine.in' }, 14.5)
      .set(tunnelRef.current, { autoAlpha: 0 }, 19)

      // Background color shift to #704567
      .to(
        pinnedStageRef.current,
        {
          backgroundColor: '#704567',
          duration: 8,
          ease: 'none'
        },
        8
      )

      // Hero layer fully fades out
      .to(heroLayerRef.current, { autoAlpha: 0, duration: 3, ease: 'none' }, 13.5)

      /* =========================================================================
         PHASE 2: "HI, I'M NESIL." SECTION (17% to 40%)
         - Enters smoothly from depth right through the square tunnel
         - Continuous gentle forward glide across the entire reading zone (no dead stop!)
         - Seamless fly-through exit past the camera
         ========================================================================= */
      .set(helloLayerRef.current, { autoAlpha: 1, pointerEvents: 'auto' }, 17)
      .fromTo(
        helloLayerRef.current,
        { scale: 0.45, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 7, ease: 'sine.out', immediateRender: false },
        17
      )
      // Continuous gentle forward motion through reading window (no freezing)
      .to(helloLayerRef.current, { scale: 1.15, duration: 9, ease: 'sine.inOut' }, 24)

      // Gone animation: Subtitle & sparks fade out
      .to(hiCapRef.current, { autoAlpha: 0, y: -20, duration: 4.5, ease: 'sine.in' }, 33)
      .to([sparksRef.current, squigRef.current], { scale: 1.35, autoAlpha: 0, duration: 5, ease: 'sine.in' }, 33)

      // Title "HI, I'M NESIL." zooms smoothly past camera
      .to(
        hiLineRef.current,
        {
          scale: 8.5,
          transformOrigin: '48% 54%',
          duration: 7,
          ease: 'sine.in',
        },
        33
      )
      .to(hiLineRef.current, { autoAlpha: 0, duration: 3.5, ease: 'sine.in' }, 36.5)
      .set(helloLayerRef.current, { autoAlpha: 0, pointerEvents: 'none' }, 40)

      /* =========================================================================
         PHASE 3: SYSTEMS CHAPTER (38% to 60%)
         - "I build systems." with component kit card & swatches
         - Smooth spatial depth overlap with preceding section
         ========================================================================= */
      .set(systemsLayerRef.current, { autoAlpha: 1, pointerEvents: 'auto' }, 38)
      .fromTo(
        systemsLayerRef.current,
        { scale: 0.5, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 7, ease: 'sine.out', immediateRender: false },
        38
      )
      // Continuous forward glide in reading sweet spot
      .to(systemsLayerRef.current, { scale: 1.14, duration: 8, ease: 'sine.inOut' }, 45)
      // Smooth exit zoom
      .to(systemsLayerRef.current, { scale: 2.4, autoAlpha: 0, pointerEvents: 'none', duration: 7, ease: 'sine.in' }, 53)
      .set(systemsLayerRef.current, { autoAlpha: 0 }, 60)

      /* =========================================================================
         PHASE 4: GEOPOLITICS CHAPTER (58% to 78%)
         - "GEOPOLITICS."
         ========================================================================= */
      .set(beliefsLayerRef.current, { autoAlpha: 1, pointerEvents: 'auto' }, 58)
      .fromTo(
        beliefsLayerRef.current,
        { scale: 0.5, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 7, ease: 'sine.out', immediateRender: false },
        58
      )
      // Continuous forward glide in reading sweet spot
      .to(beliefsLayerRef.current, { scale: 1.14, duration: 7, ease: 'sine.inOut' }, 65)
      // Smooth exit zoom
      .to(beliefsLayerRef.current, { scale: 2.4, autoAlpha: 0, pointerEvents: 'none', duration: 6, ease: 'sine.in' }, 72)
      .set(beliefsLayerRef.current, { autoAlpha: 0 }, 78)

      /* =========================================================================
         PHASE 5: CODING CHAPTER (76% to 92%)
         - "INTEREST IN CODING" with </> symbols
         ========================================================================= */
      .set(codingLayerRef.current, { autoAlpha: 1, pointerEvents: 'auto' }, 76)
      .fromTo(
        codingLayerRef.current,
        { scale: 0.5, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 6, ease: 'sine.out', immediateRender: false },
        76
      )
      // Continuous forward glide in reading sweet spot
      .to(codingLayerRef.current, { scale: 1.12, duration: 6, ease: 'sine.inOut' }, 82)
      // Smooth exit zoom
      .to(codingLayerRef.current, { scale: 2.4, autoAlpha: 0, pointerEvents: 'none', duration: 5, ease: 'sine.in' }, 88)
      .set(codingLayerRef.current, { autoAlpha: 0 }, 93)

      /* =========================================================================
         PHASE 6: AHMEDABAD CHAPTER (FINAL CHAPTER) (91% to 100%)
         - "BASED IN AHMEDABAD." with skyline illustration + Rewind
         ========================================================================= */
      .set(ahmedabadLayerRef.current, { autoAlpha: 1, pointerEvents: 'auto' }, 91)
      .fromTo(
        ahmedabadLayerRef.current,
        { scale: 0.55, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 6, ease: 'sine.out', immediateRender: false },
        91
      )
      .to(ahmedabadLayerRef.current, { scale: 1.02, duration: 3, ease: 'sine.out' }, 97)

    // 3. Direct, liquid-smooth scroll synchronization (Zero React re-renders)
    const handleScroll = (data) => {
      let p = 0
      if (data && typeof data.progress === 'number') {
        p = data.progress
      } else {
        const maxScroll = scrollTrack.offsetHeight - container.clientHeight
        p = maxScroll > 0 ? container.scrollTop / maxScroll : 0
      }
      const progress = Math.min(1, Math.max(0, p))

      // Direct responsive scrubbing of master GSAP timeline
      tl.progress(progress)

      // Direct needle & fill update without React re-render
      if (needleRef.current) {
        needleRef.current.style.left = `${progress * 100}%`
      }
      if (rulerFillRef.current) {
        rulerFillRef.current.style.width = `${progress * 100}%`
      }

      const scrolled = progress > 0.05
      if (scrolled !== wasScrolledRef.current) {
        wasScrolledRef.current = scrolled
      }

      // Ruler category active state directly updated in DOM
      let sec = 'interest'
      if (progress < 0.17) sec = 'interest'
      else if (progress < 0.38) sec = 'hello'
      else if (progress < 0.58) sec = 'systems'
      else if (progress < 0.76) sec = 'beliefs'
      else if (progress < 0.90) sec = 'coding'
      else sec = 'ahmedabad'

      if (sec !== activeSectionRef.current) {
        activeSectionRef.current = sec
        if (categoryRowRef.current) {
          const prev = categoryRowRef.current.querySelector('.is-active')
          if (prev) prev.classList.remove('is-active')
          const next = categoryRowRef.current.querySelector(`.col-${sec}`)
          if (next) next.classList.add('is-active')
        }
      }
    }

    lenis.on('scroll', handleScroll)

    const handleResize = () => {
      lenis.resize()
    }
    window.addEventListener('resize', handleResize)

    // Force layout measurement & initial state
    lenis.resize()
    handleScroll({ progress: 0 })

    return () => {
      window.removeEventListener('resize', handleResize)
      gsap.ticker.remove(updateLenis)
      lenis.destroy()
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="interest-page-container"
      onMouseMove={handleMouseMove}
    >
      {/* Scroll Runway Track: 560vh */}
      <div ref={scrollTrackRef} className="interest-scroll-track">
        {/* Pinned Stage: Locked firmly to viewport */}
        <div ref={pinnedStageRef} className="interest-pinned-stage">
          {/* Fine Film Grain Overlay */}
          <div className="interest-grain-overlay" aria-hidden="true"></div>

          {/* Ambient Dust Particles */}
          <div className="interest-dust-layer" aria-hidden="true">
            <div className="tiny-diamond-star" style={{ top: '28%', left: '11%' }}></div>
            <span className="dust-particle d1" style={{ top: '6%', left: '31%' }}></span>
            <span className="dust-particle d2" style={{ top: '16%', left: '71%' }}></span>
            <span className="dust-particle d1" style={{ top: '57%', left: '25.5%' }}></span>
            <span className="dust-particle d2" style={{ top: '55%', left: '72%' }}></span>
            <span className="dust-particle d3" style={{ top: '68%', left: '84%' }}></span>
          </div>

          {/* PERSISTENT TOP NAVIGATION BAR */}
          <header className="interest-nav-header">
            <div className="interest-brand-group">
              <button
                type="button"
                className="interest-back-btn"
                onClick={handleBackToPortfolio}
                title="Back to Portfolio"
              >
                <span className="back-arrow" aria-hidden="true">&larr;</span> BACK
              </button>
            </div>

            <div className="interest-nav-right">
              <nav className="interest-nav-links" aria-label="Main Navigation">
                <button
                  type="button"
                  className="interest-nav-link"
                  onClick={() => scrollToProgress(0.48)}
                  title="Jump to Space Section"
                >
                  SPACE
                </button>
                <button
                  type="button"
                  className="interest-nav-link"
                  onClick={() => scrollToProgress(0.68)}
                  title="Jump to Geopolitics Section"
                >
                  GEOPOLITICS
                </button>
                <button
                  type="button"
                  className="interest-nav-link"
                  onClick={() => scrollToProgress(0.84)}
                  title="Jump to Coding Section"
                >
                  CODING
                </button>
                <button
                  type="button"
                  className="interest-nav-link"
                  onClick={() => scrollToProgress(0.96)}
                  title="Jump to Ahmedabad Section"
                >
                  AHMEDABAD
                </button>
              </nav>
            </div>
          </header>

          {/* ================================================================
              THE SQUARE ANIMATION: CONCENTRIC EXPANDING TUNNEL SQUARES
              (Warp portal that zooms forward when scrolling the Hero)
              ================================================================ */}
          <div ref={tunnelRef} className="interest-tunnel-stage" aria-hidden="true">
            <div className="tunnel-square sq-1"></div>
            <div className="tunnel-square sq-2"></div>
            <div className="tunnel-square sq-3"></div>
            <div className="tunnel-square sq-4"></div>
            <div className="tunnel-square sq-5"></div>
            <div className="tunnel-square sq-6"></div>
          </div>

          {/* ================================================================
              STAGE 0: HERO SECTION (Exact match to Image 1)
              - Title: "INTEREST" (Italiana serif)
              - Subtitle: "BUILDING DIGITAL EXPERIENCES"
              - Tagline: "Full-stack development • AI experiments • Creative coding"
              - Subject: Nisarg photo in front of typography
              - Sparkle, birds, orbit curve, explore space bracket
              ================================================================ */}
          <section ref={heroLayerRef} className="interest-hero-stage">
            <div ref={heroInnerRef} className="interest-hero-inner">
              {/* FAINT CELESTIAL ORBIT ARC */}
              <div ref={orbitRef} className="interest-celestial-orbit-w" aria-hidden="true">
                <svg className="interest-celestial-orbit-svg" viewBox="0 0 900 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M 680 -50 C 850 150, 920 380, 830 580 C 760 740, 600 840, 480 860"
                    stroke="rgba(255, 255, 255, 0.16)"
                    strokeWidth="1.2"
                    fill="none"
                  />
                </svg>
              </div>

              {/* 4-POINT DIAMOND STAR SPARKLE */}
              <div
                ref={sparkleRef}
                className="interest-sparkle-wrapper"
                aria-hidden="true"
              >
                <svg className="interest-sparkle-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="sparkle-glow-exact-user" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(225, 220, 255, 0.6)" />
                      <stop offset="60%" stopColor="rgba(225, 220, 255, 0.15)" />
                      <stop offset="100%" stopColor="rgba(225, 220, 255, 0)" />
                    </radialGradient>
                  </defs>
                  <circle cx="50" cy="50" r="45" fill="url(#sparkle-glow-exact-user)" />
                  <path
                    d="M50 8 Q50 50 92 50 Q50 50 50 92 Q50 50 8 50 Q50 50 50 8 Z"
                    fill="rgba(255, 255, 255, 0.9)"
                  />
                </svg>
              </div>

              {/* 4 FLYING BIRDS SILHOUETTE */}
              <div
                ref={birdsRef}
                className="interest-birds-wrapper"
                aria-hidden="true"
              >
                <svg className="interest-birds-svg" viewBox="0 0 200 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 65 C24 53, 38 53, 50 61 C62 53, 76 53, 88 65 C76 59, 62 61, 50 67 C38 61, 24 59, 12 65 Z"
                    fill="rgba(255, 255, 255, 0.72)"
                  />
                  <path
                    d="M56 46 C66 36, 78 36, 88 43 C98 36, 110 36, 120 46 C110 41, 98 43, 88 48 C78 43, 66 41, 56 46 Z"
                    fill="rgba(255, 255, 255, 0.75)"
                  />
                  <path
                    d="M98 30 C107 21, 118 21, 127 28 C136 21, 147 21, 156 30 C147 26, 136 27, 127 32 C118 27, 107 26, 98 30 Z"
                    fill="rgba(255, 255, 255, 0.75)"
                  />
                  <path
                    d="M142 16 C150 8, 160 8, 168 14 C176 8, 186 8, 194 16 C186 12, 176 14, 168 18 C160 14, 150 12, 142 16 Z"
                    fill="rgba(255, 255, 255, 0.68)"
                  />
                </svg>
              </div>

              {/* BACKGROUND TYPOGRAPHY (Centered behind subject) */}
              <div
                ref={heroTypographyRef}
                className="interest-typography-bg"
              >
                {/* Main Huge Title: INTEREST */}
                <h1 ref={heroTitleRef} className="interest-title">
                  INTEREST
                </h1>

                {/* Line 2: BUILDING DIGITAL EXPERIENCES */}
                <div ref={heroSubtitleRef} className="interest-subtitle">
                  BUILDING DIGITAL EXPERIENCES
                </div>

                {/* Line 3: Full-stack development • AI experiments • Creative coding */}
                <div ref={heroTaglineRef} className="interest-tagline">
                  Full-stack development &bull; AI experiments &bull; Creative coding
                </div>
              </div>

              {/* CENTER SUBJECT (Nisarg's photo) */}
              <div
                ref={heroSubjectRef}
                className="interest-subject-wrapper"
              >
                <img
                  src={interestImage}
                  alt="Nisarg Darji"
                  className="interest-subject-img"
                />
              </div>

              {/* BOTTOM LEFT: SCROLL TO EXPLORE WITH L-BRACKET GUIDE */}
              <div
                ref={heroIndicatorRef}
                className="interest-scroll-indicator"
                onClick={() => scrollToProgress(0.28)}
                role="button"
                tabIndex={0}
                aria-label="Scroll to explore"
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                title="Scroll down or click to dive in"
              >
                <span className="scroll-indicator-text">SCROLL TO EXPLORE ↓</span>
                <div className="scroll-indicator-bracket">
                  <span className="bracket-vert"></span>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              STAGE 1: "HI, I'M NESIL." SECTION (Revealed after square zoom)
              - Title: HI, I'M NESIL.
              - Alternating letter tilt & bouncy proportions
              - Squiggly line & 4-point diamond star sparks
              - Subtitle description
              ================================================================ */}
          <section ref={helloLayerRef} className="interest-content-layer layer-hello">
            <div className="hello-content-wrapper">
              {/* 4-POINT DIAMOND STAR SPARKS */}
              <div ref={sparksRef} className="hello-sparks-group" aria-hidden="true">
                <svg className="hello-spark s-top-left" viewBox="0 0 24 24">
                  <path d="M12 0 Q13.4 10.6 24 12 Q13.4 13.4 12 24 Q10.6 13.4 0 12 Q10.6 10.6 12 0 Z" fill="#ffffff" />
                </svg>
                <svg className="hello-spark s-bottom-left" viewBox="0 0 24 24">
                  <path d="M12 0 Q13.4 10.6 24 12 Q13.4 13.4 12 24 Q10.6 13.4 0 12 Q10.6 10.6 12 0 Z" fill="#ffffff" />
                </svg>
                <svg className="hello-spark s-top-center" viewBox="0 0 24 24">
                  <path d="M12 0 Q13.4 10.6 24 12 Q13.4 13.4 12 24 Q10.6 13.4 0 12 Q10.6 10.6 12 0 Z" fill="#ffffff" />
                </svg>
                <svg className="hello-spark s-top-right" viewBox="0 0 24 24">
                  <path d="M12 0 Q13.4 10.6 24 12 Q13.4 13.4 12 24 Q10.6 13.4 0 12 Q10.6 10.6 12 0 Z" fill="#ffffff" />
                </svg>
                <svg className="hello-spark s-bottom-right" viewBox="0 0 24 24">
                  <path d="M12 0 Q13.4 10.6 24 12 Q13.4 13.4 12 24 Q10.6 13.4 0 12 Q10.6 10.6 12 0 Z" fill="#ffffff" />
                </svg>
              </div>

              {/* GIANT DISPLAY TITLE: HI, I'M NISU. */}
              <h1 ref={hiLineRef} className="hello-hi-line" aria-label="HI, I'M NISU.">
                {HELLO_WORDS.map((wordObj, wIdx) => (
                  <span key={wIdx} className="hi-word">
                    {wordObj.chars.map((charObj, cIdx) => (
                      <span
                        key={cIdx}
                        className={`hi-char ${charObj.sm ? 'is-sm' : ''}`}
                        style={{
                          transform: `rotate(${charObj.rot}deg)`,
                          display: 'inline-block',
                        }}
                      >
                        {charObj.char}
                      </span>
                    ))}
                    {wIdx < HELLO_WORDS.length - 1 && <span className="hi-space">&nbsp;</span>}
                  </span>
                ))}
              </h1>

              {/* WAVY SQUIGGLY UNDERLINE (Sits under NESIL.) */}
              <div ref={squigRef} className="hello-squig-wrapper" aria-hidden="true">
                <svg className="hello-squig-svg" viewBox="0 0 320 34" fill="none">
                  <path
                    id="squigPath"
                    d="M4 18 Q24 2 44 18 T84 18 T124 18 T164 18 T204 18 T244 18 T284 18 T316 14"
                    stroke="#ffffff"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* SUBTITLE PARAGRAPH */}
              <p ref={hiCapRef} className="hello-caption">
                In my free time, I love exploring new ideas, learning concepts that spark my curiosity, and deepening my understanding of space, geopolitics, coding, and web design.
              </p>
            </div>
          </section>

          {/* ================================================================
              STAGE 2: SPACE CHAPTER
              ================================================================ */}
          <section ref={systemsLayerRef} className="interest-content-layer layer-systems">
            <div className="layer-content-wrap">
              <p className="sys-small-tag">I HAVE AN INTEREST IN</p>
              <h2 className="sys-giant-title">SPACE.</h2>

              <p className="sys-caption">
                I love exploring the mysteries of the universe, discovering distant galaxies, and following humanity's journey through space missions.
              </p>
            </div>
          </section>

          {/* ================================================================
              STAGE 3: GEOPOLITICS CHAPTER
              ================================================================ */}
          <section ref={beliefsLayerRef} className="interest-content-layer layer-beliefs">
            <div className="layer-content-wrap beliefs-wrap">
              <div className="beliefs-headline-row">
                <h2 className="beliefs-years">GEOPOLITICS.</h2>
                <svg className="beliefs-under-svg" viewBox="0 0 380 24" fill="none">
                  <path d="M4 14 Q60 4 120 14 T240 12 T376 10" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="beliefs-curious">GLOBAL DYNAMICS &bull; STRATEGIC ALLIANCES &bull; WORLD ORDER</p>
              <p className="beliefs-caption">
                Exploring international relations, multilateral diplomacy, and how global power dynamics, trade corridors, and economic statecraft shape modern history.
              </p>
            </div>
          </section>

          {/* ================================================================
              STAGE 4: CODING CHAPTER
              ================================================================ */}
          <section ref={codingLayerRef} className="interest-content-layer layer-coding">
            <div className="layer-content-wrap coding-wrap">
              <div className="coding-headline-row">
                <p className="coding-small-tag">I have an interest in</p>
                <h2 className="coding-giant-title">CODING.</h2>
              </div>

              <p className="coding-tagline">ARCHITECTURE &bull; CREATIVE LOGIC &bull; CLEAN CRAFT</p>

              <p className="coding-caption">
                Turning abstract ideas into performant digital realities. Obsessed with clean modular architecture, fluid kinetic interactions, full-stack development, and writing code that feels alive.
              </p>
            </div>
          </section>

          {/* ================================================================
              STAGE 5: AHMEDABAD CHAPTER (FINAL CHAPTER)
              ================================================================ */}
          <section ref={ahmedabadLayerRef} className="interest-content-layer layer-ahmedabad">
            <div className="layer-content-wrap ahmedabad-wrap">
              <h2 className="ahmedabad-title">
                <span>BASED IN</span>
                <span>AHMEDABAD.</span>
              </h2>

              <div className="ahmedabad-landscape" aria-hidden="true">
                <svg className="ahmedabad-svg" viewBox="0 0 1000 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="treeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(255, 255, 255, 0.12)" />
                      <stop offset="100%" stopColor="rgba(255, 255, 255, 0.02)" />
                    </linearGradient>
                  </defs>

                  {/* 1. BACKGROUND FOLIAGE & TREE CANOPIES */}
                  {/* Far-left cluster */}
                  <path
                    d="M 135 175 C 135 158 148 148 162 152 C 170 140 188 138 198 148 C 208 142 222 145 228 156 C 235 152 248 156 250 175 Z"
                    fill="url(#treeGrad)"
                    stroke="rgba(255, 255, 255, 0.28)"
                    strokeWidth="1"
                  />
                  {/* Between Teen Darwaza and Sarkhej Roza */}
                  <path
                    d="M 358 175 C 358 162 368 154 378 156 C 385 146 398 146 405 154 C 412 150 422 154 425 175 Z"
                    fill="url(#treeGrad)"
                    stroke="rgba(255, 255, 255, 0.28)"
                    strokeWidth="1"
                  />
                  {/* Between Sarkhej Roza and Patang Tower */}
                  <path
                    d="M 578 175 C 578 160 590 152 602 154 C 610 144 624 144 632 152 C 640 148 650 155 652 175 Z"
                    fill="url(#treeGrad)"
                    stroke="rgba(255, 255, 255, 0.28)"
                    strokeWidth="1"
                  />
                  {/* Far-right cluster beside Atal Bridge */}
                  <path
                    d="M 822 175 C 822 160 834 150 846 153 C 854 144 868 145 874 155 C 880 152 890 158 892 175 Z"
                    fill="url(#treeGrad)"
                    stroke="rgba(255, 255, 255, 0.28)"
                    strokeWidth="1"
                  />

                  {/* 2. LEFT SKY: PATANG (UTTARAYAN KITE) & FLOWING STRING */}
                  <g className="ahmedabad-kite">
                    {/* Kite diamond body */}
                    <polygon
                      points="194,42 208,62 188,78 174,58"
                      fill="rgba(255, 255, 255, 0.12)"
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth="1.4"
                    />
                    {/* Vertical spine */}
                    <line x1="194" y1="42" x2="188" y2="78" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
                    {/* Horizontal bow curve (kamani) */}
                    <path d="M 174 58 Q 192 50 208 62" fill="none" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
                    {/* Bottom triangle tail */}
                    <polygon points="188,78 183,86 193,86" fill="rgba(255, 255, 255, 0.7)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1" />
                    {/* Gracefully curving string (manja) */}
                    <path
                      d="M 188 86 C 172 110, 150 135, 138 152 C 126 168, 118 180, 108 190"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.45)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </g>

                  {/* 3. RIGHT SKY: FLYING BIRDS */}
                  <g className="ahmedabad-birds" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.2" fill="none" strokeLinecap="round">
                    <path d="M 758 78 Q 762 74 766 77 Q 770 74 774 78" />
                    <path d="M 772 68 Q 776 64 780 67 Q 784 64 788 68" />
                    <path d="M 786 75 Q 789 72 792 74 Q 795 72 798 75" />
                  </g>

                  {/* 4. MONUMENT 1: TEEN DARWAZA / SIDI SAIYYED ARCHES (Left) */}
                  <g className="ahmedabad-monument teen-darwaza">
                    {/* Main gateway facade wall */}
                    <rect x="238" y="124" width="134" height="51" fill="rgba(255, 255, 255, 0.04)" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.4" />

                    {/* Decorative crenellated battlements (Kanguras) on top parapet */}
                    <path
                      d="M 238 124 L 238 119 L 243 119 L 243 124 L 248 124 L 248 119 L 253 119 L 253 124 L 258 124 L 258 119 L 263 119 L 263 124 L 268 124 L 268 119 L 273 119 L 273 124 L 278 124 L 278 119 L 283 119 L 283 124 L 288 124 L 288 119 L 293 119 L 293 124 L 298 124 L 298 119 L 303 119 L 303 124 L 308 124 L 308 119 L 313 119 L 313 124 L 318 124 L 318 119 L 323 119 L 323 124 L 328 124 L 328 119 L 333 119 L 333 124 L 338 124 L 338 119 L 343 119 L 343 124 L 348 124 L 348 119 L 353 119 L 353 124 L 358 124 L 358 119 L 363 119 L 363 124 L 368 124 L 368 119 L 372 119 L 372 124"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth="1.2"
                    />
                    {/* Cornice line below battlements */}
                    <line x1="238" y1="127" x2="372" y2="127" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1" />

                    {/* Center Main Arch (Taller & Grand) */}
                    <path
                      d="M 288 175 L 288 150 C 288 133, 322 133, 322 150 L 322 175"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.9)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 292 175 L 292 151 C 292 137, 318 137, 318 151 L 318 175"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.45)"
                      strokeWidth="1"
                    />

                    {/* Left Arch */}
                    <path
                      d="M 248 175 L 248 154 C 248 141, 276 141, 276 154 L 276 175"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M 252 175 L 252 155 C 252 144, 272 144, 272 155 L 272 175"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.45)"
                      strokeWidth="1"
                    />

                    {/* Right Arch */}
                    <path
                      d="M 334 175 L 334 154 C 334 141, 362 141, 362 154 L 362 175"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth="1.4"
                    />
                    <path
                      d="M 338 175 L 338 155 C 338 144, 358 144, 358 155 L 358 175"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.45)"
                      strokeWidth="1"
                    />

                    {/* Spandrel Medallions */}
                    <circle cx="282" cy="138" r="2.5" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.8" />
                    <circle cx="328" cy="138" r="2.5" fill="none" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="0.8" />
                  </g>

                  {/* 5. MONUMENT 2: SARKHEJ ROZA / HERITAGE COLONNADE (Center) */}
                  <g className="ahmedabad-monument sarkhej-roza">
                    {/* Base plinth */}
                    <line x1="400" y1="172" x2="590" y2="172" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.4" />
                    <line x1="395" y1="175" x2="595" y2="175" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.2" />

                    {/* Horizontal roof beam & cornice */}
                    <line x1="400" y1="145" x2="590" y2="145" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.4" />
                    <line x1="396" y1="142" x2="594" y2="142" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1.2" />
                    <line x1="396" y1="140" x2="594" y2="140" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.8" />

                    {/* Repeating Columns across the colonnade */}
                    {[
                      408, 420, 432, 444, 456, 468, 480, 492, 504, 516, 528, 540, 552, 564, 576, 584
                    ].map((cx, i) => (
                      <g key={i}>
                        <line x1={cx} y1="145" x2={cx} y2="172" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="1.3" />
                        <line x1={cx - 2} y1="147" x2={cx + 2} y2="147" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
                        <line x1={cx - 2} y1="170" x2={cx + 2} y2="170" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1" />
                      </g>
                    ))}

                    {/* Center Chhatri Pavilion & Classical Ribbed Dome */}
                    <rect x="472" y="136" width="46" height="4" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1" />
                    <line x1="476" y1="136" x2="476" y2="128" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
                    <line x1="486" y1="136" x2="486" y2="128" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
                    <line x1="495" y1="136" x2="495" y2="128" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
                    <line x1="504" y1="136" x2="504" y2="128" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
                    <line x1="514" y1="136" x2="514" y2="128" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1.2" />
                    <line x1="470" y1="128" x2="520" y2="128" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.4" />
                    {/* Dome */}
                    <path
                      d="M 474 128 C 474 116, 516 116, 516 128 Z"
                      fill="rgba(255, 255, 255, 0.12)"
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth="1.3"
                    />
                    {/* Finial Spire / Kalash */}
                    <line x1="495" y1="116" x2="495" y2="108" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.4" />
                    <circle cx="495" cy="108" r="1.5" fill="#ffffff" />
                  </g>

                  {/* 6. MONUMENT 3: PATANG HOTEL REVOLVING RESTAURANT TOWER (Center-Right) */}
                  <g className="ahmedabad-monument patang-tower">
                    {/* Vertical tower shaft tapering upwards */}
                    <polygon
                      points="652,175 655,108 667,108 670,175"
                      fill="rgba(255, 255, 255, 0.05)"
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth="1.3"
                    />
                    {/* Shaft vertical grooves/lines */}
                    <line x1="658" y1="175" x2="659" y2="108" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.9" />
                    <line x1="664" y1="175" x2="663" y2="108" stroke="rgba(255, 255, 255, 0.35)" strokeWidth="0.9" />

                    {/* Revolving Disc Saucer Base Bracket */}
                    <polygon
                      points="654,108 644,98 678,98 668,108"
                      fill="rgba(255, 255, 255, 0.1)"
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth="1.3"
                    />
                    {/* Glass window band / disc perimeter */}
                    <rect x="643" y="93" width="36" height="5" fill="rgba(255, 255, 255, 0.2)" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.3" />
                    {/* Conical roof of revolving deck */}
                    <polygon
                      points="644,93 653,86 669,86 678,93"
                      fill="rgba(255, 255, 255, 0.1)"
                      stroke="rgba(255, 255, 255, 0.85)"
                      strokeWidth="1.3"
                    />
                    {/* Observation cupola */}
                    <polygon points="655,86 658,82 664,82 667,86" fill="rgba(255, 255, 255, 0.15)" stroke="rgba(255, 255, 255, 0.85)" strokeWidth="1" />
                    {/* Antenna spire */}
                    <line x1="661" y1="82" x2="661" y2="62" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.4" />
                    <circle cx="661" cy="62" r="1.5" fill="#ffffff" />
                  </g>

                  {/* 7. MONUMENT 4: ATAL PEDESTRIAN BRIDGE OVER SABARMATI (Right) */}
                  <g className="ahmedabad-monument atal-bridge">
                    {/* Tension Stay Cables radiating from pylon apex to deck */}
                    <g stroke="rgba(255, 255, 255, 0.55)" strokeWidth="0.9">
                      <line x1="737" y1="108" x2="694" y2="168" />
                      <line x1="737" y1="108" x2="706" y2="162" />
                      <line x1="737" y1="108" x2="718" y2="157" />
                      <line x1="737" y1="108" x2="728" y2="154" />
                      <line x1="737" y1="108" x2="745" y2="152" />
                      <line x1="737" y1="108" x2="758" y2="154" />
                      <line x1="737" y1="108" x2="774" y2="157" />
                      <line x1="737" y1="108" x2="792" y2="162" />
                      <line x1="737" y1="108" x2="812" y2="167" />
                      <line x1="737" y1="108" x2="828" y2="172" />
                    </g>

                    {/* Curved Central Mast / Pylon */}
                    <path
                      d="M 731 175 Q 734 135 737 106 Q 741 135 744 175"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.95)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />

                    {/* Upper bridge deck curve */}
                    <path
                      d="M 686 172 Q 748 147 834 170"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.9)"
                      strokeWidth="1.8"
                    />
                    {/* Lower structural truss deck curve */}
                    <path
                      d="M 686 175 Q 748 155 834 175"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.7)"
                      strokeWidth="1.4"
                    />
                    {/* Bridge deck vertical structural truss members */}
                    {[696, 708, 720, 732, 744, 756, 768, 780, 792, 804, 816, 826].map((bx, idx) => (
                      <line
                        key={idx}
                        x1={bx}
                        y1={175 - Math.sin(((bx - 686) / 148) * Math.PI) * 23}
                        x2={bx}
                        y2={175 - Math.sin(((bx - 686) / 148) * Math.PI) * 16}
                        stroke="rgba(255, 255, 255, 0.5)"
                        strokeWidth="1"
                      />
                    ))}
                    {/* Bridge piers into riverbed */}
                    <line x1="712" y1="172" x2="712" y2="175" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
                    <line x1="772" y1="171" x2="772" y2="175" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2" />
                  </g>

                  {/* 8. BASELINE & RIVERFRONT WATER EDGE */}
                  <line x1="120" y1="175" x2="880" y2="175" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="1.5" />
                  <line x1="160" y1="178" x2="840" y2="178" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
                </svg>
              </div>

              <p className="ahmedabad-caption">
                Open to building brands, designing experiences and good conversations over a cup of tea.
              </p>

              <button
                type="button"
                className="rewind-top-btn"
                onClick={scrollToTop}
                title="Rewind to top"
              >
                REWIND TO TOP ↺
              </button>
            </div>
          </section>

          {/* ================================================================
              PERSISTENT BOTTOM TIMELINE RULER
              - INTEREST • HELLO • SPACE • GEOPOLITICS • CODING • AHMEDABAD
              ================================================================ */}
          <footer className="interest-bottom-ruler-bar" aria-label="Section navigation">
            <div ref={categoryRowRef} className="ruler-labels-row">
              <button
                type="button"
                className="ruler-category-btn col-interest is-active"
                onClick={() => scrollToProgress(0)}
                title="Jump to Interest Hero"
              >
                INTEREST
              </button>
              <button
                type="button"
                className="ruler-category-btn col-hello"
                onClick={() => scrollToProgress(0.26)}
                title="Jump to Hello"
              >
                HELLO
              </button>
              <button
                type="button"
                className="ruler-category-btn col-systems"
                onClick={() => scrollToProgress(0.48)}
                title="Jump to Space"
              >
                SPACE
              </button>
              <button
                type="button"
                className="ruler-category-btn col-beliefs"
                onClick={() => scrollToProgress(0.68)}
                title="Jump to Geopolitics"
              >
                GEOPOLITICS
              </button>
              <button
                type="button"
                className="ruler-category-btn col-coding"
                onClick={() => scrollToProgress(0.84)}
                title="Jump to Coding"
              >
                CODING
              </button>
              <button
                type="button"
                className="ruler-category-btn col-ahmedabad"
                onClick={() => scrollToProgress(0.96)}
                title="Jump to Ahmedabad"
              >
                AHMEDABAD
              </button>
            </div>

            {/* Continuous Calibrated Axis Track with 85 Ticks */}
            <div className="ruler-axis-wrapper">
              <div className="ruler-axis-track">
                {/* Luminous dynamic runner needle */}
                <div
                  ref={needleRef}
                  className="ruler-runner-needle"
                  style={{ left: '0%' }}
                  aria-hidden="true"
                >
                  <span className="runner-diamond"></span>
                  <span className="runner-line"></span>
                </div>

                <div ref={rulerFillRef} className="ruler-axis-fill" style={{ width: '0%' }}></div>

                {STATIC_TICKS.map((tick, idx) => (
                  <span
                    key={idx}
                    className={`ruler-tick ${tick.isTall ? 'is-tall' : tick.isMid ? 'is-mid' : ''}`}
                  ></span>
                ))}
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
