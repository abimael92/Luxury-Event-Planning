"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Plus, Calendar, Clock, Music, UserPlus } from "lucide-react"
import { CreateEventModal } from "./create-event-modal"
import { useTranslation } from "@/hooks/use-translation"

// Mock data with elegant event covers
const upcomingEvents = [
  {
    id: "1",
    title: "Boda de Kathya y Erick ",
    date: "2026-06-15",
    time: "4:00 PM",
    location: "El Gran Salón de Baile",
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
    title: "Navidad Improving 2025",
    date: "2025-12-20",
    time: "7:00 PM",
    location: "Centro de Convenciones del Centro",
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
    title: "Quinceañera de Eunice",
    date: "2027-08-10",
    time: "6:00 PM",
    location: "Pabellón del Jardín",
    budget: 15000,
    spent: 8000,
    status: "planning" as const,
    progress: 55,
    vendors: 5,
    image: "/sweet-16-party-venue.jpg",
    daysLeft: 66,
    cover: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "4",
    title: "Baby Shower de Suleidy",
    date: "2026-01-20",
    time: "2:00 PM",
    location: "Jardines de la Villa",
    budget: 8000,
    spent: 3000,
    status: "planning" as const,
    progress: 38,
    vendors: 4,
    image: "/baby-shower-venue.jpg",
    daysLeft: 92,
    cover: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  },
  {
    id: "5",
    title: "Cumpleaños de Isela",
    date: "2026-02-24",
    time: "5:00 PM",
    location: "Terraza Panorámica",
    budget: 12000,
    spent: 6000,
    status: "planning" as const,
    progress: 50,
    vendors: 6,
    image: "/birthday-party-venue.jpg",
    daysLeft: 129,
    cover: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  },
  {
    id: "6",
    title: "Evento de Año Nuevo 2026",
    date: "2025-12-31",
    time: "9:00 PM",
    location: "Plaza Principal",
    budget: 100000,
    spent: 25000,
    status: "planning" as const,
    progress: 25,
    vendors: 15,
    image: "/new-years-venue.jpg",
    daysLeft: 476,
    cover: "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)",
  },
  {
    id: "7",
    title: "Navidad Familia García",
    date: "2025-12-24",
    time: "3:00 PM",
    location: "Salón Familiar Los Pinos",
    budget: 7000,
    spent: 2800,
    status: "planning" as const,
    progress: 40,
    vendors: 3,
    image: "/family-party-venue.jpg",
    daysLeft: 168,
    cover: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
  },
  {
    id: "8",
    title: "Posada Chihuahuense",
    date: "2025-12-18",
    time: "6:00 PM",
    location: "Patio Tradicional Mexicano",
    budget: 15000,
    spent: 7500,
    status: "planning" as const,
    progress: 50,
    vendors: 7,
    image: "/posada-venue.jpg",
    daysLeft: 194,
    cover: "linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%)",
  }
]

