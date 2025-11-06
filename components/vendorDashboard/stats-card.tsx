"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string
    icon: LucideIcon
    trend?: string
    color?: "primary" | "secondary" | "accent" | "success"
}

export function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
    const colorClasses: Record<string, string> = {
        primary: "text-blue-500",
        secondary: "text-purple-500",
        accent: "text-orange-500",
        success: "text-green-500",
    }

    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <Card className="shadow-md rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {title}
                    </CardTitle>
                    <Icon className={`h-5 w-5 ${colorClasses[color || "primary"]}`} />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
                </CardContent>
            </Card>
        </motion.div>
    )
}
