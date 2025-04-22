import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CircleDashed, Check, ChevronDown, FileText, RefreshCw } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { generateDocs } from '@/actions/generateDocs'
import { useProjectStore } from '@/store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'

export default function CreateDocsPage() {
  const params = useSearchParams()
  const router = useRouter()
  const { currentProject, setCurrentProject } = useProjectStore()
  
  // Get params or use store data
  const provider = params.get('provider') ?? currentProject?.provider ?? 'openai'
  const projectName = params.get('projectName') ?? currentProject?.name ?? ''
  const description = params.get('description') ?? currentProject?.description ?? ''
  const features = params.get('features') ?? ''
  const techStack = params.get('techStack') ?? ''
  
  // Track generation progress
  const [progress, setProgress] = React.useState(0)
  const [expandedDoc, setExpandedDoc] = React.useState<string | null>(null)
  
  const { mutate, isPending, data, isError, reset } = useMutation({
    mutationFn: () => {
      // Update progress simulation
      setProgress(10)
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 5
        })
      }, 1000)
      
      return generateDocs({ 
        provider, 
        projectName, 
        description,
        features,
        techStack
      }).finally(() => {
        clearInterval(progressInterval)
        setProgress(100)
      })
    },
  })
  
  // Auto-start generation
  React.useEffect(() => {
    // Store project data if not already stored
    if (!currentProject) {
      setCurrentProject({
        name: projectName,
        description: description,
        provider: provider
      })
    }
    
    mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // We intentionally run this once on mount

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }
  
  const handleRegenerate = () => {
    setProgress(0)
    reset()
    mutate()
  }
  
  const renderDocumentContent = (docContent: string) => {
    // Simple markdown renderer for line breaks and headers
    return docContent
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('# ')) {
          return <h2 key={i} className="text-xl font-bold mt-4 mb-2">{line.replace('# ', '')}</h2>
        }
        if (line.startsWith('## ')) {
          return <h3 key={i} className="text-lg font-semibold mt-3 mb-1">{line.replace('## ', '')}</h3>
        }
        if (line.startsWith('### ')) {
          return <h4 key={i} className="text-base font-medium mt-2 mb-1">{line.replace('### ', '')}</h4>
        }
        if (!line.trim()) return <br key={i} />
        return <p key={i} className="my-1">{line}</p>
      })
  }
  
  // Normalize document data
  const parseDocuments = () => {
    if (!data?.docs) return []
    
    // Look for markdown headers to split the content
    const docs = data.docs.includes('# ') ? 
      // Try to parse document sections if markdown headers are present
      splitContentIntoDocuments(data.docs) : 
      // Fallback to treating the entire response as a single document
      [{ type: 'implementation_plan', title: 'Implementation Plan', content: data.docs }]
    
    return docs
  }
  
  // Helper to split a combined document into sections
  const splitContentIntoDocuments = (content: string) => {
    const docTypes = [
      { key: 'prd', title: 'Project Requirements' },
      { key: 'app_flow', title: 'Application Flow' },
      { key: 'tech_stack', title: 'Tech Stack' },
      { key: 'backend_structure', title: 'Backend Structure' },
      { key: 'frontend_guidelines', title: 'Frontend Guidelines' },
      { key: 'implementation_plan', title: 'Implementation Plan' },
    ]
    
    const documents = []
    let currentContent = ''
    let currentType = ''
    
    // Split the content by major headers
    const sections = content.split(/^# /m).filter(Boolean)
    
    for (const section of sections) {
      const firstLine = section.split('\n')[0].toLowerCase()
      
      const matchedType = docTypes.find(type => 
        firstLine.includes(type.key) || firstLine.includes(type.title.toLowerCase())
      )
      
      if (matchedType) {
        if (currentType && currentContent) {
          documents.push({
            type: currentType, 
            title: docTypes.find(t => t.key === currentType)?.title || 'Document',
            content: currentContent
          })
        }
        currentType = matchedType.key
        currentContent = '# ' + section
      } else if (currentType) {
        currentContent += '\n# ' + section
      } else {
        // If we can't determine the type, assume it's implementation plan
        currentType = 'implementation_plan'
        currentContent = '# ' + section
      }
    }
    
    // Add the last document
    if (currentType && currentContent) {
      documents.push({
        type: currentType,
        title: docTypes.find(t => t.key === currentType)?.title || 'Document',
        content: currentContent
      })
    }
    
    return documents.length > 0 ? documents : [{
      type: 'implementation_plan',
      title: 'Implementation Plan',
      content: content
    }]
  }

  if (isPending) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Generating Documentation</h2>
          <div className="text-sm text-muted-foreground">
            Step 4 of 4
          </div>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleDashed className="animate-spin h-5 w-5 text-primary" />
              Processing
            </CardTitle>
            <CardDescription>
              AI is generating documentation for &ldquo;{projectName}&rdquo;
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progress} className="h-2 w-full" />
              <p className="text-sm text-muted-foreground">
                {progress < 100 ? 'This may take a minute...' : 'Almost done!'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="space-y-8">
        <h2 className="text-xl font-semibold">Error Generating Documentation</h2>
        
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Something went wrong</CardTitle>
            <CardDescription>
              We encountered an error while generating documentation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Please try again or use different project details.</p>
            <div className="flex gap-4">
              <Button variant="outline" onClick={handleBackToDashboard}>Back to Dashboard</Button>
              <Button onClick={handleRegenerate}>
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const documents = parseDocuments()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Documentation Generated</h2>
        <div className="text-sm text-muted-foreground">
          Complete
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-500" />
            Documentation Ready
          </CardTitle>
          <CardDescription>
            AI-generated documentation for &ldquo;{projectName}&rdquo;
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={handleBackToDashboard}>Back to Dashboard</Button>
              <Button variant="secondary" onClick={handleRegenerate}>
                <RefreshCw className="mr-2 h-4 w-4" /> Regenerate
              </Button>
            </div>
            
            <Accordion 
              type="single" 
              collapsible 
              value={expandedDoc || undefined}
              onValueChange={setExpandedDoc}
              className="space-y-4"
            >
              {documents.map((doc, index) => (
                <AccordionItem 
                  key={index} 
                  value={doc.type} 
                  className="border rounded-lg px-2"
                >
                  <AccordionTrigger className="py-4 px-2 hover:bg-accent hover:no-underline hover:text-accent-foreground rounded-md group">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground group-hover:text-current" />
                      <span>{doc.title}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-2 text-sm">
                    <div className="max-h-[500px] overflow-y-auto p-4 border rounded-md bg-card">
                      {renderDocumentContent(doc.content)}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
