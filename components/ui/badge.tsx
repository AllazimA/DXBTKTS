import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center px-2.5 py-1 dxb-label text-[11px] font-semibold transition-colors',
  {
    variants: {
      variant: {
        gold: 'bg-dxb-orange text-dxb-ink',
        navy: 'bg-dxb-navy text-white',
        slate: 'bg-dxb-sand text-dxb-muted',
        outline: 'border border-current text-dxb-gold',
      },
    },
    defaultVariants: {
      variant: 'gold',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
)
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
