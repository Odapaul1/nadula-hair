"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Sample product data - replace with your actual data
const allProducts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Premium Human Hair Wig ${i + 1}`,
  price: 159.99 + i * 10,
  originalPrice: 199.99 + i * 10,
  rating: 4.5 + Math.random() * 0.5,
  reviewCount: 50 + Math.floor(Math.random() * 100),
  image: `https://cdn.pixabay.com/photo/201${6 + (i % 3)}/11/29/0${6 + (i % 4)}/4${i % 10}/woman-186${7000 + i * 100}_1280.jpg`,
  href: `/product/wig-${i + 1}`,
  hairType: i % 3 === 0 ? "Human Hair" : i % 3 === 1 ? "Synthetic Hair" : "Blend",
  hairLength: i % 4 === 0 ? "10 inches" : i % 4 === 1 ? "16 inches" : i % 4 === 2 ? "20 inches" : "26 inches",
  hairTexture: i % 4 === 0 ? "Straight" : i % 4 === 1 ? "Body Wave" : i % 4 === 2 ? "Curly" : "Kinky Curly",
}))

const categories = {
  "hd-lace": {
    title: "HD Lace Wigs",
    description: "Premium HD lace wigs for an invisible hairline",
    banner: "https://cdn.pixabay.com/photo/2018/01/15/07/52/woman-3083401_1280.jpg",
  },
  "bye-bye-knots": {
    title: "7×5 Bye Bye Knots Wigs",
    description: "Revolutionary knot-free wig technology for a seamless appearance",
    banner: "https://cdn.pixabay.com/photo/2016/11/29/06/08/woman-1867715_1280.jpg",
  },
  "pre-everything": {
    title: "13×4 Pre-Everything Wigs",
    description: "Premium pre-plucked, pre-bleached lace front wigs for a natural look",
    banner: "https://cdn.pixabay.com/photo/2017/02/16/23/10/smile-2072907_1280.jpg",
  },
  "v-part": {
    title: "V Part Wigs",
    description: "Natural-looking V-part wigs for versatile styling",
    banner: "https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_1280.jpg",
  },
  glueless: {
    title: "Glueless Wigs",
    description: "Easy-to-wear wigs with no glue required",
    banner: "https://cdn.pixabay.com/photo/2016/11/29/13/24/attractive-1869761_1280.jpg",
  },
  bob: {
    title: "Bob Wigs",
    description: "Trendy and classic bob style wigs",
    banner: "https://cdn.pixabay.com/photo/2016/11/29/11/45/beautiful-1869306_1280.jpg",
  },
  colored: {
    title: "Colored Wigs",
    description: "Pre-colored wigs in various shades",
    banner: "https://cdn.pixabay.com/photo/2018/03/12/12/32/woman-3219507_1280.jpg",
  },
}

