import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-brand">$ROOT - treeroot.dev</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Pump.fun</a>
            <a href="https://t.me/TreeRootDev" target="_blank" rel="noopener noreferrer" className="footer-link">Telegram</a>
            <a href="https://x.com/i/communities/1951722418839458072" target="_blank" rel="noopener noreferrer" className="footer-link">X Community</a>
            <a href="https://x.com/TreeRootDev" target="_blank" rel="noopener noreferrer" className="footer-link">Dev</a>
            <a href="https://youtube.com/treecitywes" target="_blank" rel="noopener noreferrer" className="footer-link">YouTube</a>
            <a href="#" className="footer-link">DexScreener</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer