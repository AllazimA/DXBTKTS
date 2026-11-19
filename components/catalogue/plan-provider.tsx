'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { PlanItem } from '@/lib/catalogue/types'

const STORAGE_KEY = 'dxbtkts.plan.v1'

type PlanContextValue = {
  items: PlanItem[]
  ready: boolean
  open: boolean
  setOpen: (open: boolean) => void
  add: (item: Omit<PlanItem, 'key'>) => void
  update: (key: string, patch: Partial<PlanItem>) => void
  remove: (key: string) => void
  clear: () => void
}

const PlanContext = createContext<PlanContextValue | null>(null)

function readStorage(): PlanItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<PlanItem[]>([])
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setItems(readStorage())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Storage unavailable (private mode): the plan still works for this visit.
    }
  }, [items, ready])

  const add = useCallback((item: Omit<PlanItem, 'key'>) => {
    const key = `${item.slug}-${Date.now().toString(36)}`
    setItems(prev => [...prev, { ...item, key }])
  }, [])
  const update = useCallback((key: string, patch: Partial<PlanItem>) => {
    setItems(prev => prev.map(i => (i.key === key ? { ...i, ...patch, key } : i)))
  }, [])
  const remove = useCallback((key: string) => setItems(prev => prev.filter(i => i.key !== key)), [])
  const clear = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({ items, ready, open, setOpen, add, update, remove, clear }),
    [items, ready, open, add, update, remove, clear],
  )
  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
}

export function usePlan() {
  const ctx = useContext(PlanContext)
  if (!ctx) throw new Error('usePlan must be used inside PlanProvider')
  return ctx
}
