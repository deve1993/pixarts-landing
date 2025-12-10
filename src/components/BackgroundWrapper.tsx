'use client'

import dynamic from 'next/dynamic'

// Dynamic import with SSR disabled for background component (uses window)
const HybridPremiumBackground = dynamic(
  () => import('./HybridPremiumBackground').then((mod) => mod.HybridPremiumBackground),
  { ssr: false }
)

export function BackgroundWrapper() {
  return <HybridPremiumBackground />
}
