"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HeroSection } from "../components/landing/hero-section"
import { useAuth } from "./contexts/auth-context"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Only handle redirection in useEffect, don't conditionally render based on auth
  useEffect(() => {
    if (mounted && !isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [mounted, isAuthenticated, isLoading, router])

  // Show loading state until we know mounted state
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Always render the same content regardless of auth state
  // The useEffect will handle redirection for authenticated users
  return (
    <main className="min-h-screen">
      <HeroSection />
    </main>
  )
}