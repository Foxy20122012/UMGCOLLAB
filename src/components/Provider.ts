"use client"

import * as React from "react"
import { ThemeProvider } from "via-ui/theme-provider"

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  )
}
