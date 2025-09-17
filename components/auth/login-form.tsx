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
import { useAuth } from "@/contexts/auth-context"

interface LoginFormData {
  email: string
  password: string
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      await login(data.email, data.password, "client")
      toast({
        title: "Welcome back!",
        description: "You've been successfully signed in.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
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
        <Label htmlFor="password" className="text-sm font-medium">
          Password
        </Label>
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
      >
        <Chrome className="mr-2 h-4 w-4" />
        Google
      </Button>

      <div className="text-center">
        <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
          Forgot your password?
        </Button>
      </div>
    </form>
  )
}
