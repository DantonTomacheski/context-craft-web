import React from 'react'
import { cn } from '@/lib/utils'

interface ToolCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  onClick?: () => void
}

export function ToolCard({ title, description, icon, onClick }: ToolCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex flex-col items-start gap-2 rounded-lg border border-border bg-card p-4 shadow-sm transition hover:bg-accent hover:border-accent',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
    >
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <span className="font-semibold text-lg">{title}</span>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </button>
  )
}
