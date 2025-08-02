import Header from './components/Header'
import Hero from './components/Hero'
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
      </main>
      <Footer />
    </div>
  )
}

export default App
