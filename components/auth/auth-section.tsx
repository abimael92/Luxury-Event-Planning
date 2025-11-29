"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { VendorRegisterForm } from "./vendor-register-form"
import { ForgotPasswordForm } from "./forgot-password-form"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowLeft, Languages } from "lucide-react"
import { Button } from '../ui/button'

export function AuthSection() {
  const [activeTab, setActiveTab] = useState("login")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t, language, toggleLanguage } = useTranslation()

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
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm"
          >
            <Languages className="w-3 h-3" />
            <span>{language === "es" ? "ES" : "EN"}</span>
          </button>
        </div>

        <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl">
          <div className="pt-6 px-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowForgotPassword(false)}
              className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('auth.forgotPassword.backToLogin')}
            </Button>
          </div>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-heading">
              {t('auth.resetPassword')}
            </CardTitle>
            <CardDescription className="text-base">
              {t('auth.resetDescription')}
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
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm"
        >
          <Languages className="w-3 h-3" />
          <span>{language === "es" ? "ES" : "EN"}</span>
        </button>
      </div>

      <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-heading">
            {t('auth.welcome')}
          </CardTitle>
          <CardDescription className="text-base">
            {t('auth.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login" className="text-sm">
                {t('auth.tabs.login')}
              </TabsTrigger>
              <TabsTrigger value="register" className="text-sm">
                {t('auth.tabs.register')}
              </TabsTrigger>
              <TabsTrigger value="vendor" className="text-sm">
                {t('auth.tabs.vendor')}
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