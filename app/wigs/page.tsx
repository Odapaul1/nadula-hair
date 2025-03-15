"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/product-card"

const allProducts = [
  {
    id: 1,
    name: "13x4 HD Lace Frontal Wig Body Wave",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewCount: 124,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/hd-lace-frontal-body-wave",
    hairType: "Human Hair",
    hairLength: "18 inches",
    hairTexture: "Body Wave",
  },
  {
    id: 2,
    name: "7x5 HD Lace Bye Bye Knots Wig",
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.9,
    reviewCount: 86,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/bye-bye-knots-wig",
    hairType: "Human Hair",
    hairLength: "20 inches",
    hairTexture: "Straight",
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
    hairType: "Human Hair",
    hairLength: "16 inches",
    hairTexture: "Body Wave",
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
    hairType: "Human Hair",
    hairLength: "22 inches",
    hairTexture: "Straight",
  },
  {
    id: 5,
    name: "Curly Bob Wig Human Hair",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.5,
    reviewCount: 78,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/curly-bob-wig",
    hairType: "Human Hair",
    hairLength: "10 inches",
    hairTexture: "Curly",
  },
  {
    id: 6,
    name: "Blonde Highlight Lace Front Wig",
    price: 179.99,
    originalPrice: 219.99,
    rating: 4.8,
    reviewCount: 64,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/blonde-highlight-wig",
    hairType: "Blend",
    hairLength: "16 inches",
    hairTexture: "Straight",
  },
  {
    id: 7,
    name: "Glueless Full Lace Wig",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.9,
    reviewCount: 42,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/glueless-full-lace-wig",
    hairType: "Human Hair",
    hairLength: "24 inches",
    hairTexture: "Body Wave",
  },
  {
    id: 8,
    name: "Kinky Curly 360 Lace Wig",
    price: 169.99,
    originalPrice: 209.99,
    rating: 4.7,
    reviewCount: 57,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/kinky-curly-360-lace-wig",
    hairType: "Human Hair",
    hairLength: "18 inches",
    hairTexture: "Kinky Curly",
  },
  {
    id: 9,
    name: "Synthetic Bob Wig",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.3,
    reviewCount: 38,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/synthetic-bob-wig",
    hairType: "Synthetic Hair",
    hairLength: "12 inches",
    hairTexture: "Straight",
  },
  {
    id: 10,
    name: "Long Wavy Synthetic Wig",
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.2,
    reviewCount: 45,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/long-wavy-synthetic-wig",
    hairType: "Synthetic Hair",
    hairLength: "26 inches",
    hairTexture: "Body Wave",
  },
  {
    id: 11,
    name: "Mixed Blend Curly Wig",
    price: 139.99,
    originalPrice: 169.99,
    rating: 4.4,
    reviewCount: 32,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/mixed-blend-curly-wig",
    hairType: "Blend",
    hairLength: "20 inches",
    hairTexture: "Curly",
  },
  {
    id: 12,
    name: "Extra Long Kinky Straight Wig",
    price: 209.99,
    originalPrice: 259.99,
    rating: 4.8,
    reviewCount: 29,
    image: "/placeholder.svg?height=400&width=300",
    href: "/product/extra-long-kinky-straight-wig",
    hairType: "Human Hair",
    hairLength: "30 inches",
    hairTexture: "Kinky Curly",
  },
]

export default function WigsPage() {
  const [products, setProducts] = useState(allProducts)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [hairTypes, setHairTypes] = useState<string[]>([])
  const [hairLengths, setHairLengths] = useState<string[]>([])
  const [hairTextures, setHairTextures] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("featured")

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
  const applyFilters = () => {
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
  }

  // Apply filters when any filter changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    applyFilters()
  }, [sortOption])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Wigs Collection</h1>

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
              products.map((product) => <ProductCard key={product.id} product={product} />)
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
        </div>
      </div>
    </div>
  )
}

