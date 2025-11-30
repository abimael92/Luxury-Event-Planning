"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Users,
  MessageSquare,
  CreditCard,
  Settings,
  Bell,
  Menu,
  X,
  Sparkles,
  Home,
  Search,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  TrendingUp
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/shared/lib/utils"
import { useAuth } from "@/core/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "@/hooks/use-translation"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const { t } = useTranslation()

  const navigation = [
    { name: t('dashboard.navigation.dashboard'), href: "/dashboard", icon: Home, badge: 3 },
    { name: t('dashboard.navigation.myEvents'), href: "/dashboard/events", icon: Calendar, badge: 12 },
    { name: t('dashboard.navigation.vendors'), href: "/dashboard/vendors", icon: Users, badge: 8 },
    { name: t('dashboard.navigation.bookings'), href: "/dashboard/bookings", icon: BookOpen },
    { name: t('dashboard.navigation.messages'), href: "/dashboard/messages", icon: MessageSquare },
    { name: t('dashboard.navigation.payments'), href: "/dashboard/payments", icon: CreditCard },
  ]

  const stats = [
    { label: t('dashboard.stats.activeEvents'), value: "12", change: "+2" },
    { label: t('dashboard.stats.pendingBookings'), value: "8", change: "+1" },
    { label: t('dashboard.stats.thisMonth'), value: "$24.5k", change: "+12%" },
  ]

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50/30">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 bg-white/95 backdrop-blur-xl border-r border-white/20 shadow-2xl lg:shadow-xl transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-16 lg:w-20" : "w-64 lg:w-72 xl:w-80",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full p-4 lg:p-6">
          {/* Header */}
          <div className={cn(
            "flex items-center gap-3 mb-6 lg:mb-8 transition-all duration-300",
            sidebarCollapsed && "justify-center"
          )}>
            <div className="flex items-center gap-3 flex-1">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <h1 className="font-cinzel text-lg lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent truncate">
                    Planora
                  </h1>
                  <p className="text-xs text-muted-foreground truncate">{t('dashboard.platform')}</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex hover:bg-white/50 flex-shrink-0 h-8 w-8 lg:h-9 lg:w-9"
            >
              {sidebarCollapsed ? <ChevronRight className="h-3 w-3 lg:h-4 lg:w-4" /> : <ChevronLeft className="h-3 w-3 lg:h-4 lg:w-4" />}
            </Button>
          </div>

          {/* Quick Stats  */}
          {!sidebarCollapsed && (
            <div className="mb-6 lg:mb-8 space-y-3">
              <h3 className="text-sm lg:text-base font-semibold text-muted-foreground px-1 text-center">
                {t('dashboard.quickStats')}
              </h3>
              <div className="grid grid-cols-3 gap-3 ">
                {stats.map((stat, index) => {
                  const icons = [Calendar, BookOpen, CreditCard];
                  const Icon = icons[index];
                  const colors = [
                    "from-purple-500 to-blue-500",
                    "from-blue-500 to-cyan-500",
                    "from-green-500 to-emerald-500"
                  ];
                  const bgColors = [
                    "bg-purple-50/80 border-purple-100",
                    "bg-blue-50/80 border-blue-100",
                    "bg-green-50/80 border-green-100"
                  ];

                  return (
                    <div
                      key={index}
                      className={`${bgColors[index]} backdrop-blur-sm rounded-xl p-0 py-1 border shadow-sm hover:shadow-md transition-all duration-200 group min-h-[120px] flex flex-col items-center justify-between text-center`}
                    >
                      {/* Icon - centered */}
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${colors[index]} shadow-sm mx-auto`}>
                        <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                      </div>

                      {/* Main Value - centered and responsive */}
                      <div className="text-md font-bold text-gray-900 truncate max-w-full px-1">
                        {stat.value}
                      </div>

                      {/* Label - centered and responsive */}
                      <div className="text-xs text-gray-600 font-medium max-w-full px-1 line-clamp-2 leading-tight min-h-[2rem]">
                        {stat.label}
                      </div>

                      {/* Change Badge - centered */}
                      <Badge
                        variant="secondary"
                        className="text-xs lg:text-sm h-5 lg:h-6 px-0 bg-white/80 text-green-700 border border-green-200/60 group-hover:shadow-sm transition-shadow mx-auto"
                      >
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4" />
                          {stat.change}
                        </span>
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-1 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-2 lg:px-3 py-2 lg:py-3 transition-all duration-200 relative overflow-hidden w-full text-left",
                    "hover:bg-white/60 hover:shadow-md hover:border-white/50",
                    isActive
                      ? "bg-white shadow-lg border border-white/60 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-lg transition-all duration-200 flex-shrink-0",
                    isActive
                      ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-md"
                      : "bg-white/50 group-hover:bg-white/80 text-muted-foreground group-hover:text-primary"
                  )}>
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
                  </div>

                  {!sidebarCollapsed && (
                    <>
                      <span className="font-medium text-sm flex-1 truncate text-left">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary text-sm h-4 lg:h-5 px-1 lg:px-1.5 flex-shrink-0">
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 w-1 h-4 lg:h-6 bg-gradient-to-b from-purple-500 to-blue-600 rounded-full" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* User Section */}
          <div className={cn(
            "flex items-center gap-2 lg:gap-3 pt-4 border-t border-white/40 transition-all duration-300",
            sidebarCollapsed && "justify-center"
          )}>
            <Avatar className="h-7 w-7 lg:h-8 lg:w-8 flex-shrink-0">
              <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={t('dashboard.user.avatarAlt')} />
              <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-500 text-white text-xs">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs lg:text-sm font-semibold truncate">{user?.firstName} {user?.lastName}</p>
                <p className="text-[10px] lg:text-xs text-muted-foreground truncate">{user?.membershipTier}</p>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-white/50 flex-shrink-0 h-7 w-7 lg:h-8 lg:w-8"
              onClick={handleLogout}
            >
              <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="bg-white/60 backdrop-blur-xl border-b border-white/40 px-4 lg:px-6 py-3 lg:py-4 sticky top-0 z-30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4 flex-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden hover:bg-white/50 h-9 w-9"
              >
                <Menu className="h-4 w-4 lg:h-5 lg:w-5" />
              </Button>

              {/* Search Bar */}
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 lg:h-4 lg:w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('dashboard.search.placeholder')}
                  className="w-full pl-9 lg:pl-10 pr-4 py-2 lg:py-2 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200 text-sm lg:text-base"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-3">
              <Button variant="ghost" size="icon" className="relative hover:bg-white/50 h-9 w-9 lg:h-10 lg:w-10">
                <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 lg:w-3 lg:h-3 bg-red-500 rounded-full border border-white"></span>
              </Button>

              <Avatar className="h-8 w-8 lg:hidden">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={t('dashboard.user.avatarAlt')} />
                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-500 text-white text-sm">
                  {user?.firstName?.[0]}
                  {user?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}