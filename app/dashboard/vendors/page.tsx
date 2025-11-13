import { VendorMarketplace } from "@/features/vendors/vendor-marketplace"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function VendorsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <VendorMarketplace />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
