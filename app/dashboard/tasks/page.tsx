import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ChecklistTasks } from "@/components/tasks/checklist-tasks"

export default function TasksPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <ChecklistTasks />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
