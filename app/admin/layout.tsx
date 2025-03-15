import type { ReactNode } from "react"
import Link from "next/link"
import { BarChart3, Package, ShoppingCart, Users, Settings, ImageIcon, Tag, LayoutGrid, LogOut } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
        <Link href="/admin" prefetch={true} className="flex items-center gap-2 font-semibold">
          <Package className="h-6 w-6" />
          <span>Nadula Admin</span>
        </Link>
        <nav className="ml-auto flex items-center gap-4">
          <Link href="/" prefetch={true} className="text-sm text-muted-foreground hover:text-foreground">
            View Store
          </Link>
          <Link href="/admin" prefetch={true} className="text-sm font-medium text-primary hover:text-primary/80">
            Admin Home
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </nav>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-muted/40">
          <nav className="grid gap-2 p-4">
            <Link
              href="/admin"
              prefetch={true}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/admin/products"
              prefetch={true}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
            <Link
              href="/admin/orders"
              prefetch={true}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
            </Link>
            <Link
              href="/admin/customers"
              prefetch={true}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Users className="h-4 w-4" />
              Customers
            </Link>
            <Separator className="my-2" />
            <Link
              href="/admin/categories"
              prefetch={true}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LayoutGrid className="h-4 w-4" />
              Categories
            </Link>
            <Link
              href="/admin/promotions"
              prefetch={true}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Tag className="h-4 w-4" />
              Promotions
            </Link>
            <Link
              href="/admin/media"
              prefetch={true}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ImageIcon className="h-4 w-4" />
              Media
            </Link>
            <Link
              href="/admin/settings"
              prefetch={true}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

