import React from 'react'
import { cn } from '@/lib/utils'
import '@/app/globals.css'

// Dashboard layout with default dark theme, three‑column grid and fixed sidebar (72px)
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={cn('min-h-screen w-full bg-background text-foreground grid',
      'grid-cols-[250px_1fr_280px]')}
    >
      {/* Primary sidebar */}
      <aside className="border-r border-border sticky top-0 h-screen overflow-y-auto p-4 hidden md:block">
        {/* TODO: replace with real sidebar component */}
        <div className="font-semibold text-lg">Sidebar</div>
      </aside>

      {/* Main content */}
      <main className="p-6 flex flex-col gap-6 overflow-y-auto">{children}</main>

      {/* Right info panel */}
      <section className="border-l border-border p-4 hidden lg:block">
        {/* TODO: populate with metrics / info */}
        <p className="text-muted-foreground text-sm">Right panel placeholder</p>
      </section>
    </div>
  )
}
