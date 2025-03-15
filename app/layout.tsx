import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AnnouncementBar from "@/components/announcement-bar"
import CouponFloat from "@/components/coupon-float"
import ChatWidget from "@/components/chat-widget"
import { CartProvider } from "@/context/cart-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nadula Hair - Premium Wigs & Hair Products",
  description: "Shop premium wigs, hair bundles, closures, and frontals at Nadula Hair.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfairDisplay.variable}`}>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <CartProvider>
            <AnnouncementBar />
            <Header />
            <main>{children}</main>
            <Footer />
            <CouponFloat />
            <ChatWidget />
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'