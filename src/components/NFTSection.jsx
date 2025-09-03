import './NFTSection.css'

function NFTSection() {
  return (
    <section className="nft-section">
      <div className="container">
        <h2 className="section-title">$ROOT NFTs</h2>
        <div className="nft-info">
          <p className="nft-subtitle">Root Guardian NFT Collection - 888 membership NFTs on Solana</p>
          <p className="nft-description">Trade Root Guardian NFTs on leading Solana marketplaces. Each NFT provides staking rewards and community access.</p>
        </div>
        <div className="nft-marketplaces">
          <h3 className="benefits-title">Trade on NFT Marketplaces</h3>
          <div className="marketplace-links">
            <a href="https://magiceden.us/marketplace/root_guardian" target="_blank" rel="noopener noreferrer" className="marketplace-link">
              <span className="marketplace-name">Magic Eden</span>
            </a>
            <a href="https://www.tensor.trade/trade/rootguardians" target="_blank" rel="noopener noreferrer" className="marketplace-link">
              <span className="marketplace-name">Tensor</span>
            </a>
            <a href="https://launchmynft.io/sol/18831" target="_blank" rel="noopener noreferrer" className="marketplace-link">
              <span className="marketplace-name">LaunchMyNFT</span>
            </a>
          </div>
        </div>
        <div className="nft-cta">
          <a href="https://treeroot-city.gitbook.io/litepaper/" target="_blank" rel="noopener noreferrer" className="btn-secondary nft-docs-btn">
            Read Full NFT Documentation
          </a>
        </div>
      </div>
    </section>
  )
}

export default NFTSection