'use client'

import React from 'react'
import { useThemeStore } from '@/store'
import { ThemeProvider } from 'next-themes'

export default function StateProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()

  // Set the theme from Zustand store to next-themes provider
  return (
    <ThemeProvider defaultTheme={theme} enableSystem={false} attribute="class">
      {children}
    </ThemeProvider>
  )
}
