import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <div className="flex justify-center gap-4">
        <Link href="/" prefetch={true}>
          <Button className="bg-[#2952b2] hover:bg-[#1e3c7b]">Go to Home</Button>
        </Link>
        <Link href="/collection" prefetch={true}>
          <Button variant="outline">Browse Collections</Button>
        </Link>
      </div>
    </div>
  )
}

