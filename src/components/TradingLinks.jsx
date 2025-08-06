import './TradingLinks.css'

function TradingLinks() {
  const platforms = [
    {
      name: 'GeckoTerminal',
      logo: '/GTerm.png',
      url: 'https://www.geckoterminal.com/solana/pools/4LDHt1EqW8UuRh9954t5j7KMCFdTu6XgSPuaNKccXHHm'
    },
    {
      name: 'CoinGecko',
      logo: '/CG.png',
      url: 'https://www.coingecko.com/en/coins/treeroot'
    },
    {
      name: 'DexScreener',
      logo: '/dex.png',
      url: 'https://dexscreener.com/solana/4ldht1eqw8uurh9954t5j7kmcfdtu6xgspuankccxhhm'
    },
    {
      name: 'CoinPaprika',
      logo: '/coinpaprika.png',
      url: 'https://coinpaprika.com/coin/root-treeroot/'
    },
    {
      name: 'DexTools',
      logo: '/dextools.png',
      url: 'https://dextools.io/app/en/solana/pair-explorer/4LDHt1EqW8UuRh9954t5j7KMCFdTu6XgSPuaNKccXHHm'
    },
    {
      name: 'Live Coin Watch',
      logo: '/livecoinwatch.png',
      url: 'https://www.livecoinwatch.com/price/TreeRoot-____ROOT'
    }
  ]

  return (
    <section className="trading-links">
      <div className="container">
        <h2 className="section-title">Trade $ROOT</h2>
        <p className="section-subtitle">
          Access $ROOT on leading crypto platforms
        </p>
        <div className="platforms-grid">
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`platform-link ${platform.hasLogo === false ? 'no-logo' : ''}`}
              aria-label={`Trade on ${platform.name}`}
            >
              <div className="platform-logo">
                {platform.hasLogo === false ? (
                  <div className="logo-placeholder">
                    <span className="logo-text">LCW</span>
                  </div>
                ) : (
                  <img 
                    src={platform.logo} 
                    alt={`${platform.name} logo`}
                    loading="lazy"
                  />
                )}
              </div>
              <span className="platform-name">{platform.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TradingLinks
