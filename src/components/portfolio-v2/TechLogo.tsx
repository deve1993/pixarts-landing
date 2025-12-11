'use client'

import Image from 'next/image'

interface TechLogoProps {
  name: string
  className?: string
}

// Map technology names to their logo filenames
const techLogos: Record<string, string> = {
  'React': 'react',
  'Next.js': 'nextjs',
  'Node.js': 'nodejs',
  'PostgreSQL': 'postgresql',
  'Tailwind': 'tailwind',
  'Vercel': 'vercel',
  'TypeScript': 'typescript',
  'Framer Motion': 'framer',
  'OpenAI': 'openai',
  'Redis': 'redis',
  'Docker': 'docker',
  'AWS': 'aws',
}

export function TechLogo({ name, className = '' }: TechLogoProps) {
  const logoFile = techLogos[name]

  // If we have a logo file, show the image
  if (logoFile) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 bg-bg-surface/60 border border-border/50 rounded-lg hover:bg-bg-surface/80 hover:border-border transition-colors ${className}`}
        title={name}
      >
        <Image
          src={`/tech-logos/${logoFile}.svg`}
          alt={name}
          width={16}
          height={16}
          className="w-4 h-4"
        />
        <span className="text-xs text-text-secondary">{name}</span>
      </div>
    )
  }

  // Fallback to text-only badge
  return (
    <span
      className={`px-3 py-1.5 bg-bg-surface/60 border border-border/50 rounded-lg text-xs text-text-secondary hover:bg-bg-surface/80 hover:border-border transition-colors ${className}`}
    >
      {name}
    </span>
  )
}
