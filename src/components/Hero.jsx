import './Hero.css'

function Hero() {
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
            <div className="mint-widgets">
              <div id="mint-counter" className="mint-counter">
                <span className="mint-counter-fallback">Mint status loading…</span>
              </div>
              <div id="mint-button-container" className="mint-button">
                <a
                  className="btn-secondary mint-fallback-btn"
                  href="https://launchmynft.io/collections/4r3G7i6wTn7Wek5zCXks3hMztdNbRAL3U9aCDFQbASzm/VAM19et9cpxGTtNAsTmR"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Mint Page
                </a>
              </div>
              <div className="mint-help">
                If this box is empty, use the button above to mint on LaunchMyNFT.
              </div>
            </div>
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