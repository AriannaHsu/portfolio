// Convert Figma PNG/JPG exports to WebP.
//   npm run webp -- path/to/export.png [more files...] [--out src/assets] [--width 1600] [--quality 85]
// Figma can't export WebP directly: export PNG at 2x, then run this.
import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'

const args = process.argv.slice(2)
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`)
  return i === -1 ? fallback : args.splice(i, 2)[1]
}
const outDir = opt('out', 'src/assets')
const width = Number(opt('width', 0)) || null
const quality = Number(opt('quality', 85))

if (args.length === 0) {
  console.error('Usage: npm run webp -- <image...> [--out dir] [--width px] [--quality 0-100]')
  process.exit(1)
}

const missing = args.filter((f) => !fs.existsSync(f))
if (missing.length) {
  console.error(`Can't find: ${missing.join(', ')}`)
  console.error('If the path has spaces, wrap it in quotes: npm run webp -- "C:\\path with spaces\\image.png"')
  process.exit(1)
}

fs.mkdirSync(outDir, { recursive: true })
for (const file of args) {
  const out = path.join(outDir, `${path.parse(file).name}.webp`)
  let img = sharp(file)
  if (width) img = img.resize({ width, withoutEnlargement: true })
  const info = await img.webp({ quality, alphaQuality: 100 }).toFile(out)
  const before = fs.statSync(file).size
  console.log(`${file} → ${out}  ${Math.round(before / 1024)}KB → ${Math.round(info.size / 1024)}KB`)
}
