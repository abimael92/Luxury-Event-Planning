import { ProtectedRoute } from "@/components/auth/protected-route"
import { EventCreationFlow } from "@/components/events/event-creation-flow"

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <EventCreationFlow />
    </ProtectedRoute>
  )
}
