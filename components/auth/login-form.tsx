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
import { useAuth } from "@/core/contexts/auth-context"

interface LoginFormData {
  email: string
  password: string
}

interface LoginFormProps {
  onForgotPassword: () => void
}

export function LoginForm({ onForgotPassword }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const user = await login(data.email, data.password) // assume this returns user info

      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      })

      if (user?.role === "vendor") {
        router.push("/vendor")
      } else {
        router.push("/dashboard")
      }
    } catch {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }


  // Demo login function
  const handleDemoLogin = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const user = await login(email, password)
      toast({
        title: "Demo login successful!",
        description: `Logged in as ${email}`,
      })

      router.push(email.includes("vendor") ? "/vendor" : "/dashboard")
    } catch {
      toast({
        title: "Demo login failed",
        description: "Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
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
        <div className="flex justify-between items-center">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-xs text-muted-foreground hover:text-primary"
            onClick={onForgotPassword}
          >
            Forgot your password?
          </Button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="pl-10 pr-10"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
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

      <Button
        type="submit"
        className="w-full gradient-royal text-white hover:glow-primary transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>

      {/* Demo Login Buttons */}
      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          className="w-full border-border/50 hover:border-primary/20 hover:bg-primary/5 bg-transparent"
          onClick={() => {
            setValue("email", "client@client.com")
            setValue("password", "123456")
            handleDemoLogin("client@client.com", "123456")
          }}
          disabled={isLoading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Demo Client
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full border-border/50 hover:border-primary/20 hover:bg-primary/5 bg-transparent"
          onClick={() => {
            setValue("email", "vendor@vendor.com")
            setValue("password", "123456")
            handleDemoLogin("vendor@vendor.com", "123456")
          }}
          disabled={isLoading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Demo Vendor
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full border-border/50 hover:border-primary/20 hover:bg-primary/5 bg-transparent"
        disabled={isLoading}
      >
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>
    </form>
  )
}