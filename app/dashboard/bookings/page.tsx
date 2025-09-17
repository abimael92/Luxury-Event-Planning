import { BookingManagement } from "@/components/bookings/booking-management"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function BookingsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <BookingManagement />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
