"use client"

import { useState } from "react"
import { Search, Phone, Video, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChatSidebar } from "./chat-sidebar"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"

interface Conversation {
  id: string
  vendorName: string
  vendorAvatar: string
  vendorType: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  isOnline: boolean
  eventName: string
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    vendorName: "Elite Catering Co.",
    vendorAvatar: "/luxury-catering-service.jpg",
    vendorType: "Catering",
    lastMessage: "Perfect! I can accommodate 150 guests with our premium menu.",
    timestamp: "2 min ago",
    unreadCount: 2,
    isOnline: true,
    eventName: "Sarah's Wedding",
  },
  {
    id: "2",
    vendorName: "Grand Ballroom",
    vendorAvatar: "/grand-ballroom-venue.jpg",
    vendorType: "Venue",
    lastMessage: "The venue is available for your date. Would you like to schedule a tour?",
    timestamp: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    eventName: "Corporate Gala",
  },
  {
    id: "3",
    vendorName: "DJ Marcus",
    vendorAvatar: "/professional-dj-service.jpg",
    vendorType: "Entertainment",
    lastMessage: "I have the perfect playlist for your event style!",
    timestamp: "3 hours ago",
    unreadCount: 1,
    isOnline: true,
    eventName: "Birthday Celebration",
  },
]

export function ChatInterface() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = mockConversations.filter(
    (conv) =>
      conv.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.eventName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex h-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Chat Sidebar */}
      <div className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>
        </div>

        <ChatSidebar
          conversations={filteredConversations}
          selectedConversation={selectedConversation}
          onSelectConversation={setSelectedConversation}
        />
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-100 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedConversation.vendorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{selectedConversation.vendorName[0]}</AvatarFallback>
                    </Avatar>
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedConversation.vendorName}</h2>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {selectedConversation.vendorType}
                      </Badge>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{selectedConversation.eventName}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ChatMessages conversation={selectedConversation} />

            {/* Chat Input */}
            <ChatInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a vendor to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
