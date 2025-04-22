'use client'

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useProjectStore } from '@/store'

const formSchema = z.object({
  projectName: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  features: z.string().optional(),
  techStack: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function QuestionnairePage() {
  const params = useSearchParams()
  const router = useRouter()
  const provider = params.get('provider') ?? 'openai'
  const { setCurrentProject } = useProjectStore()

  // Progress state
  const [activeSection, setActiveSection] = React.useState<string>('basic')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: '',
      description: '',
      features: '',
      techStack: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    // Save to store
    setCurrentProject({
      name: data.projectName,
      description: data.description,
      provider,
    })

    // Navigate to next step
    const qs = new URLSearchParams({
      provider,
      projectName: data.projectName,
      description: data.description,
      features: data.features || '',
      techStack: data.techStack || '',
    }).toString()

    router.push(`/dashboard/new-project/create-docs?${qs}`)
  }

  // Helper for section navigation
  const handleSectionComplete = (section: string, nextSection: string) => {
    setActiveSection(nextSection)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Project Questionnaire</h2>
        <div className="text-sm text-muted-foreground">Step 3 of 4</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tell us about your project</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Accordion
                type="single"
                collapsible
                value={activeSection}
                onValueChange={setActiveSection}
                className="space-y-4"
              >
                <AccordionItem value="basic" className="rounded-lg border p-2">
                  <AccordionTrigger className="rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                    Basic Information
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 px-4 pt-4">
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., E-commerce Platform" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project in detail"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      onClick={() => handleSectionComplete('basic', 'features')}
                      className="w-full"
                    >
                      Continue
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="features" className="rounded-lg border p-2">
                  <AccordionTrigger className="rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                    Features & Requirements
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 px-4 pt-4">
                    <FormField
                      control={form.control}
                      name="features"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Key Features</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="List the key features of your project (separated by commas)"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="button"
                      onClick={() => handleSectionComplete('features', 'technical')}
                      className="w-full"
                    >
                      Continue
                    </Button>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="technical" className="rounded-lg border p-2">
                  <AccordionTrigger className="rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground">
                    Technical Details
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 px-4 pt-4">
                    <FormField
                      control={form.control}
                      name="techStack"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tech Stack Preferences</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your preferred technologies, frameworks, or tools"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full">
                      Generate Documentation
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
