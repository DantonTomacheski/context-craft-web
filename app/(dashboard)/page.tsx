import React from 'react'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { ToolCard } from '@/components/ToolCard'

export default function DashboardPage() {
  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <Breadcrumb segments={[{ title: 'Dashboard', href: '/' }]} />
        <span className="text-muted-foreground text-sm">v0.1</span>
      </header>

      <section className="grid md:grid-cols-2 gap-6 w-full">
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-base">Ferramentas</h2>
          <div className="grid grid-cols-1 gap-3">
            <ToolCard title="Novo Projeto" description="Inicie um projeto e gere documentação automaticamente." onClick={() => window.location.href='/dashboard/new-project'} />
            <ToolCard title="Gerar Documento" description="Crie documentação técnica a partir de prompts." />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-semibold text-base">Projetos Recentes</h2>
          <div className="grid grid-cols-1 gap-3">
            <ToolCard title="Projeto Exemplo" description="Última geração: 21/04/2025" />
          </div>
        </div>
      </section>
    </>
  )
}
