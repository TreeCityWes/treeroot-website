import './About.css'

function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <h2 className="section-title">About $ROOT</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              $ROOT is the Solana meme token launched on pump.fun and curated by TreeCityWes. 
              It serves as the creator's content currency and engagement hub.
            </p>
            <div className="token-info">
              <div className="info-item">
                <span className="label">Platform:</span>
                <span className="value">pump.fun</span>
              </div>
              <div className="info-item">
                <span className="label">Network:</span>
                <span className="value">Solana</span>
              </div>
              <div className="info-item">
                <span className="label">Category:</span>
                <span className="value">Meme Token</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About