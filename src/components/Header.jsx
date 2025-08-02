import './Header.css'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src="/logo-transparents.png?v=2" alt="$ROOT Logo" className="logo-img" />
          <span className="logo-text">treeroot.dev</span>
        </div>
        <div className="header-links">
          <div className="social-links">
            <a href="https://t.me/TreeRootDev" target="_blank" rel="noopener noreferrer" className="social-link">
              Telegram
            </a>
            <a href="https://x.com/TreeRootDev" target="_blank" rel="noopener noreferrer" className="social-link">
              X
            </a>
            <a href="#" className="social-link">
              DexScreener
            </a>
          </div>
          <a href="#" className="btn-primary pump-btn">
            Buy on Pump.fun
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header