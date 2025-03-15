"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/context/cart-context"

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState<"shipping" | "payment" | "review">("shipping")
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  const { items, subtotal, clearCart } = useCart()

  const shipping = shippingMethod === "express" ? 19.99 : shippingMethod === "standard" ? 9.99 : 0
  const tax = subtotal * 0.08 // 8% tax rate
  const total = subtotal + shipping + tax

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate shipping info
    if (
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.email ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.zipCode
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }
    setActiveStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveStep("review")
  }

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false)
      clearCart() // Clear the cart after successful order
      toast({
        title: "Order Placed Successfully!",
        description: "Your order has been placed and will be processed shortly.",
      })
      // Redirect to order confirmation page
      window.location.href = "/order-confirmation"
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/cart" className="flex items-center text-gray-600 hover:text-[#2952b2]">
          <ArrowLeft className="h-4 w-4 mr-2" />
          <span>Back to Cart</span>
        </Link>
        <h1 className="text-3xl font-bold ml-auto">Checkout</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs value={activeStep} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="shipping" disabled={activeStep !== "shipping"}>
                Shipping
              </TabsTrigger>
              <TabsTrigger value="payment" disabled={activeStep !== "payment" && activeStep !== "review"}>
                Payment
              </TabsTrigger>
              <TabsTrigger value="review" disabled={activeStep !== "review"}>
                Review
              </TabsTrigger>
            </TabsList>

            {/* Shipping Information */}
            <TabsContent value="shipping" className="mt-6">
              <form onSubmit={handleShippingSubmit}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={shippingInfo.phone}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingInfoChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleShippingInfoChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State/Province *</Label>
                          <Input
                            id="state"
                            name="state"
                            value={shippingInfo.state}
                            onChange={handleShippingInfoChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">Zip/Postal Code *</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={shippingInfo.zipCode}
                            onChange={handleShippingInfoChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country *</Label>
                          <Input
                            id="country"
                            name="country"
                            value={shippingInfo.country}
                            onChange={handleShippingInfoChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
                      <div className="flex items-center justify-between border rounded-md p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard" className="font-medium">
                            Standard Shipping (3-5 business days)
                          </Label>
                        </div>
                        <div className="font-medium">$9.99</div>
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express" className="font-medium">
                            Express Shipping (1-2 business days)
                          </Label>
                        </div>
                        <div className="font-medium">$19.99</div>
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="free" id="free" />
                          <Label htmlFor="free" className="font-medium">
                            Free Shipping (5-7 business days)
                          </Label>
                        </div>
                        <div className="font-medium">$0.00</div>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="bg-[#2952b2] hover:bg-[#1e3c7b]">
                      Continue to Payment
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>

            {/* Payment Information */}
            <TabsContent value="payment" className="mt-6">
              <form onSubmit={handlePaymentSubmit}>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center justify-between border rounded-md p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="font-medium flex items-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            Credit / Debit Card
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="font-medium">
                            PayPal
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="afterpay" id="afterpay" />
                          <Label htmlFor="afterpay" className="font-medium">
                            AfterPay / Klarna
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "credit-card" && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-xl font-semibold mb-4">Card Information</h2>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input id="expiryDate" placeholder="MM/YY" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="nameOnCard">Name on Card</Label>
                            <Input id="nameOnCard" placeholder="John Doe" />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                    <div className="flex items-center space-x-2 mb-4">
                      <input type="checkbox" id="sameAsShipping" defaultChecked />
                      <Label htmlFor="sameAsShipping">Same as shipping address</Label>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                    <div className="space-y-2">
                      <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                      <Textarea id="orderNotes" placeholder="Special instructions for delivery" />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => setActiveStep("shipping")}>
                      Back to Shipping
                    </Button>
                    <Button type="submit" className="bg-[#2952b2] hover:bg-[#1e3c7b]">
                      Review Order
                    </Button>
                  </div>
                </div>
              </form>
            </TabsContent>

            {/* Order Review */}
            <TabsContent value="review" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Shipping Information</h3>
                      <p>
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                      </p>
                      <p>{shippingInfo.country}</p>
                      <p className="mt-2">
                        <span className="font-medium">Email:</span> {shippingInfo.email}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span> {shippingInfo.phone}
                      </p>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Shipping Method</h3>
                      <p>
                        {shippingMethod === "standard"
                          ? "Standard Shipping (3-5 business days)"
                          : shippingMethod === "express"
                            ? "Express Shipping (1-2 business days)"
                            : "Free Shipping (5-7 business days)"}
                      </p>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p>
                        {paymentMethod === "credit-card"
                          ? "Credit / Debit Card"
                          : paymentMethod === "paypal"
                            ? "PayPal"
                            : "AfterPay / Klarna"}
                      </p>
                    </div>

                    <div className="border rounded-md p-4">
                      <h3 className="font-medium mb-2">Order Items</h3>
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.options}</p>
                                <p className="text-sm text-gray-500">
                                  Qty: {item.quantity} x ${item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setActiveStep("payment")}>
                    Back to Payment
                  </Button>
                  <Button
                    type="button"
                    className="bg-[#2952b2] hover:bg-[#1e3c7b]"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 space-y-6 sticky top-6">
            <h2 className="text-lg font-medium">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-medium">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-4">
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex items-center text-blue-800">
                  <Check className="h-4 w-4 mr-2" />
                  <p className="text-sm">Your order qualifies for free shipping!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

