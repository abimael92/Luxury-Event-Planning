import { ProtectedRoute } from "@/features/auth/protected-route"
import { EventCreationFlow } from "@/features/events/event-creation-flow"

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <EventCreationFlow />
    </ProtectedRoute>
  )
}
