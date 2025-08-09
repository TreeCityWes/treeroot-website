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
          
          {/* Mint Announcement Banner */}
          <div className="mint-banner">
            <div className="mint-banner-text">
              Root Guardian mint is live. Supply 888. Free WL / 0.05 SOL public.
            </div>
          </div>

          <div className="hero-buttons">
            <a href="https://pump.fun/coin/J7hX5qVuJuiUiuZ1AkqE7eVS3sjTJ5kgFnuJwR2Rpump" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Buy on Pump.fun
            </a>
            <a href="https://launchmynft.io/collections/4r3G7i6wTn7Wek5zCXks3hMztdNbRAL3U9aCDFQbASzm/VAM19et9cpxGTtNAsTmR" target="_blank" rel="noopener noreferrer" className="btn-secondary">
              Mint Page
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero