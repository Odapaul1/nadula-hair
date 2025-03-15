"use client"

import { X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-[#2952b2] text-white py-2 text-center text-sm">
      <Link href="/shop" className="hover:underline">
        Queen&apos;s Day Bonus! Up to $120 Off Shop Now &gt;&gt;&gt;
      </Link>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

