"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PaymentDashboard } from "@/features/payments/payment-dashboard"
import { ProtectedRoute } from "@/features/auth/protected-route"

export default function PaymentsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PaymentDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
