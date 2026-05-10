// Lightweight eligibility check. Avoids @metaplex-foundation/umi-bundle-
// defaults (which has cold-start failures in Vercel's serverless runtime
// because the bundle pulls in browser-leaning code paths). For a read-only
// owner check we just hit the X1 RPC directly and parse the Core asset's
// owner pubkey out of the raw account data — it lives at bytes 1..33 of the
// account, immediately after the 1-byte Key discriminator.
import bs58 from 'bs58'
import { snapshot } from '../data/snapshot.js'

const X1_RPC = process.env.X1_RPC_URL || 'https://rpc.mainnet.x1.xyz'

async function getMultipleAccounts(addresses) {
  const out = new Array(addresses.length).fill(null)
  for (let i = 0; i < addresses.length; i += 100) {
    const batch = addresses.slice(i, i + 100)
    const resp = await fetch(X1_RPC, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getMultipleAccounts',
        params: [batch, { encoding: 'base64' }],
      }),
    })
    if (!resp.ok) throw new Error(`x1 rpc returned ${resp.status}`)
    const json = await resp.json()
    if (json.error) throw new Error(`x1 rpc error: ${json.error.message}`)
    json.result.value.forEach((v, idx) => {
      out[i + idx] = v
    })
  }
  return out
}

function parseCoreOwner(base64Data) {
  if (!base64Data) return null
  try {
    const buf = Buffer.from(base64Data, 'base64')
    if (buf.length < 33) return null
    return bs58.encode(buf.subarray(1, 33))
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { solanaAddress } = body
    if (!solanaAddress || typeof solanaAddress !== 'string') {
      res.status(400).json({ error: 'solanaAddress is required' })
      return
    }

    const claimable = snapshot[solanaAddress] || []
    if (claimable.length === 0) {
      res.json({ items: [] })
      return
    }

    const accounts = await getMultipleAccounts(claimable.map((c) => c.x1MintAddress))
    const items = claimable.map((c, idx) => {
      const acc = accounts[idx]
      const owner = acc ? parseCoreOwner(acc.data?.[0]) : null
      return {
        x1MintAddress: c.x1MintAddress,
        name: c.name,
        image: c.image,
        currentOwner: owner,
      }
    })

    res.json({ items })
  } catch (err) {
    res.status(500).json({ error: err.message || 'internal error', stack: err.stack })
  }
}
