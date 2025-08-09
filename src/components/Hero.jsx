import { useEffect, useState } from 'react'
import './Hero.css'

function Hero() {
  const [showInlineMint, setShowInlineMint] = useState(false)
  const [widgetReady, setWidgetReady] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [wlEligible, setWlEligible] = useState(null) // null = unknown, true/false = status

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

  // Try to detect WL eligibility signals from the LaunchMyNFT widget
  useEffect(() => {
    const tryReadGlobal = () => {
      const g = window
      // Common guesses of where widget may expose state
      const candidates = [
        g?.LMNF,
        g?.LMNF_STATE,
        g?.lmnf,
        g?.launchmynft,
        g?.__LMNF__
      ]
      for (const c of candidates) {
        if (!c) continue
        const val = c?.wl ?? c?.state?.wl ?? c?.allowlist?.eligible ?? c?.eligibility?.wl
        if (typeof val === 'boolean') return val
      }
      // Look for data attributes on injected button
      const btnHost = document.getElementById('mint-button-container')
      const btn = btnHost?.querySelector('[data-wl], [data-eligible]')
      const attrVal = btn?.getAttribute?.('data-wl') ?? btn?.getAttribute?.('data-eligible')
      if (attrVal === 'true' || attrVal === 'false') return attrVal === 'true'
      return null
    }

    let stopped = false
    if (walletAddress) {
      // Poll briefly after connect since widget may update async
      let tries = 0
      const iv = setInterval(() => {
        tries += 1
        const res = tryReadGlobal()
        if (typeof res === 'boolean') {
          setWlEligible(res)
          clearInterval(iv)
        } else if (tries >= 30) {
          clearInterval(iv)
        }
      }, 300)

      const onMessage = (e) => {
        const d = e?.data
        if (!d) return
        const candidates = [d?.wl, d?.allowlist, d?.eligible, d?.isWl]
        for (const v of candidates) {
          if (typeof v === 'boolean') {
            setWlEligible(v)
            break
          }
        }
      }
      const onCustom = (e) => {
        const v = e?.detail?.wl ?? e?.detail?.eligible
        if (typeof v === 'boolean') setWlEligible(v)
      }
      window.addEventListener('message', onMessage)
      window.addEventListener('lmnf:wl', onCustom)
      window.addEventListener('LMNF_WL_CHANGED', onCustom)

      return () => {
        stopped = true
        window.removeEventListener('message', onMessage)
        window.removeEventListener('lmnf:wl', onCustom)
        window.removeEventListener('LMNF_WL_CHANGED', onCustom)
      }
    } else {
      setWlEligible(null)
    }
  }, [walletAddress])

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
            <div className="mint-meta-line">
              <span>Supply 888</span>
              <span className="sep">•</span>
              <span>Free WL / 0.05 SOL</span>
              {wlEligible !== null && (
                <span className={`wl-chip ${wlEligible ? 'ok' : 'no'}`}>
                  {wlEligible ? 'WL Eligible' : 'WL Not Eligible'}
                </span>
              )}
            </div>
            <div className="wallet-row">
              <button
                type="button"
                className="btn-secondary wallet-btn"
                onClick={walletAddress ? disconnectWallet : connectWallet}
                disabled={isConnecting}
              >
                {walletAddress ? 'Disconnect' : (isConnecting ? 'Connecting…' : 'Connect Wallet')}
              </button>
            </div>
            <div className="mint-widgets">
              <div id="mint-counter" className="mint-counter">
                <span className="mint-counter-fallback">Mint status loading…</span>
              </div>
              <div id="mint-button-container" className="mint-button"></div>
              {showFallback && (
                <div className="mint-fallbacks">
                  <a
                    className="text-link"
                    href="https://launchmynft.io/collections/4r3G7i6wTn7Wek5zCXks3hMztdNbRAL3U9aCDFQbASzm/VAM19et9cpxGTtNAsTmR"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Having trouble? Open the mint page.
                  </a>
                  <div className="mint-iframe-wrap small">
                    <iframe
                      className="mint-iframe"
                      title="LaunchMyNFT Mint"
                      src="https://launchmynft.io/collections/4r3G7i6wTn7Wek5zCXks3hMztdNbRAL3U9aCDFQbASzm/VAM19et9cpxGTtNAsTmR"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Inline modal removed for a simpler, cleaner UI */}

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