'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NewProjectIntro() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Create a new project</h1>
      <p className="max-w-prose text-muted-foreground">
        This wizard will guide you through selecting an AI provider and providing details so we can
        generate your documentation.
      </p>
      <Button asChild>
        <Link href="/new-project/select-ai">Start</Link>
      </Button>
    </div>
  )
}
