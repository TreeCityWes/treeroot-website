import './Hero.css'

function Hero() {

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
          
          {/* Mint Announcement Banner */}
          <div className="mint-banner">
            <div className="mint-banner-text">
              Root Guardian mint is live. Supply 888. Free WL / 0.05 SOL public.
            </div>
            <a
              className="btn-primary mint-banner-btn"
              href="https://launchmynft.io/collections/4r3G7i6wTn7Wek5zCXks3hMztdNbRAL3U9aCDFQbASzm/VAM19et9cpxGTtNAsTmR"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mint on LaunchMyNFT
            </a>
          </div>

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