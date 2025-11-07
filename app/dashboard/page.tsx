import { EventDashboard } from "@/features/dashboard/event-dashboard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/features/auth/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <EventDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
