import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  variant?: 'default' | 'alternate'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * Pixarts Logo Component
 *
 * Font: Megrim (Google Fonts)
 *
 * Variants:
 * - default: Pi (white) + x (orange) + arts (white) - for dark backgrounds
 * - alternate: Pi (orange) + x (white) + arts (orange) - for light backgrounds
 *
 * Sizes:
 * - sm: text-xl md:text-2xl (Footer)
 * - md: text-2xl md:text-3xl (Navbar)
 * - lg: text-3xl md:text-4xl
 * - xl: text-4xl md:text-5xl (Hero)
 */
export function Logo({
  className = '',
  variant = 'default',
  size = 'md'
}: LogoProps) {
  const isDefault = variant === 'default'

  const sizeClasses = {
    sm: 'text-xl md:text-2xl',
    md: 'text-2xl md:text-3xl',
    lg: 'text-3xl md:text-4xl',
    xl: 'text-4xl md:text-5xl',
  }

  return (
    <div
      className={cn(
        'font-megrim font-normal tracking-wide select-none',
        sizeClasses[size],
        className
      )}
      aria-label="Pixarts"
    >
      <span style={{ color: isDefault ? '#FFFFFF' : '#FF6B2C' }}>Pi</span>
      <span style={{ color: isDefault ? '#FF6B2C' : '#FFFFFF' }}>x</span>
      <span style={{ color: isDefault ? '#FFFFFF' : '#FF6B2C' }}>arts</span>
    </div>
  )
}

/**
 * Pixarts Favicon/Monogram Component
 *
 * Displays "Px" monogram for favicon and small icon uses
 * Background: #0A0A0B, P: white, x: orange
 */
export function LogoIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'w-8 h-8 rounded-lg bg-bg-primary flex items-center justify-center font-megrim text-xl font-normal',
        className
      )}
      aria-label="Pixarts"
    >
      <span style={{ color: '#FFFFFF' }}>P</span>
      <span style={{ color: '#FF6B2C' }}>x</span>
    </div>
  )
}
