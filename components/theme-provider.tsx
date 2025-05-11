"use client"

import type React from "react"

import { useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useAppSelector } from "@/lib/redux/hooks"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const themeMode = useAppSelector((state) => state.theme.mode)

  // Apply theme changes
  useEffect(() => {
    // This effect will run when the Redux theme state changes
    // The next-themes provider will handle the actual DOM updates
  }, [themeMode])

  return (
    <NextThemesProvider attribute="class" defaultTheme={themeMode} enableSystem={themeMode === "system"}>
      {children}
    </NextThemesProvider>
  )
}
