import './Header.css'
import TokenPrice from './TokenPrice'

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img src="/logo-transparents.png?v=2" alt="$ROOT Logo" className="logo-img" />
          <span className="logo-text">TreeRoot.City</span>
        </div>
        <div className="header-links">
          <TokenPrice />
          <div className="social-links">
            <a href="https://t.me/TreeRootCity" target="_blank" rel="noopener noreferrer" className="social-link telegram">
              Telegram
            </a>
            <a href="https://x.com/TreeRootDev" target="_blank" rel="noopener noreferrer" className="social-link twitter-dev">
              X
            </a>
            <a href="https://youtube.com/treecitywes" target="_blank" rel="noopener noreferrer" className="social-link youtube">
              YouTube
            </a>
            <a href="https://dexscreener.com/solana/4LDHt1EqW8UuRh9954t5j7KMCFdTu6XgSPuaNKccXHHm" target="_blank" rel="noopener noreferrer" className="social-link dexscreener">
              Chart
            </a>
            <a href="https://treeroot-city.gitbook.io/litepaper/" target="_blank" rel="noopener noreferrer" className="social-link gitbook">
              GitBook
            </a>
          </div>
          <a href="https://pump.fun/coin/J7hX5qVuJuiUiuZ1AkqE7eVS3sjTJ5kgFnuJwR2Rpump" target="_blank" rel="noopener noreferrer" className="btn-primary pump-btn">
            Buy on Pump.fun
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header