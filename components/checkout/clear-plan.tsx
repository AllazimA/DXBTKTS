'use client'

import { useEffect } from 'react'
import { usePlan } from '@/components/catalogue/plan-provider'

/** Empties the visitor's plan once payment has been confirmed (after it has loaded from storage). */
export function ClearPlan() {
  const { clear, ready } = usePlan()
  useEffect(() => {
    if (ready) clear()
  }, [clear, ready])
  return null
}
