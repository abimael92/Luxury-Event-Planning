import { EnhancedEventDashboard } from "@/components/dashboard/enhanced-event-dashboard"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route" // components/auth/protected-route.tsx

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <EnhancedEventDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
