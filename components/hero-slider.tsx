"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

const slides = [
  {
    id: 1,
    title: "Tax Season Mark Your Savings",
    subtitle: "Turn Your Tax Refund Into Something Amazing!",
    discount: "20% OFF",
    code: "QUEEN",
    buttonText: "SHOP NOW",
    buttonLink: "/promotion/tax-season",
    image: "https://cdn.pixabay.com/photo/2018/01/29/17/01/woman-3116587_1280.jpg",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover Our Latest Collection",
    discount: "UP TO 30% OFF",
    code: "NEW30",
    buttonText: "EXPLORE",
    buttonLink: "/new-arrivals",
    image: "https://cdn.pixabay.com/photo/2016/11/29/11/45/beautiful-1869306_1280.jpg",
  },
  {
    id: 3,
    title: "HD Lace Collection",
    subtitle: "Invisible Hairline, Natural Look",
    discount: "PREMIUM QUALITY",
    code: "HDLACE",
    buttonText: "SHOP NOW",
    buttonLink: "/collection/hd-lace",
    image: "https://cdn.pixabay.com/photo/2016/11/29/06/46/adult-1867889_1280.jpg",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Make sure we have slides before trying to access them
  if (!slides || slides.length === 0) {
    return null
  }

  const slide = slides[currentSlide] || slides[0]

  return (
    <div className="relative overflow-hidden h-[500px] md:h-[600px]">
      <div className="absolute inset-0">
        <Image
          src={slide.image || "/placeholder.svg"}
          alt={slide.title || "Promotional slide"}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent flex items-center">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-xl">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{slide.title || "Special Offer"}</h1>

            <div className="relative mb-6">
              <div className="text-[#2952b2] font-bold text-4xl md:text-7xl drop-shadow-lg">
                {slide.discount || "SALE"}
              </div>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 mb-6">{slide.subtitle || "Limited time offer"}</p>

            <Link href={slide.buttonLink || "#"} prefetch={true}>
              <Button className="bg-[#2952b2] hover:bg-[#1e3c7b] text-white px-8 py-6 rounded-md text-lg" type="button">
                {slide.buttonText || "Shop Now"}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
        aria-label="Previous slide"
        type="button"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md"
        aria-label="Next slide"
        type="button"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-[#2952b2]" : "bg-gray-300"}`}
            aria-label={`Go to slide ${index + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}

