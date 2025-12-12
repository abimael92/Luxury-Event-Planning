"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../app/contexts/auth-context"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  // This ensures server and client render the same initially
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't check auth until component is mounted (client-side)
  useEffect(() => {
    if (mounted && !isLoading && !isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, router, mounted])

  // During SSR and initial client render, show the children
  // This makes server and client HTML match
  if (!mounted || isLoading) {
    return <>{children}</>
  }

  // Only redirect on client after checking auth
  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return <>{children}</>
}