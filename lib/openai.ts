import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

interface GenerateParams {
  provider?: string
  projectName: string
  description: string
  features?: string
  techStack?: string
}

export async function generateDocsLLM({ 
  provider = 'openai', 
  projectName, 
  description, 
  features = '',
  techStack = ''
}: GenerateParams) {
  // Select model based on provider
  let model = 'gpt-4o-mini' // Default model
  
  switch(provider) {
    case 'gpt-3.5':
      model = 'gpt-3.5-turbo'
      break
    case 'gpt-4':
      model = 'gpt-4o'
      break
    // Other models could be added here
  }
  
  // Structure the prompt to generate better documentation
  const systemPrompt = `You are an expert technical writer specializing in software project documentation.
Your task is to create comprehensive documentation for a software project using the provided information.
Generate documentation that follows markdown formatting and covers all essential aspects of the project.

Generate the following documents as separate sections, each with its own # heading:
1. # Project Requirements Document (PRD)
2. # App Flow Document
3. # Tech Stack Document
4. # Backend Structure Document
5. # Frontend Guidelines Document
6. # Implementation Plan

Each document should be comprehensive and detailed, covering all essential information for its specific category.
Use clear section headers (## for subsections) and provide actionable information that would help developers understand and implement the project.
`

  // Build a detailed prompt with all provided information
  const userPrompt = `Generate comprehensive documentation for a software project with the following information:

Project Name: "${projectName}"

Project Description: 
${description}

${features ? `Key Features:\n${features}` : ''}

${techStack ? `Tech Stack Preferences:\n${techStack}` : ''}

The documentation should follow structured markdown format and include all six document types mentioned in the system prompt.
Each document should be separate and clearly marked with a level 1 heading (#).`

  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 4000
  })
  return response.choices[0]?.message?.content || ''
}
