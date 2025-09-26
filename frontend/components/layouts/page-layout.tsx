"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/animations/motion"

interface PageLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  showBreadcrumbs?: boolean
  className?: string
  headerClassName?: string
  contentClassName?: string
  headerVariant?: "default" | "centered" | "minimal"
  animation?: boolean
}

/**
 * A reusable page layout component that provides consistent structure for all pages
 *
 * @param children - The page content
 * @param title - The page title
 * @param description - Optional page description
 * @param showBreadcrumbs - Whether to show breadcrumbs (default: true)
 * @param className - Additional classes for the main container
 * @param headerClassName - Additional classes for the header section
 * @param contentClassName - Additional classes for the content section
 * @param headerVariant - Style variant for the header ("default", "centered", or "minimal")
 * @param animation - Whether to animate the page content (default: true)
 */
export default function PageLayout({
  children,
  title,
  description,
  showBreadcrumbs = true,
  className,
  headerClassName,
  contentClassName,
  headerVariant = "default",
  animation = true,
}: PageLayoutProps) {
  const pathname = usePathname()

  // Generate breadcrumb items from the current path
  const breadcrumbItems = generateBreadcrumbs(pathname)

  // Determine header classes based on the variant
  const headerClasses = cn("bg-muted py-12 md:py-20", headerVariant === "minimal" && "py-8 md:py-12", headerClassName)

  // Determine content container classes
  const contentContainerClasses = cn("container mx-auto px-4", contentClassName)

  // Main container classes
  const containerClasses = cn("flex flex-col min-h-screen", className)

  return (
    <div className={containerClasses}>
      {/* Header Section */}
      <section className={headerClasses}>
        <div className="container mx-auto px-4">
          {showBreadcrumbs && breadcrumbItems.length > 1 && (
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
                {breadcrumbItems.map((item, index) => (
                  <li key={item.path} className="flex items-center">
                    {index > 0 && <ChevronRight className="h-4 w-4 mx-1" />}
                    {index === breadcrumbItems.length - 1 ? (
                      <span aria-current="page">{item.label}</span>
                    ) : (
                      <Link href={item.path} className="hover:text-primary transition-colors">
                        {index === 0 ? <Home className="h-4 w-4" /> : item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className={cn(headerVariant === "centered" && "text-center", headerVariant === "minimal" && "max-w-3xl")}
          >
            {animation ? (
              <>
                <FadeIn>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                </FadeIn>
                {description && (
                  <FadeIn delay={0.1}>
                    <p
                      className={cn(
                        "text-lg text-muted-foreground",
                        headerVariant === "centered" && "max-w-2xl mx-auto",
                      )}
                    >
                      {description}
                    </p>
                  </FadeIn>
                )}
              </>
            ) : (
              <>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                {description && (
                  <p
                    className={cn("text-lg text-muted-foreground", headerVariant === "centered" && "max-w-2xl mx-auto")}
                  >
                    {description}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className={contentContainerClasses}>
        {animation ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

/**
 * Generate breadcrumb items from a pathname
 */
function generateBreadcrumbs(pathname: string) {
  const paths = pathname.split("/").filter(Boolean)

  // Always include home
  const breadcrumbs = [{ path: "/", label: "Home" }]

  // Build up the breadcrumbs array
  let currentPath = ""
  paths.forEach((path) => {
    currentPath += `/${path}`
    breadcrumbs.push({
      path: currentPath,
      label: formatBreadcrumbLabel(path),
    })
  })

  return breadcrumbs
}

/**
 * Format a path segment into a readable label
 */
function formatBreadcrumbLabel(path: string): string {
  // Replace hyphens with spaces and capitalize each word
  return path
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}
