import React from 'react'
import { cn } from '@/lib/utils'

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  contained?: boolean
}

const SectionWrapper = React.forwardRef<HTMLElement, SectionWrapperProps>(
  ({ className, contained = true, ...props }, ref) => (
    <section
      ref={ref}
      className={cn(contained ? 'max-w-7xl mx-auto px-6' : '', className)}
      {...props}
    />
  )
)
SectionWrapper.displayName = 'SectionWrapper'

export { SectionWrapper }
