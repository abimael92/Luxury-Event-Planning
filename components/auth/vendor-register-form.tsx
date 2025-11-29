"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock, User, Building, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useAuth } from "@/core/contexts/auth-context"
import { useTranslation } from "@/hooks/use-translation"

interface VendorRegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  businessName: string
  serviceType: string
  location: string
  description: string
  agreeToTerms: boolean
}

interface VendorRegisterFormProps {
  onBack: () => void
}

const serviceTypes = [
  "DJ & Music",
  "Catering",
  "Venue",
  "Photography",
  "Videography",
  "Florist",
  "Wedding Planning",
  "Lighting & AV",
  "Transportation",
  "Entertainment",
  "Other",
]

export function VendorRegisterForm({ onBack }: VendorRegisterFormProps) {
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
    setValue,
    formState: { errors },
  } = useForm<VendorRegisterFormData>()
  const password = watch("password")

  const onSubmit = async (data: VendorRegisterFormData) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password)
      toast({
        title: t('auth.vendor.welcome'),
        description: t('auth.vendor.accountCreated'),
      })
      router.push("/vendor")
    } catch (error) {
      toast({
        title: t('auth.vendor.failed'),
        description: t('auth.vendor.tryAgain'),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
            placeholder={t('auth.vendor.emailPlaceholder')}
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
        <Label htmlFor="businessName" className="text-sm font-medium">
          {t('auth.vendor.businessName')}
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="businessName"
            placeholder={t('auth.vendor.businessNamePlaceholder')}
            className="pl-10"
            disabled={isLoading}
            {...register("businessName", { required: t('auth.validation.businessNameRequired') })}
          />
        </div>
        {errors.businessName && <p className="text-sm text-destructive">{errors.businessName.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="serviceType" className="text-sm font-medium">
            {t('auth.vendor.serviceType')}
          </Label>
          <Select onValueChange={(value) => setValue("serviceType", value)} disabled={isLoading}>
            <SelectTrigger>
              <SelectValue placeholder={t('auth.vendor.serviceTypePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.serviceType && <p className="text-sm text-destructive">{errors.serviceType.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            {t('auth.vendor.location')}
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder={t('auth.vendor.locationPlaceholder')}
              className="pl-10"
              disabled={isLoading}
              {...register("location", { required: t('auth.validation.locationRequired') })}
            />
          </div>
          {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          {t('auth.vendor.description')}
        </Label>
        <Textarea
          id="description"
          placeholder={t('auth.vendor.descriptionPlaceholder')}
          className="min-h-[80px]"
          disabled={isLoading}
          {...register("description", { required: t('auth.validation.descriptionRequired') })}
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
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

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          disabled={isLoading}
          {...register("agreeToTerms", { required: t('auth.validation.agreeToTerms') })}
        />
        <Label htmlFor="terms" className="text-sm text-muted-foreground">
          {t('auth.vendor.agreeToTerms')}
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
        className="w-full gradient-teal text-white hover:glow-accent transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? t('auth.vendor.submitting') : t('auth.vendor.apply')}
      </Button>
    </form>
  )
}