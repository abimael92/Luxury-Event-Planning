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
  login: (email: string, password: string) => Promise<User>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// REAL users database - replace with your actual database
const REAL_USERS = {
  "client@client.com": {
    id: "1",
    firstName: "Sophia",
    lastName: "Chen",
    email: "client@client.com",
    userType: "client" as const,
    membershipTier: "Premium Member",
    avatar: "/placeholder.svg?height=32&width=32",
    password: "123456" // In real app, this would be hashed
  },
  "vendor@vendor.com": {
    id: "2",
    firstName: "Marcus",
    lastName: "Rodriguez",
    email: "vendor@vendor.com",
    userType: "vendor" as const,
    membershipTier: "Verified Vendor",
    avatar: "/placeholder.svg?height=32&width=32",
    password: "123456" // In real app, this would be hashed
  }
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

  const login = async (email: string, password: string): Promise<User> => {
    // Check if user exists in database
    const userRecord = REAL_USERS[email as keyof typeof REAL_USERS]

    // If user doesn't exist or password is wrong, throw error
    if (!userRecord || userRecord.password !== password) {
      throw new Error("Invalid email or password")
    }

    // Remove password from user object before storing
    const { password: _, ...userWithoutPassword } = userRecord

    setUser(userWithoutPassword)
    localStorage.setItem("planora_user", JSON.stringify(userWithoutPassword))

    return userWithoutPassword
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