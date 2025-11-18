"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string
    icon: LucideIcon
    trend?: string
    color?: "primary" | "secondary" | "accent" | "success"
}

export function StatsCard({ title, value, icon: Icon, trend, color = "primary" }: StatsCardProps) {
    const colors = {
        primary: "from-blue-500 to-cyan-500",
        secondary: "from-purple-500 to-pink-500",
        accent: "from-orange-500 to-red-500",
        success: "from-green-500 to-emerald-500"
    }

    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group cursor-pointer"
        >
            <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-slate-50 via-white to-slate-100/50 backdrop-blur-sm">
                {/* Animated gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${colors[color]} shadow-lg`}>
                            <Icon className="h-5 w-5 text-white" />
                        </div>
                        {trend && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {trend}
                            </span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <div className="text-3xl font-bold bg-gradient-to-br from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            {value}
                        </div>
                        <p className="text-sm font-medium text-slate-600">{title}</p>
                    </div>

                    {/* Animated progress bar */}
                    <div className="mt-4 w-full bg-slate-200 rounded-full h-1">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                            className={`h-1 rounded-full bg-gradient-to-r ${colors[color]}`}
                        />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}