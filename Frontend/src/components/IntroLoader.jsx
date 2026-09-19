import React, { useState, useEffect, useRef } from 'react'
import introVideo from '../assets/real_intro_portfolio_1.mp4'

const IntroLoader = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false)
  const videoRef = useRef(null)
  const exitTimeoutRef = useRef(null)
  const hasFinishedRef = useRef(false)

  const handleVideoEnd = () => {
    if (hasFinishedRef.current) return
    hasFinishedRef.current = true
    setIsExiting(true)

    if (exitTimeoutRef.current) {
      clearTimeout(exitTimeoutRef.current)
    }

    exitTimeoutRef.current = setTimeout(() => {
      if (onComplete) onComplete()
    }, 900)
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Explicitly reset video position and playback rate on every reload
      video.currentTime = 0
      video.defaultPlaybackRate = 0.85
      video.playbackRate = 0.85
      video.play().catch(() => {
        if (video) {
          video.muted = true
          video.currentTime = 0
          video.defaultPlaybackRate = 0.85
          video.playbackRate = 0.85
          video.play().catch(() => {})
        }
      })
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleVideoEnd()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      // Clear all timeouts and event listeners on unmount/reload
      if (exitTimeoutRef.current) {
        clearTimeout(exitTimeoutRef.current)
        exitTimeoutRef.current = null
      }
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div
      className={`intro-loader-fullscreen ${isExiting ? 'is-exiting-up' : ''}`}
      onClick={handleVideoEnd}
    >
      <video
        ref={videoRef}
        src={introVideo}
        className="intro-video-fullscreen"
        autoPlay
        playsInline
        muted
        preload="auto"
        onEnded={handleVideoEnd}
        onError={handleVideoEnd}
      />
    </div>
  )
}

export default IntroLoader
