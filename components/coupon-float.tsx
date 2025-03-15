"use client"

import { useState, useEffect } from "react"
import { X, Scissors } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CouponFloat() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show the coupon after 3 seconds
    const timer = setTimeout(() => {
      // Check if user has dismissed it before
      const dismissed = localStorage.getItem("couponDismissed")
      if (!dismissed) {
        setIsVisible(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    // Store in localStorage so it doesn't show again in this session
    localStorage.setItem("couponDismissed", "true")
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-teal rounded-lg shadow-lg border border-[#2952b2]/20 overflow-hidden animate-bounce-slow">
      <div className="relative p-6">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close coupon"
          type="button"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-center mb-4">
          <Scissors className="h-6 w-6 text-[#2952b2] mr-2" />
          <h3 className="text-lg font-bold text-[#2952b2]">New Customers Exclusive!</h3>
        </div>

        <div className="flex gap-2 mb-4">
          <div className="bg-yellow-50 p-3 rounded-lg text-center flex-1">
            <div className="text-amber-500 font-bold text-xl">FREE</div>
            <div className="text-sm">WIG</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg text-center flex-1">
            <div className="text-[#2952b2] font-bold text-xl">$300</div>
            <div className="text-sm">COUPON</div>
          </div>
        </div>

        <div className="text-center mb-4">
          <p className="text-gray-600 mb-2">Sign up now to receive exclusive offers!</p>
        </div>

        <Link href="/collection" onClick={handleDismiss}>
          <Button className="w-full bg-[#2952b2] hover:bg-[#1e3c7b]" type="button">
            UNLOCK REWARDS
          </Button>
        </Link>
      </div>
    </div>
  )
}

