"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, DollarSign, Users, TrendingUp } from "lucide-react"
import { StatsCard } from "./stats-card"

export function VendorDashboard() {
    const [vendorName] = useState("Elite Catering Co.")

    const stats = {
        activeBookings: 5,
        totalRevenue: 32000,
        upcomingEvents: 3,
        satisfactionRate: 96,
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-heading font-bold">Welcome back, {vendorName}</h1>
                <p className="text-muted-foreground mt-2">
                    Here’s an overview of your bookings and performance
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Active Bookings" value={stats.activeBookings.toString()} icon={Calendar} trend="+1 this week" color="primary" />
                <StatsCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} trend="+8% this month" color="secondary" />
                <StatsCard title="Upcoming Events" value={stats.upcomingEvents.toString()} icon={Users} trend="3 pending" color="accent" />
                <StatsCard title="Satisfaction Rate" value={`${stats.satisfactionRate}%`} icon={TrendingUp} trend="Consistent" color="success" />
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3 text-sm">
                        <li>New booking for “Corporate Gala 2024” – confirmed ✅</li>
                        <li>Payment of $4,200 received from “Emma’s Sweet 16” 💰</li>
                        <li>New message from “Planora Events” 📩</li>
                    </motion.ul>
                </CardContent>
            </Card>
        </div>
    )
}
