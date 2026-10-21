import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import tcsCertJpg from '../assets/TCS_certificare.jpg'
import salCertPng from '../assets/sal_participate_certificate.png'
import microsoftCertJpg from '../assets/Microsoft_certificate.jpg'

// Special 3D isometric icons provided by user (exact match to Image 1)
import iconTopLeft from '../assets/special_icon_image_1.png'
import iconBottomLeft from '../assets/special_icon_image_2.png'
import iconBottomRight from '../assets/special_icon_image_3.png'
import iconTopRight from '../assets/special_icon_image_4.png'

const CERTIFICATES_DATA = [
  {
    id: 0,
    heading: 'To those who shape the world,',
    title: 'Tata Consultancy Services (TCS iON)',
    subtitle: 'TCS iON Career Edge — Young Professional',
    year: '2024',
    certImage: tcsCertJpg,
    tag: '01 / 03 · TCS iON',
    paragraphs: [
      'Design and engineering were never meant to happen through buttons, commands, and rigid workflows.',
      'It begins more naturally than that, through foundational logic, creative architecture, conversation, and iteration. Through the back-and-forth between instinct and judgment that gives technology its life.',
      'Completed industry training with Tata Consultancy Services (TCS iON), covering core IT systems, Artificial Intelligence foundations, agile delivery, executive communication, and professional etiquette.',
      'So you can build with precision, solve more thoughtfully, and stay closer to the ideas that matter most.'
    ],
    signoff: 'This is for you.'
  },
  {
    id: 1,
    heading: 'To those who shape the world,',
    title: 'SAL Education & Technical Institute',
    subtitle: 'Ideation Poster Presentation — Campus Summit',
    year: '2025',
    certImage: salCertPng,
    tag: '02 / 03 · SAL TECH',
    paragraphs: [
      'Innovation was never meant to remain locked in textbooks, theoretical equations, or isolated notebooks.',
      'It breathes when an idea meets real-world constraints. Through sketching, rapid prototyping, and the conviction to present breakthrough concepts before leading academic and technical mentors.',
      'Honoring creative ideation, architectural clarity, and technical presentation recognized during the Ideation Poster Presentation at SAL Education Campus.',
      'So you can explore without fear, question existing boundaries, and bring authentic vision to life.'
    ],
    signoff: 'This is for you.'
  },
  {
    id: 2,
    heading: 'To those who shape the world,',
    title: 'Microsoft Learn',
    subtitle: 'Transform Your Everyday Work with Agents',
    year: '2026',
    certImage: microsoftCertJpg,
    tag: '03 / 03 · MICROSOFT',
    paragraphs: [
      'Software engineering was never meant to be burdened by repetitive commands, fragmented tooling, and tedious glue code.',
      'Autonomous AI agents, generative reasoning, and agentic workflows are redefining how human intent translates into production software. Where intent can be expressed directly, and routine friction fades into the background.',
      'Official Microsoft Learn certification recognizing practical mastery in autonomous AI agents, intelligent multi-agent orchestration, and developer productivity transformation.',
      'So you can architect at scale, create with velocity, and stay focused on the work that truly shapes the world.'
    ],
    signoff: 'This is for you.'
  }
]

