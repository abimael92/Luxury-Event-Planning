import { ProtectedRoute } from "@/features/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AgendaBuilder } from "@/features/events/agenda-builder"

export default function AgendaPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AgendaBuilder />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
