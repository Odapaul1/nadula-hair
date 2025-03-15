"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { FileText, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample data for reports
const sampleSalesData = [
  { date: "2023-10-01", product: "HD Lace Wig", quantity: 2, revenue: 399.98 },
  { date: "2023-10-02", product: "Bye Bye Knots", quantity: 1, revenue: 189.99 },
  // Add more sample data as needed
]

const sampleInventoryData = [
  { product: "HD Lace Wig", inStock: 45, reorderPoint: 10, lastRestocked: "2023-10-01" },
  { product: "Bye Bye Knots", inStock: 32, reorderPoint: 8, lastRestocked: "2023-10-05" },
  // Add more sample data as needed
]

const sampleCustomerData = [
  { id: "CUST001", name: "Jessica Davis", totalOrders: 5, totalSpent: 1249.95, lastOrder: "2023-10-15" },
  { id: "CUST002", name: "Alex Thompson", totalOrders: 3, totalSpent: 569.97, lastOrder: "2023-10-16" },
  // Add more sample data as needed
]

export default function ReportsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [reportType, setReportType] = useState("sales")
  const { toast } = useToast()

  const generateCSV = (data: any[], filename: string) => {
    // Convert data to CSV format
    const headers = Object.keys(data[0])
    const csvContent = [headers.join(","), ...data.map((row) => headers.map((header) => row[header]).join(","))].join(
      "\n",
    )

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Report Downloaded",
      description: `${filename} has been downloaded successfully.`,
    })
  }

  const generateReport = () => {
    switch (reportType) {
      case "sales":
        generateCSV(sampleSalesData, "sales-report")
        break
      case "products":
        generateCSV(
          sampleSalesData.filter((item) => date && new Date(item.date) <= date),
          "product-sales-report",
        )
        break
      case "categories":
        generateCSV(
          sampleSalesData.filter((item) => date && new Date(item.date) <= date),
          "category-sales-report",
        )
        break
      default:
        break
    }
  }

  const downloadInventoryReport = () => {
    generateCSV(sampleInventoryData, "inventory-report")
  }

  const downloadCustomerReport = () => {
    generateCSV(sampleCustomerData, "customer-report")
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Sales Report</CardTitle>
            <CardDescription>Generate detailed sales reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Summary</SelectItem>
                <SelectItem value="products">Product Sales</SelectItem>
                <SelectItem value="categories">Category Sales</SelectItem>
              </SelectContent>
            </Select>
            <div className="rounded-md border">
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
            </div>
            <Button className="w-full" onClick={generateReport}>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Report</CardTitle>
            <CardDescription>Stock levels and inventory movement</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={downloadInventoryReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Inventory Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Report</CardTitle>
            <CardDescription>Customer behavior and demographics</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline" onClick={downloadCustomerReport}>
              <Download className="mr-2 h-4 w-4" />
              Download Customer Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

