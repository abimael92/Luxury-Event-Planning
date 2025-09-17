"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PaymentDashboard } from "@/components/payments/payment-dashboard"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function PaymentsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <PaymentDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  )
}