interface CategoryPageProps {
  params: {
    category: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories[params.category as keyof typeof categories]

  const [products, setProducts] = useState(allProducts)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [hairTypes, setHairTypes] = useState<string[]>([])
  const [hairLengths, setHairLengths] = useState<string[]>([])
  const [hairTextures, setHairTextures] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("featured")
  const [isValidCategory, setIsValidCategory] = useState(!!category)

  // Ensure we have a valid category or redirect to a safe page
  useEffect(() => {
    setIsValidCategory(!!category)
    if (!category && typeof window !== "undefined") {
      // If category doesn't exist, redirect to the main collection page
      window.location.href = "/collection"
    }
  }, [category])

  if (!isValidCategory) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Category not found</h2>
          <p className="text-gray-500 mb-8">The category you're looking for doesn't exist.</p>
          <Link href="/collection">
            <Button type="button">Browse Collections</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Handle hair type checkbox changes
  const handleHairTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setHairTypes([...hairTypes, type])
    } else {
      setHairTypes(hairTypes.filter((t) => t !== type))
    }
  }

  // Handle hair length checkbox changes
  const handleHairLengthChange = (length: string, checked: boolean) => {
    if (checked) {
      setHairLengths([...hairLengths, length])
    } else {
      setHairLengths(hairLengths.filter((l) => l !== length))
    }
  }

  // Handle hair texture checkbox changes
  const handleHairTextureChange = (texture: string, checked: boolean) => {
    if (checked) {
      setHairTextures([...hairTextures, texture])
    } else {
      setHairTextures(hairTextures.filter((t) => t !== texture))
    }
  }

  // Apply filters
  const applyFilters = useCallback(() => {
    let filteredProducts = [...allProducts]

    // Filter by price range
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1],
    )

    // Filter by hair type
    if (hairTypes.length > 0) {
      filteredProducts = filteredProducts.filter((product) => hairTypes.includes(product.hairType))
    }

    // Filter by hair length
    if (hairLengths.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        const inches = Number.parseInt(product.hairLength)
        if (hairLengths.includes("8-12 inches") && inches >= 8 && inches <= 12) return true
        if (hairLengths.includes("14-18 inches") && inches >= 14 && inches <= 18) return true
        if (hairLengths.includes("20-24 inches") && inches >= 20 && inches <= 24) return true
        if (hairLengths.includes("26+ inches") && inches >= 26) return true
        return false
      })
    }

    // Filter by hair texture
    if (hairTextures.length > 0) {
      filteredProducts = filteredProducts.filter((product) => hairTextures.includes(product.hairTexture))
    }

    // Apply sorting
    if (sortOption === "price-low") {
      filteredProducts.sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high") {
      filteredProducts.sort((a, b) => b.price - a.price)
    } else if (sortOption === "rating") {
      filteredProducts.sort((a, b) => b.rating - a.rating)
    }

    setProducts(filteredProducts)
  }, [priceRange, hairTypes, hairLengths, hairTextures, sortOption])

  // Apply filters when any filter changes
  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative h-[200px] md:h-[300px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={category.banner || "/placeholder.svg"}
          alt={category.title || "Category banner"}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="text-white px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{category.title}</h1>
            <p className="text-sm md:text-base max-w-xl">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <Slider
              defaultValue={[0, 300]}
              max={500}
              step={1}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">${priceRange[0]}</span>
              <span className="text-sm text-gray-500">${priceRange[1]}</span>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Hair Type</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hair-type-1"
                  onCheckedChange={(checked) => handleHairTypeChange("Human Hair", checked as boolean)}
                />
                <Label htmlFor="hair-type-1">Human Hair</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hair-type-2"
                  onCheckedChange={(checked) => handleHairTypeChange("Synthetic Hair", checked as boolean)}
                />
                <Label htmlFor="hair-type-2">Synthetic Hair</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hair-type-3"
                  onCheckedChange={(checked) => handleHairTypeChange("Blend", checked as boolean)}
                />
                <Label htmlFor="hair-type-3">Blend</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Hair Length</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="length-1"
                  onCheckedChange={(checked) => handleHairLengthChange("8-12 inches", checked as boolean)}
                />
                <Label htmlFor="length-1">8-12 inches</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="length-2"
                  onCheckedChange={(checked) => handleHairLengthChange("14-18 inches", checked as boolean)}
                />
                <Label htmlFor="length-2">14-18 inches</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="length-3"
                  onCheckedChange={(checked) => handleHairLengthChange("20-24 inches", checked as boolean)}
                />
                <Label htmlFor="length-3">20-24 inches</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="length-4"
                  onCheckedChange={(checked) => handleHairLengthChange("26+ inches", checked as boolean)}
                />
                <Label htmlFor="length-4">26+ inches</Label>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-medium mb-3">Hair Texture</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="texture-1"
                  onCheckedChange={(checked) => handleHairTextureChange("Straight", checked as boolean)}
                />
                <Label htmlFor="texture-1">Straight</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="texture-2"
                  onCheckedChange={(checked) => handleHairTextureChange("Body Wave", checked as boolean)}
                />
                <Label htmlFor="texture-2">Body Wave</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="texture-3"
                  onCheckedChange={(checked) => handleHairTextureChange("Curly", checked as boolean)}
                />
                <Label htmlFor="texture-3">Curly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="texture-4"
                  onCheckedChange={(checked) => handleHairTextureChange("Kinky Curly", checked as boolean)}
                />
                <Label htmlFor="texture-4">Kinky Curly</Label>
              </div>
            </div>
          </div>

          <Button className="w-full" onClick={applyFilters} type="button">
            Apply Filters
          </Button>
        </div>

        {/* Products */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500">Showing {products.length} products</div>
            <Select defaultValue="featured" onValueChange={(value) => setSortOption(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="rating">Best Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <Link href={product.href}>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </Badge>
                    )}

                    <div className="absolute inset-x-0 bottom-0 flex-col gap-2 bg-white/80 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button className="w-full gap-2 bg-[#2952b2] hover:bg-[#1e3c7b]" type="button">
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
                            className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">({product.reviewCount})</span>
                    </div>

                    <h3 className="text-sm font-medium text-gray-900">
                      <Link href={product.href}>{product.name}</Link>
                    </h3>

                    <div className="flex items-center">
                      <p className="font-medium text-gray-900">${product.price.toFixed(2)}</p>
                      {product.originalPrice && (
                        <p className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-lg text-gray-500">No products match your filters.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setPriceRange([0, 500])
                    setHairTypes([])
                    setHairLengths([])
                    setHairTextures([])
                    setProducts(allProducts)
                  }}
                  type="button"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Button variant="outline" className="mx-1" type="button">
              1
            </Button>
            <Button variant="outline" className="mx-1" type="button">
              2
            </Button>
            <Button variant="outline" className="mx-1" type="button">
              3
            </Button>
            <Button variant="outline" className="mx-1" type="button">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

