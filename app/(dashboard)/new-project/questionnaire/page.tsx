import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'

interface FormValues {
  projectName: string
  description: string
}

export default function QuestionnairePage() {
  const params = useSearchParams()
  const router = useRouter()
  const provider = params.get('provider') ?? 'openai'
  const { register, handleSubmit } = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    const qs = new URLSearchParams({ provider, ...data }).toString()
    router.push(`/dashboard/new-project/create-docs?${qs}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold">Project details</h2>

      <Input placeholder="Project name" {...register('projectName', { required: true })} />
      <Input placeholder="Short description" {...register('description', { required: true })} />

      <Button type="submit">Generate docs</Button>
    </form>
  )
}
