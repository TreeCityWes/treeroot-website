import { useEffect, useMemo, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import bs58 from 'bs58'
import './ClaimPage.css'

const MIGRATION_PUBKEY = 'GZCPdavohBZpRttdzJJEaT6Xoedcida9rvnfPQTFrcU9'

const GALLERY = [
  '/preview/rootguardian-19.webp',
  '/preview/rootguardian-128.webp',
  '/preview/rootguardian-420.webp',
  '/preview/rootguardian-488.webp',
  '/preview/rootguardian-565.webp',
]

function shorten(addr) {
  if (!addr) return ''
  return `${addr.slice(0, 4)}…${addr.slice(-4)}`
}

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
  const { publicKey, signMessage, connected, disconnect } = useWallet()
  const { setVisible } = useWalletModal()

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
    <>
      <section className="claim-hero">
        <div className="container claim-hero-grid">
          <div className="claim-hero-text">
            <p className="claim-kicker">X1 NFT Claim</p>
            <h1 className="claim-h1">Claim Your Root Guardian on X1</h1>
            <p className="claim-lead">
              Connect the same Solana wallet that holds the original. We'll match it to the
              X1 mint and transfer it to your destination — no gas from your side, no
              on-chain Solana transaction.
            </p>
            <div className="claim-hero-cta">
              {!connected ? (
                <button type="button" className="btn-primary" onClick={() => setVisible(true)}>
                  Connect Wallet
                </button>
              ) : (
                <div className="claim-connected">
                  <span className="claim-connected-addr">{shorten(solanaAddress)}</span>
                  <button type="button" className="claim-disconnect" onClick={() => disconnect()}>
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="claim-hero-art">
            <img
              src="/preview/rootguardian-858.webp"
              alt="Root Guardian #858"
              loading="eager"
              width={1280}
              height={1280}
            />
          </div>
        </div>
      </section>

      <section className="claim-body">
        <div className="container">
          <div className="claim-card">
            {!connected && (
              <div className="claim-state claim-state-disconnected">
                <h2 className="claim-section-heading">Connect to check eligibility</h2>
                <p className="claim-body-text">
                  X1 ships against{' '}
                  <a href="https://x1.xyz" target="_blank" rel="noopener noreferrer" className="claim-link">
                    X1 Wallet
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://chromewebstore.google.com/detail/backpack/aflkmfhebedbjioipglgcbcmnbpgliof"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="claim-link"
                  >
                    Backpack
                  </a>
                  . Use the same wallet that holds your Root Guardian on Solana.
                </p>
              </div>
            )}

            {connected && status === 'loading' && (
              <div className="claim-state">
                <p className="claim-body-text">Checking eligibility for {shorten(solanaAddress)}…</p>
                <div className="claim-shimmer" />
              </div>
            )}

            {connected && status === 'error' && error && (
              <div className="claim-state claim-state-error">
                <h2 className="claim-section-heading">Something went wrong</h2>
                <p className="claim-body-text">{error}</p>
              </div>
            )}

            {connected && eligible && status !== 'claimed' && (
              <>
                {claimable.length === 0 && alreadyClaimed.length === 0 && (
                  <div className="claim-state">
                    <h2 className="claim-section-heading">Nothing to claim from this wallet</h2>
                    <p className="claim-body-text">
                      This wallet doesn't hold any Root Guardians in the Phase 2 snapshot. If
                      you bought after the snapshot or hold via a different wallet, switch
                      wallets and try again.
                    </p>
                  </div>
                )}

                {claimable.length > 0 && (
                  <div className="claim-state">
                    <h2 className="claim-section-heading">Your Root Guardians</h2>
                    <div className="claim-grid">
                      {claimable.map((it) => (
                        <div key={it.x1MintAddress} className="claim-grid-card">
                          <img src={it.image} alt={it.name} loading="lazy" />
                          <div className="claim-grid-card-meta">
                            <p className="claim-grid-card-name">{it.name}</p>
                            <p className="claim-kicker claim-kicker-ready">Ready to claim</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="claim-destination">
                      <label className="claim-destination-toggle">
                        <input
                          type="checkbox"
                          checked={useDifferentDest}
                          onChange={(e) => {
                            setUseDifferentDest(e.target.checked)
                            if (!e.target.checked) setDestAddress(solanaAddress)
                          }}
                        />
                        Send to a different X1 address (advanced)
                      </label>
                      {useDifferentDest && (
                        <input
                          type="text"
                          className="claim-destination-input"
                          placeholder="X1 destination address"
                          value={destAddress}
                          onChange={(e) => setDestAddress(e.target.value)}
                          spellCheck={false}
                        />
                      )}
                      <button
                        type="button"
                        className="btn-primary claim-action"
                        onClick={handleClaim}
                        disabled={status === 'signing' || status === 'submitting'}
                      >
                        {status === 'signing'
                          ? 'Awaiting signature…'
                          : status === 'submitting'
                          ? 'Transferring…'
                          : `Sign & Claim ${claimable.length}`}
                      </button>
                    </div>
                  </div>
                )}

                {alreadyClaimed.length > 0 && (
                  <details className="claim-already">
                    <summary>{alreadyClaimed.length} already claimed</summary>
                    <div className="claim-grid">
                      {alreadyClaimed.map((it) => (
                        <div key={it.x1MintAddress} className="claim-grid-card claim-grid-card-muted">
                          <img src={it.image} alt={it.name} loading="lazy" />
                          <div className="claim-grid-card-meta">
                            <p className="claim-grid-card-name">{it.name}</p>
                            <p className="claim-kicker">Already claimed</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </>
            )}

            {status === 'claimed' && (
              <div className="claim-state">
                <h2 className="claim-section-heading">Claimed</h2>
                <p className="claim-body-text">
                  {txSigs.length} transfer{txSigs.length === 1 ? '' : 's'} confirmed on X1.
                </p>
                <ul className="claim-tx-list">
                  {txSigs.map((sig) => (
                    <li key={sig}>
                      <a
                        href={`https://explorer.x1.xyz/tx/${sig}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="claim-link"
                      >
                        {sig}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="claim-timeline">
        <div className="container">
          <h2 className="section-title">Phase 2 Timeline</h2>
          <div className="claim-timeline-grid">
            <div className="claim-timeline-item claim-timeline-done">
              <p className="claim-kicker">Phase 1</p>
              <p className="claim-timeline-label">Airdrop to active X1 wallets</p>
            </div>
            <div className="claim-timeline-item claim-timeline-active">
              <p className="claim-kicker">Phase 2</p>
              <p className="claim-timeline-label">Claim window — closes 2026-06-01</p>
            </div>
            <div className="claim-timeline-item claim-timeline-upcoming">
              <p className="claim-kicker">Phase 3</p>
              <p className="claim-timeline-label">Public mint — 2 XNT each</p>
            </div>
          </div>
        </div>
      </section>

      <section className="claim-collection">
        <div className="container">
          <h2 className="section-title">From the Collection</h2>
          <p className="claim-collection-caption">
            Each Guardian is a one-of-one rendering. The collection ships in seven palettes,
            sixteen backgrounds, and a long list of subtler traits.
          </p>
          <div className="claim-collection-grid">
            {GALLERY.map((src) => (
              <div key={src} className="claim-collection-tile">
                <img src={src} alt="Root Guardian" loading="lazy" width={640} height={640} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
