"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function DemoLoginButton() {
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleDemoLogin = async () => {
    try {
      await login("demo@planora.com", "demo123", "client")
      toast({
        title: "Demo Login Successful!",
        description: "You're now logged in as a demo user.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Demo login failed",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      onClick={handleDemoLogin}
      className="w-full gradient-royal text-white hover:glow-primary transition-all duration-300 mb-4"
    >
      🚀 Try Demo (Skip Auth)
    </Button>
  )
}
