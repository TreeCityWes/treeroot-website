import './PumpStats.css'

function PumpStats() {
  return (
    <section className="pump-stats">
      <div className="container">
        <h2 className="section-title">Pump.fun Ecosystem</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Platform Token</h3>
            <p className="stat-value">PUMP</p>
            <p className="stat-desc">Current price ~$0.00271</p>
          </div>
          <div className="stat-card">
            <h3>Supply Stats</h3>
            <p className="stat-value">354B</p>
            <p className="stat-desc">Circulating / 1T Max</p>
          </div>
          <div className="stat-card">
            <h3>Active Tokens</h3>
            <p className="stat-value">1M+</p>
            <p className="stat-desc">Live meme coins on Solana</p>
          </div>
        </div>
        <p className="platform-desc">
          Pump.fun handles over a million live meme coins on Solana, all with instant 
          fair-launch capability and a live trading catalog.
        </p>
      </div>
    </section>
  )
}

export default PumpStats