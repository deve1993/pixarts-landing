'use client'

import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

interface GlobeCanvasProps {
  className?: string
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

      // Ottimizzazioni per mobile: riduce carico GPU del 50%
      const isMobile = window.innerWidth < 768
      const dpr = isMobile ? 1 : 2
      const samples = isMobile ? 12000 : 24000

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: dpr,
        width: widthRef.current * dpr,
        height: widthRef.current * dpr,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 1.5,
        mapSamples: samples,
        mapBrightness: 20, // Molto più luminoso per continenti ben visibili
        baseColor: [0.05, 0.05, 0.05],
        markerColor: [1, 0.5, 0.2],
        glowColor: [0.6, 0.25, 0.1], // Glow più chiaro e saturo
        markers: [], // Nessun marker
        onRender: (state) => {
          // Solo rotazione automatica continua
          phiRef.current += 0.003
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
        }}
      />
    </div>
  )
}
