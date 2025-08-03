import Header from './components/Header'
import Hero from './components/Hero'
import TokenDistribution from './components/TokenDistribution'
import NFTSection from './components/NFTSection'
import Footer from './components/Footer'
import NoiseOverlay from './components/NoiseOverlay'
import './App.css'

function App() {
  return (
    <div className="App">
      <NoiseOverlay />
      <Header />
      <main>
        <Hero />
        <TokenDistribution />
        <NFTSection />
      </main>
      <Footer />
    </div>
  )
}

export default App
