"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Mail } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

interface ForgotPasswordFormProps {
    onBack: () => void
}

export function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const { t } = useTranslation()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast({
                title: t('auth.forgotPassword.resetEmailSent'),
                description: t('auth.forgotPassword.checkEmailInstructions'),
            })
            onBack()
        } catch (error) {
            toast({
                title: t('auth.forgotPassword.error'),
                description: t('auth.forgotPassword.failedToSend'),
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-sm font-medium">
                    {t('auth.login.email')}
                </Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        id="reset-email"
                        type="email"
                        placeholder={t('auth.login.emailPlaceholder')}
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                    {t('auth.forgotPassword.instructions')}
                </p>
            </div>

            <Button
                type="submit"
                className="w-full gradient-royal text-white hover:glow-primary transition-all duration-300"
                disabled={isLoading || !email}
            >
                {isLoading ? t('auth.forgotPassword.sending') : t('auth.forgotPassword.sendInstructions')}
            </Button>
        </form>
    )
}