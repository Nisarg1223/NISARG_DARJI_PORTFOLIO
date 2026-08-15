import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import heroImage from './assets/Hero_image.png'
import backgroundVideo from './assets/test_video_7.mp4'
import Navbar from './components/Navbar'
import secondpageImage from './assets/secondpage_image.png'
import signatureImage from './assets/signature_image.png'
import Menu from './components/Menu'
import taskelloHeaderBg from './assets/taskello_header_bg.png'
import card1Image from './assets/card_1_image.png'
import card2Image from './assets/card_2_image.png'
import contactCardImage from './assets/contact_card_1.png'
import experienceCardImage from './assets/Experiance_card.png'
import certificatesCardImage from './assets/certificates_card.png'
import githubCardImage from './assets/github_card.png'
import toolsCardImage from './assets/tools_card.png'
import achievementsCardImage from './assets/achivements_cards.png'
import linkedinCardImage from './assets/Linked_card.png'
import myPhoto from './assets/my_photo.png'

const SOCIAL_CARDS = [
  {
    id: 'linkedin',
    image: linkedinCardImage,
    alt: 'LinkedIn Card',
    className: '',
    isContact: false,
    quote: 'Creating my Card has been an eye-opening experience. While digital portfolio platforms are not new, this one feels truly tailored to artists and curators. Viewers can immediately access a curated, high-resolution portfolio alongside my social links and contact information, allowing my work to continue speaking even when I am not in the room.',
    name: 'Nisarg Darji',
    role: 'Full Stack Developer',
    location: 'India',
    flagType: 'in'
  },
  {
    id: 'tools',
    image: toolsCardImage,
    alt: 'Tools Card',
    className: '',
    isContact: false,
    quote: 'Mastering modern web tools and frameworks has been an eye-opening journey. From React and Node to GSAP, LangChain, and GenAI, having the right arsenal enables crafting high-performance, immersive web applications that push digital boundaries.',
    name: 'Nisarg Darji',
    role: 'Full Stack Developer',
    location: 'India',
    flagType: 'in'
  },
  {
    id: 'experience',
    image: experienceCardImage,
    alt: 'Experience Card',
    className: '',
    isContact: false,
    quote: 'Hands-on building and shipping real-world products has shaped my engineering philosophy. From frontend animations to full-stack architectures, every project is crafted with high standards of performance, scalability, and user empathy.',
    name: 'Nisarg Darji',
    role: 'Full Stack Developer',
    location: 'India',
    flagType: 'in'
  },
  {
    id: 'contact',
    image: contactCardImage,
    alt: 'Contact Card',
    className: 'is-contact-card-w',
    isContact: true,
    quote: 'Creating my Card has been an eye-opening experience. While digital portfolio platforms are not new, this one feels truly tailored to artists and curators. Viewers can immediately access a curated, high-resolution portfolio alongside my social links and contact information, allowing my work to continue speaking even when I am not in the room.',
    name: 'Nisarg Darji',
    role: 'Full Stack Developer',
    location: 'India',
    flagType: 'in'
  },
  {
    id: 'certificates',
    image: certificatesCardImage,
    alt: 'Certificates Card',
    className: '',
    isContact: false,
    quote: 'Continuous learning is the cornerstone of my development craft. Pursuing rigorous certifications across full-stack ecosystems, generative AI, and algorithms ensures every solution I design is modern, robust, and industry-proven.',
    name: 'Nisarg Darji',
    role: 'Full Stack Developer',
    location: 'India',
    flagType: 'in'
  },
  {
    id: 'achievements',
    image: achievementsCardImage,
    alt: 'Achievements Card',
    className: '',
    isContact: false,
    quote: 'Pushing limits through hackathons, innovative web creations, and impactful technical milestones has driven my growth. These achievements represent the dedication to craft, grit, and passion I bring to every product I build.',
    name: 'Nisarg Darji',
    role: 'Full Stack Developer',
    location: 'India',
    flagType: 'in'
  },
  {
    id: 'github',
    image: githubCardImage,
    alt: 'GitHub Card',
    className: '',
    isContact: false,
    quote: 'Open source and public repositories are the truest reflection of a developer\'s journey. From modular components to experimental animations, my GitHub repositories showcase a commitment to clean code and continuous exploration.',
    name: 'Nisarg Darji',
    role: 'Full Stack Developer',
    location: 'India',
    flagType: 'in'
  },
]

const SKILLS_DATA = [
  "HTML",
  "CSS",
  "SCSS",
  "Javascript",
  "React js",
  "Redux js",
  "Express js",
  "Node js",
  "Mongo DB",
  "GSAP",
  "Langchain",
  "GenAI",
  "Github",
  "Rest API",
  "DESIGNING",
  "DEVELOPING",
  "EXPLAINING & technical concepts"
]

