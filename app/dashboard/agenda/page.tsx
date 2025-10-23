import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AgendaBuilder } from "@/components/events/agenda-builder"

export default function AgendaPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <AgendaBuilder />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
