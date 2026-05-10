import ClaimHeader from './components/ClaimHeader'
import Footer from './components/Footer'
import NoiseOverlay from './components/NoiseOverlay'
import ClaimPage from './components/ClaimPage'
import './App.css'

function App() {
  return (
    <div className="App">
      <NoiseOverlay />
      <ClaimHeader />
      <main>
        <ClaimPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
