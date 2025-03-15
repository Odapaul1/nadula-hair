"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Jessica M.",
    location: "New York, USA",
    image: "https://cdn.pixabay.com/photo/2017/08/01/08/29/woman-2563491_1280.jpg",
    rating: 5,
    text: "I've been wearing Nadula wigs for over 2 years now and the quality is unmatched! The HD lace is truly invisible and the hair feels so natural. I get compliments everywhere I go!",
  },
  {
    id: 2,
    name: "Michelle T.",
    location: "London, UK",
    image: "https://cdn.pixabay.com/photo/2018/01/15/07/52/woman-3083401_1280.jpg",
    rating: 5,
    text: "The Bye Bye Knots wig changed my life! No more spending hours trying to bleach knots. The hairline looks so natural right out of the box. Shipping was fast and customer service was excellent.",
  },
  {
    id: 3,
    name: "Aisha K.",
    location: "Toronto, Canada",
    image: "https://cdn.pixabay.com/photo/2016/11/29/06/08/woman-1867715_1280.jpg",
    rating: 5,
    text: "I was skeptical about ordering a wig online, but Nadula exceeded my expectations. The quality is amazing for the price, and the hair holds up well even after washing and styling. Will definitely order again!",
  },
]

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Check if testimonials exists before proceeding
  if (!testimonials || testimonials.length === 0) {
    return null
  }

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Make sure we have a valid current testimonial
  const current = testimonials[currentIndex] || testimonials[0]
  if (!current) return null

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-12 text-center">What Our Customers Say</h2>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden flex-shrink-0">
                <Image src={current.image || "/placeholder.svg"} alt={current.name} fill className="object-cover" />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < current.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 italic mb-4">"{current.text}"</p>

                <div>
                  <h3 className="font-bold text-lg">{current.name}</h3>
                  <p className="text-gray-500">{current.location}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-md"
            aria-label="Previous testimonial"
            type="button"
          >
            <ChevronLeft className="h-6 w-6 text-[#2952b2]" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-md"
            aria-label="Next testimonial"
            type="button"
          >
            <ChevronRight className="h-6 w-6 text-[#2952b2]" />
          </button>
        </div>

        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 ${currentIndex === index ? "bg-[#2952b2]" : "bg-gray-300"}`}
              aria-label={`Go to testimonial ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

