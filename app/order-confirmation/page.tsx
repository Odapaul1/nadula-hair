"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OrderConfirmationPage() {
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = Math.floor(100000000 + Math.random() * 900000000).toString()
    setOrderNumber(randomOrderNumber)
  }, [])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your order has been received and is being processed. You will receive a confirmation email shortly.
        </p>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-500 mb-2">Order Number</p>
          <p className="text-xl font-bold">{orderNumber}</p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-[#2952b2] hover:bg-[#1e3c7b]">Continue Shopping</Button>
          </Link>

          <Link href="/account/orders">
            <Button variant="outline" className="w-full">
              View Order Status
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

