import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)

interface ProjectState {
  currentProject: {
    id?: string
    name: string
    description: string
    provider: string
  } | null
  setCurrentProject: (project: { id?: string; name: string; description: string; provider: string } | null) => void
  recentProjects: Array<{
    id: string
    name: string
    lastUpdated: string
  }>
  addRecentProject: (project: { id: string; name: string; lastUpdated: string }) => void
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      currentProject: null,
      setCurrentProject: (project) => set({ currentProject: project }),
      recentProjects: [],
      addRecentProject: (project) =>
        set((state) => ({
          recentProjects: [
            project,
            ...state.recentProjects.filter((p) => p.id !== project.id).slice(0, 4),
          ],
        })),
    }),
    {
      name: 'project-storage',
    }
  )
)
