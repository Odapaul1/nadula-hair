import Link from "next/link"
import { Mail, Phone, Instagram, Facebook, Twitter, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Nadula</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" prefetch={true} className="text-gray-600 hover:text-[#2952b2]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch={true} className="text-gray-600 hover:text-[#2952b2]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/blog" prefetch={true} className="text-gray-600 hover:text-[#2952b2]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/wholesale" prefetch={true} className="text-gray-600 hover:text-[#2952b2]">
                  Wholesale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" prefetch={true} className="text-gray-600 hover:text-[#2952b2]">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" prefetch={true} className="text-gray-600 hover:text-[#2952b2]">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" prefetch={true} className="text-gray-600 hover:text-[#2952b2]">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" prefetch={true} className="text-gray-600 hover:text-[#2952b2]">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-600" />
                <a href="mailto:info@nadula.com" className="text-gray-600 hover:text-[#2952b2]">
                  info@nadula.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-600" />
                <a href="tel:+1234567890" className="text-gray-600 hover:text-[#2952b2]">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>

            <div className="mt-4 flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-600 hover:text-[#2952b2]" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-600 hover:text-[#2952b2]" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-600 hover:text-[#2952b2]" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube className="h-5 w-5 text-gray-600 hover:text-[#2952b2]" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">Subscribe to get special offers, free giveaways, and new arrivals.</p>
            <div className="flex space-x-2">
              <Input type="email" placeholder="Your email" className="rounded-l-md" />
              <Button className="bg-[#2952b2] hover:bg-[#1e3c7b]">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Nadula Hair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

