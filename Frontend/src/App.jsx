import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useAnimation } from 'framer-motion'
import heroImage from './assets/Hero_image.png'
import backgroundVideo from './assets/test_video_7.mp4'
import Navbar from './components/Navbar'
import secondpageImage from './assets/secondpage_image.png'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Framer Motion Variants for Staggered Reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.025,
      delayChildren: 0.1
    }
  }
}

const wordVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 14
    }
  }
}

const App = () => {
  const controls = useAnimation()
  const horizontalTrackRef = useRef(null)
  const horizontalSectionRef = useRef(null)
  const heroImageRef = useRef(null)
  const nextRaceRef = useRef(null)
  const headerRef = useRef(null)
  const videoRef = useRef(null)
  const heroPinRef = useRef(null)
  const heroCardRef = useRef(null)
  const marquee1Ref = useRef(null)
  const marquee2Ref = useRef(null)
  const leftTextRef = useRef(null)
  const heroContentRef = useRef(null)
  const statementContainerRef = useRef(null)
  const ototPinRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.35; // Slow down background video significantly
    }



    // 2. GSAP Animations on Load (Stable & Centered)
    gsap.fromTo(heroImageRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.6, ease: 'power4.out', delay: 0.2 }
    )

    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
    )

    gsap.fromTo(nextRaceRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out', delay: 0.8 }
    )

    // 3. Hero card scaling on scroll & automatic infinite marquees
    const pinContainer = heroPinRef.current
    const heroCard = heroCardRef.current
    const m1 = marquee1Ref.current
    const m2 = marquee2Ref.current
    let heroTimeline = null
    let m1Tween = null
    let m2Tween = null

    if (pinContainer && heroCard) {
      const video = videoRef.current
      heroTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainer,
          pin: true,
          scrub: true,
          start: 'top top',
          end: '+=450%',
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (video) {
              if (self.progress > 0.1) {
                video.pause()
              } else {
                video.play().catch(() => {})
              }
            }
          }
        }
      })

      // 1. Scale down the card
      heroTimeline.fromTo(heroCard,
        {
          scale: 1,
          borderRadius: '0px',
          filter: 'grayscale(0) brightness(1)'
        },
        {
          scale: 0.45,
          borderRadius: '40px',
          filter: 'grayscale(0.7) brightness(0.8)',
          ease: 'none'
        }, 0)

      // 2. Fade out inner text & card early
      heroTimeline.fromTo([leftTextRef.current, nextRaceRef.current],
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none'
        }, 0)

      // 3. Scroll card & marquees upwards out of the viewport
      heroTimeline.fromTo(heroContentRef.current,
        { y: '0vh' },
        { y: '-120vh', ease: 'power1.inOut' },
        0.35
      )

      // 4. Scroll statement text container upwards into the viewport
      heroTimeline.fromTo(statementContainerRef.current,
        { y: '30vh', opacity: 0 },
        { y: '0vh', opacity: 1, ease: 'power1.inOut' },
        0.6
      )

      // Trigger Framer Motion animation when the statement container starts to appear
      heroTimeline.to({}, {
        duration: 0.1,
        onStart: () => {
          controls.start("visible")
        },
        onReverseComplete: () => {
          controls.start("hidden")
        }
      }, 0.6)

      // 5. Fade out statement container and move it slightly up/left as the horizontal track starts sliding in
      heroTimeline.to(statementContainerRef.current,
        { y: '-50vh', opacity: 0, ease: 'power1.inOut', duration: 0.5 },
        1.4
      )

      // 6. Horizontal scroll animation starting off-screen
      const track = horizontalTrackRef.current
      if (track) {
        const getScrollAmount = () => {
          let trackWidth = track.scrollWidth
          return -(trackWidth - window.innerWidth)
        }

        gsap.set(track, { x: window.innerWidth, y: 0 })

        heroTimeline.fromTo(track,
          { x: window.innerWidth },
          { x: getScrollAmount, ease: 'none', duration: 2.0 },
          1.9
        )

        // Transition background to off-white and text to dark green halfway through horizontal scroll
        heroTimeline.to(pinContainer, {
          backgroundColor: '#F4F4ED',
          duration: 0.6,
          ease: 'power1.inOut'
        }, 2.5)

        // Toggle light nav class halfway through horizontal scroll
        heroTimeline.call(() => {
          document.querySelector('.nav')?.classList.add('is-light-nav')
        }, null, 2.5)

        heroTimeline.call(() => {
          document.querySelector('.nav')?.classList.remove('is-light-nav')
        }, null, 2.49)

        heroTimeline.to('.horizontal-item-text', {
          color: '#0b0f02',
          duration: 0.6,
          ease: 'power1.inOut'
        }, 2.5)

        heroTimeline.to('.horizontal-track .text-eyebrow', {
          color: '#5f634f',
          duration: 0.6,
          ease: 'power1.inOut'
        }, 2.5)

        heroTimeline.to('.span-green-off-white-1', {
          color: '#0b0f02',
          duration: 0.6,
          ease: 'power1.inOut'
        }, 2.5)

        // Vertical wavy parallax movements of the cards as we scroll (shifted to align with horizontal scroll starting at 1.9)
        heroTimeline.fromTo('.card-1', { y: '35vh' }, { y: '-5vh', ease: 'power1.out', duration: 0.8 }, 2.1)
        heroTimeline.fromTo('.card-2', { y: '50vh' }, { y: '15vh', ease: 'power1.out', duration: 0.8 }, 2.3)
        heroTimeline.fromTo('.card-3', { y: '25vh' }, { y: '5vh', ease: 'power1.out', duration: 0.8 }, 2.5)
        heroTimeline.fromTo('.card-4', { y: '45vh', scale: 0.85 }, { y: '0vh', scale: 1.05, ease: 'power1.out', duration: 0.8 }, 2.7)
        heroTimeline.fromTo('.card-5', { y: '15vh' }, { y: '-10vh', ease: 'power1.out', duration: 0.8 }, 2.9)
        heroTimeline.fromTo('.card-6', { y: '40vh' }, { y: '10vh', ease: 'power1.out', duration: 0.8 }, 3.1)
      }
    }

    // Infinite automatic scrolling for marquees
    if (m1) {
      m1Tween = gsap.to(m1, {
        xPercent: -50,
        ease: 'none',
        duration: 18,
        repeat: -1
      })
    }
    if (m2) {
      gsap.set(m2, { xPercent: -50 })
      m2Tween = gsap.to(m2, {
        xPercent: 0,
        ease: 'none',
        duration: 18,
        repeat: -1
      })
    }

    // Float and drift background SVGs
    let floatTween = gsap.to('.bg-floating-svg', {
      x: 'random(-25, 25)',
      y: 'random(-25, 25)',
      rotation: 'random(-90, 90)',
      duration: 'random(6, 10)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.1
    })

    // Topographic paths drifting animation
    let topoTween = gsap.to('.topo-path', {
      x: 'random(-45, 45)',
      y: 'random(-45, 45)',
      rotation: 'random(-8, 8)',
      scale: 'random(0.95, 1.05)',
      duration: 'random(12, 18)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: {
        amount: 2,
        from: 'random'
      }
    })

    // 4. Pinned On/Off Track Scroll Trigger Timeline (Merging Cutouts into Full Scene)
    let ototTimeline = null
    const ototPin = ototPinRef.current
    if (ototPin) {
      ototTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ototPin,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
          invalidateOnRefresh: true
        }
      })

      // 1. Slide up & fade out the text layout
      ototTimeline.to('.otot-home-layout', {
        opacity: 0,
        y: -100,
        ease: 'power1.inOut',
        duration: 1.0
      }, 0)

      // 2. Translate/Slide the cutout images out of the screen
      ototTimeline.to('.otot-home-img-w.is-left', {
        x: '-100%',
        ease: 'power1.inOut',
        duration: 1.0
      }, 0)

      ototTimeline.to('.otot-home-img-w.is-right', {
        x: '100%',
        ease: 'power1.inOut',
        duration: 1.0
      }, 0)

      // 3. Slide up the full garage scene image overlay from below
      ototTimeline.to('.is-otot-end', {
        y: '0%',
        ease: 'none',
        duration: 1.2
      }, 0)

      // 4. Parallax scale on the inner image
      ototTimeline.to('.image.is-otot-home-end', {
        scale: 1.0,
        ease: 'none',
        duration: 1.2
      }, 0)

      // 5. Toggle light nav class:
      // Keep it light (dark text/icons) initially, but turn it back to white (dark background style) at 0.5 progress when Section 2 covers the viewport
      ototTimeline.call(() => {
        document.querySelector('.nav')?.classList.remove('is-light-nav')
        document.querySelector('.is-otot-end')?.classList.add('is-active')
      }, null, 0.5)

      ototTimeline.call(() => {
        document.querySelector('.nav')?.classList.add('is-light-nav')
        document.querySelector('.is-otot-end')?.classList.remove('is-active')
      }, null, 0.49)
    }

    return () => {
      if (heroTimeline) {
        heroTimeline.scrollTrigger?.kill()
        heroTimeline.kill()
      }
      if (m1Tween) m1Tween.kill()
      if (m2Tween) m2Tween.kill()
      if (floatTween) floatTween.kill()
      if (topoTween) topoTween.kill()
      if (ototTimeline) {
        ototTimeline.scrollTrigger?.kill()
        ototTimeline.kill()
      }
    }
  }, [])

  return (
    <div className="page-w">
      {/* Header / Navbar */}
      <Navbar ref={headerRef} />

      {/* Main Page Content */}
      <main className="main-w">

        {/* Hero Scroll-Pin Container */}
        <section ref={heroPinRef} className="hero-pin-container">
          {/* Fixed Topographic Background Image */}
          <img src={secondpageImage} alt="topography contour lines background" className="hero-topo-bg" />
          
          <div className="hero-scroll-content-w" ref={heroContentRef}>
            {/* Background Marquee */}
          <div className="hero-marquee-w">
            <div className="marquee-line line-1">
              <div ref={marquee1Ref} className="marquee-track">
                <span>CREATIVE DEV • NISARG DARJI • DESIGNER • CODING •&nbsp;</span>
                <span>CREATIVE DEV • NISARG DARJI • DESIGNER • CODING •&nbsp;</span>
              </div>
            </div>
            <div className="marquee-line line-2">
              <div ref={marquee2Ref} className="marquee-track">
                <span>REACT • GSAP • WEB DEVELOPMENT • THREE.JS •&nbsp;</span>
                <span>REACT • GSAP • WEB DEVELOPMENT • THREE.JS •&nbsp;</span>
              </div>
            </div>
          </div>

          {/* Floating Background SVGs */}
          <svg className="bg-floating-svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ top: '15%', left: '12%' }}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <svg className="bg-floating-svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ top: '78%', left: '9%' }}>
            <circle cx="12" cy="12" r="8" />
          </svg>
          <svg className="bg-floating-svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ top: '12%', left: '85%' }}>
            <polygon points="12 2 22 22 2 22" />
          </svg>
          <svg className="bg-floating-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ top: '82%', left: '88%' }}>
            <line x1="5" y1="5" x2="19" y2="19" />
            <line x1="19" y1="5" x2="5" y2="19" />
          </svg>
          <svg className="bg-floating-svg" width="45" height="35" viewBox="0 0 88 56" fill="none" stroke="currentColor" strokeWidth="2" style={{ top: '48%', left: '86%', opacity: 0.08 }}>
            <path d="M12 4L32 44H42L22 4H12Z" />
            <path d="M45 44L65 4H75L55 44H45Z" />
          </svg>

          {/* Scaling Hero Card */}
          <div ref={heroCardRef} className="home-hero-card-w">
            {/* Hero Section */}
            <section className="s home-hero" style={{ width: '100vw', height: '100vh', padding: 0 }}>
              {/* Background Video */}
              <video ref={videoRef} autoPlay loop muted playsInline className="hero-bg-video">
                <source src={backgroundVideo} type="video/mp4" />
              </video>

              {/* Topographic Line Background overlaying the video */}
              <div className="home-hero-bg-lines">
                <svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M-150,150 C50,200 150,100 180,350 C210,600 50,750 -100,800" stroke="rgba(0,0,0,0.06)" strokeWidth="2" fill="none" />
                  <path d="M-100,100 C150,150 250,50 280,350 C310,650 150,850 -50,900" stroke="rgba(0,0,0,0.06)" strokeWidth="2" fill="none" />
                  <path d="M-200,200 C-50,250 50,150 80,350 C110,550 -50,650 -150,700" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" fill="none" />

                  <path d="M1590,150 C1390,200 1290,100 1260,350 C1230,600 1390,750 1540,800" stroke="rgba(0,0,0,0.06)" strokeWidth="2" fill="none" />
                  <path d="M1540,100 C1290,150 1190,50 1160,350 C1130,650 1290,850 1490,900" stroke="rgba(0,0,0,0.06)" strokeWidth="2" fill="none" />
                </svg>
              </div>

              {/* Center Image (Perfect Centered Styling) */}
              <div className="home-hero-center-img-w">
                <img ref={heroImageRef} src={heroImage} alt="Lando Norris" style={{ transformOrigin: 'bottom center' }} />
              </div>

              {/* Left creative text */}
              <div ref={leftTextRef} className="hero-left-text-w">
                <div className="hero-creative-text">creative</div>
                <div className="hero-dev-text">web developer</div>
              </div>

              {/* Next Race Right Component adapted for Coding Stats */}
              <div ref={nextRaceRef} className="home-hero-next-race-w">
                <div className="home-hero-next-race-container">
                  {/* Outline border */}
                  <div className="home-hero-next-race-bg">
                    <svg width="100%" height="100%" viewBox="0 0 119 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M118.5 6v232a5.5 5.5 0 0 1-5.5 5.5H6a5.5 5.5 0 0 1-5.5-5.5V25A5.5 5.5 0 0 1 6 19.5h46.346c4.695 0 9.167-2 12.297-5.498l7.46-8.337A15.5 15.5 0 0 1 83.653.5H113a5.5 5.5 0 0 1 5.5 5.5Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Top Title */}
                  <div className="next-race-title">Dev Stack</div>

                  {/* Coding Symbol SVG */}
                  <div className="next-race-circuit-w">
                    <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '65%', height: 'auto' }}>
                      <polyline points="30 15 10 30 30 45" />
                      <polyline points="70 15 90 30 70 45" />
                      <line x1="55" y1="10" x2="45" y2="50" />
                    </svg>
                  </div>

                  {/* Race Name */}
                  <div className="next-race-name">React & GSAP</div>

                  {/* Laurel Wreath with coding info */}
                  <div className="next-race-laurel-w">
                    <div className="laurel-svg-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 100 50" fill="currentColor" style={{ width: '85%', height: '85%' }}>
                        {/* Wreath left */}
                        <path d="M 40 45 C 30 45, 15 35, 15 25 C 15 15, 25 10, 35 15 C 33 20, 25 22, 23 28 C 21 34, 30 38, 38 40" />
                        {/* Wreath right */}
                        <path d="M 60 45 C 70 45, 85 35, 85 25 C 85 15, 75 10, 65 15 C 67 20, 75 22, 77 28 C 79 34, 70 38, 62 40" />
                        {/* JS Logo center */}
                        <text x="50" y="32" fontSize="14" fontWeight="800" textAnchor="middle" fill="currentColor" style={{ fontFamily: 'Outfit' }}>JS</text>
                      </svg>
                    </div>
                    <div className="laurel-subtext">
                      CREATIVE CODING<br />
                    
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

          <motion.div 
            className="c statement-container" 
            ref={statementContainerRef}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
          >
            {/* Top Laurel Icon */}
            <motion.div className="statement-icon-w" variants={wordVariants}>
              <svg viewBox="0 0 100 50" fill="currentColor" className="statement-laurel-svg" style={{ color: '#d2ff00' }}>
                {/* Laurel wreath left */}
                <path d="M 40 45 C 30 45, 15 35, 15 25 C 15 15, 25 10, 35 15 C 33 20, 25 22, 23 28 C 21 34, 30 38, 38 40" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Laurel wreath right */}
                <path d="M 60 45 C 70 45, 85 35, 85 25 C 85 15, 75 10, 65 15 C 67 20, 75 22, 77 28 C 79 34, 70 38, 62 40" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Center text / icon */}
                <text x="50" y="31" fontSize="11" fontWeight="800" textAnchor="middle" fill="#ffffff" style={{ fontFamily: 'Outfit' }}>N</text>
              </svg>
              <div className="statement-icon-sub">NISARG DARJI SINCE 2020</div>
            </motion.div>

            {/* Main Statement Text */}
            <h2 className="statement-text">
              {"Redefining limits, fighting for wins, bringing it all in all ways. Defining a legacy in Formula 1 on and off the track."
                .split(" ")
                .map((word, idx) => {
                  const cleanWord = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
                  const isSpecial = ["redefining", "wins", "legacy"].includes(cleanWord);
                  return (
                    <motion.span
                      key={idx}
                      variants={wordVariants}
                      className={isSpecial ? "serif-lime" : "reveal-word"}
                      style={{ display: "inline-block" }}
                    >
                      {isSpecial ? <strong>{word}</strong> : word}
                      {"\u00A0"}
                    </motion.span>
                  );
                })}
            </h2>
          </motion.div>

          <div className="horizontal-pin-sticky">
            <div ref={horizontalTrackRef} className="horizontal-track">
              {/* Card 1 */}
              <div className="horizontal-item-w card-1">
                <div className="text-eyebrow">Qatar, 2024</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa04b14a1ca33c0b25_ln-home-horiz-1.webp" alt="Qatar 2024" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="horizontal-item-w card-2">
                <div className="text-eyebrow">FIA Prize Giving, 2024</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baab12220595c8223b3_ln-home-horiz-2.webp" alt="FIA Prize Giving" />
                </div>
              </div>

              {/* Card 3 (Quote Card) */}
              <div className="horizontal-item-w card-3" style={{ justifyContent: 'center' }}>
                <div className="horizontal-item-text">
                  It doesn’t matter <span className="span-green-off-white-1">where</span> you start, it’s <span className="span-green-off-white-1">how</span> you progress from there.
                </div>
              </div>

              {/* Card 4 */}
              <div className="horizontal-item-w card-4">
                <div className="text-eyebrow">Miami GP, 2024</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302babcf12f0111d96322e_ln-home-horiz-3.webp" alt="Miami GP 2024" />
                </div>
              </div>

              {/* Card 5 */}
              <div className="horizontal-item-w card-5">
                <div className="text-eyebrow">Monaco, 2023</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa798e2cc6e02ac38a_ln-home-horiz-4.webp" alt="Monaco 2023" />
                </div>
              </div>

              {/* Card 6 */}
              <div className="horizontal-item-w card-6">
                <div className="text-eyebrow">Battersea, 2024</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa14a96f3cdd2f9a95_ln-home-horiz-6.webp" alt="Battersea 2024" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* On/Off Track Section */}
        <div ref={ototPinRef} className="otot-sticky-wrapper">
          <div className="otot-sticky-item">
            <section className="s is-otot-home">
              {/* Topographic Lines Background overlaying the section */}
              <img src={secondpageImage} alt="topography contour lines background" className="hero-topo-bg" style={{ opacity: 0.1 }} />

              <div className="c">
                <div className="otot-home-layout">
                  {/* Left Column: ON TRACK */}
                  <motion.div 
                    className="otot-home-text-col is-1"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <div className="otot-home-text-w">
                      <div className="on-overlay">on</div>
                      <h2 className="text-impact-reg-brier">ON</h2>
                      <h2 className="text-impact-reg-mona line-increase">TRACK</h2>
                    </div>
                    <p className="otot-home-p-w">
                      Most recent <strong>results</strong>, career stats and photos from trackside.
                    </p>
                    <div>
                      <a href="/on-track" className="btn-round-arrow" title="On Track">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 10l-5 5 5 5" />
                          <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>

                  {/* Right Column: OFF TRACK */}
                  <motion.div 
                    className="otot-home-text-col is-2"
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
                  >
                    <div className="otot-home-text-w">
                      <h2 className="text-impact-reg-brier">OFF</h2>
                      <h2 className="text-impact-reg-mona line-increase">TRACK</h2>
                    </div>
                    <p className="otot-home-p-w">
                      <strong>Campaigns</strong>, shoots and other such promotional materials for fans.
                    </p>
                    <div>
                      <a href="/off-track" className="btn-round-arrow" title="Off Track">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 10l-5 5 5 5" />
                          <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="otot-home-bg">
                <div className="otot-home-img-w is-left">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67d18655b032045a4dc78e53_ln4-hp-lando-helmet.webp" alt="Lando Helmet" />
                </div>
                <div className="otot-home-img-w is-right">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67d18655b032045a4dc78e56_ln4-hp-lando-head.webp" alt="Lando Head" />
                </div>
              </div>
            </section>
          </div>

          {/* Section 2: is-otot-end */}
          <section className="is-otot-end">
            <div className="otot-home-end-img-w">
              <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302ff5ff89a9a4afb8c19e_ln-home-helm-large.webp" alt="Lando lifting helmet up" className="image is-otot-home-end" />
            </div>
          </section>
        </div>

        {/* Helmets Section */}
        <section className="s home-helmets">
          <div className="c">
            <div className="title-layout">
              <div>
                <div className="text-eyebrow">Helmet Designs</div>
                <h2 className="text-title-lg-mona">
                  HELMETS <br />
                  <span className="text-title-lg-brier c-lime-off">HALL OF FAME</span>
                </h2>
              </div>
              <p style={{ fontSize: '1.1rem', color: '#a8ad92', lineHeight: '1.6' }}>
                From his iconic blobs to innovative one-off designs, Lando has always been passionate about designing innovative and memorable helmets.
              </p>
            </div>

            <div className="helmet-grid">
              {/* Helmet 1 */}
              <div className="helmet-grid-item-w">
                <div className="helmet-grid-item">
                  <div className="helmet-grid-item-img-helmet-w">
                    <img src="https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b3e6c7ab86033cf172c_In-helm-2025-Season-base.webp" alt="Season 2025 Base" className="helmet-grid-item-img-helmet" />
                  </div>
                  <img src="https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b411c575b2f777125f6_In-helm-2025-Season-hover.webp" alt="Season 2025 Hover" className="helmet-grid-item-reveal-img" />
                </div>
                <div className="helmet-grid-item-text-w">
                  <div className="text-title-small-label">Season Helmet</div>
                  <div className="text-title-small-label date">2025</div>
                </div>
              </div>

              {/* Helmet 2 */}
              <div className="helmet-grid-item-w">
                <div className="helmet-grid-item">
                  <div className="helmet-grid-item-img-helmet-w">
                    <img src="https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b2259159e5170d2b923_In-helm-2025-Discoball-base.webp" alt="Discoball Base" className="helmet-grid-item-img-helmet" />
                  </div>
                  <img src="https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b24037a1e7681195c20_In-helm-2025-Discoball-hover.webp" alt="Discoball Hover" className="helmet-grid-item-reveal-img" />
                </div>
                <div className="helmet-grid-item-text-w">
                  <div className="text-title-small-label">Discoball Special</div>
                  <div className="text-title-small-label date">2025</div>
                </div>
              </div>

              {/* Helmet 3 */}
              <div className="helmet-grid-item-w">
                <div className="helmet-grid-item">
                  <div className="helmet-grid-item-img-helmet-w">
                    <img src="https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305aff4692de3e7ea12251_In-helm-2025-DarkGlitter-base.webp" alt="Dark Glitter Base" className="helmet-grid-item-img-helmet" />
                  </div>
                  <img src="https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b03644c91f0a8de407b_In-helm-2025-DarkGlitter-hover.webp" alt="Dark Glitter Hover" className="helmet-grid-item-reveal-img" />
                </div>
                <div className="helmet-grid-item-text-w">
                  <div className="text-title-small-label">Dark Glitter Edition</div>
                  <div className="text-title-small-label date">2025</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="c footer-inner">
          <div className="footer-logo">
            <a href="/" className="nav-logo-stacked">
              <span>NISARG</span>
              <span>DARJI</span>
            </a>
          </div>
          <div className="footer-links">
            <a href="https://www.tiktok.com/@landonorris" target="_blank" rel="noopener noreferrer" className="footer-link-item">Tiktok</a>
            <a href="https://www.instagram.com/lando" target="_blank" rel="noopener noreferrer" className="footer-link-item">Instagram</a>
            <a href="https://www.youtube.com/landonorris04" target="_blank" rel="noopener noreferrer" className="footer-link-item">Youtube</a>
            <a href="https://www.twitch.tv/landonorris" target="_blank" rel="noopener noreferrer" className="footer-link-item">Twitch</a>
          </div>
          <div className="footer-copy">
            © 2026 NISARG DARJI. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App