"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Clock, DollarSign, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { BookingCard } from "./booking-card"
import { BookingDetailsModal } from "./booking-details-modal"
import { CreateBookingModal } from "./create-booking-modal"

// Mock booking data
const bookings = [
  {
    id: "1",
    vendorName: "Elite Catering Co.",
    vendorCategory: "Catering",
    eventName: "Sarah & Michael's Wedding",
    eventDate: "2024-06-15",
    bookingDate: "2024-02-10",
    status: "confirmed" as const,
    amount: 8500,
    deposit: 2550,
    remaining: 5950,
    services: ["Premium Menu", "Wine Pairing", "Service Staff"],
    notes: "Dietary restrictions: 2 vegetarian, 1 gluten-free",
    vendorImage: "/luxury-catering-service.jpg",
    contractSigned: true,
    paymentStatus: "partial",
    nextPaymentDue: "2024-05-15",
  },
  {
    id: "2",
    vendorName: "Harmony DJ Services",
    vendorCategory: "DJ & Music",
    eventName: "Corporate Gala 2024",
    eventDate: "2024-07-20",
    bookingDate: "2024-02-15",
    status: "pending" as const,
    amount: 1200,
    deposit: 360,
    remaining: 840,
    services: ["DJ Service", "Sound System", "Lighting"],
    notes: "Need microphone for speeches",
    vendorImage: "/professional-dj-service.jpg",
    contractSigned: false,
    paymentStatus: "pending",
    nextPaymentDue: "2024-03-15",
  },
  {
    id: "3",
    vendorName: "The Grand Ballroom",
    vendorCategory: "Venue",
    eventName: "Emma's Sweet 16",
    eventDate: "2024-08-10",
    bookingDate: "2024-02-20",
    status: "confirmed" as const,
    amount: 6000,
    deposit: 1800,
    remaining: 4200,
    services: ["Venue Rental", "Tables & Chairs", "Decorations"],
    notes: "Pink and gold theme requested",
    vendorImage: "/grand-ballroom-venue.jpg",
    contractSigned: true,
    paymentStatus: "partial",
    nextPaymentDue: "2024-07-10",
  },
  {
    id: "4",
    vendorName: "Lens & Light Photography",
    vendorCategory: "Photography",
    eventName: "Sarah & Michael's Wedding",
    eventDate: "2024-06-15",
    bookingDate: "2024-01-25",
    status: "confirmed" as const,
    amount: 3500,
    deposit: 1050,
    remaining: 2450,
    services: ["Wedding Photography", "Engagement Session", "Digital Gallery"],
    notes: "Include drone shots if weather permits",
    vendorImage: "/professional-photographer.jpg",
    contractSigned: true,
    paymentStatus: "partial",
    nextPaymentDue: "2024-05-15",
  },
  {
    id: "5",
    vendorName: "Bloom & Blossom Florists",
    vendorCategory: "Florist",
    eventName: "Corporate Gala 2024",
    eventDate: "2024-07-20",
    bookingDate: "2024-02-25",
    status: "quote_requested" as const,
    amount: 2200,
    deposit: 0,
    remaining: 2200,
    services: ["Centerpieces", "Stage Decorations", "Welcome Arrangements"],
    notes: "Corporate colors: navy and gold",
    vendorImage: "/luxury-florist-service.jpg",
    contractSigned: false,
    paymentStatus: "pending",
    nextPaymentDue: null,
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  quote_requested: { label: "Quote Requested", color: "bg-blue-100 text-blue-800 border-blue-200", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
}

export function BookingManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<(typeof bookings)[0] | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    pending: bookings.filter((b) => b.status === "pending").length,
    totalValue: bookings.reduce((sum, b) => sum + b.amount, 0),
    totalPaid: bookings.reduce((sum, b) => sum + (b.amount - b.remaining), 0),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-balance">Booking Management</h1>
          <p className="text-muted-foreground mt-2">Track and manage your vendor bookings</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="gradient-royal text-white hover:glow-primary transition-all duration-300"
        >
          <Calendar className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${stats.totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="quote_requested">Quote Requested</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Booking Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <BookingCard booking={booking} onViewDetails={() => setSelectedBooking(booking)} />
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-6">
          {filteredBookings
            .filter((b) => b.status === "confirmed")
            .map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <BookingCard booking={booking} onViewDetails={() => setSelectedBooking(booking)} />
              </motion.div>
            ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {filteredBookings
            .filter((b) => b.status === "pending" || b.status === "quote_requested")
            .map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <BookingCard booking={booking} onViewDetails={() => setSelectedBooking(booking)} />
              </motion.div>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No completed bookings yet</h3>
            <p className="text-muted-foreground">Completed bookings will appear here after your events</p>
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== "all"
              ? "Try adjusting your search criteria"
              : "Start by creating your first booking"}
          </p>
          <Button onClick={() => setShowCreateModal(true)} className="gradient-royal text-white">
            Create Booking
          </Button>
        </div>
      )}

      {/* Modals */}
      {selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          open={!!selectedBooking}
          onOpenChange={() => setSelectedBooking(null)}
        />
      )}

      <CreateBookingModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}
