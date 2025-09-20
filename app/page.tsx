// app/page.tsx
"use client"

import { useState } from "react"
import { HeroSection } from "@/components/landing/hero-section"
import { AuthSection } from "@/components/auth/auth-section"

export default function HomePage() {
  const [showLoginModal, setShowLoginModal] = useState(false)

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Hero Section */}
      <HeroSection onStartPlanning={() => setShowLoginModal(true)} />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowLoginModal(false)}
          />
          {/* Modal content */}
          <div className="relative z-10 max-w-md w-full mx-4">
            <AuthSection defaultTab="login" onClose={() => setShowLoginModal(false)} />
          </div>
        </div>
      )}
    </main>
  )
}
