import { BookingManagement } from "@/features/bookings/booking-management"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/features/auth/protected-route"

export default function BookingsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <BookingManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
