import { useEffect, useState } from 'react'
import './Hero.css'

function Hero() {
  const [showInlineMint, setShowInlineMint] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    const checkReady = () => {
      const btnHost = document.getElementById('mint-button-container')
      if (btnHost && btnHost.children && btnHost.children.length > 0) {
        setWidgetReady(true)
        setShowFallback(false)
        return true
      }
      return false
    }

    // quick checks for first few seconds
    let tries = 0
    const iv = setInterval(() => {
      tries += 1
      if (checkReady() || tries >= 15) {
        clearInterval(iv)
        if (!checkReady()) setShowFallback(true)
      }
    }, 200)

    return () => clearInterval(iv)
  }, [])

  const getProvider = () => {
    const anyWindow = window
    if (anyWindow?.solana) return anyWindow.solana
    if (anyWindow?.backpack?.solana) return anyWindow.backpack.solana
    if (anyWindow?.phantom?.solana) return anyWindow.phantom.solana
    return null
  }

  const connectWallet = async () => {
    try {
      setIsConnecting(true)
      const provider = getProvider()
      if (!provider?.connect) {
        alert('No Solana wallet found. Please install Phantom or Backpack.')
        return
      }
      const res = await provider.connect()
      const pubkey = (res?.publicKey || provider.publicKey)?.toString()
      if (pubkey) setWalletAddress(pubkey)
    } catch (err) {
      console.error('Wallet connect failed', err)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      const provider = getProvider()
      if (provider?.disconnect) await provider.disconnect()
    } catch (err) {
      console.error('Wallet disconnect failed', err)
    } finally {
      setWalletAddress('')
    }
  }
  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title glitch" data-text="$ROOT">
            $ROOT
          </h1>
          <p className="hero-subtitle">Digital Growth. Rooted in Community.</p>
          
          {/* Mint Section */}
          <div className="mint-card">
            <h2 className="mint-title">Mint Root Guardian</h2>
            <p className="mint-subtext">Claim your membership NFT and daily $ROOT rewards access.</p>
            <div className="mint-meta">
              <span className="pill">Supply: 888</span>
              <span className="pill">Price: FREE WL / 0.05 SOL Public</span>
              <span className="pill">WL: {walletAddress ? 'Connected' : 'Connect wallet'}</span>
            </div>
            <div className="wallet-row">
              {walletAddress ? (
                <>
                  <span className="wallet-badge">{walletAddress.slice(0, 4)}…{walletAddress.slice(-4)}</span>
                  <button type="button" className="btn-secondary wallet-btn" onClick={disconnectWallet}>Disconnect</button>
                </>
              ) : (
                <button type="button" className="btn-secondary wallet-btn" onClick={connectWallet} disabled={isConnecting}>
                  {isConnecting ? 'Connecting…' : 'Connect Wallet'}
                </button>
              )}
            </div>
            <div className="mint-widgets">
              <div id="mint-counter" className="mint-counter">
                <span className="mint-counter-fallback">Mint status loading…</span>
              </div>
              <div id="mint-button-container" className="mint-button"></div>
              {showFallback && (
                <div className="mint-fallbacks">
                  <a
                    className="btn-secondary mint-fallback-btn"
                    href="https://launchmynft.io/collections/4r3G7i6wTn7Wek5zCXks3hMztdNbRAL3U9aCDFQbASzm/VAM19et9cpxGTtNAsTmR"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Mint Page
                  </a>
                  <button
                    type="button"
                    className="btn-secondary mint-fallback-btn inline-toggle"
                    onClick={() => setShowInlineMint(true)}
                  >
                    Open Inline Mint
                  </button>
                  <div className="mint-help">Having trouble? Use one of the fallback options above.</div>
                </div>
              )}
            </div>
          </div>
          {showInlineMint && (
            <div className="mint-modal-overlay" onClick={() => setShowInlineMint(false)}>
              <div className="mint-modal" onClick={(e) => e.stopPropagation()}>
                <button className="mint-modal-close" onClick={() => setShowInlineMint(false)}>✕</button>
                <iframe
                  className="mint-modal-iframe"
                  title="LaunchMyNFT Mint"
                  src="https://launchmynft.io/collections/4r3G7i6wTn7Wek5zCXks3hMztdNbRAL3U9aCDFQbASzm/VAM19et9cpxGTtNAsTmR"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          )}

          <div className="hero-buttons">
            <a href="https://pump.fun/coin/J7hX5qVuJuiUiuZ1AkqE7eVS3sjTJ5kgFnuJwR2Rpump" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Buy on Pump.fun
            </a>
            <a href="https://x.com/i/communities/1951722418839458072" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero