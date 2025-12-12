"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "../../app/contexts/auth-context"
import { useTranslation } from "@/hooks/use-translation"

interface LoginFormData {
  email: string
  password: string
}

interface LoginFormProps {
  onForgotPassword: () => void
  onBack: () => void
}

export function LoginForm({ onForgotPassword, onBack }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const user = await login(data.email, data.password)

      toast({
        title: t('auth.login.welcomeBack'),
        description: t('auth.login.signInSuccess'),
      })

      if (user?.userType === "vendor") {
        router.push("/vendor")
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast({
        title: t('auth.login.signInFailed'),
        description: error?.message || t('auth.login.invalidCredentials'),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          {t('auth.login.email')}
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder={t('auth.login.emailPlaceholder')}
            className="pl-10"
            disabled={isLoading}
            {...register("email", {
              required: t('auth.validation.emailRequired'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('auth.validation.invalidEmail'),
              },
            })}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-sm font-medium">
            {t('auth.login.password')}
          </Label>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder={t('auth.login.passwordPlaceholder')}
            className="pl-10 pr-10"
            disabled={isLoading}
            {...register("password", {
              required: t('auth.validation.passwordRequired'),
              minLength: {
                value: 6,
                message: t('auth.validation.passwordMinLength'),
              },
            })}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
      </div>

      <Button
        type="submit"
        className="w-full gradient-royal text-white hover:glow-primary transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? t('auth.login.signingIn') : t('auth.login.signIn')}
      </Button>

      <Button
        type="button"
        variant="link"
        className="p-0 h-auto text-xs text-muted-foreground hover:text-primary"
        onClick={onForgotPassword}
        disabled={isLoading}
      >
        {t('auth.login.forgotPassword')}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            {t('auth.login.orContinueWith')}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-border/50 hover:border-primary/20 hover:bg-primary/5 bg-transparent"
        disabled={isLoading}
      >
        <Chrome className="mr-2 h-4 w-4" />
        {t('auth.login.google')}
      </Button>
    </form>
  )
}