'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useThemeStore()
  const { setTheme: setNextTheme } = useTheme()

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setNextTheme(newTheme)
  }, [theme, setTheme, setNextTheme])

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:bg-accent"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
