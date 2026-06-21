import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        gold: 'bg-dxb-gold/10 text-dxb-gold',
        navy: 'bg-dxb-navy/10 text-dxb-navy',
        slate: 'bg-dxb-slate/10 text-dxb-slate',
        outline: 'border-2 border-dxb-gold text-dxb-gold',
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
