import Header from './components/Header'
import Footer from './components/Footer'
import NoiseOverlay from './components/NoiseOverlay'
import ClaimPage from './components/ClaimPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <NoiseOverlay />
      <Header />
      <main>
        <ClaimPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
