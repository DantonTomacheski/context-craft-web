import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function SelectAIPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Select AI provider</h2>
      <div className="flex gap-4">
        <Button onClick={() => router.push('/dashboard/new-project/questionnaire?provider=openai')}>OpenAI GPT‑4</Button>
        <Button variant="secondary" onClick={() => router.push('/dashboard/new-project/questionnaire?provider=gpt-3.5')}>GPT‑3.5</Button>
      </div>
    </div>
  )
}
