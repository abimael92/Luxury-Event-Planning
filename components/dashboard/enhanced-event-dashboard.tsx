"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Plus, Calendar, Clock, Music, UserPlus } from "lucide-react"
import { CreateEventModal } from "./create-event-modal"

// Mock data with elegant event covers
const upcomingEvents = [
  {
    id: "1",
    title: "Sarah & Michael's Wedding",
    date: "2024-06-15",
    time: "4:00 PM",
    location: "The Grand Ballroom",
    budget: 50000,
    spent: 35000,
    status: "planning" as const,
    progress: 70,
    vendors: 8,
    image: "/elegant-wedding-venue.png",
    daysLeft: 12,
    cover: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "2",
    title: "Corporate Gala 2024",
    date: "2024-07-20",
    time: "7:00 PM",
    location: "Downtown Convention Center",
    budget: 75000,
    spent: 25000,
    status: "planning" as const,
    progress: 40,
    vendors: 12,
    image: "/corporate-gala-venue.jpg",
    daysLeft: 45,
    cover: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "3",
    title: "Emma's Sweet 16",
    date: "2024-08-10",
    time: "6:00 PM",
    location: "Garden Pavilion",
    budget: 15000,
    spent: 8000,
    status: "planning" as const,
    progress: 55,
    vendors: 5,
    image: "/sweet-16-party-venue.jpg",
    daysLeft: 66,
    cover: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
]

export function EnhancedEventDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false)

  const nextEvent = upcomingEvents[0]
  const totalBudget = upcomingEvents.reduce((sum, event) => sum + event.budget, 0)
  const totalSpent = upcomingEvents.reduce((sum, event) => sum + event.spent, 0)

  return (
    <div className="space-y-8">
      <div
        className="relative overflow-hidden rounded-2xl p-8"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <div className="relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl font-heading font-bold mb-2">Good morning, John ✨</h1>
            <p className="text-white/80 text-lg mb-6">Your next event is in {nextEvent.daysLeft} days</p>

            {/* Event Countdown */}
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md">
              <Clock className="w-6 h-6" />
              <div>
                <p className="font-semibold">{nextEvent.title}</p>
                <p className="text-white/80 text-sm">
                  {nextEvent.date} • {nextEvent.location}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="w-full h-16 gradient-royal text-white hover:glow-primary transition-all duration-300 rounded-xl"
          >
            <Plus className="w-5 h-5 mr-3" />
            <span className="font-semibold">Create Event</span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="w-full h-16 border-2 hover:bg-primary/5 rounded-xl bg-transparent">
            <UserPlus className="w-5 h-5 mr-3" />
            <span className="font-semibold">Guest List</span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="w-full h-16 border-2 hover:bg-primary/5 rounded-xl bg-transparent">
            <Music className="w-5 h-5 mr-3" />
            <span className="font-semibold">Vendors</span>
          </Button>
        </motion.div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-heading font-semibold">Upcoming Events</h2>
        <div className="grid gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="flex">
                  {/* Elegant event cover */}
                  <div className="w-32 h-32 flex-shrink-0 relative" style={{ background: event.cover }}>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-heading font-semibold mb-1">{event.title}</h3>
                        <p className="text-muted-foreground">
                          {event.date} • {event.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{event.daysLeft}</p>
                        <p className="text-sm text-muted-foreground">days left</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold">{event.progress}%</p>
                        <p className="text-xs text-muted-foreground">Complete</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold">{event.vendors}</p>
                        <p className="text-xs text-muted-foreground">Vendors</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-semibold">${(event.spent / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-muted-foreground">Spent</p>
                      </div>
                    </div>

                    <Progress value={event.progress} className="h-2" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-heading">Budget Overview</CardTitle>
          <CardDescription>Track your spending across all events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Budget stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-2xl font-bold text-blue-600">${(totalBudget / 1000).toFixed(0)}k</p>
                <p className="text-sm text-blue-600/70">Total Budget</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <p className="text-2xl font-bold text-green-600">${(totalSpent / 1000).toFixed(0)}k</p>
                <p className="text-sm text-green-600/70">Spent</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <p className="text-2xl font-bold text-purple-600">${((totalBudget - totalSpent) / 1000).toFixed(0)}k</p>
                <p className="text-sm text-purple-600/70">Remaining</p>
              </div>
            </div>

            {/* Progress visualization */}
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full" style={{ background: event.cover }} />
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{event.title}</span>
                      <span>
                        ${event.spent.toLocaleString()} / ${event.budget.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(event.spent / event.budget) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <CreateEventModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}
