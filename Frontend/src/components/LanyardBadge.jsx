import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function LanyardBadge({ onClose, photo, phone = '8320377379', email = 'darjinisarg49@gmail.com' }) {
  const [copied, setCopied] = useState(null)
  const [activeCard, setActiveCard] = useState('grey') // 'grey' or 'purple'
  const [isHovered, setIsHovered] = useState(false)
  const [shakeCount, setShakeCount] = useState(0)
  const stageRef = useRef(null)

  // Interactive mouse tracking with spring physics
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 32, stiffness: 45, mass: 1.2 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig)
  const cardMoveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)
  const cardMoveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-4, 4]), springConfig)

  // Keyboard Escape listener for instant smooth exit
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleCopy = (text, type, e) => {
    e.stopPropagation()
    navigator.clipboard?.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleMouseMove = (e) => {
    if (!stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setShakeCount((prev) => prev + 1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      className="lanyard-modal-root"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1, transition: { duration: 0.52 } }}
      onClick={onClose}
    >
      {/* 1. Dark Screen Backdrop (Fades out smoothly to light page on ESC) */}
      <motion.div
        className="lanyard-dark-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.48, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={onClose}
      />

      {/* 2. Background Corner Ambience & Graphics */}
      <motion.div
        className="lanyard-screen-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
        onClick={onClose}
      >
        {/* Top Left Branding */}
        <div className="lanyard-screen-corner top-left">
          <span className="lanyard-brand-nicacio">NISARG</span>
        </div>

        {/* Top Right Info & Close Button */}
        <div className="lanyard-screen-corner top-right">
          <span className="lanyard-country-year">India</span>
          <button
            type="button"
            className="lanyard-close-pill"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close modal"
          >
            <span>ESC</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Bottom Left Branding */}
        <div className="lanyard-screen-corner bottom-left">
          <span>Nisarg</span>
        </div>

        {/* Bottom Center Flip Card Action (Replacing www.nicaciobrands.com) */}
        <div className="lanyard-screen-corner bottom-center">
          <button
            type="button"
            className="lanyard-bottom-flip-btn"
            onClick={(e) => {
              e.stopPropagation()
              setActiveCard((prev) => (prev === 'grey' ? 'purple' : 'grey'))
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            <span>Flip Card</span>
          </button>
        </div>

        {/* Bottom Right Minimal Geometric Logo */}
        <div className="lanyard-screen-corner bottom-right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="lanyard-corner-icon">
            <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
            <line x1="2" y1="14" x2="14" y2="2" stroke="currentColor" strokeWidth="1.8" />
            <line x1="10" y1="22" x2="22" y2="10" stroke="currentColor" strokeWidth="1.8" />
            <line x1="2" y1="22" x2="22" y2="2" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
          </svg>
        </div>
      </motion.div>

      {/* 3. Hanging Lanyard Assembly (Spring drops in, flies straight UP into sky on ESC) */}
      <motion.div
        className="lanyard-assembly"
        initial={{ y: '-135vh' }}
        animate={{
          y: 0,
          transition: {
            type: 'spring',
            damping: 22,
            stiffness: 145,
            mass: 1.05
          }
        }}
        exit={{
          y: '-140vh',
          transition: {
            duration: 0.42,
            ease: [0.36, 0, 0.2, 1]
          }
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Purple Fabric Ribbon / Strap */}
        <motion.div
          className="lanyard-strap-w"
          animate={isHovered ? { rotate: [-0.6, 0.6, -0.3, 0] } : { rotate: 0 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        >
          <div className="lanyard-strap">
            {/* Woven Strap Texture & Stitches */}
            <div className="lanyard-strap-texture"></div>
            
            {/* Vertical White Branding on Strap */}
            <div className="lanyard-strap-text">
              <span>connect</span>
            </div>

            {/* Strap Bottom Loop Fold */}
            <div className="lanyard-strap-fold"></div>
          </div>

          {/* Realistic Chrome Metal Hardware Clip SVG */}
          <div className="lanyard-hardware">
            <svg width="56" height="78" viewBox="0 0 52 74" fill="none" className="lanyard-clip-svg">
              <defs>
                <linearGradient id="metal-silver-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4A4E58" />
                  <stop offset="25%" stopColor="#8C91A0" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="75%" stopColor="#9CA1B0" />
                  <stop offset="100%" stopColor="#3C4049" />
                </linearGradient>
                <linearGradient id="metal-highlight-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#A0A5B5" />
                  <stop offset="100%" stopColor="#3A3D45" />
                </linearGradient>
                <linearGradient id="metal-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#25272D" />
                  <stop offset="50%" stopColor="#4E525D" />
                  <stop offset="100%" stopColor="#1B1D22" />
                </linearGradient>
                <filter id="clip-shadow" x="-30%" y="-20%" width="160%" height="150%">
                  <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.6" />
                </filter>
              </defs>

              {/* D-Ring attached to strap */}
              <path
                d="M 12,6 L 40,6 C 44,6 47,9 47,13 C 47,21 38,26 26,26 C 14,26 5,21 5,13 C 5,9 8,6 12,6 Z"
                fill="none"
                stroke="url(#metal-silver-grad)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#clip-shadow)"
              />

              {/* Swivel Collar */}
              <rect x="20" y="24" width="12" height="8" rx="2" fill="url(#metal-silver-grad)" filter="url(#clip-shadow)" />
              <line x1="20" y1="28" x2="32" y2="28" stroke="#1A1C21" strokeWidth="1" />

              {/* Carabiner Hook Body */}
              <g filter="url(#clip-shadow)">
                <path
                  d="M 23,32 L 29,32 C 31,32 32,34 32,36 L 33,52 C 33,60 29,66 26,67 C 23,66 19,60 19,52 L 20,36 C 20,34 21,32 23,32 Z"
                  fill="url(#metal-dark-grad)"
                />
                {/* Trigger Spring Lever */}
                <path
                  d="M 29,38 L 33,42 L 30,50 L 26,45 Z"
                  fill="url(#metal-silver-grad)"
                />
                {/* Curved Snap Hook Claw looping through the card hole */}
                <path
                  d="M 26,48 C 29,48 31,52 31,58 C 31,67 24,71 21,71 C 18,71 16,66 18,60 C 19,57 22,55 24,56"
                  fill="none"
                  stroke="url(#metal-silver-grad)"
                  strokeWidth="4.2"
                  strokeLinecap="round"
                />
              </g>
            </svg>
          </div>
        </motion.div>

        {/* Cards Hanging Stage with Interactive Hover Shake & 3D Tilt */}
        <motion.div
          ref={stageRef}
          className={`lanyard-cards-stage ${isHovered ? 'is-shaking' : ''}`}
          key={shakeCount}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            x: cardMoveX,
            y: cardMoveY
          }}
          whileHover={{ scale: 1.015 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 1. Purple Card (#7433F1) */}
          <motion.div
            className={`lanyard-card-purple ${activeCard === 'purple' ? 'is-front' : 'is-back'}`}
            style={{
              zIndex: activeCard === 'purple' ? 10 : 1,
              transformOrigin: '50% 16px'
            }}
            animate={
              activeCard === 'purple'
                ? {
                    rotate: 0,
                    x: 0,
                    scale: 1
                  }
                : {
                    rotate: 20, // Positive 20deg swings bottom to the LEFT (matching Image 1!)
                    x: -26,
                    scale: 0.98
                  }
            }
            transition={{
              type: 'spring',
              damping: 18,
              stiffness: 140,
              mass: 0.95
            }}
            onClick={(e) => {
              e.stopPropagation()
              if (activeCard !== 'purple') {
                setActiveCard('purple')
              }
            }}
            title={activeCard !== 'purple' ? 'Click to flip purple card to front' : ''}
          >
            {/* Top punch hole slot */}
            <div className="lanyard-card-slot">
              <div className="slot-cutout-hole"></div>
            </div>

            {/* Top silver label strip (matching Image 1 on exposed left edge) */}
            <div className="purple-card-top-strip"></div>

            {/* User Request: Exactly like Image 1, "nisu" written vertically along the exposed bottom left edge (hidden when front card is active) */}
            {activeCard === 'grey' && (
              <div className="purple-card-nisu-text">
                <span>nisu</span>
              </div>
            )}

            {/* Front View Content (shown when purple card is flipped to front) */}
            {activeCard === 'purple' && (
              <div className="purple-card-front-content">
                <div className="purple-card-front-header">
                  <div className="purple-card-brand">
                    <span>nisu</span>
                    <span className="brand-dot">.</span>
                    <span>lab</span>
                  </div>
                  <div className="purple-card-logo-badge">
                    <span>01</span>
                  </div>
                </div>

                <div className="purple-card-front-body">
                  <div className="purple-creative-title">
                    <span>CREATIVE DEV</span>
                    <span className="purple-creative-sub">NISARG DARJI</span>
                  </div>

                  <div className="purple-skills-grid">
                    <span className="purple-skill-tag">REACT 19</span>
                    <span className="purple-skill-tag">THREE.JS</span>
                    <span className="purple-skill-tag">GSAP</span>
                    <span className="purple-skill-tag">SHADERS</span>
                    <span className="purple-skill-tag">LENIS</span>
                    <span className="purple-skill-tag">UI/UX</span>
                  </div>

                  <div className="purple-quote-box">
                    <p>"Crafting high-speed, visceral digital experiences through clean code &amp; creative grit."</p>
                  </div>
                </div>

                <div className="purple-card-actions">
                  <button
                    type="button"
                    className="purple-flip-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveCard('grey')
                    }}
                  >
                    <span>⇄ Flip to Photo Badge</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* 2. Grey Card (#1D2025) */}
          <motion.div
            className={`lanyard-card-grey ${activeCard === 'grey' ? 'is-front' : 'is-back'}`}
            style={{
              zIndex: activeCard === 'grey' ? 10 : 1,
              transformOrigin: '50% 16px'
            }}
            animate={
              activeCard === 'grey'
                ? {
                    rotate: 0,
                    x: 0,
                    scale: 1
                  }
                : {
                    rotate: -20, // Tilted to the right when in back
                    x: 28,
                    scale: 0.98
                  }
            }
            transition={{
              type: 'spring',
              damping: 18,
              stiffness: 140,
              mass: 0.95
            }}
            onClick={(e) => {
              if (activeCard !== 'grey') {
                e.stopPropagation()
                setActiveCard('grey')
              }
            }}
            title={activeCard !== 'grey' ? 'Click to flip grey card to front' : ''}
          >
            {/* Punched Slot Cutout for Lanyard Clip */}
            <div className="lanyard-card-slot front-slot">
              <div className="slot-cutout-hole"></div>
            </div>

            {/* Header: "nisarg" + Monogram Purple "N" */}
            <div className="grey-card-header">
              <div className="grey-card-brand">
                <span className="brand-brave">nisarg</span>
              </div>

              {/* Stylized Monogram Logo "N" */}
              <div className="grey-card-logo-b">
                <svg width="26" height="30" viewBox="0 0 24 28" fill="none">
                  <path
                    d="M 3,2 L 8.5,2 L 15.5,18 L 15.5,2 L 21,2 L 21,26 L 15.5,26 L 8.5,10 L 8.5,26 L 3,26 Z"
                    fill="#7433F1"
                  />
                  <rect x="7" y="2" width="2" height="6" fill="#1D2025" />
                  <rect x="15" y="20" width="2" height="6" fill="#1D2025" />
                </svg>
              </div>
            </div>

            {/* Middle Section: Portrait with 3D Contour Waves */}
            <div className="grey-card-photo-w">
              {/* Organic Topographical 3D Waves Background */}
              <div className="photo-contour-bg">
                <svg viewBox="0 0 360 250" className="contour-svg" fill="none">
                  {/* Left waves */}
                  <path d="M 45,35 C 18,68 12,136 28,193 C 40,221 62,238 90,244" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4" />
                  <path d="M 62,24 C 35,62 25,130 43,187 C 54,215 79,232 107,238" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
                  <path d="M 79,17 C 51,56 40,125 59,182 C 70,210 96,227 125,232" stroke="rgba(255,255,255,0.10)" strokeWidth="1.1" />
                  <path d="M 96,12 C 68,51 56,120 76,176 C 88,204 113,221 142,227" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

                  {/* Right waves */}
                  <path d="M 315,35 C 342,68 348,136 332,193 C 320,221 298,238 270,244" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4" />
                  <path d="M 298,24 C 325,62 335,130 317,187 C 306,215 281,232 253,238" stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />
                  <path d="M 281,17 C 309,56 320,125 301,182 C 290,210 264,227 235,232" stroke="rgba(255,255,255,0.10)" strokeWidth="1.1" />
                  <path d="M 264,12 C 292,51 304,120 284,176 C 272,204 247,221 218,227" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                </svg>
              </div>

              {/* Center Portrait Photo */}
              <div className="photo-frame">
                <img
                  src={photo}
                  alt="Nisarg Darji"
                  className="photo-img-monochrome"
                />
                <div className="photo-vignette-overlay"></div>
              </div>
            </div>

            {/* Bottom Section: Light Silver/Grey Badge Data Plate */}
            <div className="grey-card-plate">
              {/* Top Row: Job Title */}
              <div className="plate-header-row">
                <div className="plate-job-title">
                  <span>WEB DEV</span>
                  <span className="plate-job-subtitle">CREATIVE DEVELOPER</span>
                </div>
              </div>

              {/* Grid Divider */}
              <div className="plate-grid-divider"></div>

              {/* Data Fields */}
              <div className="plate-body-clean">
                {/* Row 1: Name */}
                <div className="plate-field-item field-name">
                  <span className="field-lbl">NAME</span>
                  <span className="field-val">NISARG DARJI</span>
                </div>

                {/* Horizontal Sub Divider */}
                <div className="plate-inner-divider"></div>

                {/* Row 2: Call & Email */}
                <div className="plate-fields-row">
                  <div
                    className="plate-field-item field-matricula clickable-item"
                    title="Click to copy phone number"
                    onClick={(e) => handleCopy('8320377379', 'phone', e)}
                  >
                    <span className="field-lbl">CALL / TEL</span>
                    <span className="field-val">{copied === 'phone' ? 'COPIED!' : '8320377379'}</span>
                  </div>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="plate-field-item field-base clickable-item plate-email-link"
                    title="Open in Gmail (darjinisarg49@gmail.com)"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="field-lbl">EMAIL</span>
                    <span className="field-val field-val-email">{email}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Direct Contact Buttons */}
            <div className="grey-card-actions">
              <a href={`tel:${phone}`} className="badge-action-btn" title="Call" onClick={(e) => e.stopPropagation()}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call</span>
              </a>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="badge-action-btn is-email"
                title="Send Email via Gmail"
                onClick={(e) => e.stopPropagation()}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span>Email</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
