"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from '@/shared/lib/utils'

interface StatsCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: string
  color: "primary" | "secondary" | "accent" | "success"
}

const colorClasses = {
  primary: "text-primary bg-primary/10",
  secondary: "text-pink-600 bg-pink-100",
  accent: "text-teal-600 bg-teal-100",
  success: "text-green-600 bg-green-100",
}

export function StatsCard({ title, value, icon: Icon, trend, color }: StatsCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-heading font-bold mt-1">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{trend}</p>
            </div>
            <div className={cn("p-3 rounded-lg", colorClasses[color])}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
