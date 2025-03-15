"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

interface ProductCardProps {
  product: {
    id: number
    name: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    image: string
    href: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()
  const { toast } = useToast()

  // Ensure product exists before accessing properties
  if (!product) {
    return null
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      duration: 3000,
    })
  }

  return (
    <div className="group relative">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Link href={product.href || "#"} prefetch={true}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name || "Product image"}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {discount > 0 && <Badge className="absolute top-2 left-2 bg-red-500">{discount}% OFF</Badge>}

        <Button
          variant="outline"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={() => setIsWishlisted(!isWishlisted)}
          type="button"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          <span className="sr-only">Add to wishlist</span>
        </Button>

        <div className="absolute inset-x-0 bottom-0 flex-col gap-2 bg-white/80 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button className="w-full gap-2" onClick={handleAddToCart} type="button">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-500">({product.reviewCount || 0})</span>
        </div>

        <h3 className="text-sm font-medium text-gray-900">
          <Link href={product.href || "#"} prefetch={true}>
            {product.name || "Product"}
          </Link>
        </h3>

        <div className="flex items-center">
          <p className="font-medium text-gray-900">${(product.price || 0).toFixed(2)}</p>
          {product.originalPrice && (
            <p className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
          )}
        </div>
      </div>
    </div>
  )
}

