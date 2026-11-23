import React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full border border-dxb-line bg-white px-4 py-2 text-[15px] text-dxb-ink placeholder:text-dxb-muted/60 focus-visible:outline-none focus-visible:border-dxb-cobalt focus-visible:ring-2 focus-visible:ring-dxb-cobalt/25 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

export { Input }
