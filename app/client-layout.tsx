"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { ReduxProvider } from "@/components/providers/redux-provider"
import { AuthProvider } from "@/lib/auth/auth-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const hideNavAndFooter = pathname?.startsWith("/admin") || pathname === "/login"

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <main className="overflow-hidden">{children}</main>
      {!hideNavAndFooter && <Footer />}
    </>
  )
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </ThemeProvider>
    </ReduxProvider>
  )
}
