"use client"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-[320px] sm:w-[380px] overflow-hidden">
          {/* Chat Header */}
          <div className="bg-[#2952b2] p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image src="/placeholder.svg" alt="Nadula Hair" fill className="object-cover" />
              </div>
              <div className="text-white">
                <h3 className="font-semibold">Nadula Hair</h3>
                <p className="text-xs opacity-90">Usually replies within an hour</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#1e3c7b]"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Chat Messages */}
          <div className="h-[400px] overflow-y-auto p-4 bg-gray-50">
            <div className="bg-[#2952b2] text-white rounded-lg p-3 max-w-[80%] mb-4">
              <p>👋 Welcome to Nadula Hair! How can we help you today?</p>
            </div>
            <div className="bg-[#2952b2] text-white rounded-lg p-3 max-w-[80%]">
              <p>You can ask us about:</p>
              <ul className="list-disc ml-4 mt-2 space-y-1">
                <li>Product information</li>
                <li>Shipping & delivery</li>
                <li>Order status</li>
                <li>Returns & exchanges</li>
                <li>Hair care tips</li>
              </ul>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                // Handle message submission
                setMessage("")
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-[#2952b2] hover:bg-[#1e3c7b]">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 bg-[#2952b2] hover:bg-[#1e3c7b] shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}

