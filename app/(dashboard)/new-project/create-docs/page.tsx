import React from 'react'
import { useSearchParams } from 'next/navigation'
import { CircleDashed } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { generateDocs } from '@/actions/generateDocs'

export default function CreateDocsPage() {
  const params = useSearchParams()
  const provider = params.get('provider') ?? 'openai'
  const projectName = params.get('projectName') ?? ''
  const description = params.get('description') ?? ''

  const { mutate, isPending, data, isError } = useMutation({
    mutationFn: () => generateDocs({ provider, projectName, description }),
  })

  React.useEffect(() => mutate(), [])

  if (isPending)
    return (
      <div className="flex flex-col items-center gap-4 pt-20">
        <CircleDashed className="animate-spin h-8 w-8 text-muted-foreground" />
        <p>Generating documentation…</p>
      </div>
    )

  if (isError) return <p className="text-destructive">Something went wrong.</p>

  return <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(data, null, 2)}</pre>
}
