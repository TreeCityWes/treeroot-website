// One-off: convert source Root Guardian PNGs in public/preview/ to WebPs at
// production sizes. Run with `node scripts/optimize-preview.mjs`.
//
// Hero  (rootguardian-858)         1280x1280  q80
// Gallery (19, 128, 420, 488, 565, 656)  640x640  q78
//
// Outputs go alongside the PNGs as .webp files. The PNG sources are kept
// for now so we can re-run with different sizes if needed.

import sharp from 'sharp'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public', 'preview')

const jobs = [
  { src: 'rootguardian-858.png', size: 1280, quality: 80 },
  { src: 'rootguardian-19.png', size: 640, quality: 78 },
  { src: 'rootguardian-128.png', size: 640, quality: 78 },
  { src: 'rootguardian-420.png', size: 640, quality: 78 },
  { src: 'rootguardian-488.png', size: 640, quality: 78 },
  { src: 'rootguardian-565.png', size: 640, quality: 78 },
  { src: 'rootguardian-656.png', size: 640, quality: 78 },
]

for (const job of jobs) {
  const inPath = path.join(dir, job.src)
  const outPath = path.join(dir, job.src.replace(/\.png$/, '.webp'))
  const before = readFileSync(inPath).length
  const info = await sharp(inPath)
    .resize(job.size, job.size, { fit: 'cover' })
    .webp({ quality: job.quality })
    .toFile(outPath)
  const ratio = ((info.size / before) * 100).toFixed(1)
  console.log(
    `${job.src.padEnd(28)} ${(before / 1024).toFixed(0).padStart(5)} KB -> ${(info.size / 1024)
      .toFixed(0)
      .padStart(5)} KB webp  (${ratio}% of original)`,
  )
}
