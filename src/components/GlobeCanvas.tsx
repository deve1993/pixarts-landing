'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

interface GlobeCanvasProps {
  className?: string
}

// Detect iOS for performance optimizations
const isIOS = () => {
  if (typeof window === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
}

export function GlobeCanvas({ className = '' }: GlobeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  const [isReady, setIsReady] = useState(false)

  // Check when container has size
  useEffect(() => {
    const check = () => {
      if (containerRef.current && containerRef.current.offsetWidth > 0) {
        widthRef.current = containerRef.current.offsetWidth
        setIsReady(true)
      } else {
        requestAnimationFrame(check)
      }
    }
    check()
  }, [])

  useEffect(() => {
    if (!isReady || !canvasRef.current) return

    let globe: ReturnType<typeof createGlobe> | null = null

    const initGlobe = () => {
      if (!canvasRef.current || widthRef.current === 0) return

      // Ottimizzazioni per mobile e iOS: riduce carico GPU
      const iOS = isIOS()
      const isMobile = window.innerWidth < 768
      // iOS: DPR 1 sempre per performance, mobile: 1, desktop: 2
      const dpr = (iOS || isMobile) ? 1 : 2
      // iOS: meno samples ma comunque visibile, mobile: 12k, desktop: 24k
      const samples = iOS ? 8000 : (isMobile ? 12000 : 24000)
      // iOS: faster rotation to feel responsive despite lower frame rate
      const rotationSpeed = iOS ? 0.008 : 0.003

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: dpr,
        width: widthRef.current * dpr,
        height: widthRef.current * dpr,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: iOS ? 1.2 : 1.5, // Slightly less diffuse on iOS for performance
        mapSamples: samples,
        mapBrightness: iOS ? 15 : 20, // Slightly less bright on iOS
        baseColor: [0.05, 0.05, 0.05],
        markerColor: [1, 0.5, 0.2],
        glowColor: [0.6, 0.25, 0.1], // Glow più chiaro e saturo
        markers: [], // Nessun marker
        onRender: (state) => {
          // Rotazione più veloce su iOS per compensare frame rate più basso
          phiRef.current += rotationSpeed
          state.phi = phiRef.current
          state.theta = 0.3
          state.width = widthRef.current * dpr
          state.height = widthRef.current * dpr
        },
      })
    }

    initGlobe()

    const handleResize = () => {
      if (containerRef.current) {
        widthRef.current = containerRef.current.offsetWidth
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      if (globe) {
        globe.destroy()
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [isReady])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%', aspectRatio: '1' }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          contain: 'layout paint size',
          opacity: isReady ? 1 : 0,
          transition: 'opacity 0.5s ease',
          // Force GPU acceleration on iOS
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
