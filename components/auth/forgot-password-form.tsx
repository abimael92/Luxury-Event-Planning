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
            // TODO: Implement actual password reset logic
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
                <ArrowLeft className="w-4 h-4" />
                {t('auth.forgotPassword.backToLogin')}
            </Button>

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
                    />
                </div>
                <p className="text-sm text-muted-foreground">
                    {t('auth.forgotPassword.instructions')}
                </p>
            </div>

            <Button
                type="submit"
                className="w-full gradient-royal text-white"
                disabled={isLoading || !email}
            >
                {isLoading ? t('auth.forgotPassword.sending') : t('auth.forgotPassword.sendInstructions')}
            </Button>
        </form>
    )
}