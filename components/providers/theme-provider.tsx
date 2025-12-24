'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { SidebarProvider } from '@/components/ui/sidebar'

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <SidebarProvider
        defaultOpen={true}
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 42)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        {children}
      </SidebarProvider>
    </NextThemesProvider>
  )
}

