"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  userType: "client" | "vendor"
  membershipTier: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType?: "client" | "vendor") => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USERS = {
  client: {
    id: "1",
    firstName: "Sophia",
    lastName: "Chen",
    email: "sophia@example.com",
    userType: "client" as const,
    membershipTier: "Premium Member",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  vendor: {
    id: "2",
    firstName: "Marcus",
    lastName: "Rodriguez",
    email: "marcus@luxurycatering.com",
    userType: "vendor" as const,
    membershipTier: "Verified Vendor",
    avatar: "/placeholder.svg?height=32&width=32",
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("planora_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, userType: "client" | "vendor" = "client") => {
    const demoUser = DEMO_USERS[userType]
    setUser(demoUser)
    localStorage.setItem("planora_user", JSON.stringify(demoUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("planora_user")
  }

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
