"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cross, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 px-10",
        scrolled ? "bg-background/95 shadow-sm" : "bg-background/80",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl flex items-center">
            <motion.span
              className="text-primary-gradient mr-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              AASTU
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              FOCUS
            </motion.span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {[
            { href: "/", label: "Home" },
            { href: "/events", label: "Events" },
            { href: "/about", label: "About" },
            { href: "/gallery", label: "Gallery" },
            { href: "/teams", label: "Teams" },
            { href: "/location", label: "Location" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors relative group",
                pathname === item.href ? "text-primary" : "hover:text-primary",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                  pathname === item.href ? "w-full" : "",
                )}
              ></span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button asChild variant="outline" >
            <Link href="/donate">Donate</Link>
          </Button>
          <Button asChild className="bg-primary-gradient text-white hover:opacity-90">
            <Link href="/join-us">Join Us</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <Cross className="h-6 w-6 rotate-45" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background",
          isMenuOpen ? "slide-in-from-top-0" : "hidden",
        )}
      >
        <div className="flex flex-col space-y-4">
          {[
            { href: "/", label: "Home" },
            { href: "/events", label: "Events" },
            { href: "/about", label: "About" },
            { href: "/gallery", label: "Gallery" },
            { href: "/teams", label: "Teams" },
            { href: "/contact", label: "Contact" },
          ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "text-lg font-medium block py-2",
                  pathname === item.href ? "text-primary" : "hover:text-primary",
                )}
                onClick={toggleMenu}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t">
            <Button asChild variant="outline" className="w-full">
              <Link href="/donate" onClick={toggleMenu}>
                Donate
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/join-us" onClick={toggleMenu}>
                Join Us
              </Link>
            </Button>
            <div className="flex justify-center mt-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
