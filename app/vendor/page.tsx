"use client"

import { VendorDashboard } from "./dashboard/vendor-dashboard"
import { VendorLayout } from "@/components/layout/vendor-layout"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function VendorsPage() {
    return (
        <ProtectedRoute>
            <VendorLayout>
                <VendorDashboard />
            </VendorLayout>
        </ProtectedRoute>
    )
}
