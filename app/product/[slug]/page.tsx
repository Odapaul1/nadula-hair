"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Truck, RotateCcw, CreditCard, Check, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/product-card"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

// This would normally come from a database or API
const product = {
  id: 1,
  name: "13x4 HD Lace Frontal Wig Body Wave",
  price: 159.99,
  originalPrice: 199.99,
  rating: 4.8,
  reviewCount: 124,
  description:
    "This premium 13x4 HD lace frontal wig features 100% human hair with a natural body wave texture. The transparent HD lace creates an undetectable hairline that blends seamlessly with your skin. Pre-plucked with baby hair for a natural look.",
  features: [
    "100% Human Hair",
    "13x4 HD Lace Frontal",
    "Pre-plucked with Baby Hair",
    "Natural Hairline",
    "Body Wave Texture",
    "Adjustable Straps & Combs",
  ],
  images: [
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  colors: ["Natural Black", "Dark Brown", "Medium Brown"],
  lengths: ["12 inches", "14 inches", "16 inches", "18 inches", "20 inches", "22 inches", "24 inches"],
  densities: ["130%", "150%", "180%", "200%"],
}

const relatedProducts = [
  {
    id: 2,
    name: "7x5 HD Lace Bye Bye Knots Wig",
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.9,
    reviewCount: 86,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/bye-bye-knots-wig",
  },
  {
    id: 3,
    name: "V Part Wig Human Hair",
    price: 129.99,
    originalPrice: 169.99,
    rating: 4.7,
    reviewCount: 53,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/v-part-wig",
  },
  {
    id: 4,
    name: "13x4 Straight Lace Front Wig",
    price: 149.99,
    originalPrice: 189.99,
    rating: 4.6,
    reviewCount: 92,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/straight-lace-front-wig",
  },
]

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedLength, setSelectedLength] = useState(product.lengths[2])
  const [selectedDensity, setSelectedDensity] = useState(product.densities[1])
  const [quantity, setQuantity] = useState(1)
  const [currentImage, setCurrentImage] = useState(0)

  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      quantity: quantity,
      options: `${selectedLength}, ${selectedDensity}, ${selectedColor}`,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[currentImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer ${currentImage === index ? "ring-2 ring-[#2952b2]" : ""}`}
                onClick={() => setCurrentImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>

            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            {product.originalPrice && (
              <p className="ml-3 text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
            )}
            {product.originalPrice && (
              <span className="ml-3 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="mt-2 flex gap-2">
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center">
                    <RadioGroupItem id={`color-${color}`} value={color} className="sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className="cursor-pointer rounded-md border px-3 py-2 text-sm [&:has(:checked)]:bg-primary [&:has(:checked)]:text-primary-foreground"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Length</h3>
              <RadioGroup
                value={selectedLength}
                onValueChange={setSelectedLength}
                className="mt-2 flex flex-wrap gap-2"
              >
                {product.lengths.map((length) => (
                  <div key={length} className="flex items-center">
                    <RadioGroupItem id={`length-${length}`} value={length} className="sr-only" />
                    <Label
                      htmlFor={`length-${length}`}
                      className="cursor-pointer rounded-md border px-3 py-2 text-sm [&:has(:checked)]:bg-primary [&:has(:checked)]:text-primary-foreground"
                    >
                      {length}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Density</h3>
              <RadioGroup value={selectedDensity} onValueChange={setSelectedDensity} className="mt-2 flex gap-2">
                {product.densities.map((density) => (
                  <div key={density} className="flex items-center">
                    <RadioGroupItem id={`density-${density}`} value={density} className="sr-only" />
                    <Label
                      htmlFor={`density-${density}`}
                      className="cursor-pointer rounded-md border px-3 py-2 text-sm [&:has(:checked)]:bg-primary [&:has(:checked)]:text-primary-foreground"
                    >
                      {density}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
                <SelectTrigger className="w-24 mt-2">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button type="button" className="flex-1 gap-2" size="lg" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button type="button" variant="outline" size="lg" className="gap-2">
              <Heart className="h-5 w-5" />
              Add to Wishlist
            </Button>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Truck className="h-4 w-4 mr-2 text-green-500" />
                <span>Free shipping on orders over $99</span>
              </div>
              <div className="flex items-center text-sm">
                <RotateCcw className="h-4 w-4 mr-2 text-green-500" />
                <span>30-day easy returns</span>
              </div>
              <div className="flex items-center text-sm">
                <CreditCard className="h-4 w-4 mr-2 text-green-500" />
                <span>Buy now, pay later with Afterpay</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="p-6 border rounded-b-md">
            <div className="prose max-w-none">
              <p>
                This premium 13x4 HD lace frontal wig features 100% human hair with a natural body wave texture. The
                transparent HD lace creates an undetectable hairline that blends seamlessly with your skin. Pre-plucked
                with baby hair for a natural look.
              </p>
              <p>
                Our wigs are made with high-quality human hair that can be dyed, bleached, permed, and styled just like
                your natural hair. The hair is double drawn, ensuring thickness from root to tip, and has minimal
                shedding and tangling.
              </p>
              <p>
                The 13x4 lace frontal provides a wide parting space, allowing you to part your hair in multiple ways for
                versatile styling options. The wig comes with adjustable straps and combs for a secure fit.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="features" className="p-6 border rounded-b-md">
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="p-6 border rounded-b-md">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">{product.rating} out of 5</span>
              </div>

              <p>Based on {product.reviewCount} reviews</p>

              <Button type="button">Write a Review</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

