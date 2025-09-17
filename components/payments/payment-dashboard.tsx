"use client"

import { useState } from "react"
import { CreditCard, Download, Filter, Search, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentCard } from "./payment-card"
import { PaymentStats } from "./payment-stats"
import { PaymentHistory } from "./payment-history"
import { EscrowStatus } from "./escrow-status"

const mockPayments = [
  {
    id: "1",
    vendorName: "Elite Catering Co.",
    eventName: "Sarah's Wedding",
    amount: 8500,
    status: "completed" as const,
    dueDate: "2024-06-15",
    paidDate: "2024-06-10",
    type: "catering",
    escrowStatus: "released",
  },
  {
    id: "2",
    vendorName: "Grand Ballroom",
    eventName: "Corporate Gala",
    amount: 12000,
    status: "pending" as const,
    dueDate: "2024-07-20",
    paidDate: null,
    type: "venue",
    escrowStatus: "held",
  },
  {
    id: "3",
    vendorName: "DJ Marcus",
    eventName: "Birthday Celebration",
    amount: 2500,
    status: "overdue" as const,
    dueDate: "2024-05-30",
    paidDate: null,
    type: "entertainment",
    escrowStatus: "pending",
  },
]

export function PaymentDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTab, setSelectedTab] = useState("overview")

  const totalPaid = mockPayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const totalPending = mockPayments.filter((p) => p.status === "pending").reduce((sum, p) => sum + p.amount, 0)

  const totalOverdue = mockPayments.filter((p) => p.status === "overdue").reduce((sum, p) => sum + p.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600 mt-2">Manage your event payments and vendor transactions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Add Payment Method</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <PaymentStats totalPaid={totalPaid} totalPending={totalPending} totalOverdue={totalOverdue} />

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="escrow">Escrow</TabsTrigger>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search payments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </Button>
          </div>

          {/* Payment Cards */}
          <div className="grid gap-4">
            {mockPayments.map((payment, index) => (
              <PaymentCard key={payment.id} payment={payment} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <PaymentHistory payments={mockPayments} />
        </TabsContent>

        <TabsContent value="escrow">
          <EscrowStatus payments={mockPayments} />
        </TabsContent>

        <TabsContent value="methods">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Credit Cards</span>
                </CardTitle>
                <CardDescription>Manage your saved payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/26</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Primary</Badge>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Add New Card
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bank Account</CardTitle>
                <CardDescription>For ACH transfers and refunds</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium">Chase Bank</p>
                    <p className="text-sm text-gray-500">•••• •••• •••• 1234</p>
                  </div>
                  <Badge variant="outline">Verified</Badge>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Add Bank Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
