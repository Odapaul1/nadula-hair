"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample promotions data
const initialPromotions = [
  {
    id: 1,
    name: "Summer Sale",
    code: "SUMMER23",
    discount: 20,
    type: "percentage",
    status: "active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    usageCount: 156,
  },
  {
    id: 2,
    name: "First Purchase",
    code: "WELCOME",
    discount: 15,
    type: "percentage",
    status: "active",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    usageCount: 342,
  },
  // Add more promotions as needed
]

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState(initialPromotions)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newPromotion, setNewPromotion] = useState({
    name: "",
    code: "",
    discount: "",
    startDate: "",
    endDate: "",
  })

  const filteredPromotions = promotions.filter(
    (promotion) =>
      promotion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promotion.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPromotion = () => {
    setPromotions([
      ...promotions,
      {
        id: promotions.length + 1,
        ...newPromotion,
        discount: Number(newPromotion.discount),
        type: "percentage",
        status: "active",
        usageCount: 0,
      },
    ])
    setNewPromotion({ name: "", code: "", discount: "", startDate: "", endDate: "" })
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Promotions</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <Plus className="h-4 w-4" />
              Add Promotion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Promotion</DialogTitle>
              <DialogDescription>Create a new promotional discount code.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Promotion Name</Label>
                  <Input
                    id="name"
                    value={newPromotion.name}
                    onChange={(e) => setNewPromotion({ ...newPromotion, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Discount Code</Label>
                  <Input
                    id="code"
                    value={newPromotion.code}
                    onChange={(e) => setNewPromotion({ ...newPromotion, code: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discount">Discount Percentage</Label>
                <Input
                  id="discount"
                  type="number"
                  value={newPromotion.discount}
                  onChange={(e) => setNewPromotion({ ...newPromotion, discount: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newPromotion.startDate}
                    onChange={(e) => setNewPromotion({ ...newPromotion, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newPromotion.endDate}
                    onChange={(e) => setNewPromotion({ ...newPromotion, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPromotion}>Save Promotion</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Promotions</CardTitle>
          <CardDescription>Create and manage promotional discounts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search promotions..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPromotions.map((promotion) => (
                  <TableRow key={promotion.id}>
                    <TableCell className="font-medium">{promotion.name}</TableCell>
                    <TableCell>
                      <code className="rounded bg-muted px-2 py-1">{promotion.code}</code>
                    </TableCell>
                    <TableCell>{promotion.discount}%</TableCell>
                    <TableCell>
                      <Badge variant={promotion.status === "active" ? "default" : "secondary"}>
                        {promotion.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {promotion.startDate} - {promotion.endDate}
                    </TableCell>
                    <TableCell>{promotion.usageCount}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

