'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-accent-orange to-accent-amber text-white shadow-glow hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0',
        secondary:
          'bg-transparent text-text-secondary border border-border hover:border-accent-orange hover:text-text-primary',
        ghost:
          'bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-surface',
        link: 'text-accent-orange underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-6 rounded-lg text-base',
        sm: 'h-10 px-4 rounded-md text-sm',
        lg: 'h-14 px-8 rounded-lg text-lg',
        icon: 'h-10 w-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
