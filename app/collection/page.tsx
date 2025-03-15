import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

// Categories based on the original Nadula website
const categories = [
  {
    name: "Put On and Go Wig",
    href: "/collection/put-on-and-go",
    image: "/placeholder.svg?height=400&width=400",
    description: "Easy to wear, no styling needed",
  },
  {
    name: "7×5 Bye Bye Knots Wig",
    href: "/collection/bye-bye-knots",
    image: "/placeholder.svg?height=400&width=400",
    description: "Seamless knot-free wig solutions",
  },
  {
    name: "13×4 Pre-everything",
    href: "/collection/pre-everything",
    image: "/placeholder.svg?height=400&width=400",
    description: "Premium pre-plucked lace front wigs",
  },
  {
    name: "V Part Wigs",
    href: "/collection/v-part",
    image: "/placeholder.svg?height=400&width=400",
    description: "Natural-looking V-part wigs",
  },
]

// Additional categories for the second row
const additionalCategories = [
  {
    name: "Glueless Wigs",
    href: "/collection/glueless",
    image: "/placeholder.svg?height=400&width=400",
    description: "Easy-to-wear glueless wigs",
  },
  {
    name: "HD Lace Wigs",
    href: "/collection/hd-lace",
    image: "/placeholder.svg?height=400&width=400",
    description: "Invisible HD lace wigs",
  },
  {
    name: "Bob Wigs",
    href: "/collection/bob",
    image: "/placeholder.svg?height=400&width=400",
    description: "Stylish bob cut wigs",
  },
  {
    name: "Colored Wigs",
    href: "/collection/colored",
    image: "/placeholder.svg?height=400&width=400",
    description: "Pre-colored fashion wigs",
  },
]

export default function CollectionPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[400px] md:h-[500px]">
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="Hot Collection - Various Fashion Wig"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Hot Collection</h1>
              <p className="text-xl md:text-2xl">Various Fashion Wig</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Highlights - matching the original site */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-gray-200">
        <div className="flex items-center justify-center py-4 px-6 border-b md:border-b-0 md:border-r border-gray-200">
          <span className="text-sm font-medium">FREE SHIPPING</span>
        </div>

        <div className="flex items-center justify-center py-4 px-6 border-b md:border-b-0 md:border-r border-gray-200">
          <span className="text-sm font-medium">30-DAYS RETURN</span>
        </div>

        <div className="flex items-center justify-center py-4 px-6">
          <span className="text-sm font-medium">BUY NOW, PAY LATER</span>
        </div>
      </div>

      {/* Main Categories - matching the original site layout */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Shop By Category</h2>

        {/* First row of categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} prefetch={true} className="group">
              <Card className="overflow-hidden bg-gray-50 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name || "Category image"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900">{category.name || "Category"}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Second row of categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalCategories.map((category) => (
            <Link key={category.name} href={category.href} prefetch={true} className="group">
              <Card className="overflow-hidden bg-gray-50 border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name || "Category image"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-medium text-gray-900">{category.name || "Category"}</h3>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Best Sellers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={`/placeholder.svg?height=400&width=300`}
                      alt={`Best seller ${item}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">SALE</div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">Premium HD Lace Wig</h3>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-900">$159.99</span>
                        <span className="text-sm text-gray-500 line-through ml-2">$199.99</span>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">20% OFF</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

