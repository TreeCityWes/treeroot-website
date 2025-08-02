import './Stream.css'

function Stream() {
  return (
    <section className="stream">
      <div className="container">
        <h2 className="section-title">TreeCityWes Streams</h2>
        <div className="stream-card">
          <div className="stream-placeholder">
            <div className="stream-icon">📺</div>
            <h3>Live Commentary</h3>
            <p>
              TreeCityWes streams live takes on meme coins, on-chain rug alerts and root-level alpha.
            </p>
            <div className="stream-links">
              <a href="#" className="stream-link">Twitch</a>
              <a href="#" className="stream-link">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stream