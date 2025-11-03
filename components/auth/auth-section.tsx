"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { VendorRegisterForm } from "./vendor-register-form"
import { DemoLoginButton } from "./demo-login-button"
import { ForgotPasswordForm } from "./forgot-password-form"

export function AuthSection() {
  const [activeTab, setActiveTab] = useState("login")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (showForgotPassword) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-heading">Reset Password</CardTitle>
            <CardDescription className="text-base">
              Enter your email to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ForgotPasswordForm onBack={() => setShowForgotPassword(false)} />
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login" className="text-sm">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="text-sm">Client</TabsTrigger>
              <TabsTrigger value="vendor" className="text-sm">Vendor</TabsTrigger>
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
                  <LoginForm onForgotPassword={() => setShowForgotPassword(true)} />
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
  )
}