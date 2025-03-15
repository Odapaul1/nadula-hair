"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag, User, Menu, Mail, X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"

// Updated navigation with Home menu
const navigation = [
  { name: "Home", href: "/" },
  { name: "Collection", href: "/collection" },
  { name: "Wigs", href: "/wigs" },
  { name: "Color", href: "/color" },
  { name: "Hair Style", href: "/hair-style" },
  { name: "Bundles", href: "/bundles" },
  { name: "Closure & Frontal", href: "/closure-frontal" },
  { name: "New Fashion", href: "/new-fashion" },
  { name: "Promotion", href: "/promotion" },
  { name: "Clearance", href: "/clearance" },
  { name: "Brand Events", href: "/brand-events" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { itemCount } = useCart()

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="bg-white">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2 hidden sm:flex" type="button">
              <Image
                src="https://cdn.pixabay.com/photo/2012/04/10/23/04/united-26177_1280.png"
                alt="US Flag"
                width={30}
                height={20}
              />
            </Button>
            <a href="mailto:info@nadula.com" className="text-gray-500 hover:text-[#2952b2] hidden sm:block">
              <Mail className="h-5 w-5 mx-2" />
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-500 hidden sm:block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 mx-2" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <Link href="/" className="flex items-center justify-center">
            <div className="nadula-brand text-2xl sm:text-3xl font-bold">Nadula</div>
          </Link>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} type="button">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/cart" prefetch={true} className="relative">
            <Button variant="ghost" size="icon" type="button">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[#2952b2]">
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/account" prefetch={true} className="hidden sm:block">
            <Button variant="ghost" size="icon" type="button">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/admin" prefetch={true} className="hidden sm:block">
            <Button variant="ghost" size="icon" title="Admin Dashboard" type="button">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-b py-3 px-4 bg-white">
          <div className="max-w-2xl mx-auto relative">
            <Input type="search" placeholder="Search for products..." className="pr-10" autoFocus />
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" type="button">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b bg-white">
        <div className="container mx-auto px-4">
          <ul className="flex items-center justify-center flex-wrap">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  prefetch={true}
                  className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2952b2] hover:bg-gray-50 rounded-md"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-4" type="button">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[350px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Menu</h2>
              <Button variant="ghost" size="icon" onClick={closeMenu}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  prefetch={true}
                  className="text-lg font-medium text-gray-700 hover:text-[#2952b2] py-2 px-4 rounded-md hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 my-4"></div>
              <Link
                href="/account"
                prefetch={true}
                className="text-lg font-medium text-gray-700 hover:text-[#2952b2] py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={closeMenu}
              >
                Account
              </Link>
              <Link
                href="/admin"
                prefetch={true}
                className="text-lg font-medium text-gray-700 hover:text-[#2952b2] py-2 px-4 rounded-md hover:bg-gray-50"
                onClick={closeMenu}
              >
                Admin Dashboard
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

