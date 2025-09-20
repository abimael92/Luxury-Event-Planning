// components/auth/auth-section.tsx
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { VendorRegisterForm } from "./vendor-register-form"

interface AuthSectionProps {
  defaultTab?: "login" | "register" | "vendor"
  onClose?: () => void
}

export function AuthSection({ defaultTab = "login", onClose }: AuthSectionProps) {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "register" | "vendor">(defaultTab) // fix typing

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-heading">Welcome to Planora</CardTitle>
              <CardDescription className="text-base">Join our luxury event planning community</CardDescription>
            </CardHeader>
            <CardContent>
         <Tabs
    value={activeTab}
    onValueChange={(value) => setActiveTab(value as "login" | "register" | "vendor")} // cast here
    className="w-full"
  >
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="login" className="text-sm">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="text-sm">
                    Client
                  </TabsTrigger>
                  <TabsTrigger value="vendor" className="text-sm">
                    Vendor
                  </TabsTrigger>
                </TabsList>

                <AnimatePresence mode="wait">
                  {activeTab === "login" && (
                    <motion.div
                      key="login"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-0"
                    >
                      <LoginForm onClose={onClose} />
                    </motion.div>
                  )}

                  {activeTab === "register" && (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-0"
                    >
                      <RegisterForm />
                    </motion.div>
                  )}

                  {activeTab === "vendor" && (
                    <motion.div
                      key="vendor"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="mt-0"
                    >
                      <VendorRegisterForm />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
