import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import socialImage1 from '../assets/social_image_1.jpeg'
import socialImage2 from '../assets/social_image_2.png'
import socialImage3 from '../assets/social_image_3.jpeg'
import socialImage4 from '../assets/social_image_4.jpeg'


const Menu = ({ isOpen, onClose, onNavigate }) => {
  const overlayRef = useRef(null)
  const gridItemsRef = useRef([])
  const menuLinksRef = useRef([])
  const footerRef = useRef(null)
  const [activeLink, setActiveLink] = useState('HOME')
  const [hoveredLink, setHoveredLink] = useState(null)

  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling
      document.body.style.overflow = 'hidden'

      // Slide overlay panel down from top
      gsap.fromTo(overlayRef.current,
        { y: '-100%', autoAlpha: 1 },
        { y: '0%', duration: 0.55, ease: 'power4.out' }
      )

      // Stagger animate grid items (fade in & slide up)
      gsap.fromTo(gridItemsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: 'power3.out', delay: 0.2 }
      )

      // Animate images scale inside the grid items
      gridItemsRef.current.forEach((item) => {
        if (item) {
          const img = item.querySelector('img')
          if (img) {
            gsap.fromTo(img, 
              { scale: 1.25, x: 0, y: 0 }, 
              { scale: 1.1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
            )
          }
        }
      })

      // Stagger animate menu items
      gsap.fromTo(menuLinksRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: 'power3.out', delay: 0.25 }
      )

      // Fade in footer details
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.45 }
      )
    } else {
      document.body.style.overflow = ''

      // Slide overlay panel back up to top
      gsap.to(overlayRef.current, {
        y: '-100%',
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
          gsap.set(overlayRef.current, { autoAlpha: 0 })
        }
      })
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Mouse move parallax effect inside grid item image frames
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window

    const xDev = (clientX / innerWidth) - 0.5
    const yDev = (clientY / innerHeight) - 0.5

    gridItemsRef.current.forEach((item) => {
      if (item) {
        const img = item.querySelector('img')
        if (img) {
          const isHovered = item.matches(':hover')
          const baseScale = isHovered ? 1.2 : 1.1

          gsap.to(img, {
            x: xDev * 45,
            y: yDev * 45,
            scale: baseScale,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto'
          })
        }
      }
    })
  }

  const handleMouseLeaveContainer = () => {
    gridItemsRef.current.forEach((item) => {
      if (item) {
        const img = item.querySelector('img')
        if (img) {
          gsap.to(img, {
            x: 0,
            y: 0,
            scale: 1.1,
            duration: 1.0,
            ease: 'power3.out',
            overwrite: 'auto'
          })
        }
      }
    })
  }

  const handleLinkClick = (e, item) => {
    setActiveLink(item.label)
    onClose()

    if (item.isExternal) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
      return
    }

    if (onNavigate) {
      setTimeout(() => {
        onNavigate(item.href)
      }, 150)
    } else {
      setTimeout(() => {
        const el = document.querySelector(item.href)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
  }

  const menuItems = [
    { label: 'HOME', href: '#home', isExternal: false },
    { label: 'LIVE PROJECTS', href: 'https://github.com/Nisarg1223/my-live-projects', isExternal: true },
    { label: 'INTEREST', href: '#interest', isExternal: false },
    { label: 'CONTACT', href: '#contact', isExternal: false }
  ]

  const gridImages = [
    {
      url: socialImage1,
      alt: 'Nisarg Darji Editorial'
    },
    {
      url: socialImage2,
      alt: 'Nisarg Darji Classic'
    },
    {
      url: socialImage3,
      alt: 'Nisarg Darji Film'
    },
    {
      url: socialImage4,
      alt: 'Nisarg Darji Moments'
    }
  ]

  return (
    <div
      ref={overlayRef}
      className="menu-overlay"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveContainer}
    >
      {/* Background Topographic Image overlay */}
      <div className="menu-bg-topo"></div>

      <div className="menu-container">
        {/* Left Side: 2x2 Grid of Images */}
        <div className="menu-left-grid">
          {gridImages.map((img, index) => (
            <div
              key={index}
              ref={el => (gridItemsRef.current[index] = el)}
              className="menu-grid-item"
            >
              <div className="menu-grid-img-w">
                <img src={img.url} alt={img.alt} />
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Navigation & Links */}
        <div className="menu-right-content">
          {/* Header row inside menu */}
          <div className="menu-header">
            <a href="/" className="nav-logo-stacked desktop-menu-logo">
              <span className="nisarg">NISARG</span>
              <span>DARJI</span>
            </a>
            <a href="https://store.landonorris.com/" target="_blank" rel="noopener noreferrer" className="btn-w is-nav mobile-menu-store-btn">
              <svg width="14" height="15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: 'currentColor', strokeWidth: '2.5' }}>
                <path d="m10.931 5.783-.759.812c-1.132 1.212-2.89 1.212-4.022 0l-.76-.812C4.313 4.637 2.568 5.29 2.275 6.928l-1.238 7.18c-.227 1.318.652 2.543 1.838 2.543h10.588c1.185 0 2.064-1.225 1.838-2.544l-1.239-7.179c-.28-1.638-2.037-2.29-3.116-1.145h-.014ZM10.839 3.048 9.84 1.849C8.894.717 7.43.717 6.484 1.85l-1 1.199" />
              </svg>
              STORE
            </a>
            <div className="menu-header-actions">
              <a href="https://store.landonorris.com/" target="_blank" rel="noopener noreferrer" className="btn-w is-nav desktop-menu-store-btn">
                <svg width="14" height="15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ stroke: 'currentColor', strokeWidth: '2.5' }}>
                  <path d="m10.931 5.783-.759.812c-1.132 1.212-2.89 1.212-4.022 0l-.76-.812C4.313 4.637 2.568 5.29 2.275 6.928l-1.238 7.18c-.227 1.318.652 2.543 1.838 2.543h10.588c1.185 0 2.064-1.225 1.838-2.544l-1.239-7.179c-.28-1.638-2.037-2.29-3.116-1.145h-.014ZM10.839 3.048 9.84 1.849C8.894.717 7.43.717 6.484 1.85l-1 1.199" />
                </svg>
                STORE
              </a>
              <button title="Close Menu" className="menu-close-btn" onClick={onClose}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>

          {/* Main Links Stack */}
          <div className="menu-links-stack">
            {menuItems.map((item, index) => {
              const isSelected = activeLink === item.label
              const isAnyHovered = hoveredLink !== null
              const isCurrentHovered = hoveredLink === item.label
              
              // Dim other links when one is hovered
              let opacityStyle = 1
              if (isAnyHovered && !isCurrentHovered) {
                opacityStyle = 0.35
              }

              return (
                <div
                  key={item.label}
                  ref={el => (menuLinksRef.current[index] = el)}
                  className={`menu-link-wrapper ${isSelected ? 'is-active' : ''}`}
                  style={{ opacity: opacityStyle, transition: 'opacity 0.4s ease' }}
                  onMouseEnter={() => setHoveredLink(item.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={(e) => handleLinkClick(e, item)}
                >
                  <a
                    href={item.href}
                    target={item.isExternal ? '_blank' : undefined}
                    rel={item.isExternal ? 'noopener noreferrer' : undefined}
                    className="menu-link-item"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleLinkClick(e, item)
                    }}
                  >
                    {item.label}
                  </a>
                  
                  {/* Neon hand-drawn style squiggly line */}
                  <svg className="menu-link-squiggly" viewBox="0 0 300 40" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M5 20 C 60 5, 110 35, 150 20 C 190 5, 240 35, 295 20"
                      stroke="var(--color--lime)"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )
            })}

            {/* Laurel Wreath Badge under links on mobile */}
            <div className="menu-badge-w">
              <svg viewBox="0 0 100 50" fill="currentColor" className="menu-laurel-svg">
                <path d="M 40 45 C 30 45, 15 35, 15 25 C 15 15, 25 10, 35 15 C 33 20, 25 22, 23 28 C 21 34, 30 38, 38 40" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M 60 45 C 70 45, 85 35, 85 25 C 85 15, 75 10, 65 15 C 67 20, 75 22, 77 28 C 79 34, 70 38, 62 40" fill="none" stroke="currentColor" strokeWidth="2" />
                <text x="50" y="31" fontSize="11" fontWeight="800" textAnchor="middle" fill="#ffffff" style={{ fontFamily: 'Outfit' }}>N</text>
              </svg>
              <div className="menu-badge-text">CREATIVE DEV SINCE 2020</div>
            </div>
          </div>

          {/* Footer content */}
          <div ref={footerRef} className="menu-footer">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=darjinisarg49@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="menu-business-link"
            >
              BUSINESS ENQUIRIES
            </a>

            <div className="menu-socials">
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">TIKTOK</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YOUTUBE</a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer">TWITCH</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu
