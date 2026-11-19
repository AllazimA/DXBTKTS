'use client'

/** Fills fields of a ServiceRequestForm on this page and scrolls to it (e.g. "Request a table" on a card). */
export function PrefillButton({ formId, values, children, className }: { formId: string; values: Record<string, string>; children: React.ReactNode; className?: string }) {
  return (
    <a href={`#${formId}`} className={className} onClick={() => window.dispatchEvent(new CustomEvent('dxb:prefill', { detail: { formId, values } }))}>
      {children}
    </a>
  )
}
