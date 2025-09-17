"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AuthSection } from "@/components/auth/auth-section"
import { HeroSection } from "@/components/landing/hero-section"
import { useAuth } from "@/contexts/auth-context"

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null // Will redirect to dashboard
  }

  return (
    <main className="min-h-screen">
      <HeroSection />
      <AuthSection />
    </main>
  )
}
