"use client"

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { MoveRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(() => ['Accurate', 'Context-rich', 'Automated', 'Structured', 'Reliable'], [])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div>
            <div className="flex flex-row items-center gap-2">
              <Image src="/icon.png" alt="ContextCraft" width={42} height={42} />
              <span className="logo-text text-3xl font-bold">ContextCraft</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-regular max-w-2xl text-center text-5xl tracking-tighter md:text-7xl">
              <span className="relative flex w-full justify-center overflow-hidden text-center md:mb-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: '-100' }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span className="text-primary">Documentation</span>
            </h1>

            <p className="max-w-2xl text-center text-lg leading-relaxed tracking-tight text-muted-foreground md:mt-8 md:text-xl">
              Automate software project documentation creation using AI to eliminate hallucinations, context loss, and error loops. 
              Generate six essential document types using the Context Boundary Method powered by advanced AI models.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" asChild>
              <a href="/dashboard">Get Started <MoveRight className="h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Hero }
