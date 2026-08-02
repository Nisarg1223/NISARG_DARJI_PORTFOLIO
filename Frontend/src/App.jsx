import React, { useEffect, useRef } from 'react'
import lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImage from './assets/Hero_image.png'
import backgroundVideo from './assets/test_video_7.mp4'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const horizontalTrackRef = useRef(null)
  const horizontalSectionRef = useRef(null)
  const heroImageRef = useRef(null)
  const nextRaceRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenisScroll = new lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisScroll.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenisScroll.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

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

    // 3. GSAP Horizontal Scroll Pin animation
    const track = horizontalTrackRef.current
    const section = horizontalSectionRef.current

    if (track && section) {
      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth
        return -(trackWidth - window.innerWidth)
      }

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
        lenisScroll.destroy()
      }
    }

    return () => {
      lenisScroll.destroy()
    }
  }, [])

  return (
    <div className="page-w">
      {/* Header / Navbar */}
      <header ref={headerRef} className="nav">
        <div className="nav-inner">
          <div className="nav-left">
            <a href="/" className="nav-logo-stacked">
              <span>NISARG</span>
              <span>DARJI</span>
            </a>
          </div>

          {/* Middle Diagonal Slanted LN Logo */}
          <div className="nav-center">
            <a href="/" className="nav-center-logo">
              <svg width="45" height="35" viewBox="0 0 88 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Slanted L */}
                <path d="M12 4L32 44H42L22 4H12Z" fill="black" />
                {/* Connected slanted N part */}
                <path d="M45 44L65 4H75L55 44H45Z" fill="black" />
                <path d="M37.5 24H52.5L50.5 30H35.5L37.5 24Z" fill="black" />
              </svg>
            </a>
          </div>

          <div className="nav-right">
            <a href="https://store.landonorris.com/" target="_blank" rel="noopener noreferrer" className="btn-w is-nav">
              <svg width="14" height="15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: 'currentColor', strokeWidth: '2.5' }}>
                <path d="m10.931 5.783-.759.812c-1.132 1.212-2.89 1.212-4.022 0l-.76-.812C4.313 4.637 2.568 5.29 2.275 6.928l-1.238 7.18c-.227 1.318.652 2.543 1.838 2.543h10.588c1.185 0 2.064-1.225 1.838-2.544l-1.239-7.179c-.28-1.638-2.037-2.29-3.116-1.145h-.014ZM10.839 3.048 9.84 1.849C8.894.717 7.43.717 6.484 1.85l-1 1.199" />
              </svg>
              STORE
            </a>
            <button title="Open Menu" className="nav-ham">
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="main-w">

        {/* Hero Section */}
        <section className="s home-hero">
          {/* Background Video */}
          <video autoPlay loop muted playsInline className="hero-bg-video">
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

          {/* Next Race Left Component */}
          <div ref={nextRaceRef} className="home-hero-next-race-w">
            <div className="home-hero-next-race-container">
              {/* Outline border */}
              <div className="home-hero-next-race-bg">
                <svg width="100%" height="100%" viewBox="0 0 119 244" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M118.5 6v232a5.5 5.5 0 0 1-5.5 5.5H6a5.5 5.5 0 0 1-5.5-5.5V25A5.5 5.5 0 0 1 6 19.5h46.346c4.695 0 9.167-2 12.297-5.498l7.46-8.337A15.5 15.5 0 0 1 83.653.5H113a5.5 5.5 0 0 1 5.5 5.5Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>

              {/* Top Title */}
              <div className="next-race-title">Next Race</div>

              {/* Accurate Zandvoort Circuit Path */}
              <div className="next-race-circuit-w">
                <svg viewBox="0 0 120 70">
                  <path d="M 15 35 C 15 15, 35 10, 55 10 C 65 10, 80 15, 95 15 C 105 15, 110 30, 105 45 C 95 60, 80 60, 65 55 C 55 50, 45 45, 35 50 C 25 55, 10 50, 15 35" stroke="black" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Race Name */}
              <div className="next-race-name">Zandvoort GP</div>

              {/* Laurel Wreath */}
              <div className="next-race-laurel-w">
                <div className="laurel-svg-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 100 50" fill="currentColor" style={{ width: '85%', height: '85%' }}>
                    {/* Wreath left */}
                    <path d="M 40 45 C 30 45, 15 35, 15 25 C 15 15, 25 10, 35 15 C 33 20, 25 22, 23 28 C 21 34, 30 38, 38 40" />
                    {/* Wreath right */}
                    <path d="M 60 45 C 70 45, 85 35, 85 25 C 85 15, 75 10, 65 15 C 67 20, 75 22, 77 28 C 79 34, 70 38, 62 40" />
                    {/* Helmet center */}
                    <circle cx="50" cy="27" r="8" fill="none" stroke="black" strokeWidth="2" />
                    <path d="M 44 27 L 56 27 M 46 31 L 54 31" stroke="black" strokeWidth="1.5" />
                  </svg>
                </div>
                <div className="laurel-subtext">
                  McLAREN F1<br />
                  SINCE 2019
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Pin Section */}
        <section ref={horizontalSectionRef} className="s is-horizontal-track">
          <div className="horizontal-pin-sticky">
            <div ref={horizontalTrackRef} className="horizontal-track">
              {/* Card 1 */}
              <div className="horizontal-item-w">
                <div className="text-eyebrow">Qatar, 2024</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa04b14a1ca33c0b25_ln-home-horiz-1.webp" alt="Qatar 2024" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="horizontal-item-w">
                <div className="text-eyebrow">FIA Prize Giving, 2024</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baab12220595c8223b3_ln-home-horiz-2.webp" alt="FIA Prize Giving" />
                </div>
              </div>

              {/* Card 3 (Quote Card) */}
              <div className="horizontal-item-w" style={{ justifyContent: 'center' }}>
                <div className="horizontal-item-text">
                  It doesn’t matter <span className="span-green-off-white-1">where</span> you start, it’s <span className="span-green-off-white-1">how</span> you progress from there.
                </div>
              </div>

              {/* Card 4 */}
              <div className="horizontal-item-w">
                <div className="text-eyebrow">Miami GP, 2024</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302babcf12f0111d96322e_ln-home-horiz-3.webp" alt="Miami GP 2024" />
                </div>
              </div>

              {/* Card 5 */}
              <div className="horizontal-item-w">
                <div className="text-eyebrow">Monaco, 2023</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa798e2cc6e02ac38a_ln-home-horiz-4.webp" alt="Monaco 2023" />
                </div>
              </div>

              {/* Card 6 */}
              <div className="horizontal-item-w">
                <div className="text-eyebrow">Battersea, 2024</div>
                <div className="horizontal-item-img-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68302baa14a96f3cdd2f9a95_ln-home-horiz-6.webp" alt="Battersea 2024" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* On/Off Track Section */}
        <section className="s is-otot-home">
          <div className="c">
            <div className="otot-home-layout">
              <div className="otot-home-text-col">
                <div className="text-eyebrow">Racing Career</div>
                <h2 className="text-impact-reg-mona">
                  ON <br />
                  <span className="font-serif" style={{ color: '#d2ff00' }}>TRACK</span>
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#c4caac', lineHeight: '1.6' }}>
                  Most recent <strong>results</strong>, career stats and photos from trackside.
                </p>
                <div>
                  <a href="/on-track" className="btn-w">
                    Explore
                  </a>
                </div>
              </div>

              <div className="otot-home-text-col">
                <div className="text-eyebrow">Life & Projects</div>
                <h2 className="text-impact-reg-mona">
                  OFF <br />
                  <span className="font-serif" style={{ color: '#ffffff' }}>TRACK</span>
                </h2>
                <p style={{ fontSize: '1.2rem', color: '#c4caac', lineHeight: '1.6' }}>
                  <strong>Campaigns</strong>, shoots and other such promotional materials for fans.
                </p>
                <div>
                  <a href="/off-track" className="btn-w">
                    View Gallery
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="otot-home-bg">
            <div className="otot-home-img-w">
              <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67d18655b032045a4dc78e53_ln4-hp-lando-helmet.webp" alt="Lando Helmet" />
            </div>
            <div className="otot-home-img-w">
              <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67d18655b032045a4dc78e56_ln4-hp-lando-head.webp" alt="Lando Head" />
            </div>
          </div>
        </section>

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
              <span>LANDO</span>
              <span>NORRIS</span>
            </a>
          </div>
          <div className="footer-links">
            <a href="https://www.tiktok.com/@landonorris" target="_blank" rel="noopener noreferrer" className="footer-link-item">Tiktok</a>
            <a href="https://www.instagram.com/lando" target="_blank" rel="noopener noreferrer" className="footer-link-item">Instagram</a>
            <a href="https://www.youtube.com/landonorris04" target="_blank" rel="noopener noreferrer" className="footer-link-item">Youtube</a>
            <a href="https://www.twitch.tv/landonorris" target="_blank" rel="noopener noreferrer" className="footer-link-item">Twitch</a>
          </div>
          <div className="footer-copy">
            © 2026 LANDO NORRIS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App