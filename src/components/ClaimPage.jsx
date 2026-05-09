import { useEffect, useMemo, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import bs58 from 'bs58'
import './ClaimPage.css'

const MIGRATION_PUBKEY = 'GZCPdavohBZpRttdzJJEaT6Xoedcida9rvnfPQTFrcU9'

function buildClaimMessage(solanaAddress, x1Address, nonce) {
  return [
    'Root Guardian → X1 claim',
    '',
    `solana: ${solanaAddress}`,
    `x1:     ${x1Address}`,
    `nonce:  ${nonce}`,
    '',
    'Signing this message authorizes the migration wallet to transfer your',
    'Root Guardian NFT(s) on X1 to the address above. No SOL is moved. No',
    'on-chain Solana transaction is created. This signature is verified',
    'off-chain by the claim service.',
  ].join('\n')
}

export default function ClaimPage() {
  const { publicKey, signMessage, connected } = useWallet()
  const [status, setStatus] = useState('idle')
  const [eligible, setEligible] = useState(null)
  const [error, setError] = useState(null)
  const [destAddress, setDestAddress] = useState('')
  const [useDifferentDest, setUseDifferentDest] = useState(false)
  const [txSigs, setTxSigs] = useState([])

  const solanaAddress = publicKey?.toBase58() ?? null

  useEffect(() => {
    if (!solanaAddress) {
      setEligible(null)
      setStatus('idle')
      setDestAddress('')
      setError(null)
      setTxSigs([])
      return
    }
    setDestAddress((prev) => prev || solanaAddress)
    setStatus('loading')
    setError(null)
    fetch('/api/eligible', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ solanaAddress }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error)
        setEligible(data)
        setStatus('eligible_loaded')
      })
      .catch((err) => {
        setError(err.message)
        setStatus('error')
      })
  }, [solanaAddress])

  const claimable = useMemo(() => {
    if (!eligible) return []
    return eligible.items.filter((it) => it.currentOwner === MIGRATION_PUBKEY)
  }, [eligible])

  const alreadyClaimed = useMemo(() => {
    if (!eligible) return []
    return eligible.items.filter((it) => it.currentOwner !== MIGRATION_PUBKEY)
  }, [eligible])

  async function handleClaim() {
    if (!signMessage || !solanaAddress) return
    const x1Address = (useDifferentDest ? destAddress : solanaAddress).trim()
    if (!x1Address) {
      setError('Destination address is required')
      return
    }
    setError(null)
    setStatus('signing')
    try {
      const nonce = crypto.randomUUID()
      const message = buildClaimMessage(solanaAddress, x1Address, nonce)
      const signed = await signMessage(new TextEncoder().encode(message))
      setStatus('submitting')
      const res = await fetch('/api/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          solanaAddress,
          x1Address,
          message,
          signature: bs58.encode(signed),
        }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || `HTTP ${res.status}`)
      setTxSigs(data.transfers || [])
      setStatus('claimed')
    } catch (err) {
      setError(err.message || String(err))
      setStatus('error')
    }
  }

  return (
    <section className="claim-page">
      <div className="container">
        <h1 className="claim-title glitch" data-text="ROOT GUARDIAN // X1 CLAIM">
          ROOT GUARDIAN // X1 CLAIM
        </h1>
        <p className="claim-subtitle">
          Claim your Root Guardian NFT on X1. Connect the same Solana wallet that holds the
          original — sign a message to prove ownership, and the matching X1 token transfers to
          your destination address. No SOL or X1 fees from your side.
        </p>

        <div className="claim-box">
          {!connected && (
            <div className="claim-step">
              <p className="claim-step-label">step 01 // connect</p>
              <WalletMultiButton className="claim-connect" />
              <p className="claim-wallet-note">
                Use the same wallet that holds your Root Guardian on Solana. X1
                supports <strong>X1 Wallet</strong> and <strong>Backpack</strong>.
              </p>
              <ul className="claim-wallet-links">
                <li>
                  <a href="https://x1.xyz" target="_blank" rel="noopener noreferrer">
                    Install X1 Wallet →
                  </a>
                </li>
                <li>
                  <a
                    href="https://chromewebstore.google.com/detail/backpack/aflkmfhebedbjioipglgcbcmnbpgliof"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Install Backpack →
                  </a>
                </li>
              </ul>
            </div>
          )}

          {connected && solanaAddress && (
            <>
              <div className="claim-step">
                <p className="claim-step-label">step 01 // connected</p>
                <code className="claim-addr">{solanaAddress}</code>
                <WalletMultiButton className="claim-connect claim-connect-small" />
              </div>

              {status === 'loading' && (
                <div className="claim-step">
                  <p className="claim-step-label">step 02 // checking eligibility…</p>
                </div>
              )}

              {status === 'error' && error && (
                <div className="claim-step claim-error">
                  <p className="claim-step-label">error</p>
                  <p>{error}</p>
                </div>
              )}

              {eligible && (
                <>
                  <div className="claim-step">
                    <p className="claim-step-label">
                      step 02 // eligibility ({claimable.length} claimable
                      {alreadyClaimed.length ? `, ${alreadyClaimed.length} already claimed` : ''})
                    </p>
                    {claimable.length === 0 && alreadyClaimed.length === 0 && (
                      <p className="claim-empty">
                        This wallet doesn’t hold any Root Guardian NFTs in our snapshot. If you
                        bought after the snapshot or hold via a different wallet, switch wallets
                        and try again.
                      </p>
                    )}
                    {claimable.length > 0 && (
                      <ul className="claim-list">
                        {claimable.map((it) => (
                          <li key={it.x1MintAddress} className="claim-list-item">
                            <img src={it.image} alt={it.name} />
                            <div>
                              <div className="claim-list-name">{it.name}</div>
                              <code className="claim-list-mint">{it.x1MintAddress}</code>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                    {alreadyClaimed.length > 0 && (
                      <details className="claim-already">
                        <summary>{alreadyClaimed.length} already claimed</summary>
                        <ul className="claim-list">
                          {alreadyClaimed.map((it) => (
                            <li key={it.x1MintAddress} className="claim-list-item">
                              <img src={it.image} alt={it.name} />
                              <div>
                                <div className="claim-list-name">{it.name}</div>
                                <code className="claim-list-mint">{it.x1MintAddress}</code>
                                <div className="claim-list-owner">→ {it.currentOwner}</div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>

                  {claimable.length > 0 && status !== 'claimed' && (
                    <div className="claim-step">
                      <p className="claim-step-label">step 03 // destination</p>
                      <label className="claim-dest-toggle">
                        <input
                          type="checkbox"
                          checked={useDifferentDest}
                          onChange={(e) => {
                            setUseDifferentDest(e.target.checked)
                            if (!e.target.checked) setDestAddress(solanaAddress)
                          }}
                        />
                        send to a different X1 address (advanced)
                      </label>
                      {useDifferentDest && (
                        <input
                          className="claim-dest-input"
                          type="text"
                          placeholder="X1 destination address"
                          value={destAddress}
                          onChange={(e) => setDestAddress(e.target.value)}
                          spellCheck={false}
                        />
                      )}
                      <button
                        className="btn-primary claim-action"
                        onClick={handleClaim}
                        disabled={status === 'signing' || status === 'submitting'}
                      >
                        {status === 'signing'
                          ? 'awaiting signature…'
                          : status === 'submitting'
                          ? 'transferring…'
                          : `sign & claim ${claimable.length}`}
                      </button>
                    </div>
                  )}

                  {status === 'claimed' && (
                    <div className="claim-step claim-success">
                      <p className="claim-step-label">claimed</p>
                      <p>{txSigs.length} transfer{txSigs.length === 1 ? '' : 's'} confirmed on X1.</p>
                      <ul className="claim-tx-list">
                        {txSigs.map((sig) => (
                          <li key={sig}>
                            <a
                              href={`https://explorer.x1.xyz/tx/${sig}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {sig}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>

        <div className="claim-meta">
          <p>Claim window closes 2026-06-01. Unclaimed NFTs roll into a public mint at 2 XNT.</p>
        </div>
      </div>
    </section>
  )
}
