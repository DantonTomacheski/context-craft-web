'use server'

import { z } from 'zod'

const paramsSchema = z.object({
  provider: z.string().optional(),
  projectName: z.string(),
  description: z.string(),
})

export async function generateDocs(values: unknown) {
  const { provider, projectName, description } = paramsSchema.parse(values)

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/generate-docs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, projectName, description }),
  })

  if (!res.ok) throw new Error('Failed to generate docs')

  return res.json()
}
