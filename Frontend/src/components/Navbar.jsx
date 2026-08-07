import React from 'react'

const Navbar = React.forwardRef((props, ref) => {
  return (
    <header ref={ref} className="nav">
      <div className="nav-inner">
        <div className="nav-left">
          <a href="/" className="nav-logo-stacked">
            <span className="nisarg">NISARG</span>
            <span>DARJI</span>
          </a>
        </div>

        {/* Middle Diagonal Slanted LN Logo */}
        <div className="nav-center">
          <a href="/" className="nav-center-logo" style={{ color: 'inherit' }}>
            <svg width="45" height="35" viewBox="0 0 88 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Slanted L */}
              <path d="M12 4L32 44H42L22 4H12Z" fill="currentColor" />
              {/* Connected slanted N part */}
              <path d="M45 44L65 4H75L55 44H45Z" fill="currentColor" />
              <path d="M37.5 24H52.5L50.5 30H35.5L37.5 24Z" fill="currentColor" />
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
          <button title="Open Menu" className="nav-ham" onClick={props.onOpenMenu}>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
})

Navbar.displayName = 'Navbar'

export default Navbar
