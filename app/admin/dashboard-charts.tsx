"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RecentSales } from "@/components/admin/recent-sales"

// Use dynamic import with SSR disabled for charts to ensure they render properly
const Overview = dynamic(() => import("@/components/admin/overview").then((mod) => mod.Overview), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full flex items-center justify-center">
      <p className="text-muted-foreground">Loading charts...</p>
    </div>
  ),
})

export default function DashboardCharts() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
          <CardDescription>Sales overview for the current year.</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          {isClient ? (
            <Overview />
          ) : (
            <div className="h-[300px] w-full flex items-center justify-center">
              <p className="text-muted-foreground">Loading charts...</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>Latest transactions from customers.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>
    </div>
  )
}

