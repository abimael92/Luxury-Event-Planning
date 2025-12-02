"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, DollarSign, Users, TrendingUp, MessageCircle, Clock, ArrowUpRight, MoreHorizontal, Star, ChevronRight, Eye, Download } from "lucide-react"
import { StatsCard } from "../ui/stats-card.jsx"
import { useTranslation } from "@/hooks/use-translation"

export function VendorDashboard() {
    const [vendorName] = useState("Elite Catering Co.")
    const [activeTab, setActiveTab] = useState("overview")
    const { t } = useTranslation()

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
            title: t('vendorDashboard.activities.booking.title'),
            description: t('vendorDashboard.activities.booking.description'),
            status: "confirmed",
            amount: 4200,
            time: t('vendorDashboard.timeAgo.hours', { hours: 2 }),
            icon: Calendar,
            color: "text-green-500"
        },
        {
            id: 2,
            type: "payment",
            title: t('vendorDashboard.activities.payment.title'),
            description: t('vendorDashboard.activities.payment.description'),
            status: "completed",
            amount: 3200,
            time: t('vendorDashboard.timeAgo.hours', { hours: 5 }),
            icon: DollarSign,
            color: "text-blue-500"
        },
        {
            id: 3,
            type: "message",
            title: t('vendorDashboard.activities.message.title'),
            description: t('vendorDashboard.activities.message.description'),
            status: "pending",
            time: t('vendorDashboard.timeAgo.days', { days: 1 }),
            icon: MessageCircle,
            color: "text-purple-500"
        },
        {
            id: 4,
            type: "review",
            title: t('vendorDashboard.activities.review.title'),
            description: t('vendorDashboard.activities.review.description'),
            status: "completed",
            time: t('vendorDashboard.timeAgo.days', { days: 2 }),
            icon: Star,
            color: "text-yellow-500"
        }
    ]

    const upcomingEvents = [
        {
            id: 1,
            name: t('vendorDashboard.upcomingEvents.summerWedding'),
            date: t('vendorDashboard.dateFormat.nov25'),
            guests: 120,
            status: "confirmed"
        },
        {
            id: 2,
            name: t('vendorDashboard.upcomingEvents.corporateRetreat'),
            date: t('vendorDashboard.dateFormat.nov28'),
            guests: 80,
            status: "confirmed"
        },
        {
            id: 3,
            name: t('vendorDashboard.upcomingEvents.charityGala'),
            date: t('vendorDashboard.dateFormat.dec2'),
            guests: 200,
            status: "pending"
        }
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
                            {t('vendorDashboard.welcome', { name: vendorName })}
                        </h1>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {t('vendorDashboard.growthPercentage', { percent: stats.monthlyGrowth })}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        {t('vendorDashboard.subtitle')}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 hover:bg-white/80">
                        <Download className="h-4 w-4" />
                        {t('vendorDashboard.actions.exportReport')}
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg gap-2">
                        <Calendar className="h-4 w-4" />
                        {t('vendorDashboard.actions.newEvent')}
                    </Button>
                </div>
            </motion.div>

            {/* Enhanced Stats Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title={t('vendorDashboard.stats.activeBookings')}
                    value={stats.activeBookings.toString()}
                    icon={Calendar}
                    trend={t('vendorDashboard.stats.trends.week', { count: 1 })}
                    color="primary"
                    gradient="from-blue-500 to-cyan-500"
                    description={t('vendorDashboard.stats.descriptions.currentlyServing')}
                />
                <StatsCard
                    title={t('vendorDashboard.stats.totalRevenue')}
                    value={`$${(stats.totalRevenue / 1000).toFixed(0)}K`}
                    icon={DollarSign}
                    trend={t('vendorDashboard.stats.trends.month', { percent: 8 })}
                    color="secondary"
                    gradient="from-green-500 to-emerald-500"
                    description={t('vendorDashboard.stats.descriptions.yearToDate')}
                />
                <StatsCard
                    title={t('vendorDashboard.stats.upcomingEvents')}
                    value={stats.upcomingEvents.toString()}
                    icon={Users}
                    trend={t('vendorDashboard.stats.trends.pending', { count: 3 })}
                    color="accent"
                    gradient="from-purple-500 to-pink-500"
                    description={t('vendorDashboard.stats.descriptions.next30Days')}
                />
                <StatsCard
                    title={t('vendorDashboard.stats.satisfactionRate')}
                    value={`${stats.satisfactionRate}%`}
                    icon={TrendingUp}
                    trend={t('vendorDashboard.stats.trends.improvement', { percent: 2 })}
                    color="success"
                    gradient="from-orange-500 to-red-500"
                    description={t('vendorDashboard.stats.descriptions.customerRating')}
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
                                    {t('vendorDashboard.sections.recentActivity')}
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                        {t('vendorDashboard.badge.new', { count: recentActivities.length })}
                                    </Badge>
                                </CardTitle>
                                <CardDescription>
                                    {t('vendorDashboard.sections.recentActivityDescription')}
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                                {t('vendorDashboard.actions.viewAll')}
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
                                                            ${activity.amount.toLocaleString()}
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
                                                    {t(`vendorDashboard.status.${activity.status}`)}
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
                                {t('vendorDashboard.sections.upcomingEvents')}
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                    {upcomingEvents.length}
                                </Badge>
                            </CardTitle>
                            <CardDescription>
                                {t('vendorDashboard.sections.upcomingEventsDescription')}
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
                                            <p className="text-xs text-muted-foreground">
                                                {event.guests} {t('vendorDashboard.guestsLabel')}
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="secondary"
                                        className={`
                                            text-xs
                                            ${event.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                                        `}
                                    >
                                        {t(`vendorDashboard.status.${event.status}`)}
                                    </Badge>
                                </motion.div>
                            ))}
                            <Button variant="ghost" className="w-full gap-2 text-muted-foreground hover:text-foreground">
                                {t('vendorDashboard.actions.viewFullCalendar')}
                                <ArrowUpRight className="h-4 w-4" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 shadow-xl">
                        <CardHeader className="pb-4">
                            <CardTitle>{t('vendorDashboard.sections.quickActions')}</CardTitle>
                            <CardDescription>
                                {t('vendorDashboard.sections.quickActionsDescription')}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button variant="outline" className="w-full justify-start gap-3 hover:bg-white/80 h-12">
                                <Calendar className="h-4 w-4" />
                                {t('vendorDashboard.actions.createEvent')}
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 hover:bg-white/80 h-12">
                                <Users className="h-4 w-4" />
                                {t('vendorDashboard.actions.manageBookings')}
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3 hover:bg-white/80 h-12">
                                <Eye className="h-4 w-4" />
                                {t('vendorDashboard.actions.viewAnalytics')}
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}