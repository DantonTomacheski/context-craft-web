import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // In a real app, we would get the userId from the session
    // For now, we'll use a simulated userId for development
    const userId = 'test-user-id'

    // Get a count of projects for the current user
    const { count: projectCount, error: projectError } = await supabase
      .from('projects')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
    
    if (projectError) throw projectError

    // Get the 5 most recent projects
    const { data: recentProjects, error: recentError } = await supabase
      .from('projects')
      .select('id, name, created_at')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (recentError) throw recentError

    // Get metrics from document versions
    const { data: docVersions, error: docError } = await supabase
      .from('document_versions')
      .select(`
        id, 
        content,
        documents!inner(
          id,
          project_id,
          projects!inner(id, user_id)
        )
      `)
      .eq('documents.projects.user_id', userId)
    
    if (docError) throw docError

    // Calculate metrics
    const minutesSaved = docVersions?.length ? docVersions.length * 15 : 0
    const tokenCount = docVersions?.reduce((acc, doc) => {
      // Rough estimation of tokens (words × 1.3)
      const words = doc.content.split(/\s+/).length
      return acc + Math.round(words * 1.3)
    }, 0) || 0

    return NextResponse.json({
      projectCount: projectCount || 0,
      recentProjects: recentProjects || [],
      metrics: {
        minutesSaved,
        tokenCount,
        documentsGenerated: docVersions?.length || 0
      }
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
