import type { PropsWithChildren } from 'react'

export function Section({
  id,
  children,
  className,
}: PropsWithChildren<{
  id?: string
  className?: string
}>) {
  return (
    <section id={id} className={className ?? ''}>
      {children}
    </section>
  )
}

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="min-w-0 w-full max-w-full rounded-2xl border border-(--invite-border) bg-[color-mix(in_srgb,var(--invite-card),transparent_0%)] p-4 shadow-sm backdrop-blur sm:p-6 md:p-8">
      {children}
    </div>
  )
}

