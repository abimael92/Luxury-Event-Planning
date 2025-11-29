"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { VendorRegisterForm } from "./vendor-register-form"
import { ForgotPasswordForm } from "./forgot-password-form"
import { useTranslation } from "@/hooks/use-translation"
import { ArrowLeft, Languages, User, Building, Sparkles, ChevronDown } from "lucide-react"
import { useAuth } from "@/core/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function AuthSection() {
  const [currentView, setCurrentView] = useState<"welcome" | "login" | "register" | "client-register" | "vendor-register" | "forgot-password">("welcome")
  const [mounted, setMounted] = useState(false)
  const { t, language, toggleLanguage } = useTranslation()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const renderView = () => {
    switch (currentView) {
      case "login":
        return <LoginForm
          onForgotPassword={() => setCurrentView("forgot-password")}
          onBack={() => setCurrentView("welcome")}
        />
      case "register":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg md:text-xl font-semibold">{t('auth.register.chooseAccountType')}</h3>
              <p className="text-sm md:text-base text-muted-foreground mt-1">{t('auth.register.selectRole')}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                <Button
                  variant="outline"
                  className="h-24 md:h-32 w-full flex-col gap-2 md:gap-4 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 p-4 md:p-6"
                  onClick={() => setCurrentView("client-register")}
                >
                  <User className="h-8 w-8 md:h-12 md:w-12" />
                  <div className="text-center">
                    <div className="text-sm md:text-lg font-semibold">{t('auth.tabs.client')}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{t('auth.tabs.clientDescription')}</div>
                  </div>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                <Button
                  variant="outline"
                  className="h-24 md:h-32 w-full flex-col gap-2 md:gap-4 border-2 border-primary/30 hover:border-primary/60 hover:bg-primary/10 transition-all duration-300 p-4 md:p-6"
                  onClick={() => setCurrentView("vendor-register")}
                >
                  <Building className="h-8 w-8 md:h-12 md:w-12" />
                  <div className="text-center">
                    <div className="text-sm md:text-lg font-semibold">{t('auth.tabs.vendor')}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{t('auth.tabs.vendorDescription')}</div>
                  </div>
                </Button>
              </motion.div>
            </div>
            <Button variant="ghost" onClick={() => setCurrentView("welcome")} className="w-full">
              {t('auth.back')}
            </Button>
          </div>
        )
      case "client-register":
        return <RegisterForm onBack={() => setCurrentView("register")} />
      case "vendor-register":
        return <VendorRegisterForm onBack={() => setCurrentView("register")} />
      case "forgot-password":
        return <ForgotPasswordForm onBack={() => setCurrentView("login")} />
      default:
        return (
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-2"
            >
              <Sparkles className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-2" />
              <h2 className="text-xl md:text-2xl font-heading font-bold">{t('auth.welcome')}</h2>
              <p className="text-sm md:text-base text-muted-foreground">{t('auth.welcomeSubtitle')}</p>
            </motion.div>

            <div className="space-y-3">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={() => setCurrentView("login")}
                  className="w-full h-10 md:h-12 gradient-royal text-white hover:glow-primary transition-all duration-300 text-sm md:text-base"
                >
                  {t('auth.tabs.login')}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  onClick={() => setCurrentView("register")}
                  className="w-full h-10 md:h-12 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-sm md:text-base"
                >
                  {t('auth.tabs.register')}
                </Button>
              </motion.div>
            </div>

            <DemoDropdown />
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl mx-auto my-4 md:my-8 px-4"
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm"
        >
          <Languages className="w-5 h-5 text-indigo-800" />
          <span className="text-indigo-800">{language === "es" ? "ES" : "EN"}</span>
        </button>
      </div>

      <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-xl w-full p-4 md:p-6 lg:p-8">
        <CardHeader className="text-center pb-4">
          {currentView !== "welcome" && (
            <div className="flex justify-start mb-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setCurrentView(currentView === "vendor-register" || currentView === "client-register" ? "register" : "welcome")}
                className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('auth.back')}
              </Button>
            </div>
          )}
          <CardTitle className="text-xl md:text-2xl font-heading">
            {currentView === "login" ? t('auth.login.title') :
              currentView === "register" ? t('auth.register.title') :
                currentView === "client-register" ? t('auth.register.title') :
                  currentView === "vendor-register" ? t('auth.vendor.title') :
                    currentView === "forgot-password" ? t('auth.forgotPassword.title') :
                      t('auth.welcome')}
          </CardTitle>
          <CardDescription className="text-sm md:text-base">
            {currentView === "login" ? t('auth.login.description') :
              currentView === "register" ? t('auth.register.description') :
                currentView === "client-register" ? t('auth.register.description') :
                  currentView === "vendor-register" ? t('auth.vendor.description') :
                    currentView === "forgot-password" ? t('auth.forgotPassword.description') :
                      t('auth.welcomeSubtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 pb-4 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Demo Dropdown Component
function DemoDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { login } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const { t } = useTranslation()

  const handleDemoLogin = async (email: string, type: string) => {
    try {
      const user = await login(email, "123456")
      toast({
        title: t('auth.login.demoSuccess'),
        description: `${t('auth.login.loggedInAs')} ${type}`,
      })
      router.push(user?.userType === "vendor" ? "/vendor" : "/dashboard")
    } catch (error) {
      toast({
        title: t('auth.login.demoFailed'),
        variant: "destructive",
      })
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border-dashed border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 text-sm md:text-base"
      >
        <Sparkles className="mr-2 h-4 w-4" />
        {t('auth.demo.tryDemo')}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="ml-2 h-4 w-4" />
        </motion.div>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border/50 rounded-lg shadow-lg z-10"
          >
            <div className="p-2 space-y-1">
              <Button
                variant="ghost"
                onClick={() => handleDemoLogin("client@client.com", "Client")}
                className="w-full justify-start text-sm"
              >
                <User className="mr-2 h-4 w-4" />
                {t('auth.demo.client')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleDemoLogin("vendor@vendor.com", "Vendor")}
                className="w-full justify-start text-sm"
              >
                <Building className="mr-2 h-4 w-4" />
                {t('auth.demo.vendor')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}