export function EnhancedEventDashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { t } = useTranslation();

  // Helper function to calculate days between dates
  // Helper function to calculate days between dates
  const calculateDaysLeft = (eventDate: string): number => {
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Set to start of day

    const event = new Date(eventDate)
    event.setHours(0, 0, 0, 0) // Set to start of day

    const diffTime = event.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays);
  }

  // Sort events by date and find the next event
  const sortedEvents = useMemo(() => {
    return [...upcomingEvents]
      .map(event => ({
        ...event,
        daysLeft: calculateDaysLeft(event.date) // Calculate actual days left
      }))
      .sort((a, b) => a.daysLeft - b.daysLeft) // Sort by actual days left
  }, []);

  const nextEvent = sortedEvents[0] // Change this line
  const totalBudget = sortedEvents.reduce((sum, event) => sum + event.budget, 0) // Change this line
  const totalSpent = sortedEvents.reduce((sum, event) => sum + event.spent, 0) // Change this line

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Hero Section */}
      <div
        className="relative overflow-hidden rounded-xl lg:rounded-2xl p-6 lg:p-8"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <div className="relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-2xl lg:text-4xl font-heading font-bold mb-2">{t('dashboard.events.greeting')} ✨</h1>
            <p className="text-white/80 text-base lg:text-lg mb-4 lg:mb-6">
              {t('dashboard.events.nextEventIn').replace('{days}', nextEvent.daysLeft.toString())}
            </p>

            {/* Event Countdown */}
            <div className="flex items-center gap-3 lg:gap-4 bg-white/10 backdrop-blur-sm rounded-lg lg:rounded-xl p-3 lg:p-4 max-w-md">
              <Clock className="w-5 h-5 lg:w-6 lg:h-6 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm lg:text-base truncate">{nextEvent.title}</p>
                <p className="text-white/80 text-xs lg:text-sm truncate">
                  {nextEvent.date} • {nextEvent.location}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 lg:w-2 lg:h-2 bg-white/20 rounded-full"
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

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="w-full h-14 lg:h-16 gradient-royal text-white hover:glow-primary transition-all duration-300 rounded-xl text-sm lg:text-base"
          >
            <Plus className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
            <span className="font-semibold">{t('dashboard.events.createEvent')}</span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="w-full h-14 lg:h-16 border-2 hover:bg-primary/5 rounded-xl bg-transparent text-sm lg:text-base">
            <UserPlus className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
            <span className="font-semibold">{t('dashboard.events.guestList')}</span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="outline" className="w-full h-14 lg:h-16 border-2 hover:bg-primary/5 rounded-xl bg-transparent text-sm lg:text-base">
            <Music className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3" />
            <span className="font-semibold">{t('dashboard.events.vendors')}</span>
          </Button>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4 lg:space-y-6">
        <h2 className="text-xl lg:text-2xl font-heading font-semibold">{t('dashboard.events.upcomingEvents')}</h2>
        <div className="grid gap-4 lg:gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <div className="flex flex-col px-8 sm:flex-row">
                  {/* Elegant event cover */}
                  <div className="w-full sm:w-24 lg:w-32 h-24 lg:h-32 flex-shrink-0 relative  rounded-lg" style={{ background: event.cover }}>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
                      <Calendar className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                  </div>

                  {/* Event details */}
                  <div className="flex-1 p-4 lg:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 lg:gap-4 mb-3 lg:mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-heading font-semibold mb-1 truncate">{event.title}</h3>
                        <p className="text-muted-foreground text-sm truncate capitalize">
                          {new Date(event.date).toLocaleDateString('es-MX', {
                            weekday: 'short',
                            month: 'long',
                            day: 'numeric'
                          })} • {event.location}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xl lg:text-2xl font-bold text-primary">{event.daysLeft}</p>
                        <p className="text-xs lg:text-sm text-muted-foreground">{t('dashboard.events.daysLeft')}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 lg:gap-4 mb-3 lg:mb-4">
                      <div className="text-center">
                        <p className="text-base lg:text-lg font-semibold">{event.progress}%</p>
                        <p className="text-xs text-muted-foreground">{t('dashboard.events.complete')}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-base lg:text-lg font-semibold">{event.vendors}</p>
                        <p className="text-xs text-muted-foreground">{t('dashboard.events.vendors')}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-base lg:text-lg font-semibold">${(event.spent / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-muted-foreground">{t('dashboard.events.spent')}</p>
                      </div>
                    </div>

                    <Progress value={event.progress} className="h-1.5 lg:h-2" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Budget Overview */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4 lg:pb-6">
          <CardTitle className="text-lg lg:text-xl font-heading">{t('dashboard.events.budgetOverview')}</CardTitle>
          <CardDescription className="text-sm lg:text-base">{t('dashboard.events.budgetDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 lg:space-y-6">
            {/* Budget stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-6">
              <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                <p className="text-xl lg:text-2xl font-bold text-blue-600">${(totalBudget / 1000).toFixed(0)}k</p>
                <p className="text-xs lg:text-sm text-blue-600/70">{t('dashboard.events.totalBudget')}</p>
              </div>
              <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                <p className="text-xl lg:text-2xl font-bold text-green-600">${(totalSpent / 1000).toFixed(0)}k</p>
                <p className="text-xs lg:text-sm text-green-600/70">{t('dashboard.events.spent')}</p>
              </div>
              <div className="text-center p-3 lg:p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <p className="text-xl lg:text-2xl font-bold text-purple-600">${((totalBudget - totalSpent) / 1000).toFixed(0)}k</p>
                <p className="text-xs lg:text-sm text-purple-600/70">{t('dashboard.events.remaining')}</p>
              </div>
            </div>

            {/* Progress visualization */}
            <div className="space-y-2 lg:space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center gap-3 lg:gap-4">
                  <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full flex-shrink-0" style={{ background: event.cover }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-xs lg:text-sm mb-1">
                      <span className="truncate">{event.title}</span>
                      <span className="flex-shrink-0 ml-2">
                        ${event.spent.toLocaleString()} / ${event.budget.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(event.spent / event.budget) * 100} className="h-1.5 lg:h-2" />
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