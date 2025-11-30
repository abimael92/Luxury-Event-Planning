export default function BookingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>
      <div className="text-center py-12">
        <p className="text-gray-500">No bookings found</p>
      </div>
    </div>
  );
}
// import { BookingManagement } from "@/features/bookings/booking-management"
// import { DashboardLayout } from "@/components/layout/dashboard-layout"
// import { ProtectedRoute } from "@/components/auth/protected-route"

// export default function BookingsPage() {
//   return (
//     <ProtectedRoute>
//       <DashboardLayout>
//         <BookingManagement />
//       </DashboardLayout>
//     </ProtectedRoute>
//   )
// }