const HELMETS_DATA = [
  {
    title: "Season",
    year: "2025",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b3e6c7ab86033cf172c_In-helm-2025-Season-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b411c575b2f777125f6_In-helm-2025-Season-hover.webp"
  },
  {
    title: "Discoball",
    year: "2025",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b2259159e5170d2b923_In-helm-2025-Discoball-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b24037a1e7681195c20_In-helm-2025-Discoball-hover.webp"
  },
  {
    title: "Dark Glitter",
    year: "2025",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305aff4692de3e7ea12251_In-helm-2025-DarkGlitter-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b03644c91f0a8de407b_In-helm-2025-DarkGlitter-hover.webp"
  },
  {
    title: "Season",
    year: "2024",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305aeac44aa40f7bda5460_In-helm-2024-Season-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305af56183c37dfd14ff3f_In-helm-2024-Season-hover.webp"
  },
  {
    title: "Porcelain",
    year: "2024",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305acf3fccf71c6d72607b_In-helm-2024-Porcelain-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305ad3a594ec37bd1d32cb_In-helm-2024-Porcelain-hover.webp"
  },
  {
    title: "Japan",
    year: "2024",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a980c399022066600a6_In-helm-2024-Japan-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a9b1716264ea006064b_In-helm-2024-Japan-hover.webp"
  },
  {
    title: "GIF",
    year: "2024",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a7d4e96d5f8f44f7803_In-helm-2024-GIF%20Helmet-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a8e13a9b59a5e99cafe_In-helm-2024-GIF%20Helmet-hover.webp"
  },
  {
    title: "Dark Mode",
    year: "2024",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a59417d51c0a58c32c6_In-helm-2024-DarkMode-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a5cdaa389d0c080afc7_In-helm-2024-DarkMode-hover.webp"
  },
  {
    title: "Race",
    year: "2023",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a459178b78319e05b55_In-helm-2023-Race%20100-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a47417d51c0a58c28a6_In-helm-2023-Race%20100-hover.webp"
  },
  {
    title: "Las Vegas",
    year: "2023",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a2e3fccf71c6d71e5a8_In-helm-2023-Las%20Vegas-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a3053985f797745cdfc_In-helm-2023-Las%20Vegas-hover.webp"
  },
  {
    title: "Chrome",
    year: "2023",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a153de4a824d397d21d_In-helm-2023-Chrome-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305a175a720573cbd3000f_In-helm-2023-Chrome-hover.webp"
  },
  {
    title: "Basketball",
    year: "2022",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/683052a8a475dfa06075ca17_In-helm-2022-Basketball-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/683052ab1073a33331767d2a_In-helm-2022-Basketball-hover.webp"
  },
  {
    title: "Season",
    year: "2021",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305038652a87f86290bf3b_ln-helm-2021-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305b57817f019bc368a7b6_ln-helm-2021-hover.webp"
  },
  {
    title: "Silverstone",
    year: "2020",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305203f28384dcf8ef81cb_In-helm-2020-Silverstone-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305223cddca8f1ea359a7a_In-helm-2020-Silverstone-hover.webp"
  },
  {
    title: "Season",
    year: "2019",
    base: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/68305139c5020a27624aa793_In-helm-2019-base.webp",
    hover: "https://cdn.prod.website-files.com/67d97a68478fe87e30c67abe/6830513c652a87f862917de3_In-helm-2019-hover.webp"
  }
];

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

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedSocialCard, setSelectedSocialCard] = useState(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(updateLenis)

    // Disable lag smoothing in GSAP to prevent scroll syncing issues
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(updateLenis)
    }
  }, [])

  useEffect(() => {
    if (lenisRef.current) {
      if (isMenuOpen || selectedSocialCard) {
        lenisRef.current.stop()
      } else {
        lenisRef.current.start()
      }
    }
  }, [isMenuOpen, selectedSocialCard])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedSocialCard) return
      if (e.key === 'Escape') {
        setSelectedSocialCard(null)
      } else if (e.key === 'ArrowRight') {
        const currentIndex = SOCIAL_CARDS.findIndex((c) => c.id === selectedSocialCard.id)
        if (currentIndex !== -1) {
          const nextIndex = (currentIndex + 1) % SOCIAL_CARDS.length
          setSelectedSocialCard(SOCIAL_CARDS[nextIndex])
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = SOCIAL_CARDS.findIndex((c) => c.id === selectedSocialCard.id)
        if (currentIndex !== -1) {
          const prevIndex = (currentIndex - 1 + SOCIAL_CARDS.length) % SOCIAL_CARDS.length
          setSelectedSocialCard(SOCIAL_CARDS[prevIndex])
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedSocialCard])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.35; // Slow down background video significantly
    }

    // 1. Pre-build Statement Text Block Reveal Timeline
    const statementContainer = statementContainerRef.current
    let statementTimeline = null

    if (statementContainer) {
      gsap.set(statementContainer, { xPercent: -50, yPercent: -50, left: '50%', top: '50%' })
      const sBlocks = statementContainer.querySelectorAll('.reveal-line-block')
      const sTexts = statementContainer.querySelectorAll('.reveal-line-text')
      if (sBlocks.length > 0 && sTexts.length > 0) {
        statementTimeline = gsap.timeline()
        sBlocks.forEach((block, index) => {
          const text = sTexts[index]
          const startTime = index * 0.14
          statementTimeline
            .to(block, { scaleX: 1, duration: 0.32, ease: 'power2.inOut', transformOrigin: 'left' }, startTime)
            .set(text, { opacity: 1 }, startTime + 0.3)
            .to(block, { scaleX: 0, duration: 0.32, ease: 'power2.inOut', transformOrigin: 'right' }, startTime + 0.32)
        })
      }
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

      // 1. Scale down the card (responsive scale for mobile/tablet/desktop)
      const targetScale = window.innerWidth <= 767 ? 0.7 : window.innerWidth <= 991 ? 0.55 : 0.45
      const targetRadius = window.innerWidth <= 767 ? '24px' : '40px'

      heroTimeline.fromTo(heroCard,
        {
          scale: 1,
          borderRadius: '0px',
          filter: 'grayscale(0) brightness(1)'
        },
        {
          scale: targetScale,
          borderRadius: targetRadius,
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

      // 4. Scroll statement text container upwards into the viewport early and rapidly
      if (statementContainer) {
        heroTimeline.fromTo(statementContainer,
          { y: '35vh', opacity: 0 },
          { y: '0vh', opacity: 1, duration: 0.25, ease: 'power2.out' },
          0.45
        )

        // 5. Add staggered line block reveal timeline to scrub animation
        if (statementTimeline) {
          heroTimeline.add(statementTimeline, 0.65)
        }

        // 6. Fade out statement container and move it slightly up as horizontal track starts sliding in
        heroTimeline.to(statementContainer,
          { y: '-50vh', opacity: 0, ease: 'power1.inOut', duration: 0.4 },
          1.85
        )
      }



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
      const playOtotReveal = () => {
        const ototBlocks = ototPin.querySelectorAll('.reveal-line-block')
        const ototTexts = ototPin.querySelectorAll('.reveal-line-text')
        gsap.set(ototTexts, { opacity: 1 })
        ototBlocks.forEach((block, index) => {
          gsap.timeline()
            .to(block, { scaleX: 1, duration: 0.4, ease: 'power2.inOut', transformOrigin: 'left' }, index * 0.1)
            .to(block, { scaleX: 0, duration: 0.4, ease: 'power2.inOut', transformOrigin: 'right' }, index * 0.1 + 0.4)
        })
      }

      const resetOtotReveal = () => {
        const ototBlocks = ototPin.querySelectorAll('.reveal-line-block')
        const ototTexts = ototPin.querySelectorAll('.reveal-line-text')
        gsap.set(ototBlocks, { scaleX: 0, transformOrigin: 'left' })
        gsap.set(ototTexts, { opacity: 1 })
      }

      ototTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ototPin,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: playOtotReveal,
          onEnterBack: playOtotReveal,
          onLeave: resetOtotReveal,
          onLeaveBack: resetOtotReveal
        }
      })

      // 1. Slide up the text layout
      ototTimeline.to('.otot-home-layout', {
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

    // 5. Helmets Entry ScrollTrigger (Animating inner .helmet-grid-item)
    let helmetsTween = null
    const helmetCards = document.querySelectorAll('.helmet-grid-item')
    if (helmetCards.length > 0) {
      helmetsTween = gsap.fromTo(helmetCards, {
        opacity: 0,
        y: 40
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.helmet-grid',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      })
    }

    // 6. Lando Store Parallax ScrollTrigger
    let exeTweens = []
    if (document.querySelector('.is-lando-exe')) {
      const t1 = gsap.to('.exe-cta-img-w.is-1 img', {
        y: -50,
        scrollTrigger: {
          trigger: '.is-lando-exe',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
      const t2 = gsap.to('.exe-cta-img-w.is-2 img', {
        y: -40,
        scrollTrigger: {
          trigger: '.is-lando-exe',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      })
      const t3 = gsap.to('.exe-cta-img-w.is-3 img', {
        y: -40,
        scrollTrigger: {
          trigger: '.is-lando-exe',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8
        }
      })
      const t4 = gsap.to('.exe-cta-img-w.is-4 img', {
        y: -30,
        scrollTrigger: {
          trigger: '.is-lando-exe',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })
      const t5 = gsap.to('.exe-cta-sticker-w', {
        rotate: 15,
        y: -25,
        scrollTrigger: {
          trigger: '.is-lando-exe',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      })
      const t6 = gsap.fromTo('.exe-top-visor', {
        clipPath: 'ellipse(100% 0% at 50% 0%)'
      }, {
        clipPath: 'ellipse(70% 100% at 50% 0%)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.is-lando-exe',
          start: 'top bottom',
          end: 'top top',
          scrub: true
        }
      })
      exeTweens.push(t1, t2, t3, t4, t5, t6)
    }

    // 7. Socials cards fanning ScrollTrigger
    const getSocialCardTargets = () => {
      const w = window.innerWidth
      if (w <= 479) {
        return [
          { x: '-8.5rem', y: '2rem', rotate: -18, scale: 0.75 },
          { x: '-5.6rem', y: '1rem', rotate: -12, scale: 0.82 },
          { x: '-2.8rem', y: '0.3rem', rotate: -6, scale: 0.9 },
          { x: '0rem', y: '0rem', rotate: 0, scale: 0.96 },
          { x: '2.8rem', y: '0.3rem', rotate: 6, scale: 0.9 },
          { x: '5.6rem', y: '1rem', rotate: 12, scale: 0.82 },
          { x: '8.5rem', y: '2rem', rotate: 18, scale: 0.75 }
        ]
      } else if (w <= 767) {
        return [
          { x: '-11.5rem', y: '2.8rem', rotate: -20, scale: 0.78 },
          { x: '-7.6rem', y: '1.4rem', rotate: -13, scale: 0.84 },
          { x: '-3.8rem', y: '0.4rem', rotate: -6, scale: 0.92 },
          { x: '0rem', y: '0rem', rotate: 0, scale: 0.98 },
          { x: '3.8rem', y: '0.4rem', rotate: 6, scale: 0.92 },
          { x: '7.6rem', y: '1.4rem', rotate: 13, scale: 0.84 },
          { x: '11.5rem', y: '2.8rem', rotate: 20, scale: 0.78 }
        ]
      } else if (w <= 991) {
        return [
          { x: '-16rem', y: '3.5rem', rotate: -21, scale: 0.8 },
          { x: '-11rem', y: '1.8rem', rotate: -14, scale: 0.86 },
          { x: '-5.5rem', y: '0.6rem', rotate: -7, scale: 0.93 },
          { x: '0rem', y: '0rem', rotate: 0, scale: 1.0 },
          { x: '5.5rem', y: '0.6rem', rotate: 7, scale: 0.93 },
          { x: '11rem', y: '1.8rem', rotate: 14, scale: 0.86 },
          { x: '16rem', y: '3.5rem', rotate: 21, scale: 0.8 }
        ]
      }
      return [
        { x: '-25rem', y: '5rem', rotate: -24, scale: 0.8 },
        { x: '-17.5rem', y: '2.5rem', rotate: -16, scale: 0.87 },
        { x: '-9rem', y: '0.8rem', rotate: -8, scale: 0.94 },
        { x: '0rem', y: '0rem', rotate: 0, scale: 1.0 },
        { x: '9rem', y: '0.8rem', rotate: 8, scale: 0.94 },
        { x: '17.5rem', y: '2.5rem', rotate: 16, scale: 0.87 },
        { x: '25rem', y: '5rem', rotate: 24, scale: 0.8 }
      ]
    }

    const cardTargets = getSocialCardTargets()

    let socialsTweens = []
    const socialsCards = document.querySelectorAll('.callout-socials-card-w')
    if (socialsCards.length > 0) {
      // Set initial state
      gsap.set(socialsCards, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 0.9,
        opacity: 0
      })

      socialsCards.forEach((card, index) => {
        const target = cardTargets[index]
        if (target) {
          const tween = gsap.to(card, {
            x: target.x,
            y: target.y,
            rotation: target.rotate,
            scale: target.scale,
            opacity: 1,
            duration: 0.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: '.is-callout-socials',
              start: 'top 70%',
              toggleActions: 'play none none none'
            },
            delay: index * 0.015
          })
          socialsTweens.push(tween)

          // Card Hover Animation (Exact landonorris.com splitting gap behavior)
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              x: target.x,
              y: (parseFloat(target.y) - 3.2) + 'rem',
              scale: Math.max(target.scale * 1.14, 1.05),
              rotation: target.rotate * 0.35,
              duration: 0.15,
              ease: 'power2.out',
              overwrite: 'auto'
            })
            card.style.zIndex = 50

            socialsCards.forEach((otherCard, otherIdx) => {
              const otherTarget = cardTargets[otherIdx]
              if (otherCard !== card && otherTarget) {
                const dist = Math.abs(otherIdx - index)
                const totalShift = 9.5 + (dist - 1) * 0.8
                const shiftX = otherIdx < index ? -totalShift : totalShift
                const newX = (parseFloat(otherTarget.x) + shiftX) + 'rem'
                const extraRotate = otherIdx < index ? -3 : 3

                gsap.to(otherCard, {
                  x: newX,
                  y: otherTarget.y,
                  scale: otherTarget.scale * 0.95,
                  rotation: otherTarget.rotate + extraRotate,
                  opacity: 1,
                  duration: 0.15,
                  ease: 'power2.out',
                  overwrite: 'auto'
                })
              }
            })
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              x: target.x,
              y: target.y,
              scale: target.scale,
              rotation: target.rotate,
              duration: 0.15,
              ease: 'power2.out',
              overwrite: 'auto'
            })

            const originalZIndex = [1, 2, 3, 4, 3, 2, 1][index]
            card.style.zIndex = originalZIndex

            socialsCards.forEach((otherCard, otherIdx) => {
              const otherTarget = cardTargets[otherIdx]
              if (otherCard !== card && otherTarget) {
                gsap.to(otherCard, {
                  x: otherTarget.x,
                  y: otherTarget.y,
                  scale: otherTarget.scale,
                  rotation: otherTarget.rotate,
                  opacity: 1,
                  duration: 0.15,
                  ease: 'power2.out',
                  overwrite: 'auto'
                })
              }
            })
          })
        }
      })
    }

    // 8. Socials Header Block Reveal Animation (plays every time on scroll enter)
    let socialsHeaderTimeline = null
    const socialsHeaderBlocks = document.querySelectorAll('.is-callout-socials .reveal-line-block')
    const socialsHeaderTexts = document.querySelectorAll('.is-callout-socials .reveal-line-text')
    if (socialsHeaderBlocks.length > 0 && socialsHeaderTexts.length > 0) {
      socialsHeaderTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.is-callout-socials',
          start: 'top 75%',
          toggleActions: 'restart none restart none'
        }
      })

      socialsHeaderBlocks.forEach((block, index) => {
        const text = socialsHeaderTexts[index]
        socialsHeaderTimeline
          .to(block, { scaleX: 1, duration: 0.45, ease: 'power2.inOut', transformOrigin: 'left' }, index * 0.15)
          .set(text, { opacity: 1 }, index * 0.15 + 0.43)
          .to(block, { scaleX: 0, transformOrigin: 'right', duration: 0.45, ease: 'power2.inOut' }, index * 0.15 + 0.45)
      })
    }

    // 9. Lando Store Header Block Reveal Animation (plays every time on scroll enter)
    let exeHeaderTimeline = null
    const exeHeaderBlocks = document.querySelectorAll('.is-lando-exe .reveal-line-block')
    const exeHeaderTexts = document.querySelectorAll('.is-lando-exe .reveal-line-text')
    if (exeHeaderBlocks.length > 0 && exeHeaderTexts.length > 0) {
      gsap.set(exeHeaderTexts, { opacity: 1 })
      exeHeaderTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.is-lando-exe',
          start: 'top 75%',
          toggleActions: 'restart none restart none'
        }
      })

      exeHeaderBlocks.forEach((block, index) => {
        const text = exeHeaderTexts[index]
        exeHeaderTimeline
          .to(block, { scaleX: 1, duration: 0.45, ease: 'power2.inOut', transformOrigin: 'left' }, index * 0.15)
          .set(text, { opacity: 1 }, index * 0.15 + 0.43)
          .to(block, { scaleX: 0, transformOrigin: 'right', duration: 0.45, ease: 'power2.inOut' }, index * 0.15 + 0.45)
      })
    }

    // 10. Helmets Section Header Block Reveal Animation (plays every time on scroll enter)
    let helmetsHeaderTimeline = null
    const helmetsHeaderBlocks = document.querySelectorAll('.is-helmets .reveal-line-block')
    const helmetsHeaderTexts = document.querySelectorAll('.is-helmets .reveal-line-text')
    if (helmetsHeaderBlocks.length > 0 && helmetsHeaderTexts.length > 0) {
      gsap.set(helmetsHeaderTexts, { opacity: 1 })
      helmetsHeaderTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.is-helmets',
          start: 'top 75%',
          toggleActions: 'restart none restart none'
        }
      })

      helmetsHeaderBlocks.forEach((block, index) => {
        const text = helmetsHeaderTexts[index]
        helmetsHeaderTimeline
          .to(block, { scaleX: 1, duration: 0.45, ease: 'power2.inOut', transformOrigin: 'left' }, index * 0.12)
          .set(text, { opacity: 1 }, index * 0.12 + 0.43)
          .to(block, { scaleX: 0, transformOrigin: 'right', duration: 0.45, ease: 'power2.inOut' }, index * 0.12 + 0.45)
      })
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
      if (helmetsTween) {
        helmetsTween.scrollTrigger?.kill()
        helmetsTween.kill()
      }

      if (statementTimeline) {
        statementTimeline.kill()
      }

      if (socialsHeaderTimeline) {
        socialsHeaderTimeline.scrollTrigger?.kill()
        socialsHeaderTimeline.kill()
      }
      if (exeHeaderTimeline) {
        exeHeaderTimeline.scrollTrigger?.kill()
        exeHeaderTimeline.kill()
      }
      if (helmetsHeaderTimeline) {
        helmetsHeaderTimeline.scrollTrigger?.kill()
        helmetsHeaderTimeline.kill()
      }
      socialsTweens.forEach(t => {
        t.scrollTrigger?.kill()
        t.kill()
      })
      exeTweens.forEach(t => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <div className="page-w">
      {/* Header / Navbar */}
      <Navbar ref={headerRef} onOpenMenu={() => setIsMenuOpen(true)} />

      {/* Full-Screen Overlay Menu */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

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
                <span>REACT • GSAP • WEB DEVELOPMENT • FULLSTACK •&nbsp;</span>
                <span>REACT • GSAP • WEB DEVELOPMENT • FULLSTACK •&nbsp;</span>
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

          {/* Statement Text Container (100% landonorris.com clone) */}
          <div 
            className="c statement-container" 
            ref={statementContainerRef}
          >
            {/* Top Laurel Icon & Badge */}
            <div className="statement-icon-w">
              <svg viewBox="0 0 100 50" fill="currentColor" className="statement-laurel-svg">
                {/* Laurel wreath left */}
                <path d="M 40 45 C 30 45, 15 35, 15 25 C 15 15, 25 10, 35 15 C 33 20, 25 22, 23 28 C 21 34, 30 38, 38 40" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Laurel wreath right */}
                <path d="M 60 45 C 70 45, 85 35, 85 25 C 85 15, 75 10, 65 15 C 67 20, 75 22, 77 28 C 79 34, 70 38, 62 40" fill="none" stroke="currentColor" strokeWidth="2" />
                {/* Center text / icon */}
                <text x="50" y="31" fontSize="11" fontWeight="800" textAnchor="middle" fill="#ffffff" style={{ fontFamily: 'Outfit' }}>N</text>
              </svg>
              <div className="statement-icon-sub">DESIGNING · DEVELOPING · CREATING</div>
            </div>

            {/* Main Statement Text matching landonorris.com 100% */}
           <h2 className="statement-text uppercase-impact">
  <div className="reveal-line-wrapper">
    <span className="reveal-line-text">
      <span className="serif-lime">REDEFINING</span> DIGITAL EXPERIENCES,
    </span>
    <div className="reveal-line-block"></div>
  </div>

  <div className="reveal-line-wrapper">
    <span className="reveal-line-text">
      BUILDING WITH <span className="serif-lime">PURPOSE,</span>
    </span>
    <div className="reveal-line-block"></div>
  </div>

  <div className="reveal-line-wrapper">
    <span className="reveal-line-text">
      TURNING IDEAS INTO
    </span>
    <div className="reveal-line-block"></div>
  </div>

  <div className="reveal-line-wrapper">
    <span className="reveal-line-text">
      <span className="serif-lime">REALITY,</span> CRAFTING A
    </span>
    <div className="reveal-line-block"></div>
  </div>

  <div className="reveal-line-wrapper">
    <span className="reveal-line-text">
      CREATIVE <span className="serif-lime">LEGACY</span> THROUGH CODE,
    </span>
    <div className="reveal-line-block"></div>
  </div>

  <div className="reveal-line-wrapper">
    <span className="reveal-line-text">
      PUSHING THE WEB
    </span>
    <div className="reveal-line-block"></div>
  </div>

  <div className="reveal-line-wrapper">
    <span className="reveal-line-text">
      FORWARD EVERY <span className="serif-lime">DAY.</span>
    </span>
    <div className="reveal-line-block"></div>
  </div>
</h2>
          </div>

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
                  <div className="otot-home-text-col is-1">
                    <div className="otot-home-text-w">
                      <div className="on-overlay">on</div>
                      <h2 className="text-impact-reg-brier">
                        <div className="reveal-line-wrapper">
                          <span className="reveal-line-text">ON</span>
                          <div className="reveal-line-block"></div>
                        </div>
                      </h2>
                      <h2 className="text-impact-reg-mona line-increase">
                        <div className="reveal-line-wrapper">
                          <span className="reveal-line-text">TRACK</span>
                          <div className="reveal-line-block"></div>
                        </div>
                      </h2>
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
                  </div>

                  {/* Right Column: OFF TRACK */}
                  <div className="otot-home-text-col is-2">
                    <div className="otot-home-text-w">
                      <h2 className="text-impact-reg-brier">
                        <div className="reveal-line-wrapper">
                          <span className="reveal-line-text">OFF</span>
                          <div className="reveal-line-block"></div>
                        </div>
                      </h2>
                      <h2 className="text-impact-reg-mona line-increase">
                        <div className="reveal-line-wrapper">
                          <span className="reveal-line-text">TRACK</span>
                          <div className="reveal-line-block"></div>
                        </div>
                      </h2>
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
                  </div>
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
          <div className="c is-helmets">
            <div className="title-layout">
              <div>
                <h2 className="text-title-lg-mona">
                  <div className="reveal-line-wrapper">
                    <span className="reveal-line-text title-helmets-white">HELMETS</span>
                    <div className="reveal-line-block"></div>
                  </div>
                  <div className="reveal-line-wrapper">
                    <span className="reveal-line-text text-title-lg-brier">HALL OF FAME</span>
                    <div className="reveal-line-block"></div>
                  </div>
                </h2>
              </div>
              <div className="title-para-w">
                <div className="reveal-line-wrapper">
                  <span className="reveal-line-text">From his iconic blobs to innovative one-off</span>
                  <div className="reveal-line-block"></div>
                </div>
                <div className="reveal-line-wrapper">
                  <span className="reveal-line-text">designs, Lando has always been</span>
                  <div className="reveal-line-block"></div>
                </div>
                <div className="reveal-line-wrapper">
                  <span className="reveal-line-text">passionate about designing innovative</span>
                  <div className="reveal-line-block"></div>
                </div>
                <div className="reveal-line-wrapper">
                  <span className="reveal-line-text">and memorable helmets.</span>
                  <div className="reveal-line-block"></div>
                </div>
              </div>
            </div>

            <div className="helmet-grid">
              {HELMETS_DATA.map((helmet, idx) => (
                <div key={idx} className="helmet-grid-item-w">
                  <div className="helmet-grid-item taskello-card-wrapper" data-helmet-item="">
                    <div className="taskello-card">
                      {/* Top Header Background Image */}
                      <div className="taskello-header-bg-w">
                        <img src={idx % 2 === 0 ? card1Image : card2Image} alt={`${helmet.title} Background`} className="taskello-header-img" />
                        
                        <div className="taskello-header-text">
                          <div>Taskello App</div>
                          <div>Card Design</div>
                        </div>
                      </div>

                      {/* Folder Tab SVG Overlay */}
                      <div className="taskello-dark-panel-w">
                        <svg viewBox="0 0 400 411" fill="none" preserveAspectRatio="none" className="taskello-dark-panel-svg">
                          <path d="M -2,411 L -2,105 C -2,85 10,75 26,75 L 145,75 C 165,75 175,82 185,95 C 195,108 205,115 225,115 L 375,115 C 390,115 405,127 405,143 L 405,411 Z" fill="#18181a" />
                        </svg>
                      </div>

                      {/* Content Overlay */}
                      <div className="taskello-content">
                        <div className="taskello-tab-header">
                          <div>
                            <h4 className="taskello-tab-title">{idx === 0 ? "Daily memo" : helmet.title}</h4>
                            <p className="taskello-tab-subtitle">{idx === 0 ? "Notes & Journaling" : `${helmet.year} Edition`}</p>
                          </div>
                          <div className="taskello-arrow-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </div>
                        </div>

                        <div className="taskello-bottom-bar">
                          <div className="taskello-bottom-left">
                            <span className="taskello-num">{(idx + 1).toString().padStart(2, '0')}</span>
                            <span className="taskello-doc">Doc</span>
                          </div>
                          <div className="taskello-bottom-right">
                            1270 Notes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Notched Text Details wrapper (same as normal cards) */}
                  <div className="helmet-grid-item-text-w">
                    <h3 className="text-title-small-label text">{helmet.title}</h3>
                    <div className="helmet-grid-item-date-w">
                      <div className="text-title-small-label date">{helmet.year}</div>
                    </div>
                    <div className="helmet-grid-extender">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67e41c00f127bc68e2462635_ln4-2-helm-mask-extender-grey-fade.png" alt="" className="helmet-grid-extender-img" />
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67e41235ad69136bdc861b67_ln4-2-helm-mask-extender-lime-fade.png" alt="" className="helmet-grid-extender-img is-overlay" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Callout Section */}
            <div className="helmets-callout-w">
              <div className="callout-icon-w">
                <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 50.1" width="80" height="41" fill="var(--color--lime)">
                  <path d="M.4 27.6s3 .9 6.1 5.9c-.4-1.1-.6-2.2-.8-3.4C1.5 27.8 1.1 25.7.8 22c.2 1 3.2 2.4 3.6 4 .4 1.3.8 2.5 1.3 3.1 0-1-.1-2 0-3v-.5c-1.3-1.1-4.3-4.3-3.5-9.1.5 1.2 3 1.6 3.7 7.4.2-1.1.5-2.1.8-3.2C5.5 19.2 3.5 15 5.6 7.9c.3 1.2 2.5 5.7 2 8.3-.2.8-.2 1.7-.3 2.6 0-.2.1-.4.2-.6.3-.9.7-1.8 1.2-2.7 0-1.4-.2-2.8-.8-4.1-.3-.6-.4-1.3-.4-2s.4-1.3.8-1.8c.6-.8.8-2.8.8-2.8s2.2 3.4 0 9.8c.4-.7.9-1.5 1.4-2.1.4-1 .4-2 .2-3.1-.4-1.8-.7-4.5 2.2-7.7-.3 1.5.4 4.2-.1 6-.4 1.3-.9 2.6-1.5 3.8.5-.6 1.1-1.2 1.7-1.8.3-1 .2-2.5.8-4.9.7-2.9 2.2-3.3 2.8-4.8.5 3.3-1 6.7-2.4 8.6l.4-.3c.4-.3.8-.6 1.1-1 .4-1.8 1.2-3.5 2.4-5 .8-.9 2.7-1.4 3-2.2-.3 3.3-2.3 5.1-4 6.3.9-.5 1.9-.7 2.9-.7s2 .4 2.8 1c0 0-2.2 1.3-3.7 1.1-1.5-.2-2.1-.5-3-.2-.3.3-.7.6-1.1.9 2.2-.6 4.8 1 5.8 2-1.9.9-3.5.3-4.3-.6-.7-.7-1.8-.4-2.3-.8-.7.6-1.3 1.2-2 1.8-.7.7-1.3 1.5-1.9 2.4 1.4-1.3 3.7-2.7 6-2.2-.3.9-1.8 2.5-3.4 3.1-1.4.4-2.7.4-3.6.9-.6 1-1 2.1-1.4 3.3 2.1-3.1 6.3-3.9 7.3-3.7 0 0-2 .9-2.4 2.4-.5 1.6-2.2 2.1-3.6 2.2-.7.1-1.4.5-1.9 1-.4 1.4-.8 2.9-1 4.4 1.9-6.5 6.4-5.5 6.4-5.5-.6.3-1 .9-1.2 1.5-.4 1.1-.9 2-2.6 3.2-1.2.8-2.2 2.1-2.7 3.5 0 1.8.4 3.5.9 5.2-.3-2.2-.2-5.2 1.4-7.4-.2 1.5 1.5 4.1 1.1 5.9-.3 1.5-1.4 3.4-1.2 4.8.2.4.4.8.6 1.1 0-1 .5-2.3.5-3.3.3.9.2 3 .2 4.4.5.8 1.1 1.5 1.7 2.2-1.3-2.4-1.4-6-.4-9 1 1.5 2.1 4.4 1.8 6.4-.2 1.5 0 2.9.4 4.3l.3.3c.3.3.7.6 1 .8-1.5-2.1-1.3-5.3-1-6.7 1.8 2 3.3 6 3.2 8.1l1.2.6c1.6.7 3.4 1.1 5.1.6v.2l.1.2v.4c-1.8.5-3.8 0-5.5-.7l-1.8-.9c-1.1 1.1-3.4 1.8-4.8 1.4-1.3-.4-2.6-1.4-3.6-1.3 1.7-1.8 3.9-1.9 5.2-1.1 1.2.7 2 1 2.7.8-.8-.5-1.6-1.1-2.3-1.7l-.3-.3c-1.9.7-4 0-5.3-.8-1.5-.9-1.7-2.6-2.8-3.5 3.5-.1 5 1.4 5.6 2.3.5.7 1.2 1.3 2 1.5-1.1-1.1-2.1-2.2-2.9-3.5-.9-.2-3 0-4.1-1.5 1.5-.1 2.6 0 3.4.5-.2-.4-.4-.8-.6-1.1-1.1-.2-3.1 0-4.4-1.1-1.1-1.1-2.2-2.3-3.1-3.6 0 0 2.5.5 3.8 1.1-1.1-1-3.8-5.7-3.8-5.8ZM96.4 27.3s-3 1-6 6c.3-1.1.6-2.2.7-3.4 4.3-2.4 4.6-4.5 4.9-8.2-.2 1-3.1 2.5-3.6 4.1-.4 1.3-.8 2.5-1.2 3.2v-3.5c1.3-1.1 4.2-4.4 3.3-9.1-.4 1.2-3 1.6-3.6 7.5-.2-1.1-.5-2.1-.8-3.2 1.2-1.5 3.1-5.8.9-12.8-.3 1.2-2.4 5.7-1.9 8.3.2.8.3 1.7.3 2.6 0-.2-.1-.4-.2-.6L88 15.5c0-1.4.2-2.8.7-4.1.3-.6.4-1.3.3-2 0-.7-.4-1.3-.9-1.8-.6-.8-.9-2.8-.9-2.8s-2.1 3.5.2 9.8c-.4-.7-.9-1.4-1.5-2.1-.4-1-.5-2-.3-3.1.4-1.8.6-4.5-2.3-7.7.3 1.5-.4 4.2.2 6 .4 1.3.9 2.5 1.5 3.8-.5-.6-1.1-1.2-1.8-1.7-.3-1-.2-2.5-.8-4.9-.8-2.9-2.2-3.2-2.9-4.8-.4 3.3 1.1 6.7 2.5 8.6l-.4-.3-1.2-.9c-.4-1.8-1.3-3.5-2.5-5-.8-.9-2.8-1.3-3-2.2.3 3.3 2.4 5 4.1 6.3-.9-.5-1.9-.7-2.9-.6-1 0-2 .4-2.8 1 0 0 2.2 1.2 3.7 1 1.5-.2 2.1-.5 3-.2.3.3.7.6 1.1.9-2.2-.6-4.8 1.1-5.8 2.1 2 .9 3.5.2 4.3-.6.7-.7 1.7-.5 2.3-.9.7.6 1.4 1.1 2 1.8.7.7 1.3 1.5 1.9 2.3-1.4-1.2-3.7-2.6-6-2.1.3.9 1.8 2.5 3.5 3 1.4.4 2.7.4 3.6.8.6 1 1.1 2.1 1.5 3.2-2.2-3.1-6.4-3.7-7.4-3.6 0 0 2 .8 2.5 2.4.5 1.6 2.2 2 3.7 2.2.7 0 1.4.4 1.9 1 .5 1.4.8 2.9 1.1 4.4-2-6.4-6.5-5.4-6.5-5.4.6.3 1 .9 1.2 1.5.4 1.1.9 2 2.7 3.2 1.3.8 2.2 2 2.8 3.4 0 1.8-.3 3.5-.8 5.2.3-2.2.1-5.2-1.5-7.4.2 1.5-1.5 4.1-1 5.9.4 1.5 1.5 3.4 1.3 4.8l-.6 1.2c0-1-.5-2.3-.5-3.3-.3.9-.1 3-.2 4.4-.5.8-1 1.5-1.6 2.2 1.2-2.5 1.3-6 .2-9-1 1.5-2 4.5-1.7 6.5.2 1.5.1 2.9-.3 4.3l-.3.3c-.3.3-.7.6-1 .9 1.5-2.2 1.2-5.3.9-6.7-1.8 2-3.2 6-3 8.1-.4.2-.8.4-1.1.6-1.6.7-3.4 1.2-5.1.7v.8c1.9.5 3.8 0 5.5-.8.6-.3 1.2-.6 1.8-1 1.1 1.1 3.5 1.7 4.8 1.3 1.3-.4 2.6-1.5 3.6-1.4-1.7-1.7-4-1.8-5.2-1-1.1.7-1.9 1.1-2.7.8.8-.5 1.6-1.1 2.3-1.8l.3-.3c1.9.6 4 0 5.3-.9 1.4-.9 1.7-2.6 2.8-3.6-3.5 0-4.9 1.5-5.5 2.4-.5.7-1.2 1.3-2 1.5 1.1-1.1 2-2.3 2.9-3.5.9-.2 3-.1 4.1-1.6-1.5-.1-2.6 0-3.4.5l.6-1.2c1.1-.2 3.1 0 4.4-1.2 1.1-1.1 2.1-2.3 3-3.6 0 0-2.5.5-3.7 1.2 1.1-1 3.7-5.8 3.7-5.9ZM67.3 20.4zM67.2 20.8zM67.3 20.4zM67.3 20.4zM67.2 20.8zM68.4 33.8c.1-.7.3-1.4.4-2.3 1.1-6.1.4-11.8-2-17-2.9-6.2-9.3-12.9-18.3-13.1-9.1 0-15.6 6.4-18.7 12.6-2.6 5.1-3.4 10.8-2.4 17 .1.9.3 1.6.4 2.3 0 .5.1.9.3 1.4.1.6.3 1.2.4 1.7v.2c.1.5.3 1 .4 1.5.3 1 .5 1.5.8 1.9 0 .2.2.4.3.7l.3.9v.3c0 .3.1.5.2.8 0 1.4.7 2.2 1.5 3.3.9 1.1 1.6 1.3 2.9 1.5.9.1 1.4.2 3 .6l2 .4c2.3.8 4.6 1.3 7.9 1.3h.4c3.1 0 5.2-.4 7.5-1.1s1.9-.4 1.9-.4c1.6-.3 2.2-.4 3.1-.5 1.3-.2 2-.3 3-1.5.9-1 1.5-1.8 1.6-3.2.1-.3.2-.5.3-.8V42c0-.4.2-.7.3-.9.1-.3.2-.5.3-.7.3-.5.5-.9.8-1.9.1-.5.3-1 .4-1.5v-.2c.1-.5.3-1.1.4-1.7.2-.4.3-.9.3-1.4Zm-1-.2v.2c0 .3-.1.6-.2.9-.4 1.2-1.6 2.1-3.5 2.8.1-.3.2-.6.3-1 .4.1.9.2 1.4-.1.3-.2.4-.5.6-.8.1-.3.2-.6.3-1 .2-.7.3-1.7.6-2.8 0 .2 0 .4.2.6.1.2.3.2.5.3 0 .3-.1.7-.2 1ZM47.9 46.5c-7.3 0-13.6-1.7-16.1-4.1.1-.1.3-.3.6-.4 4.8 2.5 12.5 2.8 15.4 2.9h.7c3.3 0 10.4-.3 14.9-2.5.3.1.5.3.6.4-2.6 2.3-8.9 3.8-16.1 3.7ZM28.7 33.3v-.2c0-.3-.1-.6-.2-1 .4 0 .6-.4.7-.8.2.8.3 1.5.4 2 .2 1.4.4 2.2 1 2.6.3.2.6.3.8.3h.5c0 .3.1.7.2 1-1.9-.7-3-1.7-3.4-2.9 0-.3-.1-.6-.2-.9Zm1.8-18.5c.2-.2.4-.4.6-.5-.4.6-.9 1.3-1.2 2 .2-.5.4-.9.6-1.4Zm35.6.5c.2.5.4 1 .6 1.4-.4-.7-.8-1.4-1.2-2 .2.2.4.3.6.6ZM68 30.4h-.2c-.2 0-.5 0-.6.3.2-.9.4-1.5.5-1.9.2-.6.3-.8.5-.9 0 .9-.2 1.8-.3 2.8Zm-4.6 10.9h-.1c-.3-.1-.7-.2-1.1-.3 1.4-.4 2.6-.9 3.4-1.5-.5.7-1.3 1.3-2.3 1.8Zm-29.4.4c1.2-.2 2.5-.2 2.6-.2 3 .5 6.8.9 11.4.9h1.3c4.2 0 7.6-.3 10.4-.8 0 0 1.1.2 2.3.4-3.7 1.4-9.1 2-14 1.9-4.9 0-10.3-.7-13.9-2.2Zm-3.7-2.6c.9.6 2 1.2 3.4 1.6-.4 0-.8.1-1.1.2h-.1c-.9-.5-1.7-1.2-2.2-1.9Zm17.6 2.3c-10.6-.1-17.1-1.8-18.4-4.7 1.2.9 3 1.6 5.4 2.1 3.9.8 8.9.9 12.9.9h3.9c3.2 0 6.6-.1 9.5-.6 2.4-.4 4.2-1.1 5.4-2-1.4 2.9-8 4.4-18.6 4.2ZM33 35.3c0-.1 0-.3.4-.4.6-.1 1.1-.2 1.6-.2.6 0 1-.1 1.5-.3.4-.2.7 0 .7 0h.1v.8c0 .1-.1.3-.1.5v1c-.2.2-.2.2-1.1.2h-.3c-.7 0-1 .1-1.3.3-.2 0-.3.2-.6.2-.5 0-.7-1.3-.8-2.1Zm30.1.4Zm0 0Zm-4.1-1Zm-11 3.4v.5-.5s-.9 0-3.7-.4c.1-.1.2-.2.3-.4.4-.6 0-1.8 0-2 0-.1 0-.2-.2-.3 1 0 2.2 0 3.5.1h3.6s-.1.2-.2.3c0 .2-.5 1.4-.1 1.9.1.3.2.4.3.5-2.8.3-3.7.3-3.7.3Zm-7-2.6c.6.1 1.3.3 2.1.4h.3v.4h-.2c-.8-.1-2.3-.6-3.2-1.1.3 0 .7.1 1 .2Zm11.7 1v-.4h.3c.8 0 1.5-.2 2.1-.3.4 0 .7-.1 1-.2-.9.4-2.4.9-3.2 1h-.2Zm-16.8 1.4c.9 0 1.4 0 1.9-.6.2-.3.3-.6.3-.8 1.3.9 3.6 1.7 5.6 2.1-2.7 0-5.5-.3-8-.7h.2Zm22-1.1c0 .3 0 .6.3.8.5.6 1 .6 1.9.6h.2c-2.5.4-5.3.5-8 .5 2-.3 4.3-1.1 5.7-2Zm2.2.4c-.8 0-.9 0-1.1-.2-.1-.2 0-.4 0-.7V36c0-.2 0-.4-.1-.5s0-.1 0-.3v-.4h.7c.4.2.9.3 1.4.3.5 0 1 .1 1.7.3.3 0 .3.2.4.2v.1c-.1.8-.4 2.1-.8 2.1-.3 0-.4 0-.6-.2-.3-.2-.6-.3-1.3-.3h-.3Zm5.1-2.9v.4c-.3.3-.5.4-.5.4 0-.4-.4-1-1.6-1.3-.7-.2-1.3-.3-1.7-.3-.5 0-.8 0-1.1-.2-.6-.3-1.1-.2-1.4 0L58 33h-.2s-2.4.8-9.6.7c-7.3 0-9.5-.9-9.6-.9h-.2l-.9.2c-.3-.1-.8-.2-1.4 0-.3.1-.7.2-1.1.2-.5 0-1.1 0-1.8.3-1.1.3-1.5.9-1.6 1.3 0 0-.2 0-.5-.4 0-.3-.1-.7-.2-1.1-.1-.7-.3-1.5-.5-2.4-.1-.6-.3-1.1-.4-1.5-.4-1.6-.5-2.3-1.2-2.8-.4-.3-.2-1.3 0-2v-.2c.2-1.1.3-1.8.3-2.6 0-.7.2-1.4.2-1.4V20c0-.2-.1-.4-.2-.5.6 0 .6 0 .7.3v.4c0 .6.2 1.2.4 2.2.3 1.2.7 1.2 3.4 1.1h1c3.8-.2 6.2-.2 13.5 0 7.6 0 10.1.1 13.9.4.9 0 1.6.1 2.2.1h1.2c.3 0 .6-.2.8-.4.2-.2.2-.5.3-.7.3-1.1.4-1.9.5-2.5v-.2h.6v2.1c0 .8 0 1.5.2 2.6 0 .5.2 1 .2 1.5 0 .4-.1.6-.2.7-.5.3-.7.8-.9 1.4-.2.6-.4 1.5-.7 2.8-.4 1.3-.6 2.4-.7 3.2Zm-37-4.4c-.1-.9-.2-1.8-.2-2.8.4.3.5.7.8 2.2 0 .2.1.5.2.7 0 0 0-.1-.1-.1-.2-.1-.3-.2-.5-.2h-.2ZM52.5 6.2c-.4.7-.8 1.5-1.1 2.3-1-.2-1.9-.3-3-.3-1 0-2 0-3 .2-.3-.8-.7-1.6-1.1-2.3 1.3-.3 2.7-.5 4.1-.5 1.4 0 2.7.2 4.1.6Zm-4.3 3h.2c.9 0 1.8.1 2.6.2-.3.8-.6 1.7-.8 2.6h-3.6c-.2-.9-.5-1.7-.8-2.6.8-.1 1.6-.2 2.4-.2Zm17.5 11.4c-1.4-2-3.2-3.8-5.3-5.1.3-.3.6-.6.9-.8 1.9 1.8 3.4 3.9 4.4 5.8ZM49.9 13c-.2.7-.3 1.5-.5 2.2h-2.2c-.1-.8-.3-1.5-.4-2.2h3.1Zm-1.6 3.2h1c-.1.7-.2 1.4-.3 2.2h-1.4c0-.7-.1-1.5-.2-2.2h1Zm15.3 5.9c-1.4-1-3.1-1.9-5.3-2.5.1-.5.3-1 .5-1.5 2.1.9 3.8 2.3 5.2 4h-.4Zm-15.5-.5h-.4c0-.8 0-1.5-.1-2.3h1.2c0 .7-.1 1.5-.2 2.3H48Zm-8.6-.1c0-.5-.1-1-.2-1.4 1.2-.3 2.6-.4 4.3-.6.1.7.2 1.3.3 2.1h-4.3Zm-1 0h-3.7c1-.5 2.1-1 3.5-1.3 0 .4.1.8.2 1.2Zm6.3.1c0-.7-.2-1.4-.3-2.1h2c0 .7 0 1.5.1 2.2h-1.9Zm5.1-2.2c.7 0 1.4 0 2 .1l-.3 2.1h-1.9c0-.8.1-1.5.2-2.2Zm3 .2c1.6.2 3 .4 4.2.7 0 .5-.2.9-.2 1.4h-4.3c0-.7.2-1.4.3-2Zm5.2.9c1.3.4 2.5.9 3.5 1.4-.9 0-1.9-.1-3.1-.2h-.6c0-.4.1-.8.2-1.2Zm-.7-1.2c-1.2-.3-2.6-.5-4.3-.7.2-.7.3-1.4.5-2 1.6.2 3 .6 4.3 1.1-.2.5-.4 1-.5 1.6Zm-5.3-.8c-.7 0-1.4 0-2.1-.1 0-.7.2-1.5.3-2.1.8 0 1.6.1 2.4.2-.2.7-.4 1.3-.5 2.1Zm-5.6-.1h-2.1c-.1-.7-.3-1.4-.5-2.1.8 0 1.6-.1 2.4-.1 0 .7.2 1.4.2 2.1Zm-3.1.1c-1.6.1-3.1.3-4.3.6-.1-.6-.3-1.1-.5-1.6 1.3-.5 2.7-.8 4.3-1 .2.6.3 1.3.5 2Zm-5.3.8c-2.2.6-3.9 1.4-5.4 2.4h-.4c1.4-1.7 3.2-3 5.3-3.9.2.4.3.9.5 1.5Zm21.2-2.1c.2-.3.4-.6.5-.9 2.3 1.5 4.2 3.4 5.6 5.8v.2c-1.6-2.2-3.6-3.9-6.1-5Zm-1-.4c-1.3-.5-2.8-.9-4.4-1.1.2-.6.5-1.2.8-1.7 1.5.5 2.9 1.1 4.2 1.8-.2.3-.4.7-.6 1ZM53 15.5c-.8-.1-1.7-.2-2.6-.2.1-.8.3-1.5.5-2.2 1 .1 1.9.3 2.9.5-.3.6-.5 1.2-.8 1.9Zm-6.8-.3c-.9 0-1.7 0-2.6.2-.2-.7-.5-1.3-.7-1.9.9-.2 1.9-.4 2.9-.5.2.7.3 1.4.4 2.2Zm-3.6.3c-1.6.2-3.1.6-4.4 1-.2-.4-.4-.7-.6-1.1 1.3-.7 2.8-1.3 4.3-1.7.3.6.5 1.2.7 1.8Zm-5.3 1.4c-2.6 1.1-4.6 2.7-6.2 4.9v-.2c1.5-2.3 3.4-4.2 5.8-5.6.2.3.4.6.5.9Zm22.3-2c-1.4-.8-2.8-1.5-4.4-1.9.4-.6.8-1.2 1.2-1.7 1.5.8 2.9 1.7 4.1 2.8-.3.3-.7.6-1 .9Zm-5.4-2.2c-1-.3-2-.5-3.1-.6.2-.9.5-1.7.8-2.5 1.2.3 2.4.7 3.5 1.2-.5.6-.9 1.2-1.3 1.9Zm-8.7-.7c-1.1.1-2.1.3-3.1.5-.4-.7-.8-1.3-1.2-1.9 1.1-.5 2.3-.8 3.6-1.1.3.8.5 1.6.8 2.5Zm-4.1.8c-1.6.5-3 1.1-4.4 1.8-.3-.4-.6-.7-.9-.9 1.3-1 2.7-1.9 4.2-2.7.4.5.8 1.1 1.2 1.8Zm-5.3 2.4c-2.1 1.3-3.9 3-5.4 5 1-2 2.6-4 4.5-5.7.3.2.6.5.9.8ZM66.7 19h-.2c-.1 0-.2.1-.3.2-1-1.7-2.3-3.5-3.9-5h.2c.4-.1.9-.2 1.3-.1 1.1 1.5 2.1 3.1 3 4.9Zm-4.6-5.8c-.2 0-.5.2-.7.3-1.3-1.1-2.7-2.2-4.3-3 .5-.5 1-.9 1.6-1.3 1.5 1.1 2.9 2.4 4.2 3.9-.3 0-.5 0-.8.2ZM56.2 10c-1.2-.6-2.5-1-3.8-1.3.3-.8.7-1.5 1.1-2.2 1.5.5 3 1.2 4.4 2.1-.6.4-1.1.9-1.6 1.5Zm-2.3-4.4c.4-.6.7-1.1 1.1-1.7 1.9.8 3.6 2 5.1 3.3-.5.2-1 .5-1.5.8-1.5-1-3.1-1.8-4.8-2.3Zm-.9-.3c-1.5-.4-3-.6-4.5-.7-1.5 0-3.1.2-4.6.5-.4-.6-.7-1.2-1.1-1.8 1.8-.6 3.7-.9 5.7-.9s3.9.4 5.7 1.1L53 5.3Zm-10.1.2c-1.7.5-3.3 1.3-4.8 2.2-.5-.3-.9-.6-1.5-.8 1.5-1.3 3.2-2.4 5.2-3.2.4.6.8 1.2 1.1 1.8Zm.5.9c.4.7.7 1.5 1 2.2-1.3.3-2.6.7-3.8 1.2-.5-.6-1-1.1-1.6-1.5 1.4-.8 2.9-1.5 4.4-1.9Zm-3.8 3.9c-1.6.8-3.1 1.8-4.4 2.9-.2-.1-.4-.2-.7-.3-.3 0-.5-.1-.8-.2C35 11.2 36.5 10 38 8.9c.6.4 1.1.9 1.5 1.4Zm-5.4 3.5h.2c-1.7 1.5-3 3.2-4.1 4.9-.1-.1-.3-.2-.5-.3.9-1.8 1.9-3.4 3.1-4.9.4 0 .9 0 1.3.2Zm-2.8 27.6s-.2.1-.2.2v-.4c.1 0 .2.2.3.2Zm33.3.7-.2-.2c.1 0 .2-.2.4-.2v.4Zm.4-28.8c-.3-.1-.5-.2-.8-.3-1.4-1.7-2.9-3.3-4.6-4.5.4-.2.9-.4 1.4-.6 1.7 1.6 3 3.5 4.1 5.4ZM35.8 7.6c.5.2.9.4 1.4.7-1.7 1.2-3.3 2.7-4.7 4.4-.3 0-.6.1-.8.2 1.1-1.9 2.5-3.7 4.2-5.3Zm-2.9 38.1c.6.4 1.2.7 1.9 1-.9-.1-1.3-.3-1.9-1Zm15 3.4c-4.1 0-6.5-.7-9.5-2l-.9-.4c-2.2-.9-3.6-1.5-4.7-2.4 3.2 1.9 8.8 3.2 15.2 3.2h.7c6.1 0 11.5-1.1 14.6-2.9-1.1.9-2.5 1.5-4.8 2.3l-.9.4c-3.1 1.2-5.5 1.8-9.6 1.8Zm13-2.1c.7-.3 1.4-.6 1.9-1-.6.7-1.1.8-1.9 1Z" fill="currentColor" />
                </svg>
              </div>
              <h2 className="callout-title font-brier">
                See more helmets and highlights<br />
                from Lando on the track
              </h2>
              <a href="https://landonorris.com/on-track" target="_blank" rel="noopener noreferrer" className="btn-w is-callout">
                VIEW ON TRACK
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '10px' }}>
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Lando Store World Drivers' Champion Section */}
        <section className="s is-lando-exe">
          <div className="exe-top-visor"></div>

          <div className="c is-lando-exe">
            <div className="spacer is-exe" style={{ height: '8rem' }}></div>
            <div className="exe-grid">
              
              {/* Left Column: Text & Store Info */}
              <div className="exe-text-w">
                <div className="exe-eyebrow">
                  <svg width="16" height="17" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
                    <path d="m10.931 5.783-.759.812c-1.132 1.212-2.89 1.212-4.022 0l-.76-.812C4.313 4.637 2.568 5.29 2.275 6.928l-1.238 7.18c-.227 1.318.652 2.543 1.838 2.543h10.588c1.185 0 2.064-1.225 1.838-2.544l-1.239-7.179c-.28-1.638-2.037-2.29-3.116-1.145h-.014ZM10.839 3.048 9.84 1.849C8.894.717 7.43.717 6.484 1.85l-1 1.199" stroke="currentColor" strokeWidth="1.949" strokeMiterlimit="10"/>
                  </svg>
                  <span>LANDO STORE</span>
                </div>

                <h2 className="exe-headline">
                  <div className="reveal-line-wrapper">
                    <span className="reveal-line-text">WORLD</span>
                    <div className="reveal-line-block"></div>
                  </div>
                  <div className="reveal-line-wrapper">
                    <span className="reveal-line-text">DRIVERS'</span>
                    <div className="reveal-line-block"></div>
                  </div>
                  <div className="reveal-line-wrapper">
                    <span className="reveal-line-text span-font-brier">CHAMPION</span>
                    <div className="reveal-line-block"></div>
                  </div>
                </h2>

                <p className="exe-para">
                  Celebrate this incredible moment with a collection designed for the fans who never stopped believing. Wear it, frame it, treasure it forever.
                </p>

                <a href="https://landonorris.store/" target="_blank" rel="noopener noreferrer" className="btn-w is-store">
                  VISIT THE STORE
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '10px' }}>
                    <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                {/* Floating Image 4 (#1 NORRIS Black T-shirt) */}
                <div className="exe-cta-img-w is-4">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/69458be88faa89137717632c_lando-store-gold-2.webp" alt="Lando Store Gold Shirt" className="image is-exe-scroll" />
                </div>
              </div>

              {/* Right Column: Parallax Image Composition */}
              <div className="exe-col-2">
                {/* Main Center Image: Lando Hoodie */}
                <div className="exe-cta-img-w is-1">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/69458be7e803d4123abb47dd_lando-store-gold-5.webp" alt="Lando Champion Hoodie" className="image is-exe-scroll" />
                </div>

                {/* Top Right Image: Gold Collection graphic */}
                <div className="exe-cta-img-w is-2">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/69458be8f7e939c143a9bed6_lando-store-gold-3.webp" alt="Gold Collection" className="image is-exe-scroll" />
                </div>

                {/* Bottom Center Image: White Helmet Shirt */}
                <div className="exe-cta-img-w is-3">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/69458be7e4ccfdba84b69d27_lando-store-gold-1.webp" alt="White Helmet Shirt" className="image is-exe-scroll" />
                </div>

                {/* Floating Sticker: LN1 Gold Logo */}
                <div className="exe-cta-sticker-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/69458c78c9825ebb795d2e81_LN1.webp" alt="LN1 Sticker" className="image is-exe-sticker" />
                </div>
              </div>

            </div>
            <div className="spacer _2rem" style={{ height: '2rem' }}></div>
          </div>
        </section>

        {/* Partners & Campaigns Section */}
        <section className="s is-home-collabs">
          {/* Diagonal "collabs" watermark in background */}
          <div className="home-collab-rive-w">
            <img src={signatureImage} alt="" className="image is-collab-placeholder" />
          </div>

          <div className="c is-home-collabs">
            <div className="collabs-grid">
              {/* Left Column: Heading */}
              <div className="collabs-title-w">
                <h2 className="collabs-title-main">SKILLS</h2>
                <h2 className="collabs-title-sub">
                  <span className="span-font-brier">&amp;expertise</span>
                </h2>
              </div>

              {/* Right Column: Paragraph */}
              <div className="collabs-para-w">
                <p className="collabs-para">
                 I combine creative thinking with modern technology to build meaningful digital experiences, blending thoughtful design, clean code, and powerful interactions across the web.
                </p>
              </div>
            </div>

            <div className="spacer _4rem" style={{ height: '4rem' }}></div>

            {/* Infinite Horizontal Marquee Scroll for Skills */}
            <div className="collabs-marquee-container">
              <div className="collabs-marquee-track">
                {/* Track has two lists side by side to loop infinitely */}
                <div className="collabs-marquee-list">
                  {SKILLS_DATA.map((skill, idx) => (
                    <div key={idx} className="skill-pill">
                      <span className="skill-dot"></span>
                      <span className="skill-text">{skill}</span>
                    </div>
                  ))}
                </div>
                <div className="collabs-marquee-list" aria-hidden="true">
                  {SKILLS_DATA.map((skill, idx) => (
                    <div key={`dup-${idx}`} className="skill-pill">
                      <span className="skill-dot"></span>
                      <span className="skill-text">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            <div className="spacer _6rem" style={{ height: '6rem' }}></div>
          </div>
        </section>

        {/* What's Up On Socials Section */}
        <section className="s is-callout-socials">
          <div className="c is-callout-socials">
            <div className="callout-socials-layout">
              {/* Controller Icon */}
              <div className="callout-socials-rive-w">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: '2.75rem', height: '2.75rem', color: '#0b0f02' }}>
                  <rect x="2" y="6" width="20" height="12" rx="4" />
                  <line x1="6" y1="12" x2="10" y2="12" />
                  <line x1="8" y1="10" x2="8" y2="14" />
                  <circle cx="15" cy="10.5" r="0.5" fill="currentColor" stroke="none" />
                  <circle cx="17.5" cy="12.5" r="0.5" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="14.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </div>

              {/* Title matching landonorris.com 100% */}
              <h2 className="callout-socials-title">
                <div className="reveal-line-wrapper">
                  <span className="reveal-line-text title-whats-up">LET’S CONNECT</span>
                  <div className="reveal-line-block"></div>
                </div>
                <div className="reveal-line-wrapper">
                  <span className="reveal-line-text title-on-socials">& GET TO KNOW ME</span>
                  <div className="reveal-line-block"></div>
                </div>
              </h2>

              {/* Cards Fan */}
              <div className="callout-socials-card-layout">
                {SOCIAL_CARDS.map((card) => (
                  <div
                    key={card.id}
                    className={`callout-socials-card-w ${card.className || ''}`}
                    onClick={() => setSelectedSocialCard(card)}
                  >
                    <div className="video-stream">
                      <img
                        src={card.image}
                        loading="lazy"
                        alt={card.alt}
                        className={`image is-social-card ${card.isContact ? 'is-contact-card' : ''}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtext */}
              <div className="callout-socials-intro-w">
                <div className="text-cta-short-intro font-brier">Follow Lando on social media</div>
              </div>

              {/* Social Links */}
              <div className="callout-socials-links-layout">
                <a href="https://www.tiktok.com/@landonorris" target="_blank" rel="noopener noreferrer" className="text-link-w">
                  tiktok
                </a>
                <a href="https://www.instagram.com/lando" target="_blank" rel="noopener noreferrer" className="text-link-w">
                  instagram
                </a>
                <a href="https://www.youtube.com/@LandoNorris" target="_blank" rel="noopener noreferrer" className="text-link-w">
                  Youtube
                </a>
                <a href="https://www.twitch.tv/landonorris" target="_blank" rel="noopener noreferrer" className="text-link-w">
                  Twitch
                </a>
              </div>
            </div>
            <div className="spacer _4rem" style={{ height: '4rem' }}></div>
          </div>
        </section>

      </main>

      {/* Footer SVG Clip Path Definition */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <clipPath id="footer-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.96
                     L 0,0.16
                     Q 0,0.12 0.02,0.12
                     L 0.33,0.12
                     C 0.40,0.12 0.44,0.01 0.5,0.01
                     C 0.56,0.01 0.60,0.12 0.67,0.12
                     L 0.98,0.12
                     Q 1,0.12 1,0.16
                     L 1,0.96
                     Q 1,1 0.98,1
                     L 0.02,1
                     Q 0,1 0,0.96
                     Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Footer Section */}
      <section className="s is-footer">
        <div className="c is-footer">
          <div className="footer-layout-w">
            <div className="footer-layout-clip">
              <div className="footer-inner-layout">
                
                {/* Statement overlay with signature */}
                <div className="footer-statement-w">
                  <div className="footer-statement-layout">
                    <div className="footer-rive-w">
                      <img 
                        src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67cecea4e9d311047dcb51e5_ln4-hw-signature2.svg" 
                        alt="Lando signature" 
                      />
                    </div>
                    <h2 className="text-impact-sm-mona footer">
                      <span>ALWAYS </span>
                      <span className="text-impact-sm-brier c-lime-off">BRINGING</span>
                      <br />
                      <span>THE </span>
                      <span className="text-impact-sm-brier c-lime-off">FIGHT.</span>
                    </h2>
                  </div>
                </div>

                {/* Left and Right navigation link columns */}
                <div className="footer-links-w">
                  <div className="footer-links-col">
                    <div className="text-eyebrow">pages</div>
                    <div className="footer-links-layout">
                      <a href="/" className="text-link-w">Home</a>
                      <a href="/on-track" className="text-link-w">On Track</a>
                      <a href="/off-track" className="text-link-w">Off Track</a>
                      <a href="/calendar" className="text-link-w">Calendar</a>
                    </div>
                    <a href="https://store.landonorris.com/" target="_blank" rel="noopener noreferrer" className="text-link-w c-lime">Store</a>
                  </div>

                  <div className="footer-links-col">
                    <div className="text-eyebrow">Follow On</div>
                    <div className="footer-links-layout">
                      <a href="https://www.tiktok.com/@landonorris" target="_blank" rel="noopener noreferrer" className="text-link-w">Tiktok</a>
                      <a href="https://www.instagram.com/lando" target="_blank" rel="noopener noreferrer" className="text-link-w">Instagram</a>
                      <a href="https://www.youtube.com/landonorris04" target="_blank" rel="noopener noreferrer" className="text-link-w">Youtube</a>
                      <a href="https://www.twitch.tv/landonorris" target="_blank" rel="noopener noreferrer" className="text-link-w">Twitch</a>
                    </div>
                  </div>
                </div>

                {/* Center Helmet and Business enquiries button */}
                <div className="footer-bg-helmet-w">
                  <div className="footer-bg-helmet-layout">
                    <img 
                      src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67d43d6e276c436a378a1da6_ln-360-helm-1.webp" 
                      alt="Lando Helmet" 
                      className="footer-bg-img"
                    />
                    <div className="footer-bg-bottom-btn-w">
                      <a href="mailto:business@landonorris.com" className="btn-w">
                        <span>business enquiries</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Partner logos marquee row */}
                <div className="footer-marquee" aria-hidden="true">
                  <div className="footer-marquee-item">
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d70a9e147b77952c0d_ln4-footer-logo-android.svg" alt="Android" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d7564fc5a9fccf822f_ln4-footer-logo-pap.svg" alt="PAP" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d761eeca9060e00622_ln4-footer-logo-monster.svg" alt="Monster" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d72c50967c2195c702_ln4-ln4-collab-bell-helmets.svg" alt="Bell Helmets" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67efc88cb3373daa7ba240d6_ln4-ln4-collab-logo-tumi.svg" alt="Tumi" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d718fcdbf76afbcc45_ln4-ln4-collab-pure-electric.svg" alt="Pure Electric" className="footer-marquee-svg" />
                    </div>
                    {/* Duplicate set for seamless marquee loop */}
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d70a9e147b77952c0d_ln4-footer-logo-android.svg" alt="Android" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d7564fc5a9fccf822f_ln4-footer-logo-pap.svg" alt="PAP" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d761eeca9060e00622_ln4-footer-logo-monster.svg" alt="Monster" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d72c50967c2195c702_ln4-ln4-collab-bell-helmets.svg" alt="Bell Helmets" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67efc88cb3373daa7ba240d6_ln4-ln4-collab-logo-tumi.svg" alt="Tumi" className="footer-marquee-svg" />
                    </div>
                    <div className="footer-marquee-logo-w">
                      <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/68dbd5d718fcdbf76afbcc45_ln4-ln4-collab-pure-electric.svg" alt="Pure Electric" className="footer-marquee-svg" />
                    </div>
                  </div>
                </div>

                {/* Topographic pattern overlay */}
                <div className="footer-bg-pattern-w">
                  <img src="https://cdn.prod.website-files.com/67b5a02dc5d338960b17a7e9/67dbeba158707fa1cd5e5e45_blobs_footer_1.svg" alt="Background pattern" />
                </div>
              </div>
            </div>
          </div>

          {/* Legal bottom row */}
          <div className="footer-legal-links-w">
            <div className="footer-legal-links-col">
              <span style={{ fontWeight: 700 }}>© 2026 NISARG DARJI.</span>
              <span>All rights reserved</span>
            </div>
            <div className="footer-legal-links-col">
              <a href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
              <a href="/legal/terms-conditions" target="_blank" rel="noopener noreferrer">Terms</a>
            </div>
          </div>
        </div>
        <div className="footer-bg-gradient"></div>
      </section>

      {/* Centered Social Card Modal Lightbox */}
      <AnimatePresence>
        {selectedSocialCard && (
          <motion.div
            className="social-card-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            onClick={() => setSelectedSocialCard(null)}
          >
            {/* Close Button */}
            <button
              className="social-card-modal-close"
              onClick={(e) => {
                e.stopPropagation()
                setSelectedSocialCard(null)
              }}
              aria-label="Close modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Centered Modal Card matching Image 2 */}
            <motion.div
              key={selectedSocialCard.id}
              className="testimonial-modal-card"
              initial={{ scale: 0.88, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 26, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Quote / Statement Body Text */}
              <div className="testimonial-card-text">
                {selectedSocialCard.quote}
              </div>

              {/* Horizontal Divider Line */}
              <div className="testimonial-card-divider"></div>

              {/* Footer Author & Country Flag Row */}
              <div className="testimonial-card-footer">
                <div className="testimonial-card-author-w">
                  <div className="testimonial-card-avatar-w">
                    <img
                      src={myPhoto}
                      alt={selectedSocialCard.name}
                      className="testimonial-card-avatar"
                    />
                  </div>
                  <div className="testimonial-card-info">
                    <div className="testimonial-card-name">{selectedSocialCard.name}</div>
                    <div className="testimonial-card-role">{selectedSocialCard.role}</div>
                    <div className="testimonial-card-location">{selectedSocialCard.location}</div>
                  </div>
                </div>

                {/* Country Flag Badge (Image 2 style) */}
                <div className="testimonial-card-flag-w">
                  <svg viewBox="0 0 72 48" className="flag-svg" width="60" height="40">
                    {/* Indian Flag SVG */}
                    <rect width="72" height="16" fill="#FF9933" />
                    <rect y="16" width="72" height="16" fill="#FFFFFF" />
                    <rect y="32" width="72" height="16" fill="#128807" />
                    <circle cx="36" cy="24" r="5.8" fill="none" stroke="#000080" strokeWidth="0.9" />
                    <circle cx="36" cy="24" r="1.2" fill="#000080" />
                    {Array.from({ length: 24 }).map((_, i) => (
                      <line
                        key={i}
                        x1="36"
                        y1="24"
                        x2={36 + 5.8 * Math.cos((i * 15 * Math.PI) / 180)}
                        y2={24 + 5.8 * Math.sin((i * 15 * Math.PI) / 180)}
                        stroke="#000080"
                        strokeWidth="0.5"
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App