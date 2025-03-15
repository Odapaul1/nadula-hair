"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Sample data for charts
const revenueData = [
  { name: "Mon", value: 12000 },
  { name: "Tue", value: 19000 },
  { name: "Wed", value: 22000 },
  { name: "Thu", value: 20000 },
  { name: "Fri", value: 18000 },
  { name: "Sat", value: 24000 },
  { name: "Sun", value: 25000 },
]

const guestsData = [
  { name: "Mon", value: 4200 },
  { name: "Tue", value: 5800 },
  { name: "Wed", value: 7500 },
  { name: "Thu", value: 6300 },
  { name: "Fri", value: 5400 },
  { name: "Sat", value: 7800 },
  { name: "Sun", value: 8900 },
]

const roomsData = [
  { name: "Mon", occupied: 35, booked: 15, available: 10 },
  { name: "Tue", occupied: 42, booked: 18, available: 5 },
  { name: "Wed", occupied: 38, booked: 20, available: 7 },
  { name: "Thu", occupied: 45, booked: 15, available: 5 },
  { name: "Fri", occupied: 40, booked: 20, available: 5 },
  { name: "Sat", occupied: 30, booked: 25, available: 10 },
  { name: "Sun", occupied: 35, booked: 20, available: 10 },
]

export function Overview() {
  const [timeframe, setTimeframe] = useState("week")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Short delay to ensure DOM is ready before rendering charts
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) {
    return (
      <div className="h-[300px] w-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading charts...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end mb-4">
        <div className="flex bg-muted rounded-md overflow-hidden">
          <button
            onClick={() => setTimeframe("day")}
            className={`px-3 py-1 text-sm ${timeframe === "day" ? "bg-primary text-white" : "hover:bg-muted-foreground/10"}`}
          >
            Day
          </button>
          <button
            onClick={() => setTimeframe("week")}
            className={`px-3 py-1 text-sm ${timeframe === "week" ? "bg-primary text-white" : "hover:bg-muted-foreground/10"}`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeframe("month")}
            className={`px-3 py-1 text-sm ${timeframe === "month" ? "bg-primary text-white" : "hover:bg-muted-foreground/10"}`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <h4 className="text-sm font-medium mb-2">Revenue</h4>
          <div style={{ width: "100%", height: 250, minHeight: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Guests Chart */}
        <div className="p-4 bg-white rounded-lg border shadow-sm">
          <h4 className="text-sm font-medium mb-2">Customers</h4>
          <div style={{ width: "100%", height: 250, minHeight: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={guestsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rooms/Products Chart */}
        <div className="p-4 bg-white rounded-lg border shadow-sm lg:col-span-2">
          <h4 className="text-sm font-medium mb-2">Products Status</h4>
          <div style={{ width: "100%", height: 250, minHeight: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roomsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="occupied" name="In Stock" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="booked" name="Reserved" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="available" name="Low Stock" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview

