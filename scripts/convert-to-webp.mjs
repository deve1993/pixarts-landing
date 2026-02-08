/**
 * Script per convertire immagini PNG a WebP
 * Esegui con: node scripts/convert-to-webp.mjs
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, basename, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const portfolioDir = join(__dirname, '..', 'public', 'portfolio')

async function convertToWebP() {
  console.log('📁 Scanning portfolio directory...')

  const files = await readdir(portfolioDir)
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'))

  console.log(`Found ${pngFiles.length} PNG files to convert\n`)

  for (const file of pngFiles) {
    const inputPath = join(portfolioDir, file)
    const outputName = file.replace(/\.png$/i, '.webp')
    const outputPath = join(portfolioDir, outputName)

    try {
      // Get original size
      const originalStats = await stat(inputPath)
      const originalSizeKB = Math.round(originalStats.size / 1024)

      // Convert to WebP
      await sharp(inputPath)
        .webp({
          quality: 80,
          effort: 6, // Higher = better compression but slower
        })
        .resize(1920, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(outputPath)

      // Get new size
      const newStats = await stat(outputPath)
      const newSizeKB = Math.round(newStats.size / 1024)
      const reduction = Math.round((1 - newSizeKB / originalSizeKB) * 100)

      console.log(`✅ ${file}`)
      console.log(`   ${originalSizeKB}KB → ${newSizeKB}KB (-${reduction}%)`)
      console.log(`   → ${outputName}\n`)

    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message)
    }
  }

  console.log('🎉 Conversion complete!')
  console.log('\n📝 Next steps:')
  console.log('1. Update your code to use .webp files instead of .png')
  console.log('2. Optionally delete the original .png files')
}

convertToWebP().catch(console.error)
