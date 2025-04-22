import React from 'react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { HelpCircle, Home, Plus, Settings } from 'lucide-react'

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
        <div className="flex flex-col gap-6 h-full">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-semibold text-lg hover:text-primary">ContextCraft</Link>
          </div>
          
          <nav className="flex-1">
            <div className="space-y-1">
              <Link href="/" className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent">
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link href="/new-project" className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent">
                <Plus className="h-4 w-4" />
                New Project
              </Link>
            </div>
          </nav>
          
          <div className="mt-auto space-y-2">
            <Link href="/settings" className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <Link href="/help" className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent">
              <HelpCircle className="h-4 w-4" />
              Help
            </Link>
            <div className="flex items-center justify-between pt-4">
              <ThemeToggle />
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="p-6 flex flex-col gap-6 overflow-y-auto">{children}</main>

      {/* Right info panel */}
      <section className="border-l border-border p-4 hidden lg:block">
        <div className="sticky top-6 space-y-4">
          <h3 className="font-semibold text-sm">Metrics</h3>
          <div className="space-y-2">
            <div className="rounded-md bg-card p-3 border border-border">
              <div className="text-xs text-muted-foreground">Minutes Saved</div>
              <div className="text-lg font-medium">127</div>
            </div>
            <div className="rounded-md bg-card p-3 border border-border">
              <div className="text-xs text-muted-foreground">Tokens Saved</div>
              <div className="text-lg font-medium">458K</div>
            </div>
          </div>
          
          <div className="pt-4">
            <h3 className="font-semibold text-sm mb-2">Tips</h3>
            <div className="rounded-md bg-card p-3 border border-border text-xs">
              <p className="text-muted-foreground">Use the multi-step wizard to create comprehensive documentation in minutes.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
