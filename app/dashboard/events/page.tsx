import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"

export default function EventsPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout>
                <div className="p-6">
                    <h1 className="text-3xl font-heading font-bold">My Events</h1>
                    <p className="text-muted-foreground mt-2">Manage your events</p>
                </div>
            </DashboardLayout>
        </ProtectedRoute>
    )
}