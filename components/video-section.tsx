"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Only try to play if the video element exists
    const video = videoRef.current
    if (!video) return

    // Function to handle video playback
    const playVideo = () => {
      if (video && video.paused) {
        video.play().catch((error) => {
          console.log("Video autoplay was prevented:", error)
          // Don't throw an error, just log it
        })
      }
    }

    // Check if video is already loaded
    if (video.readyState >= 2) {
      playVideo()
    } else {
      // If not loaded yet, wait for the loadeddata event
      video.addEventListener("loadeddata", playVideo)
    }

    // Clean up event listener
    return () => {
      if (video) {
        video.removeEventListener("loadeddata", playVideo)
      }
    }
  }, [])

  return (
    <div className="relative h-[400px] md:h-[600px] overflow-hidden">
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source
          src="https://cdn.pixabay.com/vimeo/328741711/fashion-25879.mp4?width=1280&hash=c0a8b3a9c5c0e9a2a4c2a5c0a8b3a9c5c0e9a2a4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white max-w-3xl px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Premium Quality Human Hair</h2>
          <p className="text-lg md:text-xl mb-8">
            Experience the luxury of Nadula hair - 100% human hair wigs and extensions crafted for beauty and
            durability.
          </p>
          <Link href="/about">
            <Button className="bg-white text-[#2952b2] hover:bg-gray-100 px-8 py-6 text-lg">Learn More</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

