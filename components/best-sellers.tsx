"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

const bestSellers = [
  {
    id: 1,
    name: "13x4 HD Lace Frontal Wig Body Wave",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 124,
    image: "https://cdn.pixabay.com/photo/2018/03/12/12/32/woman-3219507_1280.jpg",
    href: "/product/hd-lace-frontal-body-wave",
  },
  {
    id: 2,
    name: "7x5 HD Lace Bye Bye Knots Wig",
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.9,
    reviewCount: 86,
    image: "https://cdn.pixabay.com/photo/2016/11/29/06/08/woman-1867715_1280.jpg",
    href: "/product/bye-bye-knots-wig",
  },
  {
    id: 3,
    name: "V Part Wig Human Hair",
    price: 129.99,
    originalPrice: 169.99,
    rating: 4.7,
    reviewCount: 53,
    image: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
    href: "/product/v-part-wig",
  },
  {
    id: 4,
    name: "13x4 Straight Lace Front Wig",
    price: 149.99,
    originalPrice: 189.99,
    rating: 4.6,
    reviewCount: 92,
    image: "https://cdn.pixabay.com/photo/2018/01/15/07/52/woman-3083401_1280.jpg",
    href: "/product/straight-lace-front-wig",
  },
]

export default function BestSellers() {
  const [wishlisted, setWishlisted] = useState<number[]>([])
  const { addItem } = useCart()
  const { toast } = useToast()

  // Check if bestSellers exists before proceeding
  if (!bestSellers || bestSellers.length === 0) {
    return null
  }

  const toggleWishlist = (id: number) => {
    if (wishlisted.includes(id)) {
      setWishlisted(wishlisted.filter((itemId) => itemId !== id))
    } else {
      setWishlisted([...wishlisted, id])
    }
  }

  const handleAddToCart = (product: any) => {
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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {bestSellers.map((product) => (
        <div key={product?.id || Math.random()} className="group relative">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Link href={product?.href || "#"}>
              <Image
                src={product?.image || "/placeholder.svg"}
                alt={product?.name || "Product image"}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {product?.originalPrice && (
              <Badge className="absolute top-2 left-2 bg-red-500">
                {Math.round(((product.originalPrice - (product?.price || 0)) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}

            <Button
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white"
              onClick={() => product?.id && toggleWishlist(product.id)}
              type="button"
            >
              <Heart
                className={`h-5 w-5 ${product?.id && wishlisted.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
              />
              <span className="sr-only">Add to wishlist</span>
            </Button>

            <div className="absolute inset-x-0 bottom-0 flex-col gap-2 bg-white/80 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                className="w-full gap-2 bg-[#2952b2] hover:bg-[#1e3c7b]"
                onClick={() => handleAddToCart(product)}
                type="button"
              >
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
                    className={`h-4 w-4 ${i < Math.floor(product?.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">({product?.reviewCount || 0})</span>
            </div>

            <h3 className="text-sm font-medium text-gray-900">
              <Link href={product?.href || "#"}>{product?.name || "Product"}</Link>
            </h3>

            <div className="flex items-center">
              <p className="font-medium text-gray-900">${(product?.price || 0).toFixed(2)}</p>
              {product?.originalPrice && (
                <p className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

