import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore, fetchAsset } from '@metaplex-foundation/mpl-core'
import { publicKey } from '@metaplex-foundation/umi'
import { readFileSync } from 'fs'
import path from 'path'

const X1_RPC = process.env.X1_RPC_URL || 'https://rpc.mainnet.x1.xyz'

let cachedSnapshot = null
function loadSnapshot() {
  if (cachedSnapshot) return cachedSnapshot
  const p = path.join(process.cwd(), 'data', 'snapshot.json')
  cachedSnapshot = JSON.parse(readFileSync(p, 'utf8'))
  return cachedSnapshot
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

    const snapshot = loadSnapshot()
    const claimable = snapshot[solanaAddress] || []
    if (claimable.length === 0) {
      res.json({ items: [] })
      return
    }

    const umi = createUmi(X1_RPC).use(mplCore())
    const items = await Promise.all(
      claimable.map(async (c) => {
        try {
          const asset = await fetchAsset(umi, publicKey(c.x1MintAddress))
          return {
            x1MintAddress: c.x1MintAddress,
            name: c.name,
            image: c.image,
            currentOwner: asset.owner.toString(),
          }
        } catch (e) {
          return {
            x1MintAddress: c.x1MintAddress,
            name: c.name,
            image: c.image,
            currentOwner: null,
            fetchError: e.message,
          }
        }
      }),
    )

    res.json({ items })
  } catch (err) {
    res.status(500).json({ error: err.message || 'internal error' })
  }
}
