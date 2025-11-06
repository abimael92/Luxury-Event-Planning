"use client"

import { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LogOut, LayoutDashboard, Package } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VendorLayoutProps {
    children: ReactNode
}

export function VendorLayout({ children }: VendorLayoutProps) {
    const pathname = usePathname()

    const navItems = [
        { href: "/vendor", label: "Overview", icon: LayoutDashboard },
        { href: "/vendor/orders", label: "Orders", icon: Package },
    ]

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-background border-r p-4 flex flex-col">
                <div className="text-2xl font-bold mb-8">Vendor Panel</div>
                <nav className="space-y-2 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors",
                                pathname === item.href && "bg-accent text-accent-foreground"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <Button variant="ghost" className="flex items-center gap-2 mt-auto">
                    <LogOut className="h-4 w-4" />
                    Logout
                </Button>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
    )
}
