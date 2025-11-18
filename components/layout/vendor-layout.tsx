"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/shared/lib/utils"
import {
    LogOut,
    LayoutDashboard,
    Package,
    Calendar,
    Users,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    Bell,
    Search,
    Plus,
    TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface VendorLayoutProps {
    children: ReactNode
}

export function VendorLayout({ children }: VendorLayoutProps) {
    const pathname = usePathname()
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const navItems = [
        { href: "/vendor", label: "Overview", icon: LayoutDashboard, badge: 3 },
        { href: "/vendor/events", label: "Events", icon: Calendar, badge: 12 },
        { href: "/vendor/orders", label: "Orders", icon: Package, badge: 8 },
        { href: "/vendor/reservations", label: "Reservations", icon: Users },
        { href: "/vendor/analytics", label: "Analytics", icon: BarChart3 },
        { href: "/vendor/settings", label: "Settings", icon: Settings },
    ]

    const stats = [
        { label: "Active Events", value: "12", change: "+2" },
        { label: "Pending Orders", value: "8", change: "+1" },
        { label: "This Month", value: "$24.5k", change: "+12%" },
    ]

    return (
        <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50/30">
            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-50 bg-white/80 backdrop-blur-xl border-r border-white/20 shadow-xl lg:shadow-2xl transition-all duration-300",
                sidebarCollapsed ? "w-20" : "w-80",
                mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="flex flex-col h-full p-6">
                    {/* Header */}
                    <div className={cn(
                        "flex items-center gap-3 mb-8 transition-all duration-300",
                        sidebarCollapsed && "justify-center"
                    )}>
                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg flex items-center justify-center">
                                <TrendingUp className="h-5 w-5 text-white" />
                            </div>
                            {!sidebarCollapsed && (
                                <div>
                                    <h1 className="font-cinzel text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                        EventFlow
                                    </h1>
                                    <p className="text-xs text-muted-foreground">Vendor Suite</p>
                                </div>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                            className="hidden lg:flex hover:bg-white/50"
                        >
                            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                        </Button>
                    </div>

                    {/* Quick Stats - Only show when expanded */}
                    {!sidebarCollapsed && (
                        <div className="mb-8 space-y-3">
                            <h3 className="text-sm font-semibold text-muted-foreground">Quick Stats</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {stats.map((stat, index) => (
                                    <div key={index} className="bg-white/60 rounded-lg p-2 border border-white/40 text-center">
                                        <div className="text-sm font-bold text-foreground">{stat.value}</div>
                                        <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                                        <Badge variant="secondary" className="text-[8px] h-4 px-1 bg-green-100 text-green-700">
                                            {stat.change}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="space-y-1 flex-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={cn(
                                        "group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 relative overflow-hidden",
                                        "hover:bg-white/60 hover:shadow-md hover:border-white/50",
                                        isActive
                                            ? "bg-white shadow-lg border border-white/60 text-primary"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <div className={cn(
                                        "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200",
                                        isActive
                                            ? "bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-md"
                                            : "bg-white/50 group-hover:bg-white/80 text-muted-foreground group-hover:text-primary"
                                    )}>
                                        <Icon className="h-4 w-4" />
                                    </div>

                                    {!sidebarCollapsed && (
                                        <>
                                            <span className="font-medium text-sm flex-1">{item.label}</span>
                                            {item.badge && (
                                                <Badge variant="secondary" className="bg-primary/10 text-primary text-xs h-5 px-1.5">
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </>
                                    )}

                                    {/* Active indicator */}
                                    {isActive && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-600 rounded-full" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Create Event Button */}
                    {!sidebarCollapsed && (
                        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200 group mb-4">
                            <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                            Create Event
                        </Button>
                    )}

                    {/* User Section */}
                    <div className={cn(
                        "flex items-center gap-3 pt-4 border-t border-white/40 transition-all duration-300",
                        sidebarCollapsed && "justify-center"
                    )}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                            A
                        </div>
                        {!sidebarCollapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate">Alex Vendor</p>
                                <p className="text-xs text-muted-foreground truncate">Premium Plan</p>
                            </div>
                        )}
                        <Button variant="ghost" size="icon" className="hover:bg-white/50">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="bg-white/60 backdrop-blur-xl border-b border-white/40 px-6 py-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden hover:bg-white/50"
                            >
                                <LayoutDashboard className="h-5 w-5" />
                            </Button>

                            {/* Search Bar */}
                            <div className="relative max-w-md flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search events, orders, customers..."
                                    className="w-full pl-10 pr-4 py-2 bg-white/50 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all duration-200"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="relative hover:bg-white/50">
                                <Bell className="h-5 w-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                            </Button>

                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-md lg:hidden">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}