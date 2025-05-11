import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AASTU FOCUS Fellowship",
  description: "A Christ-centered community for spiritual growth and service",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider>
            <Navbar />
            <main className="overflow-hidden">{children}</main>
            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
