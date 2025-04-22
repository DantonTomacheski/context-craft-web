import { NextRequest, NextResponse } from 'next/server'
import { generateDocsLLM } from '@/lib/openai'

export async function POST(req: NextRequest) {
  const { provider, projectName, description, features, techStack } = await req.json()

  if (!projectName || !description)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  try {
    const docs = await generateDocsLLM({ 
      provider, 
      projectName, 
      description, 
      features: features || '',
      techStack: techStack || ''
    })
    return NextResponse.json({ docs })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed' }, { status: 500 })
  }
}
