import './NFTSection.css'

function NFTSection() {
  return (
    <section className="nft-section">
      <div className="container">
        <h2 className="section-title">Tree Lord NFT Collection</h2>
        <div className="nft-info">
          <p className="nft-subtitle">555 Utility-Focused Membership Tokens with Built-in Staking</p>
          <p className="nft-description">
            Each Tree Lord NFT provides access to a one-time 5% $ROOT supply allocation (50,000,000 $ROOT) 
            distributed as staking rewards among all holders.
          </p>
        </div>
        
        <div className="nft-content">
          <div className="nft-benefits">
            <h3 className="benefits-title">Tree Lord Benefits</h3>
            <ul className="benefits-list">
              <li>🎯 <strong>Staking Pool Rewards:</strong> Access to 5% $ROOT allocation</li>
              <li>🔐 <strong>Exclusive Access:</strong> Private channels and premium content</li>
              <li>🎮 <strong>Creator Perks:</strong> Priority access to streaming events</li>
              <li>🎁 <strong>Enhanced Giveaways:</strong> Boosted participation in community events</li>
              <li>⚡ <strong>X1 Migration:</strong> Early access to X1 Blockchain features</li>
            </ul>
          </div>
          
          <div className="whitelist-breakdown">
            <h3 className="whitelist-title">Whitelist Allocation</h3>
            <div className="whitelist-grid">
              <div className="whitelist-item">
                <div className="whitelist-number">200</div>
                <div className="whitelist-label">Top $ROOT Holders</div>
              </div>
              <div className="whitelist-item">
                <div className="whitelist-number">100</div>
                <div className="whitelist-label">NoFace $KJP Community</div>
              </div>
              <div className="whitelist-item">
                <div className="whitelist-number">100</div>
                <div className="whitelist-label">Potato Vampire NFT</div>
              </div>
              <div className="whitelist-item">
                <div className="whitelist-number">150</div>
                <div className="whitelist-label">Public Sale</div>
              </div>
              <div className="whitelist-item">
                <div className="whitelist-number">5</div>
                <div className="whitelist-label">Team/Development</div>
              </div>
            </div>
            <div className="mint-info">
              <p className="mint-price">Fixed Price: <strong>0.08 SOL</strong> across all phases</p>
              <p className="launch-note">Launch only after $ROOT graduation from pump.fun bonding curve</p>
            </div>
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