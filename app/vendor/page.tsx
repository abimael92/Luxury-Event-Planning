"use client"

import { VendorDashboard } from "@/components/vendorDashboard/vendor-dashboard"
import { VendorLayout } from "@/components/layout/vendor-layout"
import { ProtectedRoute } from "@/features/auth/protected-route"

export default function VendorOverviewPage() {
    return (
        <ProtectedRoute>
            <VendorLayout>
                <VendorDashboard />
            </VendorLayout>
        </ProtectedRoute>
    )
}
