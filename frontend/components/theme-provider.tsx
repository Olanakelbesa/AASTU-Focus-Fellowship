"use client";

import type React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="aastu-focus-theme"
      forcedTheme={undefined}
    >
      {children}
    </NextThemesProvider>
  );
}
