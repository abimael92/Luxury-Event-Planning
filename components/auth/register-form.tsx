"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Chrome } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "../../app/contexts/auth-context"
import { useTranslation } from "@/hooks/use-translation"

interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

interface RegisterFormProps {
  onBack: () => void
  theme?: any
}

export function RegisterForm({ onBack, theme }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>()
  const password = watch("password")

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      toast({
        title: t('auth.register.welcome'),
        description: t('auth.register.accountCreated'),
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: t('auth.register.failed'),
        description: t('auth.register.tryAgain'),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            {t('auth.register.firstName')}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder={t('auth.register.firstNamePlaceholder')}
              className="pl-10"
              disabled={isLoading}
              {...register("firstName", { required: t('auth.validation.firstNameRequired') })}
            />
          </div>
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            {t('auth.register.lastName')}
          </Label>
          <Input
            id="lastName"
            placeholder={t('auth.register.lastNamePlaceholder')}
            disabled={isLoading}
            {...register("lastName", { required: t('auth.validation.lastNameRequired') })}
          />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            {t('auth.login.password')}
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t('auth.register.passwordPlaceholder')}
              className="pl-10 pr-10"
              disabled={isLoading}
              {...register("password", {
                required: t('auth.validation.passwordRequired'),
                minLength: {
                  value: 8,
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium">
            {t('auth.register.confirmPassword')}
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={t('auth.register.confirmPasswordPlaceholder')}
              className="pl-10 pr-10"
              disabled={isLoading}
              {...register("confirmPassword", {
                required: t('auth.validation.confirmPasswordRequired'),
                validate: (value) => value === password || t('auth.validation.passwordsDontMatch'),
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          disabled={isLoading}
          {...register("agreeToTerms", { required: t('auth.validation.agreeToTerms') })}
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground leading-tight">
          {t('auth.register.agreeToTerms')}
        </Label>
      </div>
      {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>}

      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="w-full"
        disabled={isLoading}
      >
        {t('auth.back')}
      </Button>

      <Button
        type="submit"
        className="w-full gradient-royal text-white hover:glow-primary transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? t('auth.register.creatingAccount') : t('auth.register.createAccount')}
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