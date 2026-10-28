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
  const bengaluruLayerRef = useRef(null)
  const workLayerRef = useRef(null)

  // Direct DOM refs to avoid 120fps React re-renders
  const needleRef = useRef(null)
  const rulerFillRef = useRef(null)
  const brandNameRef = useRef(null)
  const categoryRowRef = useRef(null)

  // Sound state (only toggled on click)
  const [isSoundOn, setIsSoundOn] = useState(true)

  const activeSectionRef = useRef('interest')
  const wasPastHeroRef = useRef(false)
  const wasScrolledRef = useRef(false)
  const audioContextRef = useRef(null)

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
          osc.frequency.setValueAtTime(220, ctx.currentTime)
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
      [helloLayerRef.current, systemsLayerRef.current, beliefsLayerRef.current, bengaluruLayerRef.current, workLayerRef.current],
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
         PHASE 4: BELIEFS CHAPTER (58% to 78%)
         - "7+ years. Still curious. Still making."
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
         PHASE 5: BENGALURU CHAPTER (76% to 92%)
         - "Based in Bengaluru." with landscape & coffee cup
         ========================================================================= */
      .set(bengaluruLayerRef.current, { autoAlpha: 1, pointerEvents: 'auto' }, 76)
      .fromTo(
        bengaluruLayerRef.current,
        { scale: 0.5, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 6, ease: 'sine.out', immediateRender: false },
        76
      )
      // Continuous forward glide in reading sweet spot
      .to(bengaluruLayerRef.current, { scale: 1.12, duration: 6, ease: 'sine.inOut' }, 82)
      // Smooth exit zoom
      .to(bengaluruLayerRef.current, { scale: 2.4, autoAlpha: 0, pointerEvents: 'none', duration: 5, ease: 'sine.in' }, 88)
      .set(bengaluruLayerRef.current, { autoAlpha: 0 }, 93)

      /* =========================================================================
         PHASE 6: WORK & CONTACT CHAPTER (91% to 100%)
         - "That's what I make. That's what I lead."
         ========================================================================= */
      .set(workLayerRef.current, { autoAlpha: 1, pointerEvents: 'auto' }, 91)
      .fromTo(
        workLayerRef.current,
        { scale: 0.55, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 6, ease: 'sine.out', immediateRender: false },
        91
      )
      .to(workLayerRef.current, { scale: 1.02, duration: 3, ease: 'sine.out' }, 97)

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

      // Discrete transitions directly in the DOM (Zero React re-renders)
      const scrolled = progress > 0.05
      if (scrolled !== wasScrolledRef.current) {
        wasScrolledRef.current = scrolled
        if (brandNameRef.current) {
          brandNameRef.current.title = scrolled ? 'Back to Top' : 'Return to Portfolio'
        }
      }

      const pastHero = progress > 0.17
      if (pastHero !== wasPastHeroRef.current) {
        wasPastHeroRef.current = pastHero
        if (brandNameRef.current) {
          brandNameRef.current.textContent = pastHero ? 'nisarg darji' : 'INTEREST'
        }
      }

      // Ruler category active state directly updated in DOM
      let sec = 'interest'
      if (progress < 0.17) sec = 'interest'
      else if (progress < 0.38) sec = 'hello'
      else if (progress < 0.58) sec = 'systems'
      else if (progress < 0.76) sec = 'beliefs'
      else if (progress < 0.90) sec = 'bengaluru'
      else sec = 'work'

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

    // Force layout measurement & initial state
    lenis.resize()
    handleScroll({ progress: 0 })

    return () => {
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
                ref={brandNameRef}
                type="button"
                className="interest-brand-name"
                onClick={() => {
                  if (wasScrolledRef.current) {
                    scrollToTop()
                  } else {
                    handleNavClick('#home')
                  }
                }}
                title="Return to Portfolio"
              >
                INTEREST
              </button>
            </div>

            <div className="interest-nav-right">
              {/* Sound Toggle Button */}
              <button
                type="button"
                className={`interest-sound-pill ${isSoundOn ? 'is-active' : ''}`}
                onClick={toggleSound}
                aria-label="Toggle ambient audio"
              >
                <span className="sound-wave-icon" aria-hidden="true">
                  <span className={`wave-bar bar-1 ${isSoundOn ? 'playing' : ''}`}></span>
                  <span className={`wave-bar bar-2 ${isSoundOn ? 'playing' : ''}`}></span>
                  <span className="wave-dot">·</span>
                  <span className={`wave-bar bar-3 ${isSoundOn ? 'playing' : ''}`}></span>
                  <span className={`wave-bar bar-1 ${isSoundOn ? 'playing' : ''}`}></span>
                </span>
                <span className="sound-pill-text">{isSoundOn ? 'SOUND ON' : 'SOUND OFF'}</span>
              </button>

              <nav className="interest-nav-links" aria-label="Main Navigation">
                <button
                  type="button"
                  className="interest-nav-link"
                  onClick={() => handleNavClick('/interest/space')}
                  title="Explore Space"
                  style={{ color: '#ffffff', opacity: 0.95 }}
                >
                  SPACE 🪐
                </button>
                <button
                  type="button"
                  className="interest-nav-link"
                  onClick={() => scrollToProgress(0.92)}
                >
                  WORK
                </button>
                <button
                  type="button"
                  className="interest-nav-link"
                  onClick={() => scrollToProgress(0.68)}
                >
                  ABOUT
                </button>
                <button
                  type="button"
                  className="interest-nav-link"
                  onClick={() => scrollToProgress(0.96)}
                >
                  CONTACT
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
                <span className="scroll-indicator-text">EXPLORE SPACE ↗</span>
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
              STAGE 2: SYSTEMS CHAPTER
              ================================================================ */}
          <section ref={systemsLayerRef} className="interest-content-layer layer-systems">
            <div className="layer-content-wrap">
              <p className="sys-small-tag">I build</p>
              <h2 className="sys-giant-title">SYSTEMS.</h2>

              <div className="sys-kit-card">
                <div className="sys-card-header">
                  <span className="sys-badge">Card / Default</span>
                  <div className="sys-swatches-row">
                    <span className="swatch sw-1"></span>
                    <span className="swatch sw-2"></span>
                    <span className="swatch sw-3"></span>
                    <span className="swatch sw-4"></span>
                    <span className="swatch sw-5"></span>
                  </div>
                </div>
                <div className="sys-card-skeleton">
                  <span className="skeleton-line a"></span>
                  <span className="skeleton-line b"></span>
                </div>
                <button type="button" className="sys-pill-btn">Continue learning →</button>
              </div>

              <p className="sys-caption">
                Tokens become components. Components become products. Products become something a team can keep building on.
              </p>
            </div>
          </section>

          {/* ================================================================
              STAGE 3: BELIEFS CHAPTER
              ================================================================ */}
          <section ref={beliefsLayerRef} className="interest-content-layer layer-beliefs">
            <div className="layer-content-wrap beliefs-wrap">
              <div className="beliefs-headline-row">
                <h2 className="beliefs-years">7+ YEARS.</h2>
                <svg className="beliefs-under-svg" viewBox="0 0 380 24" fill="none">
                  <path d="M4 14 Q60 4 120 14 T240 12 T376 10" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="beliefs-curious">Still curious. Still making.</p>

              <div className="beliefs-statements-grid">
                <div className="belief-box">
                  <h3>I build products and the teams that build products.</h3>
                  <p>From the first blank Figma frame to a product people actually use. I've built products from scratch, shaped design systems, and built teams that make good ideas happen.</p>
                </div>

                <div className="belief-box">
                  <h3>My obsession lives in the gap between usable and unforgettable.</h3>
                  <p>I believe great design should solve the problem first, then make people feel something. I bring together product thinking, art direction and a little bit of the unexpected.</p>
                </div>

                <div className="belief-box">
                  <h3>These days I'm also in the code.</h3>
                  <p>Prototyping faster, helping designers push PRs, shipping alongside engineers. The seam between design and engineering is where the craft either holds or falls apart.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ================================================================
              STAGE 4: BENGALURU CHAPTER
              ================================================================ */}
          <section ref={bengaluruLayerRef} className="interest-content-layer layer-bengaluru">
            <div className="layer-content-wrap bengaluru-wrap">
              <h2 className="bengaluru-title">Based in Bengaluru.</h2>

              <div className="bengaluru-landscape" aria-hidden="true">
                <svg className="landscape-svg" viewBox="0 0 900 140" fill="none">
                  <path
                    d="M0 140 L0 100 Q90 60 180 85 Q270 110 360 70 Q450 30 550 75 Q650 110 740 70 Q820 40 900 80 L900 140 Z"
                    fill="rgba(255, 255, 255, 0.08)"
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="2"
                  />
                  <path
                    d="M0 140 L0 115 Q140 85 280 105 Q420 125 560 95 Q700 70 840 105 L900 110 L900 140 Z"
                    fill="rgba(255, 255, 255, 0.04)"
                  />
                </svg>

                <svg className="palm-tree palm-left" viewBox="0 0 100 180">
                  <path d="M50 180 Q42 120 54 60" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                  <path d="M54 58 Q24 40 2 68 Q28 52 52 64 Z M54 58 Q32 20 6 28 Q34 36 52 62 Z M54 58 Q66 18 94 22 Q68 36 56 62 Z M54 58 Q86 46 98 80 Q80 58 56 64 Z" fill="#ffffff" />
                </svg>

                <svg className="palm-tree palm-right" viewBox="0 0 100 180">
                  <path d="M50 180 Q56 120 46 60" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
                  <path d="M46 58 Q16 40 0 68 Q24 52 44 64 Z M46 58 Q28 20 4 28 Q28 36 44 62 Z M46 58 Q60 18 88 22 Q64 36 48 62 Z M46 58 Q78 46 92 80 Q72 58 48 64 Z" fill="#ffffff" />
                </svg>

                <div className="coffee-cup-wrap">
                  <svg className="coffee-cup-svg" viewBox="0 0 80 80" fill="none">
                    <path className="cup-steam s1" d="M30 18 Q26 12 30 6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                    <path className="cup-steam s2" d="M38 18 Q42 12 38 6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                    <path className="cup-steam s3" d="M46 18 Q42 12 46 6" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M20 28 H58 V42 Q58 58 44 58 H34 Q20 58 20 42 Z" fill="#ffffff" stroke="#704567" strokeWidth="2" />
                    <path d="M58 34 Q68 34 68 40 Q68 46 58 46" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                    <path d="M14 62 H64" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <p className="bengaluru-caption">
                Open to building brands, designing experiences and good conversations over a cup of coffee.
              </p>
            </div>
          </section>

          {/* ================================================================
              STAGE 5: WORK & CONTACT CHAPTER
              ================================================================ */}
          <section ref={workLayerRef} className="interest-content-layer layer-work">
            <div className="layer-content-wrap work-wrap">
              <h2 className="work-headline">That's what I make.<br />That's what I lead.</h2>
              <p className="work-lead">
                If you're building something that deserves to be remembered, let's talk.
              </p>

              <div className="work-action-cards">
                <div className="work-card">
                  <div className="work-card-top">
                    <span className="card-badge">3D SPACE EXPERIENCE</span>
                    <span className="card-dot-live"></span>
                  </div>
                  <h3>THE SPACE ODYSSEY</h3>
                  <p>Step into an interactive 3D solar system with planetary orbits, cosmic physics, and ambient space soundscapes.</p>
                  <button
                    type="button"
                    className="action-btn primary"
                    onClick={() => handleNavClick('/interest/space')}
                  >
                    ENTER SPACE 🪐 ↗
                  </button>
                </div>

                <div className="work-card">
                  <div className="work-card-top">
                    <span className="card-badge">PORTFOLIO & WORK</span>
                  </div>
                  <h3>SELECTED WORK</h3>
                  <p>Explore case studies spanning product design systems, generative AI experiments, and full-stack platforms.</p>
                  <button
                    type="button"
                    className="action-btn secondary"
                    onClick={() => handleNavClick('#projects')}
                  >
                    VIEW PROJECTS ↗
                  </button>
                </div>
              </div>

              <button
                type="button"
                className="rewind-top-btn"
                onClick={scrollToTop}
              >
                REWIND TO TOP ↺
              </button>
            </div>
          </section>

          {/* ================================================================
              PERSISTENT BOTTOM TIMELINE RULER
              - INTEREST • HELLO • SYSTEMS • BELIEFS • BENGALURU • WORK
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
                title="Jump to Systems"
              >
                SYSTEMS
              </button>
              <button
                type="button"
                className="ruler-category-btn col-beliefs"
                onClick={() => scrollToProgress(0.68)}
                title="Jump to Beliefs"
              >
                BELIEFS
              </button>
              <button
                type="button"
                className="ruler-category-btn col-bengaluru"
                onClick={() => scrollToProgress(0.84)}
                title="Jump to Bengaluru"
              >
                BENGALURU
              </button>
              <button
                type="button"
                className="ruler-category-btn col-work"
                onClick={() => scrollToProgress(0.96)}
                title="Jump to Work"
              >
                WORK
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
