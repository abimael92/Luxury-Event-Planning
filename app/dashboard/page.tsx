import { EventDashboard } from "@/components/dashboard/event-dashboard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <EventDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
