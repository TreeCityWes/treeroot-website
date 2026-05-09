import { StrictMode, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'

import '@solana/wallet-adapter-react-ui/styles.css'
import './index.css'
import App from './App.jsx'

function Root() {
  const endpoint = import.meta.env.VITE_SOLANA_RPC_URL || clusterApiUrl('mainnet-beta')
  // X1 only ships against Backpack and X1 Wallet. Both implement the Wallet
  // Standard, so they auto-discover here without an explicit adapter list.
  const wallets = useMemo(() => [], [])
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <App />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
