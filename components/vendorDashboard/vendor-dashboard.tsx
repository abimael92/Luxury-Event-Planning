"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, TrendingUp, MessageCircle, Clock, ArrowUpRight, MoreHorizontal, Star, ChevronRight, Eye, Download } from "lucide-react"
import { StatsCard } from "./stats-card"

export function VendorDashboard() {
    const [vendorName] = useState("Elite Catering Co.")
    const [activeTab, setActiveTab] = useState("overview")

    const stats = {
        activeBookings: 5,
        totalRevenue: 32000,
        upcomingEvents: 3,
        satisfactionRate: 96,
        monthlyGrowth: 12,
        pendingActions: 4
    }

    const recentActivities = [
        {
            id: 1,
            type: "booking",
            title: "Corporate Gala 2024",
            description: "New booking confirmed",
            status: "confirmed",
            amount: 4200,
            time: "2 hours ago",
            icon: Calendar,
            color: "text-green-500"
        },
        {
            id: 2,
            type: "payment",
            title: "Emma's Sweet 16",
            description: "Payment received successfully",
            status: "completed",
            amount: 3200,
            time: "5 hours ago",
            icon: DollarSign,
            color: "text-blue-500"
        },
        {
            id: 3,
            type: "message",
            title: "Planora Events",
            description: "New inquiry about wedding package",
            status: "pending",
            time: "1 day ago",
            icon: MessageCircle,
            color: "text-purple-500"
        },
        {
            id: 4,
            type: "review",
            title: "Tech Conference 2024",
            description: "New 5-star review received",
            status: "completed",
            time: "2 days ago",
            icon: Star,
            color: "text-yellow-500"
        }
    ]

    const upcomingEvents = [
        { id: 1, name: "Summer Wedding", date: "Nov 25, 2024", guests: 120, status: "confirmed" },
        { id: 2, name: "Corporate Retreat", date: "Nov 28, 2024", guests: 80, status: "confirmed" },
        { id: 3, name: "Charity Gala", date: "Dec 2, 2024", guests: 200, status: "pending" }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <motion.div
            className="space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Enhanced Header */}
            <motion.div variants={itemVariants} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-heading font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            Welcome back, {vendorName}
                        </h1>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +{stats.monthlyGrowth}% this month
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Here's your business performance and upcoming events at a glance
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 hover:bg-white/80">
                        <Download className="h-4 w-4" />
                        Export Report
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg gap-2">
                        <Calendar className="h-4 w-4" />
                        New Event
                    </Button>
                </div>
            </motion.div>

            {/* Enhanced Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Active Bookings"
                    value={stats.activeBookings.toString()}
                    icon={Calendar}
                    trend="+1 this week"
                    color="primary"
                    gradient="from-blue-500 to-cyan-500"
                    description="Currently serving"
                />
                <StatsCard
                    title="Total Revenue"
                    value={`$${(stats.totalRevenue / 1000).toFixed(0)}K`}
                    icon={DollarSign}
                    trend="+8% this month"
                    color="secondary"
                    gradient="from-green-500 to-emerald-500"
                    description="Year-to-date"
                />
                <StatsCard
                    title="Upcoming Events"
                    value={stats.upcomingEvents.toString()}
                    icon={Users}
                    trend="3 pending"
                    color="accent"
                    gradient="from-purple-500 to-pink-500"
                    description="Next 30 days"
                />
                <StatsCard
                    title="Satisfaction Rate"
                    value={`${stats.satisfactionRate}%`}
                    icon={TrendingUp}
                    trend="+2% from last month"
                    color="success"
                    gradient="from-orange-500 to-red-500"
                    description="Customer rating"
                />
            </motion.div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity - Wider */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl hover-lift h-full">
                        <CardHeader className="flex flex-row items-center justify-between pb-4">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    Recent Activity
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                        {recentActivities.length} new
                                    </Badge>
                                </CardTitle>
                                <CardDescription>
                                    Latest updates and notifications
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                View All
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <AnimatePresence>
                                {recentActivities.map((activity, index) => (
                                    <motion.div
                                        key={activity.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-start gap-4 p-4 rounded-xl bg-white/50 border border-white/40 hover:bg-white/80 transition-all duration-200 group"
                                    >
                                        <div className={`p-2 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-shadow ${activity.color}`}>
                                            <activity.icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <h4 className="font-semibold text-foreground truncate">
                                                        {activity.title}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {activity.description}
                                                    </p>
                                                </div>
                                                {activity.amount && (
                                                    <div className="text-right">
                                                        <p className="font-semibold text-green-600">
                                                            +${activity.amount.toLocaleString()}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <Badge
                                                    variant="secondary"
                                                    className={`
                                                        text-xs capitalize
                                                        ${activity.status === 'confirmed' ? 'bg-green-100 text-green-700' : ''}
                                                        ${activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                                                        ${activity.status === 'completed' ? 'bg-blue-100 text-blue-700' : ''}
                                                    `}
                                                >
                                                    {activity.status}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {activity.time}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Upcoming Events & Quick Actions */}
                <motion.div variants={itemVariants} className="space-y-6">
                    {/* Upcoming Events */}
                    <Card className="bg-white/60 backdrop-blur-sm border-white/40 shadow-xl hover-lift">
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2">
                                Upcoming Events
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                    {upcomingEvents.length}
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                Your schedule for the next week
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {upcomingEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/50 border border-white/40 hover:bg-white/80 transition-all duration-200 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                                            {event.date.split(' ')[1]}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">{event.name}</h4>
                                            <p className="text-xs text-muted-foreground">{event.guests} guests</p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={`
                                            text-xs
                                            ${event.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                                        `}
                                    >
                                        {event.status}
                                    </Badge>
                                </motion.div>
                            ))}
                            <Button variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                                View Full Calendar
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-xl">
                        <CardHeader className="pb-4">
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Frequently used tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-3 hover:bg-white/80 h-12">
                                <Calendar className="h-4 w-4" />
                                Create New Event
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 hover:bg-white/80 h-12">
                                <Users className="h-4 w-4" />
                                Manage Bookings
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 hover:bg-white/80 h-12">
                                <Eye className="h-4 w-4" />
                                View Analytics
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}