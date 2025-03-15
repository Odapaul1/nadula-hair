import HeroSlider from "@/components/hero-slider"
import ServiceHighlights from "@/components/service-highlights"
import ProductCategories from "@/components/product-categories"
import BestSellers from "@/components/best-sellers"
import VideoSection from "@/components/video-section"
import InstagramFeed from "@/components/instagram-feed"
import TestimonialSection from "@/components/testimonial-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />
      <ServiceHighlights />
      <ProductCategories />

      {/* Best Sellers Section */}
      <div className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Best Sellers</h2>
          <BestSellers />
          <div className="text-center mt-8">
            <Link href="/wigs" prefetch={true}>
              <Button className="bg-[#2952b2] hover:bg-[#1e3c7b]">View All</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Banner Section */}
      <VideoSection />

      {/* Featured Collections */}
      <div className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="https://cdn.pixabay.com/photo/2018/01/15/07/52/woman-3083401_1280.jpg"
                alt="HD Lace Wigs"
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">HD Lace Wigs</h3>
                  <Link href="/collection/hd-lace" prefetch={true}>
                    <Button className="bg-white text-[#2952b2] hover:bg-gray-100">Shop Now</Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <Image
                src="https://cdn.pixabay.com/photo/2016/11/29/06/08/woman-1867715_1280.jpg"
                alt="Bye Bye Knots"
                fill
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">Bye Bye Knots</h3>
                  <Link href="/collection/bye-bye-knots" prefetch={true}>
                    <Button className="bg-white text-[#2952b2] hover:bg-gray-100">Shop Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Access Banner */}
      <div className="py-6 px-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-medium mb-2">Admin Access</h3>
          <p className="text-gray-600 mb-4">Access the admin dashboard to manage your store</p>
          <Link href="/admin" prefetch={true}>
            <Button className="bg-[#2952b2] hover:bg-[#1e3c7b]">Go to Admin Dashboard</Button>
          </Link>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Instagram Feed */}
      <InstagramFeed />
    </div>
  )
}

