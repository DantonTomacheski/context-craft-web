'use server'

import { z } from 'zod'
import { supabase } from '@/lib/supabase'

const paramsSchema = z.object({
  provider: z.string().optional(),
  projectName: z.string(),
  description: z.string(),
  features: z.string().optional(),
  techStack: z.string().optional()
})

export async function generateDocs(values: unknown) {
  const { provider, projectName, description, features, techStack } = paramsSchema.parse(values)

  try {
    // 1. Call the API to generate docs
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/generate-docs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, projectName, description, features, techStack }),
    })

    if (!res.ok) throw new Error('Failed to generate docs')
    
    const data = await res.json()
    
    // 2. Save to database (for demo purposes, using a simulated user_id)
    // In a real app, this would use the authenticated user's ID
    const userId = 'test-user-id'
    
    // Create a new project
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .insert({
        name: projectName,
        description,
        user_id: userId,
        provider
      })
      .select()
      .single()
    
    if (projectError) {
      console.error('Error saving project:', projectError)
      // Continue anyway to return the generated docs
    }
    
    // If we have the project and docs, save the docs to the database
    if (project && data.docs) {
      try {
        // In a production app, we would parse the docs into separate documents
        // For now, we'll save as a single implementation plan document
        const { data: document, error: docError } = await supabase
          .from('documents')
          .insert({
            project_id: project.id,
            type: 'implementation_plan',
            title: 'Implementation Plan'
          })
          .select()
          .single()
        
        if (docError) throw docError
        
        // Save the document version
        const { error: versionError } = await supabase
          .from('document_versions')
          .insert({
            document_id: document.id,
            content: data.docs,
            version_number: 1,
            created_by: userId
          })
        
        if (versionError) throw versionError
      } catch (err) {
        console.error('Error saving documents:', err)
        // Continue anyway to return the generated docs
      }
    }
    
    return data
  } catch (error) {
    console.error('GenerateDocs action error:', error)
    throw error
  }
}
