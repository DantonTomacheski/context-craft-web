import React from 'react'
import { ToolCard } from '@/components/ToolCard'
import { useQuery } from '@tanstack/react-query'
import { useProjectStore } from '@/store'
import { CircleDashed } from 'lucide-react'

export default function DashboardPage() {
  const { addRecentProject } = useProjectStore()
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: async () => {
      const res = await fetch('/api/supabase')
      if (!res.ok) throw new Error('Failed to fetch dashboard data')
      return res.json()
    }
  })
  
  // Sync recent projects with Zustand store
  React.useEffect(() => {
    if (data?.recentProjects && data.recentProjects.length > 0) {
      data.recentProjects.forEach((project: { id: string; name: string; created_at: string }) => {
        addRecentProject({
          id: project.id,
          name: project.name,
          lastUpdated: new Date(project.created_at).toLocaleDateString()
        })
      })
    }
  }, [data, addRecentProject])

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <div className="flex items-center">
                <span className="text-muted-foreground text-sm">Dashboard</span>
              </div>
            </li>
          </ol>
        </nav>
        <span className="text-muted-foreground text-sm">v0.1</span>
      </header>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <CircleDashed className="animate-spin h-8 w-8 text-muted-foreground" />
        </div>
      ) : isError ? (
        <div className="text-destructive text-center py-10">
          Failed to load dashboard data. Please try again.
        </div>
      ) : (
        <section className="grid md:grid-cols-2 gap-6 w-full">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-base">Ferramentas</h2>
            <div className="grid grid-cols-1 gap-3">
              <ToolCard title="Novo Projeto" description="Inicie um projeto e gere documentação automaticamente." onClick={() => window.location.href='/new-project'} />
              <ToolCard title="Gerar Documento" description="Crie documentação técnica a partir de prompts." />
            </div>
            
            <div className="mt-4 bg-card rounded-lg border border-border p-4">
              <h3 className="text-sm font-medium mb-2">Métricas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Minutos economizados</p>
                  <p className="text-xl font-medium">{data?.metrics?.minutesSaved || 0}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tokens poupados</p>
                  <p className="text-xl font-medium">{data?.metrics?.tokenCount ? `${Math.round(data.metrics.tokenCount / 1000)}K` : '0'}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-base">Projetos Recentes</h2>
            <div className="grid grid-cols-1 gap-3">
              {data?.recentProjects && data.recentProjects.length > 0 ? (
                data.recentProjects.map((project: { id: string; name: string; created_at: string }) => (
                  <ToolCard 
                    key={project.id}
                    title={project.name} 
                    description={`Última geração: ${new Date(project.created_at).toLocaleDateString()}`} 
                    onClick={() => window.location.href = `/project/${project.id}`}
                  />
                ))
              ) : (
                <div className="text-muted-foreground text-sm p-6 text-center border border-dashed border-border rounded-lg">
                  Você ainda não tem projetos. Comece criando um novo projeto.
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
