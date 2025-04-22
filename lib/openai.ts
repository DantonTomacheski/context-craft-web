import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

interface GenerateParams {
  provider?: string
  projectName: string
  description: string
}

export async function generateDocsLLM({ provider = 'openai', projectName, description }: GenerateParams) {
  // simple call, assume gpt‑4 by default
  const model = provider === 'gpt-3.5' ? 'gpt-3.5-turbo' : 'gpt-4o-mini'
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'system',
        content: 'You are an expert technical writer generating software documentation.',
      },
      {
        role: 'user',
        content: `Generate an implementation plan and tech docs for a project named "${projectName}". Description: ${description}.`,
      },
    ],
  })
  return response.choices[0]?.message?.content || ''
}
