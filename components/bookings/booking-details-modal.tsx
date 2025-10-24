"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  CreditCard,
  Phone,
  Mail,
} from "lucide-react"

interface Booking {
  id: string
  vendorName: string
  vendorCategory: string
  eventName: string
  eventDate: string
  bookingDate: string
  status: "pending" | "confirmed" | "quote_requested" | "cancelled"
  amount: number
  deposit: number
  remaining: number
  services: string[]
  notes: string
  vendorImage: string
  contractSigned: boolean
  paymentStatus: "pending" | "partial" | "paid"
  nextPaymentDue: string | null
}

interface BookingDetailsModalProps {
  booking: Booking
  open: boolean
  onOpenChange: (open: boolean) => void
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  confirmed: { label: "Confirmed", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  quote_requested: { label: "Quote Requested", color: "bg-blue-100 text-blue-800 border-blue-200", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
}

// Mock payment history
const paymentHistory = [
  {
    id: 1,
    date: "2024-02-10",
    amount: 2550,
    type: "Deposit",
    status: "completed",
    method: "Credit Card",
  },
  {
    id: 2,
    date: "2024-05-15",
    amount: 2975,
    type: "Progress Payment",
    status: "scheduled",
    method: "Bank Transfer",
  },
  {
    id: 3,
    date: "2024-06-10",
    amount: 2975,
    type: "Final Payment",
    status: "scheduled",
    method: "Credit Card",
  },
]

// Mock timeline
const timeline = [
  {
    id: 1,
    date: "2024-02-10",
    title: "Booking Created",
    description: "Initial booking request submitted",
    status: "completed",
  },
  {
    id: 2,
    date: "2024-02-12",
    title: "Quote Approved",
    description: "Vendor quote accepted and deposit paid",
    status: "completed",
  },
  {
    id: 3,
    date: "2024-02-15",
    title: "Contract Signed",
    description: "Service agreement signed by both parties",
    status: "completed",
  },
  {
    id: 4,
    date: "2024-05-15",
    title: "Progress Payment Due",
    description: "Second payment installment",
    status: "upcoming",
  },
  {
    id: 5,
    date: "2024-06-15",
    title: "Event Date",
    description: "Service delivery date",
    status: "upcoming",
  },
]

export function BookingDetailsModal({ booking, open, onOpenChange }: BookingDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const status = statusConfig[booking.status]
  const StatusIcon = status.icon
  const paymentProgress = ((booking.amount - booking.remaining) / booking.amount) * 100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-heading">{booking.vendorName}</DialogTitle>
              <p className="text-muted-foreground">{booking.eventName}</p>
            </div>
            <Badge variant="outline" className={status.color}>
              <StatusIcon className="w-4 h-4 mr-1" />
              {status.label}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Details */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <img
                        src={booking.vendorImage || "/placeholder.svg"}
                        alt={booking.vendorName}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      Booking Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Event</p>
                        <p className="font-medium">{booking.eventName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{booking.vendorCategory}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Event Date</p>
                        <p className="font-medium">{booking.eventDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Booking Date</p>
                        <p className="font-medium">{booking.bookingDate}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Services Included</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.services.map((service) => (
                          <Badge key={service} variant="secondary">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {booking.notes && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Special Notes</p>
                          <p className="text-sm bg-muted p-3 rounded-lg">{booking.notes}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Amount</span>
                      <span className="font-semibold text-lg">${booking.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-green-600">
                      <span>Paid</span>
                      <span className="font-semibold">${(booking.amount - booking.remaining).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-orange-600">
                      <span>Remaining</span>
                      <span className="font-semibold">${booking.remaining.toLocaleString()}</span>
                    </div>
                    <Progress value={paymentProgress} className="h-3" />
                    <p className="text-sm text-muted-foreground">{paymentProgress.toFixed(0)}% paid</p>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full gradient-royal text-white">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message Vendor
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Vendor
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Email
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contract Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      {booking.contractSigned ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-medium">Contract Signed</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                          <span className="text-yellow-600 font-medium">Pending Signature</span>
                        </>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      View Contract
                    </Button>
                  </CardContent>
                </Card>

                {booking.nextPaymentDue && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Next Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">
                          ${(booking.remaining / 2).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">Due {booking.nextPaymentDue}</p>
                        <Button size="sm" className="mt-3 gradient-royal text-white">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Make Payment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Track all payments for this booking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            payment.status === "completed"
                              ? "bg-green-500"
                              : payment.status === "scheduled"
                                ? "bg-yellow-500"
                                : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className="font-medium">{payment.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {payment.date} • {payment.method}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${payment.amount.toLocaleString()}</p>
                        <Badge variant={payment.status === "completed" ? "default" : "secondary"}>
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking Timeline</CardTitle>
                <CardDescription>Track the progress of your booking</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-4 h-4 rounded-full border-2 ${
                            item.status === "completed"
                              ? "bg-green-500 border-green-500"
                              : item.status === "upcoming"
                                ? "bg-yellow-500 border-yellow-500"
                                : "bg-gray-300 border-gray-300"
                          }`}
                        />
                        {index < timeline.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{item.title}</h4>
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Documents & Files</CardTitle>
                <CardDescription>Access contracts, invoices, and other documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Service Contract</p>
                        <p className="text-sm text-muted-foreground">Signed on {booking.bookingDate}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Invoice #INV-001</p>
                        <p className="text-sm text-muted-foreground">Generated on {booking.bookingDate}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Payment Receipt</p>
                        <p className="text-sm text-muted-foreground">Deposit payment confirmation</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
