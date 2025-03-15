"use client"

import type React from "react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SettingsPage() {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Nadula Hair",
    storeEmail: "info@nadula.com",
    storePhone: "+1 (234) 567-890",
    storeAddress: "123 Commerce St, Suite 100, New York, NY 10001",
    storeCurrency: "USD",
    storeLanguage: "en",
    storeTimeZone: "America/New_York",
  })

  const [paymentSettings, setPaymentSettings] = useState({
    enablePaypal: true,
    enableStripe: true,
    enableAfterPay: true,
    enableCashOnDelivery: false,
    taxRate: 8.5,
  })

  const [shippingSettings, setShippingSettings] = useState({
    freeShippingThreshold: 99,
    standardShippingRate: 9.99,
    expressShippingRate: 19.99,
    internationalShippingRate: 29.99,
    enableInternationalShipping: true,
  })

  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setStoreSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentToggle = (name: string, checked: boolean) => {
    setPaymentSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentSettings((prev) => ({ ...prev, [name]: Number.parseFloat(value) }))
  }

  const handleShippingToggle = (name: string, checked: boolean) => {
    setShippingSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingSettings((prev) => ({ ...prev, [name]: Number.parseFloat(value) }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your store settings and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Update your store details and contact information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    value={storeSettings.storeName}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email Address</Label>
                  <Input
                    id="storeEmail"
                    name="storeEmail"
                    type="email"
                    value={storeSettings.storeEmail}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input
                    id="storePhone"
                    name="storePhone"
                    value={storeSettings.storePhone}
                    onChange={handleStoreSettingsChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeCurrency">Currency</Label>
                  <Select
                    value={storeSettings.storeCurrency}
                    onValueChange={(value) => setStoreSettings((prev) => ({ ...prev, storeCurrency: value }))}
                  >
                    <SelectTrigger id="storeCurrency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeAddress">Store Address</Label>
                <Textarea
                  id="storeAddress"
                  name="storeAddress"
                  value={storeSettings.storeAddress}
                  onChange={handleStoreSettingsChange}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeLanguage">Default Language</Label>
                  <Select
                    value={storeSettings.storeLanguage}
                    onValueChange={(value) => setStoreSettings((prev) => ({ ...prev, storeLanguage: value }))}
                  >
                    <SelectTrigger id="storeLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeTimeZone">Time Zone</Label>
                  <Select
                    value={storeSettings.storeTimeZone}
                    onValueChange={(value) => setStoreSettings((prev) => ({ ...prev, storeTimeZone: value }))}
                  >
                    <SelectTrigger id="storeTimeZone">
                      <SelectValue placeholder="Select time zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize your store for search engines.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input id="metaTitle" placeholder="Enter meta title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea id="metaDescription" placeholder="Enter meta description" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input id="keywords" placeholder="Enter keywords separated by commas" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Configure the payment methods available to your customers.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enablePaypal">PayPal</Label>
                  <p className="text-sm text-muted-foreground">Allow customers to pay with PayPal.</p>
                </div>
                <Switch
                  id="enablePaypal"
                  checked={paymentSettings.enablePaypal}
                  onCheckedChange={(checked) => handlePaymentToggle("enablePaypal", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableStripe">Stripe</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow customers to pay with credit/debit cards via Stripe.
                  </p>
                </div>
                <Switch
                  id="enableStripe"
                  checked={paymentSettings.enableStripe}
                  onCheckedChange={(checked) => handlePaymentToggle("enableStripe", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableAfterPay">AfterPay / Klarna</Label>
                  <p className="text-sm text-muted-foreground">Allow customers to buy now and pay later.</p>
                </div>
                <Switch
                  id="enableAfterPay"
                  checked={paymentSettings.enableAfterPay}
                  onCheckedChange={(checked) => handlePaymentToggle("enableAfterPay", checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableCashOnDelivery">Cash on Delivery</Label>
                  <p className="text-sm text-muted-foreground">Allow customers to pay when they receive their order.</p>
                </div>
                <Switch
                  id="enableCashOnDelivery"
                  checked={paymentSettings.enableCashOnDelivery}
                  onCheckedChange={(checked) => handlePaymentToggle("enableCashOnDelivery", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Configure tax rates and settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  name="taxRate"
                  type="number"
                  value={paymentSettings.taxRate}
                  onChange={handlePaymentChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="enableTaxCalculation" defaultChecked />
                <Label htmlFor="enableTaxCalculation">Enable automatic tax calculation</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Options</CardTitle>
              <CardDescription>Configure shipping rates and delivery options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="freeShippingThreshold">Free Shipping Threshold ($)</Label>
                <Input
                  id="freeShippingThreshold"
                  name="freeShippingThreshold"
                  type="number"
                  value={shippingSettings.freeShippingThreshold}
                  onChange={handleShippingChange}
                />
                <p className="text-sm text-muted-foreground">Orders above this amount qualify for free shipping.</p>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Shipping Rates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="standardShippingRate">Standard Shipping ($)</Label>
                    <Input
                      id="standardShippingRate"
                      name="standardShippingRate"
                      type="number"
                      value={shippingSettings.standardShippingRate}
                      onChange={handleShippingChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expressShippingRate">Express Shipping ($)</Label>
                    <Input
                      id="expressShippingRate"
                      name="expressShippingRate"
                      type="number"
                      value={shippingSettings.expressShippingRate}
                      onChange={handleShippingChange}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enableInternationalShipping">International Shipping</Label>
                  <p className="text-sm text-muted-foreground">Allow shipping to international addresses.</p>
                </div>
                <Switch
                  id="enableInternationalShipping"
                  checked={shippingSettings.enableInternationalShipping}
                  onCheckedChange={(checked) => handleShippingToggle("enableInternationalShipping", checked)}
                />
              </div>

              {shippingSettings.enableInternationalShipping && (
                <div className="space-y-2">
                  <Label htmlFor="internationalShippingRate">International Shipping Rate ($)</Label>
                  <Input
                    id="internationalShippingRate"
                    name="internationalShippingRate"
                    type="number"
                    value={shippingSettings.internationalShippingRate}
                    onChange={handleShippingChange}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Configure email notifications for orders and customer interactions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderConfirmation">Order Confirmation</Label>
                  <p className="text-sm text-muted-foreground">Send email when an order is placed.</p>
                </div>
                <Switch id="orderConfirmation" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="shippingConfirmation">Shipping Confirmation</Label>
                  <p className="text-sm text-muted-foreground">Send email when an order is shipped.</p>
                </div>
                <Switch id="shippingConfirmation" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="abandonedCart">Abandoned Cart</Label>
                  <p className="text-sm text-muted-foreground">Send email when a customer abandons their cart.</p>
                </div>
                <Switch id="abandonedCart" defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="stockNotification">Low Stock Notification</Label>
                  <p className="text-sm text-muted-foreground">Send email when product stock is low.</p>
                </div>
                <Switch id="stockNotification" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Admin Users</CardTitle>
              <CardDescription>Manage admin users and permissions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Admin User</TableCell>
                      <TableCell>admin@nadula.com</TableCell>
                      <TableCell>Administrator</TableCell>
                      <TableCell>2023-10-25 09:15 AM</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Store Manager</TableCell>
                      <TableCell>manager@nadula.com</TableCell>
                      <TableCell>Manager</TableCell>
                      <TableCell>2023-10-24 03:45 PM</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Content Editor</TableCell>
                      <TableCell>editor@nadula.com</TableCell>
                      <TableCell>Editor</TableCell>
                      <TableCell>2023-10-23 11:30 AM</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Add New User</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

