import './ClaimHeader.css'

export default function ClaimHeader() {
  return (
    <header className="claim-header">
      <div className="container">
        <a href="https://treeroot.city" className="claim-header-brand">
          <img src="/logo-transparents.png?v=2" alt="$ROOT" className="claim-header-logo" />
          <span className="claim-header-text">treeroot.city</span>
        </a>
        <nav className="claim-header-nav">
          <a href="https://treeroot.city">Home</a>
          <a href="https://x.com/TreeRootDev" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://t.me/TreeRootCity" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://treeroot-city.gitbook.io/litepaper/" target="_blank" rel="noopener noreferrer">Docs</a>
        </nav>
      </div>
    </header>
  )
}
