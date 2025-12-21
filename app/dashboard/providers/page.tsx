import VendorsPage from "@/components/dashboard/vendors/page"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route" 
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
              <VendorsPage />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
