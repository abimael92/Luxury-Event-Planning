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

export function VendorRegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()

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
      await login(data.email, data.password, "vendor")
      toast({
        title: "Welcome to Planora!",
        description: "Your vendor account is pending approval.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
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
            First Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="John"
              className="pl-10"
              {...register("firstName", { required: "First name is required" })}
            />
          </div>
          {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Last Name
          </Label>
          <Input id="lastName" placeholder="Doe" {...register("lastName", { required: "Last name is required" })} />
          {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your@business.com"
            className="pl-10"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessName" className="text-sm font-medium">
          Business Name
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="businessName"
            placeholder="Your Business Name"
            className="pl-10"
            {...register("businessName", { required: "Business name is required" })}
          />
        </div>
        {errors.businessName && <p className="text-sm text-destructive">{errors.businessName.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="serviceType" className="text-sm font-medium">
            Service Type
          </Label>
          <Select onValueChange={(value) => setValue("serviceType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
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
            Location
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="location"
              placeholder="City, State"
              className="pl-10"
              {...register("location", { required: "Location is required" })}
            />
          </div>
          {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Business Description
        </Label>
        <Textarea
          id="description"
          placeholder="Tell us about your services..."
          className="min-h-[80px]"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              className="pl-10 pr-10"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
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
            Confirm
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className="pl-10 pr-10"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
        <Checkbox id="terms" {...register("agreeToTerms", { required: "You must agree to the terms" })} />
        <Label htmlFor="terms" className="text-sm text-muted-foreground">
          I agree to the{" "}
          <Button variant="link" className="p-0 h-auto text-sm text-primary">
            Vendor Terms
          </Button>{" "}
          and{" "}
          <Button variant="link" className="p-0 h-auto text-sm text-primary">
            Privacy Policy
          </Button>
        </Label>
      </div>
      {errors.agreeToTerms && <p className="text-sm text-destructive">{errors.agreeToTerms.message}</p>}

      <Button
        type="submit"
        className="w-full gradient-teal text-white hover:glow-accent transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Submitting Application..." : "Apply as Vendor"}
      </Button>
    </form>
  )
}
