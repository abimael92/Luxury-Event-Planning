"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { HeroSection } from "@/components/landing/hero-section"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // mark mounted to only render after client mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // redirect if authenticated
  useEffect(() => {
    if (mounted && !isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [mounted, isAuthenticated, isLoading, router])

  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      {/* Removed AuthSection from here - it will be on its own page */}
    </main>
  )
}