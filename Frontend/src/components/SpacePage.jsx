import React, { useEffect, useRef, useState } from 'react'
import spaceMasterImg from '../assets/space_explore_master.jpg'
import './SpacePage.css'

export default function SpacePage({ onBack, onNavigate }) {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeModal, setActiveModal] = useState(null)
  const [hoveredHotspot, setHoveredHotspot] = useState(null)
  const [isSoundOn, setIsSoundOn] = useState(false)
  const audioContextRef = useRef(null)

  // Smooth mouse parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const { innerWidth, innerHeight } = window
    const x = (e.clientX / innerWidth - 0.5) * 16
    const y = (e.clientY / innerHeight - 0.5) * 12
    setMousePos({ x, y })
  }

  // Synthesized Retro Sci-Fi Ambient Audio Drone using Web Audio API
  const toggleSound = () => {
    if (!isSoundOn) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext
        if (AudioCtx) {
          const ctx = new AudioCtx()
          audioContextRef.current = ctx

          // Primary sub drone
          const osc1 = ctx.createOscillator()
          const gain1 = ctx.createGain()
          osc1.type = 'sawtooth'
          osc1.frequency.setValueAtTime(110, ctx.currentTime) // A2
          gain1.gain.setValueAtTime(0.015, ctx.currentTime)

          // Secondary celestial fifth
          const osc2 = ctx.createOscillator()
          const gain2 = ctx.createGain()
          osc2.type = 'sine'
          osc2.frequency.setValueAtTime(164.81, ctx.currentTime) // E3
          gain2.gain.setValueAtTime(0.02, ctx.currentTime)

          // Low-pass warm filter
          const filter = ctx.createBiquadFilter()
          filter.type = 'lowpass'
          filter.frequency.setValueAtTime(280, ctx.currentTime)
          filter.Q.setValueAtTime(2.5, ctx.currentTime)

          osc1.connect(gain1)
          osc2.connect(gain2)
          gain1.connect(filter)
          gain2.connect(filter)
          filter.connect(ctx.destination)

          osc1.start()
          osc2.start()
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

  // Soft sci-fi blip on hotspot click
  const playBlip = (freq = 440) => {
    if (!isSoundOn && !audioContextRef.current) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return
      const ctx = audioContextRef.current || new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12)
      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.16)
    } catch (e) {}
  }

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const handleNav = (target) => {
    if (onNavigate) {
      onNavigate(target)
    } else if (onBack) {
      onBack()
    }
  }

  const HOTSPOTS = [
    {
      id: 'alien',
      title: 'Xenomorph Observer',
      desc: '"Greetings from the Zeta Reticuli system! We come in peace."',
      coords: { left: '8.5%', top: '48%' },
      soundFreq: 520
    },
    {
      id: 'saturn',
      title: 'Saturn & Planetary Rings',
      desc: 'Gas giant with rings spanning 282,000 km, composed of ice particles and cosmic dust.',
      coords: { right: '14%', top: '30%' },
      soundFreq: 330
    },
    {
      id: 'ufo',
      title: 'Type-II Scout Vessel',
      desc: 'Antigravity propulsion saucer utilizing magnetic displacement drives.',
      coords: { left: '33%', bottom: '18%' },
      soundFreq: 640
    },
    {
      id: 'telescope',
      title: 'Deep Space Refractor',
      desc: 'Optical astronomical telescope calibrated to view distant nebulae and star clusters.',
      coords: { left: '58%', bottom: '12%' },
      soundFreq: 400
    },
    {
      id: 'astronaut',
      title: 'Major Tom • EVA Mission',
      desc: 'Extravehicular mobility unit drifting weightlessly across the cosmic void.',
      coords: { right: '18%', bottom: '26%' },
      soundFreq: 580
    },
    {
      id: 'moon',
      title: 'Lunar Surface',
      desc: 'Crater Tycho and volcanic basalt plains of Mare Tranquillitatis.',
      coords: { left: '12%', bottom: '14%' },
      soundFreq: 300
    }
  ]

  return (
    <div
      ref={containerRef}
      className="space-page-container"
      onMouseMove={handleMouseMove}
    >
      {/* Vintage Paper Texture Overlay */}
      <div className="space-grain-overlay" aria-hidden="true"></div>

      {/* Retro CRT Scanline Overlay */}
      <div className="space-scanlines" aria-hidden="true"></div>

      {/* Floating Micro Cosmic Dust Particles */}
      <div className="space-dust-particles" aria-hidden="true">
        <span className="cosmic-dust d1" style={{ top: '15%', left: '22%' }}></span>
        <span className="cosmic-dust d2" style={{ top: '28%', left: '45%' }}></span>
        <span className="cosmic-dust d3" style={{ top: '42%', left: '78%' }}></span>
        <span className="cosmic-dust d1" style={{ top: '65%', left: '18%' }}></span>
        <span className="cosmic-dust d2" style={{ top: '75%', left: '50%' }}></span>
        <span className="cosmic-dust d3" style={{ top: '82%', left: '88%' }}></span>
      </div>

      {/* TOP NAVIGATION BAR */}
      <header className="space-header">
        {/* Left: VOYAGER Logo & Branding */}
        <button
          type="button"
          className="voyager-brand-btn"
          onClick={() => handleNav('/interest')}
          title="Return to Interest Page"
        >
          <div className="voyager-swirl-icon" aria-hidden="true">
            <svg viewBox="0 0 100 100" className="swirl-svg">
              <path
                d="M50 8 C68 8, 86 22, 88 44 C90 66, 74 88, 50 90 C26 92, 10 74, 12 52 C14 34, 28 20, 46 22 C62 24, 74 38, 72 54 C70 66, 58 76, 46 74 C36 72, 30 62, 32 52 C34 44, 42 40, 48 42 C54 44, 56 50, 52 54 C48 56, 46 52, 48 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="7.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="voyager-brand-text">VOYAGER</span>
        </button>

        {/* Right Navigation Links & Audio Pill */}
        <div className="space-header-right">
          {/* Audio Synthesizer Pill */}
          <button
            type="button"
            className={`space-audio-pill ${isSoundOn ? 'active' : ''}`}
            onClick={toggleSound}
            aria-label="Toggle ambient space sound"
          >
            <span className="pill-pulse-dot"></span>
            <span className="pill-label">{isSoundOn ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>

          {/* Links */}
          <nav className="space-nav-menu" aria-label="Space Navigation">
            <button
              type="button"
              className="space-nav-item"
              onClick={() => setActiveModal('news')}
            >
              NEWS
            </button>
            <button
              type="button"
              className="space-nav-item"
              onClick={() => setActiveModal('observing')}
            >
              OBSERVING
            </button>
            <button
              type="button"
              className="space-nav-item"
              onClick={() => setActiveModal('resources')}
            >
              RESOURCES &amp; EDUCATION
            </button>
            <button
              type="button"
              className="space-nav-item"
              onClick={() => handleNav('#projects')}
            >
              PROJECTS
            </button>
            <button
              type="button"
              className="space-nav-item"
              onClick={() => handleNav('#contact')}
            >
              CONTACT
            </button>
            <button
              type="button"
              className="space-nav-item"
              onClick={() => handleNav('#about')}
            >
              ABOUT US
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN VIEWPORT STAGE */}
      <main className="space-stage">
        {/* Master Illustration Canvas with subtle mouse tilt parallax */}
        <div
          className="space-canvas-wrapper"
          style={{
            transform: `perspective(1200px) rotateY(${mousePos.x * 0.25}deg) rotateX(${mousePos.y * -0.2}deg) translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`
          }}
        >
          {/* Pristine Master Artwork */}
          <img
            src={spaceMasterImg}
            alt="Explore The Space - Retro Vintage Illustration"
            className="space-master-image"
            draggable="false"
          />

          {/* INTERACTIVE HOTSPOTS OVER ARTWORK */}
          {HOTSPOTS.map((spot) => (
            <div
              key={spot.id}
              className={`space-hotspot spot-${spot.id} ${hoveredHotspot?.id === spot.id ? 'is-hovered' : ''}`}
              style={{ ...spot.coords }}
              onMouseEnter={() => {
                setHoveredHotspot(spot)
                playBlip(spot.soundFreq)
              }}
              onMouseLeave={() => setHoveredHotspot(null)}
              onClick={() => {
                setActiveModal(spot.id)
                playBlip(spot.soundFreq * 1.2)
              }}
              role="button"
              tabIndex={0}
              aria-label={spot.title}
            >
              {/* Pulsing Target Dot */}
              <div className="hotspot-beacon">
                <span className="beacon-core"></span>
                <span className="beacon-ring"></span>
              </div>

              {/* Floating Comic Speech Bubble Card */}
              {hoveredHotspot?.id === spot.id && (
                <div className="hotspot-popup">
                  <div className="popup-tag">{spot.title}</div>
                  <div className="popup-desc">{spot.desc}</div>
                  <div className="popup-hint">Click to inspect</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* BOTTOM ACTION BAR */}
      <footer className="space-bottom-bar">
        <button
          type="button"
          className="space-return-btn"
          onClick={() => handleNav('/interest')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          RETURN TO INTEREST
        </button>

        <div className="space-meta-badge">
          <span>VOYAGER INTERSTELLAR ARCHIVE</span>
          <span className="badge-sep">•</span>
          <span>SECTOR 001</span>
        </div>

        <button
          type="button"
          className="space-return-btn portfolio-btn"
          onClick={() => handleNav('#home')}
        >
          PORTFOLIO HOME
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </footer>

      {/* DETAIL MODAL / DISPATCH POPUP */}
      {activeModal && (
        <div className="space-modal-backdrop" onClick={() => setActiveModal(null)}>
          <div className="space-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="space-modal-close"
              onClick={() => setActiveModal(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            {activeModal === 'news' && (
              <div className="modal-content">
                <div className="modal-eyebrow">VOYAGER DISPATCH #2026</div>
                <h2 className="modal-title">INTERSTELLAR COMMUNICATIONS ACTIVE</h2>
                <p className="modal-body">
                  Voyager 1 and 2 continue transmitting scientific measurements from interstellar space.
                  Telemetry confirms cosmic rays, interstellar magnetic field orientation, and plasma wave resonance remain optimal.
                </p>
                <div className="modal-meta">Status: Interstellar Space • 24.5 Billion KM from Earth</div>
              </div>
            )}

            {activeModal === 'observing' && (
              <div className="modal-content">
                <div className="modal-eyebrow">OBSERVING LOG</div>
                <h2 className="modal-title">DEEP FIELD CARTOGRAPHY</h2>
                <p className="modal-body">
                  Observation session targeting Saturnian ring divisions, lunar crater morphology, and optical anomalies in Sector 4.
                  All celestial coordinates registered in the cosmic catalog.
                </p>
                <div className="modal-meta">Optics: 1200mm Refractor • Magnification 250x</div>
              </div>
            )}

            {activeModal === 'resources' && (
              <div className="modal-content">
                <div className="modal-eyebrow">ACADEMIC &amp; RESEARCH ARCHIVES</div>
                <h2 className="modal-title">ASTROPHYSICS &amp; COMPUTATIONAL ASTRONOMY</h2>
                <p className="modal-body">
                  Curated compendium of computational orbital mechanics, celestial navigation algorithms, and deep space telemetry protocols.
                </p>
                <div className="modal-tags">
                  <span>Orbital Dynamics</span>
                  <span>Spectroscopy</span>
                  <span>Radio Astronomy</span>
                  <span>Planetary Geology</span>
                </div>
              </div>
            )}

            {/* Element Hotspots Modals */}
            {activeModal === 'alien' && (
              <div className="modal-content">
                <div className="modal-eyebrow">FIRST CONTACT DOSSIER</div>
                <h2 className="modal-title">ZETA RETICULI EMISSARY</h2>
                <p className="modal-body">
                  A humanoid extraterrestrial entity characterized by elongated cranium, high-contrast ocular membranes, and non-verbal harmonic communication.
                  Waving in universal sign of greeting.
                </p>
                <div className="modal-meta">Disposition: Friendly • Origin: Zeta 2 Reticuli</div>
              </div>
            )}

            {activeModal === 'saturn' && (
              <div className="modal-content">
                <div className="modal-eyebrow">SOLAR SYSTEM SURVEY</div>
                <h2 className="modal-title">SATURN &amp; THE RING COMPLEX</h2>
                <p className="modal-body">
                  The sixth planet from the Sun, adorned with spectacular concentric rings of water ice and rocky debris.
                  Featuring Titan, Enceladus, and over 140 confirmed natural satellites.
                </p>
                <div className="modal-meta">Orbital Period: 29.4 Earth Years • Diameter: 120,536 km</div>
              </div>
            )}

            {activeModal === 'ufo' && (
              <div className="modal-content">
                <div className="modal-eyebrow">AEROSPACE CLASSIFIED</div>
                <h2 className="modal-title">ELECTROMAGNETIC LEVITATION SAUCER</h2>
                <p className="modal-body">
                  Discoid aerodyne featuring lower perimeter ionization emitters and downward directed coherent tractor rays.
                  Exhibits zero aerodynamic drag and instantaneous vector change capabilities.
                </p>
                <div className="modal-meta">Propulsion: Magnetohydrodynamic • Signature: Coherent Photon Beam</div>
              </div>
            )}

            {activeModal === 'astronaut' && (
              <div className="modal-content">
                <div className="modal-eyebrow">ASTRONAUTICS &amp; HUMAN SPACEFLIGHT</div>
                <h2 className="modal-title">EXTRAVEHICULAR MOBILITY UNIT</h2>
                <p className="modal-body">
                  Spacewalker suspended in orbital freefall. Pressurized multilayer micrometeoroid garment with gold-plated visor reflecting the cosmic panorama.
                </p>
                <div className="modal-meta">Velocity: 7.8 km/s • Atmosphere: 100% Oxygen @ 4.3 psi</div>
              </div>
            )}

            {activeModal === 'telescope' && (
              <div className="modal-content">
                <div className="modal-eyebrow">ASTRONOMICAL INSTRUMENTATION</div>
                <h2 className="modal-title">EQUATORIAL REFRACTING TELESCOPE</h2>
                <p className="modal-body">
                  Doublet achromatic refractor mounted on heavy timber tripod with slow-motion manual tracking cables.
                  Designed for lunar planetary observation and binary star separation.
                </p>
                <div className="modal-meta">Aperture: 150mm • Focal Ratio: f/8</div>
              </div>
            )}

            {activeModal === 'moon' && (
              <div className="modal-content">
                <div className="modal-eyebrow">LUNAR RECONNAISSANCE</div>
                <h2 className="modal-title">LUNA: THE NATURAL SATELLITE</h2>
                <p className="modal-body">
                  Tidally locked celestial companion of Earth. Highlighted with prominent impact ejecta rays and ancient mare basalt oceans.
                </p>
                <div className="modal-meta">Surface Gravity: 1.62 m/s² • Distance: 384,400 km</div>
              </div>
            )}

            <div className="modal-footer">
              <button
                type="button"
                className="modal-action-btn"
                onClick={() => setActiveModal(null)}
              >
                CLOSE DOSSIER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
