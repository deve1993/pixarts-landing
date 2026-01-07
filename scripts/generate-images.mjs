import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const publicDir = join(__dirname, '..', 'public')

// Colori del design system Pixarts
const COLORS = {
  bgPrimary: '#0A0A0B',
  accentOrange: '#FF6B2C',
  accentAmber: '#FFB347',
  white: '#FFFFFF',
  textSecondary: '#A1A1A6'
}

/**
 * Genera og-image.png (1200x630px)
 * Design: Testo "Pixarts - Siti Web in 10 Giorni" + Gradient
 */
async function generateOgImage() {
  const width = 1200
  const height = 630

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Gradient di sfondo -->
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.bgPrimary}"/>
          <stop offset="50%" style="stop-color:#1a1a1d"/>
          <stop offset="100%" style="stop-color:${COLORS.bgPrimary}"/>
        </linearGradient>

        <!-- Gradient arancione per accent -->
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${COLORS.accentOrange}"/>
          <stop offset="100%" style="stop-color:${COLORS.accentAmber}"/>
        </linearGradient>

        <!-- Gradient per il testo principale -->
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:${COLORS.accentOrange}"/>
          <stop offset="50%" style="stop-color:${COLORS.accentAmber}"/>
          <stop offset="100%" style="stop-color:${COLORS.accentOrange}"/>
        </linearGradient>

        <!-- Glow filter -->
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="20" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bgGradient)"/>

      <!-- Decorative circles -->
      <circle cx="100" cy="100" r="300" fill="${COLORS.accentOrange}" opacity="0.03"/>
      <circle cx="1100" cy="530" r="400" fill="${COLORS.accentAmber}" opacity="0.03"/>

      <!-- Accent line top -->
      <rect x="100" y="80" width="120" height="4" rx="2" fill="url(#accentGradient)"/>

      <!-- Logo text "Px" -->
      <text x="100" y="180" font-family="system-ui, -apple-system, sans-serif"
            font-size="72" font-weight="300" fill="url(#textGradient)" letter-spacing="-2">
        Px
      </text>

      <!-- Main title -->
      <text x="100" y="300" font-family="system-ui, -apple-system, sans-serif"
            font-size="64" font-weight="700" fill="${COLORS.white}" letter-spacing="-1">
        Siti Web Professionali
      </text>

      <!-- Subtitle with gradient -->
      <text x="100" y="380" font-family="system-ui, -apple-system, sans-serif"
            font-size="56" font-weight="700" fill="url(#textGradient)" letter-spacing="-1">
        in 10 Giorni
      </text>

      <!-- Description -->
      <text x="100" y="460" font-family="system-ui, -apple-system, sans-serif"
            font-size="24" fill="${COLORS.textSecondary}">
        Design moderno • SEO incluso • Garanzia soddisfazione
      </text>

      <!-- Domain badge -->
      <rect x="100" y="510" width="200" height="44" rx="22" fill="${COLORS.accentOrange}" opacity="0.15"/>
      <text x="200" y="540" font-family="system-ui, -apple-system, sans-serif"
            font-size="20" font-weight="600" fill="${COLORS.accentOrange}" text-anchor="middle">
        pixarts.eu
      </text>

      <!-- Decorative dots pattern -->
      <g fill="${COLORS.accentOrange}" opacity="0.1">
        ${Array.from({ length: 5 }, (_, row) =>
          Array.from({ length: 8 }, (_, col) =>
            `<circle cx="${900 + col * 30}" cy="${200 + row * 30}" r="3"/>`
          ).join('')
        ).join('')}
      </g>
    </svg>
  `

  await sharp(Buffer.from(svg))
    .png({ quality: 90 })
    .toFile(join(publicDir, 'og-image.png'))

  console.log('✓ og-image.png generato (1200x630)')
}

/**
 * Genera icona con logo Px su gradient arancione
 */
async function generateIcon(size, filename) {
  const borderRadius = Math.round(size * 0.22) // ~22% per iOS style
  const fontSize = Math.round(size * 0.45)
  const textY = Math.round(size * 0.62)

  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="iconGradient${size}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${COLORS.accentOrange}"/>
          <stop offset="100%" style="stop-color:${COLORS.accentAmber}"/>
        </linearGradient>
        <clipPath id="roundedRect${size}">
          <rect width="${size}" height="${size}" rx="${borderRadius}" ry="${borderRadius}"/>
        </clipPath>
      </defs>

      <!-- Background with gradient -->
      <rect width="${size}" height="${size}" rx="${borderRadius}" fill="url(#iconGradient${size})"/>

      <!-- Subtle inner shadow/depth -->
      <rect width="${size}" height="${size}" rx="${borderRadius}"
            fill="url(#iconGradient${size})" opacity="0.3"
            clip-path="url(#roundedRect${size})"/>

      <!-- Logo text "Px" -->
      <text x="${size/2}" y="${textY}"
            font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif"
            font-size="${fontSize}"
            font-weight="300"
            text-anchor="middle"
            fill="${COLORS.white}"
            letter-spacing="-2">
        Px
      </text>
    </svg>
  `

  await sharp(Buffer.from(svg))
    .png({ quality: 100 })
    .toFile(join(publicDir, filename))

  console.log(`✓ ${filename} generato (${size}x${size})`)
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🎨 Generazione immagini Pixarts...\n')

  try {
    // OG Image per social sharing
    await generateOgImage()

    // Apple Touch Icon (180x180)
    await generateIcon(180, 'apple-touch-icon.png')

    // PWA Icons
    await generateIcon(192, 'icon-192x192.png')
    await generateIcon(512, 'icon-512x512.png')

    // Favicon PNG (32x32) - opzionale, già presente SVG
    await generateIcon(32, 'favicon-32x32.png')

    console.log('\n✅ Tutte le immagini generate con successo!\n')
  } catch (error) {
    console.error('❌ Errore durante la generazione:', error)
    process.exit(1)
  }
}

main()
