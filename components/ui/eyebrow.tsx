import React from 'react'
import { cn } from '@/lib/utils'

interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {}

const Eyebrow = React.forwardRef<HTMLDivElement, EyebrowProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('text-xs font-medium tracking-[0.06em]st text-dxb-gold font-mono uppercase', className)}
      {...props}
    >
      {children}
    </div>
  )
)
Eyebrow.displayName = 'Eyebrow'

export { Eyebrow }
