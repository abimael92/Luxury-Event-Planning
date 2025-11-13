"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ChatInterface } from "@/components/chat/chat-interface"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function MessagesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="h-full">
          <ChatInterface />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
