import './NFTSection.css'

function NFTSection() {
  return (
    <section className="nft-section">
      <div className="container">
        <h2 className="section-title">Root Guardian NFT Collection</h2>
        <div className="nft-info">
          <p className="nft-subtitle">888 membership NFTs with access to a one-time private staking pool</p>
          <p className="nft-description">5% of total $ROOT supply (50,000,000 $ROOT) is allocated to an NFT holders staking pool. Each NFT earns 777 $ROOT daily until the pool is fully distributed.</p>
        </div>
        <div className="nft-card">
          <div className="nft-benefits">
            <h3 className="benefits-title">Collection Overview</h3>
            <ul className="benefits-list">
              <li><strong>Total Supply:</strong> 888 NFTs</li>
              <li><strong>Blockchain:</strong> Solana</li>
              <li><strong>Platform:</strong> LaunchMyNFT.io</li>
              <li><strong>Staking Pool:</strong> 50,000,000 $ROOT (5% of total supply)</li>
              <li><strong>Staking:</strong> Begins after mint completion</li>
              <li><strong>Rewards:</strong> 777 $ROOT daily per NFT; automatic distribution; no lock; continues until pool depletes</li>
            </ul>
          </div>
          <div className="whitelist-breakdown">
            <h3 className="benefits-title">Distribution Structure</h3>
            <ul className="benefits-list">
              <li><strong>Round One:</strong> 400 spots for Top 200 $ROOT holders (2 NFTs each) — FREE</li>
              <li><strong>Round Two:</strong> 400 spots for partner communities (FCFS) — FREE</li>
              <li><strong>Public Sale:</strong> 88 spots — 0.05 SOL</li>
            </ul>

            <h3 className="benefits-title">Partner Communities Whitelist Count</h3>
            <ul className="benefits-list">
              <li><strong>Degen Skull NFT:</strong> 196 addresses</li>
              <li><strong>No-Face $KJP NFT:</strong> 94 addresses</li>
              <li><strong>Potato Vampire NFT:</strong> 77 addresses</li>
              <li><strong>XenCat token ($100+):</strong> 330 addresses</li>
              <li><strong>SolXen token ($100+):</strong> 274 addresses</li>
              <li><strong>EmojiDracula token ($100+):</strong> 164 addresses</li>
              <li><strong>Total:</strong> ~1000 unique addresses competing for 400 spots</li>
            </ul>

            <h3 className="benefits-title">Cross-Community Participation</h3>
            <ul className="benefits-list">
              <li>5 projects: 2 addresses</li>
              <li>4 projects: 8 addresses</li>
              <li>3 projects: 34 addresses</li>
              <li>2 projects: 157 addresses</li>
              <li>1 project: ~800 addresses</li>
            </ul>

            <h3 className="benefits-title">Mint Structure</h3>
            <ul className="benefits-list">
              <li><strong>Phase 1 — ROOT Holders (400 NFTs):</strong> FREE (gas only), 1 week, eligibility: Top 200 $ROOT holders at snapshot (10PM ET on 8/6), limit 2 per wallet, guaranteed allocation during this period</li>
              <li><strong>Phase 2 — Partner Communities (400 NFTs):</strong> FREE (gas only), 1 week (concurrent with Phase 1), eligibility: ~1,000 snapshot addresses, method: FCFS, limit 1 per wallet</li>
              <li><strong>Phase 3 — Public Sale:</strong> Starts after 1 week, initial allocation 88 NFTs (+ any unminted), price 0.05 SOL ($8), eligibility open to all, limit 1 per wallet</li>
            </ul>

            <h3 className="benefits-title">Eligibility & Snapshot</h3>
            <ul className="benefits-list">
              <li>Must be in snapshot taken August 6th at 10PM ET</li>
              <li>Token communities: wallet must be holding $100+ at time of snapshot</li>
              <li>NFT communities: any amount held at snapshot</li>
              <li><strong>Snapshot summary:</strong> ROOT token holders with $5+ minimum: 204 addresses; Partner NFT holders (all holdings): 367 addresses; Partner token holders ($100+ minimum): 768 addresses</li>
            </ul>
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