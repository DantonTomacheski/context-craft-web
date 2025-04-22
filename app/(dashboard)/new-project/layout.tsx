import React from 'react'
import { cn } from '@/lib/utils'

// Wizard layout wrapper
export default function NewProjectWizardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={cn('max-w-4xl mx-auto w-full py-10 flex flex-col gap-8')}>{children}</div>
  )
}
