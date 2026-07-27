import { useState, useEffect, useMemo, useCallback, type ReactNode } from 'react'
import type { ThemeMode } from '../types/chat'
import { ThemeContext } from './useThemeContext'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('ollamachat-theme')
    return (stored === 'light' || stored === 'dark') ? stored : 'dark'
  })

  useEffect(() => {
    localStorage.setItem('ollamachat-theme', mode)
    if (mode === 'light') {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }, [mode])

  const toggleTheme = useCallback(() => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')), [])

  const contextValue = useMemo(() => ({ mode, toggleTheme }), [mode, toggleTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}


