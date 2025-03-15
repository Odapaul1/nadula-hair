"use client"

import { useState } from "react"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Eye, FileText, Truck, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

// Sample order data
const orders = [
  {
    id: "ORD-2023-1001",
    customer: "Jessica Davis",
    email: "jessica.davis@example.com",
    date: "2023-10-15",
    total: 249.99,
    status: "Delivered",
    paymentStatus: "Paid",
    items: 2,
  },
  {
    id: "ORD-2023-1002",
    customer: "Alex Thompson",
    email: "alex.thompson@example.com",
    date: "2023-10-16",
    total: 189.99,
    status: "Processing",
    paymentStatus: "Paid",
    items: 1,
  },
  {
    id: "ORD-2023-1003",
    customer: "Maria Kim",
    email: "maria.kim@example.com",
    date: "2023-10-17",
    total: 299.99,
    status: "Shipped",
    paymentStatus: "Paid",
    items: 1,
  },
  {
    id: "ORD-2023-1004",
    customer: "James Wilson",
    email: "james.wilson@example.com",
    date: "2023-10-18",
    total: 159.99,
    status: "Processing",
    paymentStatus: "Pending",
    items: 1,
  },
  {
    id: "ORD-2023-1005",
    customer: "Sophia Lee",
    email: "sophia.lee@example.com",
    date: "2023-10-19",
    total: 219.99,
    status: "Cancelled",
    paymentStatus: "Refunded",
    items: 1,
  },
  {
    id: "ORD-2023-1006",
    customer: "Michael Brown",
    email: "michael.brown@example.com",
    date: "2023-10-20",
    total: 349.99,
    status: "Delivered",
    paymentStatus: "Paid",
    items: 2,
  },
  {
    id: "ORD-2023-1007",
    customer: "Emma Garcia",
    email: "emma.garcia@example.com",
    date: "2023-10-21",
    total: 179.99,
    status: "Shipped",
    paymentStatus: "Paid",
    items: 1,
  },
  {
    id: "ORD-2023-1008",
    customer: "David Martinez",
    email: "david.martinez@example.com",
    date: "2023-10-22",
    total: 259.99,
    status: "Processing",
    paymentStatus: "Paid",
    items: 2,
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [viewOrderId, setViewOrderId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  // Apply filters to orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPayment = paymentFilter === "all" || order.paymentStatus.toLowerCase() === paymentFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesPayment
  })

  const handleExportOrders = () => {
    // Create CSV content
    const headers = ["Order ID", "Customer", "Email", "Date", "Total", "Status", "Payment Status"]
    const ordersToExport =
      selectedOrders.length > 0 ? filteredOrders.filter((order) => selectedOrders.includes(order.id)) : filteredOrders

    const csvContent = [
      headers.join(","),
      ...ordersToExport.map((order) =>
        [order.id, order.customer, order.email, order.date, order.total, order.status, order.paymentStatus].join(","),
      ),
    ].join("\n")

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `orders-export-${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const toggleOrderSelection = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    } else {
      setSelectedOrders([...selectedOrders, orderId])
    }
  }

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800"
      case "Shipped":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Refunded":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const viewOrder = orders.find((order) => order.id === viewOrderId)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <Button className="flex items-center gap-1" onClick={handleExportOrders}>
          <FileText className="h-4 w-4" />
          Export Orders
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Payment Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer">
                  Date
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1 cursor-pointer">
                  Total
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => toggleOrderSelection(order.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPaymentStatusBadgeColor(order.paymentStatus)}>{order.paymentStatus}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog open={viewOrderId === order.id} onOpenChange={(open) => !open && setViewOrderId(null)}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setViewOrderId(order.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            Download Invoice
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Truck className="h-4 w-4 mr-2" />
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Order Details - {viewOrder?.id}</DialogTitle>
                          <DialogDescription>View and manage order information.</DialogDescription>
                        </DialogHeader>

                        {viewOrder && (
                          <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Customer Information</h3>
                                <p className="font-medium">{viewOrder.customer}</p>
                                <p className="text-sm">{viewOrder.email}</p>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-muted-foreground">Order Information</h3>
                                <p className="font-medium">Date: {viewOrder.date}</p>
                                <div className="flex gap-2 mt-1">
                                  <Badge className={getStatusBadgeColor(viewOrder.status)}>{viewOrder.status}</Badge>
                                  <Badge className={getPaymentStatusBadgeColor(viewOrder.paymentStatus)}>
                                    {viewOrder.paymentStatus}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <Separator />

                            <div>
                              <h3 className="text-sm font-medium mb-2">Order Items</h3>
                              <div className="rounded-md border">
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Product</TableHead>
                                      <TableHead>Quantity</TableHead>
                                      <TableHead>Price</TableHead>
                                      <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>13x4 HD Lace Frontal Wig Body Wave</TableCell>
                                      <TableCell>1</TableCell>
                                      <TableCell>$159.99</TableCell>
                                      <TableCell className="text-right">$159.99</TableCell>
                                    </TableRow>
                                    {viewOrder.items > 1 && (
                                      <TableRow>
                                        <TableCell>Wig Care Kit</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>$90.00</TableCell>
                                        <TableCell className="text-right">$90.00</TableCell>
                                      </TableRow>
                                    )}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${viewOrder.total.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>$0.00</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tax</span>
                                <span>$0.00</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${viewOrder.total.toFixed(2)}</span>
                              </div>
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setViewOrderId(null)}>
                                Close
                              </Button>
                              <Button>Update Order</Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

