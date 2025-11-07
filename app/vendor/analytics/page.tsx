// app/vendor/analytics/page.tsx
import { VendorAnalytics } from "@/components/vendor-dashboard/analytics-dashboard"
import { VendorLayout } from "@/components/layout/vendor-layout"

export default function VendorAnalyticsPage() {
    return (
        <VendorLayout>
            <VendorAnalytics />
        </VendorLayout>
    )
}