export default function CertificatePass({ onClose, initialIndex = 0, onSlideChange }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [slideDirection, setSlideDirection] = useState(1)
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (previewOpen) {
        if (e.key === 'Escape') setPreviewOpen(false)
        return
      }
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, previewOpen, currentIndex])

  const handlePrev = (e) => {
    if (e) e.stopPropagation()
    setSlideDirection(-1)
    setCurrentIndex((prev) => {
      const nextIdx = prev > 0 ? prev - 1 : CERTIFICATES_DATA.length - 1
      if (onSlideChange) onSlideChange(nextIdx)
      return nextIdx
    })
  }

  const handleNext = (e) => {
    if (e) e.stopPropagation()
    setSlideDirection(1)
    setCurrentIndex((prev) => {
      const nextIdx = prev < CERTIFICATES_DATA.length - 1 ? prev + 1 : 0
      if (onSlideChange) onSlideChange(nextIdx)
      return nextIdx
    })
  }

  const currentCert = CERTIFICATES_DATA[currentIndex]

  // Paper sheet lift & slide animation
  const paperVariants = {
    enter: (dir) => ({
      y: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.985
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.24 }
      }
    },
    exit: (dir) => ({
      y: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.985,
      transition: {
        y: { type: 'spring', stiffness: 260, damping: 26 },
        opacity: { duration: 0.18 }
      }
    })
  }

  return (
    <motion.div
      className="tracing-section-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      onClick={onClose}
    >
      {/* Top Right Minimal ESC Close Button */}
      <button
        type="button"
        className="tracing-esc-btn"
        onClick={onClose}
        aria-label="Close section"
        title="Press ESC to close"
      >
        <span>ESC</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Large Navigation Arrows (< and >) */}
      <button
        type="button"
        className="tracing-screen-nav-btn is-left"
        onClick={handlePrev}
        aria-label="Previous Certificate"
        title="Previous Certificate (←)"
      >
        <svg width="30" height="54" viewBox="0 0 34 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="26 10 10 30 26 50" />
        </svg>
      </button>

      <button
        type="button"
        className="tracing-screen-nav-btn is-right"
        onClick={handleNext}
        aria-label="Next Certificate"
        title="Next Certificate (→)"
      >
        <svg width="30" height="54" viewBox="0 0 34 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="8 10 24 30 8 50" />
        </svg>
      </button>

      {/* 4 FLOATING 3D ISOMETRIC CUBES (EXACT POSITIONS & ASSETS MATCHING IMAGE 1) */}
      
      {/* 1. Top-Left Cube (special_icon_image_1.png) */}
      <motion.div
        className="tracing-float-cube top-left-cube"
        animate={{ y: [-4, 4, -4], rotate: [-0.3, 0.3, -0.3] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={iconTopLeft}
          alt="Geometric Cube 1"
          className="tracing-cube-img"
          draggable="false"
        />
      </motion.div>

      {/* 2. Top-Right Cube (special_icon_image_4.png) */}
      <motion.div
        className="tracing-float-cube top-right-cube"
        animate={{ y: [4, -4, 4], rotate: [0.3, -0.3, 0.3] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={iconTopRight}
          alt="Geometric Cube 4"
          className="tracing-cube-img"
          draggable="false"
        />
      </motion.div>

      {/* 3. Bottom-Left Cube (special_icon_image_2.png) */}
      <motion.div
        className="tracing-float-cube bottom-left-cube"
        animate={{ y: [-5, 5, -5], rotate: [-0.4, 0.4, -0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={iconBottomLeft}
          alt="Geometric Cube 2"
          className="tracing-cube-img"
          draggable="false"
        />
      </motion.div>

      {/* 4. Bottom-Right Cube (special_icon_image_3.png) */}
      <motion.div
        className="tracing-float-cube bottom-right-cube"
        animate={{ y: [5, -5, 5], rotate: [0.4, -0.4, 0.4] }}
        transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={iconBottomRight}
          alt="Geometric Cube 3"
          className="tracing-cube-img"
          draggable="false"
        />
      </motion.div>

      {/* CENTER COMPOSITION: THE PHYSICAL BOX & PAPER ASSEMBLY MATCHING IMAGE 1 */}
      <div className="tracing-center-container" onClick={(e) => e.stopPropagation()}>
        {/* Handwritten Cursive Title on Top */}
        <div className="tracing-cursive-title">
          my certificate
        </div>

        <div className="tracing-stage-assembly">
          
          {/* 1. BACK BOX LAYER (Behind Paper, z-index: 10) */}
          <div className="tracing-box-back-layer">
            <svg
              viewBox="0 0 960 260"
              preserveAspectRatio="none"
              className="tracing-box-layer-svg"
            >
              {/* Back Wall Main Panel */}
              <rect
                x="100"
                y="20"
                width="760"
                height="240"
                fill="#D4C3A3"
                stroke="#1B1D24"
                strokeWidth="2.2"
              />
              {/* Back Wall Inner Top Groove Line */}
              <line
                x1="100"
                y1="38"
                x2="860"
                y2="38"
                stroke="#BCA985"
                strokeWidth="1.5"
              />

              {/* Left Side Wall (3D Perspective extending left) */}
              <polygon
                points="100,20 18,52 18,260 100,260"
                fill="#C4B290"
                stroke="#1B1D24"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {/* Left Side Inner Crease Line */}
              <polygon
                points="100,20 38,58 38,260 100,260"
                fill="#BCAB87"
                stroke="#1B1D24"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />

              {/* Right Side Wall (3D Perspective extending right) */}
              <polygon
                points="860,20 942,52 942,260 860,260"
                fill="#C4B290"
                stroke="#1B1D24"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {/* Right Side Inner Crease Line */}
              <polygon
                points="860,20 922,58 922,260 860,260"
                fill="#BCAB87"
                stroke="#1B1D24"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* 2. THE PAPER SHEET (Middle Layer, z-index: 20) */}
          <AnimatePresence custom={slideDirection} mode="wait">
            <motion.div
              key={currentIndex}
              custom={slideDirection}
              variants={paperVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="tracing-paper-sheet"
            >
              {/* Main Heading in sentence case matching Image 1 directly */}
              <h2 className="tracing-paper-heading">{currentCert.heading}</h2>

              {/* Editorial Paragraphs matching Image 1 structure */}
              <div className="tracing-paper-body">
                {currentCert.paragraphs.map((para, idx) => (
                  <p key={idx} className="tracing-paper-para">{para}</p>
                ))}
              </div>

              {/* Signoff and View Certificate Link matching Image 1 */}
              <div className="tracing-paper-footer">
                <span className="tracing-paper-signoff">{currentCert.signoff}</span>

                <button
                  type="button"
                  className="tracing-paper-view-btn"
                  onClick={() => setPreviewOpen(true)}
                  title="View official certificate credential"
                >
                  <span>View Official Certificate</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 3. FRONT BOX LAYER (In front of Paper, z-index: 30) */}
          <div className="tracing-box-front-layer">
            <svg
              viewBox="0 0 960 90"
              preserveAspectRatio="none"
              className="tracing-box-front-svg"
            >
              {/* Left Side Wall Front Corner */}
              <polygon
                points="18,0 100,0 100,90 18,90"
                fill="#C4B290"
                stroke="#1B1D24"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />

              {/* Right Side Wall Front Corner */}
              <polygon
                points="860,0 942,0 942,90 860,90"
                fill="#C4B290"
                stroke="#1B1D24"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />

              {/* Front Wall Main Face (#DECEB0) */}
              <rect
                x="100"
                y="0"
                width="760"
                height="90"
                fill="#DECEB0"
                stroke="#1B1D24"
                strokeWidth="2.2"
              />

              {/* Top Rim Highlight Stripe */}
              <rect
                x="100"
                y="0"
                width="760"
                height="8"
                fill="#E7DCBF"
                stroke="#1B1D24"
                strokeWidth="1.2"
              />

              {/* Horizontal Crease Line Across Front */}
              <line
                x1="18"
                y1="34"
                x2="942"
                y2="34"
                stroke="#554834"
                strokeWidth="1.4"
                strokeOpacity="0.45"
              />
            </svg>
          </div>

        </div>
      </div>

      {/* In-Modal High-Res Lightbox for Certificate Image */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            className="cert-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation()
              setPreviewOpen(false)
            }}
          >
            <motion.div
              className="cert-lightbox-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-lightbox-header">
                <div>
                  <h4 className="cert-lightbox-title">{currentCert.title}</h4>
                  <span className="cert-lightbox-sub">{currentCert.subtitle} · {currentCert.year}</span>
                </div>
                <div className="cert-lightbox-actions">
                  <a
                    href={currentCert.certImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-lightbox-ext-btn"
                  >
                    <span>Open Raw</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </a>
                  <button
                    type="button"
                    className="cert-lightbox-close-btn"
                    onClick={() => setPreviewOpen(false)}
                    aria-label="Close preview"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="cert-lightbox-img-wrapper">
                <img
                  src={currentCert.certImage}
                  alt={currentCert.title}
                  className="cert-lightbox-img"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
