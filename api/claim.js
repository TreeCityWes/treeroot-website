import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplCore, fetchAsset, transferV1 } from '@metaplex-foundation/mpl-core'
import { keypairIdentity, publicKey } from '@metaplex-foundation/umi'
import { Keypair } from '@solana/web3.js'
import { fromWeb3JsKeypair } from '@metaplex-foundation/umi-web3js-adapters'
import bs58 from 'bs58'
import nacl from 'tweetnacl'
import { readFileSync } from 'fs'
import path from 'path'

const X1_RPC = process.env.X1_RPC_URL || 'https://rpc.mainnet.x1.xyz'
const MIGRATION_PUBKEY = 'GZCPdavohBZpRttdzJJEaT6Xoedcida9rvnfPQTFrcU9'
const COLLECTION_ADDRESS = process.env.X1_ROOTGUARDIAN_COLLECTION || ''

let cachedSnapshot = null
function loadSnapshot() {
  if (cachedSnapshot) return cachedSnapshot
  const p = path.join(process.cwd(), 'data', 'snapshot.json')
  cachedSnapshot = JSON.parse(readFileSync(p, 'utf8'))
  return cachedSnapshot
}

let cachedUmi = null
function getUmi() {
  if (cachedUmi) return cachedUmi
  const x1Key = process.env.X1_KEY
  if (!x1Key) throw new Error('X1_KEY not configured on the server')
  const kp = Keypair.fromSecretKey(bs58.decode(x1Key))
  if (kp.publicKey.toBase58() !== MIGRATION_PUBKEY) {
    throw new Error(
      `X1_KEY public key ${kp.publicKey.toBase58()} does not match expected migration wallet ${MIGRATION_PUBKEY}`,
    )
  }
  cachedUmi = createUmi(X1_RPC).use(mplCore()).use(keypairIdentity(fromWeb3JsKeypair(kp)))
  return cachedUmi
}

function isValidSolanaAddress(addr) {
  try {
    const decoded = bs58.decode(addr)
    return decoded.length === 32
  } catch {
    return false
  }
}

function verifySignature({ solanaAddress, message, signature }) {
  const sigBytes = bs58.decode(signature)
  const msgBytes = new TextEncoder().encode(message)
  const pubBytes = bs58.decode(solanaAddress)
  return nacl.sign.detached.verify(msgBytes, sigBytes, pubBytes)
}

function messageMatches({ message, solanaAddress, x1Address }) {
  const lines = message.split('\n')
  const solLine = lines.find((l) => l.startsWith('solana:'))
  const x1Line = lines.find((l) => l.startsWith('x1:'))
  if (!solLine || !x1Line) return false
  return (
    solLine.replace('solana:', '').trim() === solanaAddress &&
    x1Line.replace('x1:', '').trim() === x1Address
  )
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' })
    return
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
    const { solanaAddress, x1Address, message, signature } = body

    if (!solanaAddress || !x1Address || !message || !signature) {
      res.status(400).json({ error: 'solanaAddress, x1Address, message, signature are required' })
      return
    }
    if (!isValidSolanaAddress(solanaAddress)) {
      res.status(400).json({ error: 'invalid solanaAddress' })
      return
    }
    if (!isValidSolanaAddress(x1Address)) {
      res.status(400).json({ error: 'invalid x1Address' })
      return
    }
    if (!messageMatches({ message, solanaAddress, x1Address })) {
      res.status(400).json({ error: 'message body does not match request' })
      return
    }
    if (!verifySignature({ solanaAddress, message, signature })) {
      res.status(401).json({ error: 'signature verification failed' })
      return
    }

    const snapshot = loadSnapshot()
    const claimable = snapshot[solanaAddress] || []
    if (claimable.length === 0) {
      res.status(403).json({ error: 'no claimable NFTs for this wallet in the snapshot' })
      return
    }

    const umi = getUmi()
    const transfers = []
    const failures = []

    for (const c of claimable) {
      try {
        const asset = await fetchAsset(umi, publicKey(c.x1MintAddress))
        if (asset.owner.toString() !== MIGRATION_PUBKEY) {
          failures.push({
            x1MintAddress: c.x1MintAddress,
            reason: 'already claimed (current owner is not migration wallet)',
            currentOwner: asset.owner.toString(),
          })
          continue
        }
        const transferArgs = {
          asset: publicKey(c.x1MintAddress),
          newOwner: publicKey(x1Address),
        }
        if (COLLECTION_ADDRESS) transferArgs.collection = publicKey(COLLECTION_ADDRESS)
        const result = await transferV1(umi, transferArgs).sendAndConfirm(umi)
        transfers.push(bs58.encode(result.signature))
      } catch (e) {
        failures.push({ x1MintAddress: c.x1MintAddress, reason: e.message })
      }
    }

    res.json({ transfers, failures })
  } catch (err) {
    res.status(500).json({ error: err.message || 'internal error' })
  }
}
