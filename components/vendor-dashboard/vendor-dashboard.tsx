"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, DollarSign, Users, TrendingUp, CheckCircle, Mail, FileText } from "lucide-react"
// import { StatsCard } from "./stats-card"

export function VendorDashboard() {
    const [vendorName] = useState("Elite Catering Co.")

    const stats = {
        activeBookings: 5,
        totalRevenue: 32000,
        upcomingEvents: 3,
        satisfactionRate: 96,
    }

    return (
        <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
            {/* Header */}
            <div className="px-2 sm:px-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground">
                    Welcome back, {vendorName}
                </h1>
                <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                    Here’s an overview of your bookings and performance
                </p>
            </div>

            {/* Stats Cards */}
            {/* <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatsCard 
                    title="Active Bookings" 
                    value={stats.activeBookings.toString()} 
                    icon={Calendar} 
                    trend="+1 this week" 
                    color="primary" 
                />
                <StatsCard 
                    title="Total Revenue" 
                    value={`$${stats.totalRevenue.toLocaleString()}`} 
                    icon={DollarSign} 
                    trend="+8% this month" 
                    color="secondary" 
                />
                <StatsCard 
                    title="Upcoming Events" 
                    value={stats.upcomingEvents.toString()} 
                    icon={Users} 
                    trend="3 pending" 
                    color="accent" 
                />
                <StatsCard 
                    title="Satisfaction Rate" 
                    value={`${stats.satisfactionRate}%`} 
                    icon={TrendingUp} 
                    trend="Consistent" 
                    color="success" 
                />
            </div> */}

            {/* Alternative Stats Grid since StatsCard is commented out */}
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[
                    { title: "Active Bookings", value: stats.activeBookings, icon: Calendar, color: "text-primary" },
                    { title: "Total Revenue", value: `$${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-secondary" },
                    { title: "Upcoming Events", value: stats.upcomingEvents, icon: Users, color: "text-accent" },
                    { title: "Satisfaction Rate", value: `${stats.satisfactionRate}%`, icon: TrendingUp, color: "text-success" },
                ].map((stat, index) => (
                    <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow duration-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs sm:text-sm text-muted-foreground font-medium">{stat.title}</p>
                                <p className={`text-2xl sm:text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                            </div>
                            <div className={`p-2 sm:p-3 rounded-full bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Recent Activity - Takes 2 columns on large screens */}
                <Card className="lg:col-span-2">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg sm:text-xl">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-4 sm:space-y-6"
                        >
                            {[
                                {
                                    icon: CheckCircle,
                                    title: "Booking Confirmed",
                                    description: "Corporate Gala 2024",
                                    time: "2 hours ago",
                                    iconColor: "text-success"
                                },
                                {
                                    icon: DollarSign,
                                    title: "Payment Received",
                                    description: "$4,200 from Emma's Sweet 16",
                                    time: "1 day ago",
                                    iconColor: "text-secondary"
                                },
                                {
                                    icon: Mail,
                                    title: "New Message",
                                    description: "From Planora Events",
                                    time: "2 days ago",
                                    iconColor: "text-primary"
                                },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className={`p-2 rounded-full ${activity.iconColor} bg-opacity-10`}>
                                        <activity.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <h3 className="font-medium text-sm sm:text-base truncate">{activity.title}</h3>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {activity.time}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mt-1 truncate">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </CardContent>
                </Card>

                {/* Quick Actions Sidebar - Takes 1 column on large screens */}
                <div className="space-y-6 sm:space-y-8">
                    {/* Quick Actions Card */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                                {[
                                    { label: "Add New Service", variant: "default" as const },
                                    { label: "View Calendar", variant: "outline" as const },
                                    { label: "Generate Report", variant: "outline" as const },
                                    { label: "Message Center", variant: "outline" as const },
                                ].map((action, index) => (
                                    <Button
                                        key={index}
                                        variant={action.variant}
                                        className="w-full justify-start gap-2 h-auto py-3"
                                    >
                                        <FileText className="w-4 h-4" />
                                        {action.label}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Card */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg sm:text-xl">Performance Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Monthly Target</span>
                                    <span className="font-medium">85%</span>
                                </div>
                                <div className="h-2 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-4/5"></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Response Time</span>
                                    <span className="font-medium text-success">2.4h avg</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Responsive spacing for bottom */}
            <div className="h-4 sm:h-6 lg:h-8"></div>
        </div>
    )
}