"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import { Heart, BookOpen, Users, Church, GraduationCap, Globe } from "lucide-react"
import { Banner } from "@/components/banner"

export default function DonatePage() {
  const [donationAmount, setDonationAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [donationFrequency, setDonationFrequency] = useState("one-time")

  const handleDonationAmountChange = (value: string) => {
    setDonationAmount(value)
    if (value !== "custom") {
      setCustomAmount("")
    }
  }

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically process the payment
    const amount = donationAmount === "custom" ? customAmount : donationAmount
    console.log({
      amount,
      frequency: donationFrequency,
      paymentMethod,
    })

    // Show success message
    toast({
      title: "Thank you for your donation!",
      description: "Your support helps our fellowship thrive.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Banner title="Support Our Fellowship" subTitle="Your generous donations help us continue our mission of building a Christ-centered community on campus."/>

      {/* Donation Form */}
      <section className="py-16 px-4 md:px-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Make a Donation</h2>
              <p className="text-muted-foreground mb-8">
                Your financial support enables us to organize events, provide resources, and create meaningful
                experiences for students. Every contribution, no matter the size, makes a difference.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label>Donation Frequency</Label>
                  <RadioGroup
                    defaultValue="one-time"
                    value={donationFrequency}
                    onValueChange={setDonationFrequency}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-time" id="one-time" />
                      <Label htmlFor="one-time" className="cursor-pointer">
                        One-time
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly" className="cursor-pointer">
                        Monthly
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="quarterly" id="quarterly" />
                      <Label htmlFor="quarterly" className="cursor-pointer">
                        Quarterly
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="annually" id="annually" />
                      <Label htmlFor="annually" className="cursor-pointer">
                        Annually
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label>Donation Amount</Label>
                  <RadioGroup
                    value={donationAmount}
                    onValueChange={handleDonationAmountChange}
                    className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                  >
                    <div className="flex">
                      <Label
                        htmlFor="amount-100"
                        className="flex-1 cursor-pointer rounded-md border border-input bg-background px-4 py-3 text-center font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        <RadioGroupItem value="100" id="amount-100" className="sr-only" />
                        $100
                      </Label>
                    </div>
                    <div className="flex">
                      <Label
                        htmlFor="amount-50"
                        className="flex-1 cursor-pointer rounded-md border border-input bg-background px-4 py-3 text-center font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        <RadioGroupItem value="50" id="amount-50" className="sr-only" />
                        $50
                      </Label>
                    </div>
                    <div className="flex">
                      <Label
                        htmlFor="amount-25"
                        className="flex-1 cursor-pointer rounded-md border border-input bg-background px-4 py-3 text-center font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        <RadioGroupItem value="25" id="amount-25" className="sr-only" />
                        $25
                      </Label>
                    </div>
                    <div className="flex">
                      <Label
                        htmlFor="amount-10"
                        className="flex-1 cursor-pointer rounded-md border border-input bg-background px-4 py-3 text-center font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        <RadioGroupItem value="10" id="amount-10" className="sr-only" />
                        $10
                      </Label>
                    </div>
                    <div className="flex">
                      <Label
                        htmlFor="amount-5"
                        className="flex-1 cursor-pointer rounded-md border border-input bg-background px-4 py-3 text-center font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        <RadioGroupItem value="5" id="amount-5" className="sr-only" />
                        $5
                      </Label>
                    </div>
                    <div className="flex">
                      <Label
                        htmlFor="amount-custom"
                        className="flex-1 cursor-pointer rounded-md border border-input bg-background px-4 py-3 text-center font-medium ring-offset-background hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10"
                      >
                        <RadioGroupItem value="custom" id="amount-custom" className="sr-only" />
                        Custom
                      </Label>
                    </div>
                  </RadioGroup>

                  {donationAmount === "custom" && (
                    <div className="flex items-center">
                      <span className="mr-2 text-lg">$</span>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        min="1"
                        step="1"
                        required
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label>Payment Method</Label>
                  <Tabs defaultValue="card" onValueChange={setPaymentMethod} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
                      <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                    </TabsList>
                    <TabsContent value="card" className="space-y-4 pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" required />
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="mobile" className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobileProvider">Mobile Provider</Label>
                        <Select>
                          <SelectTrigger id="mobileProvider">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="telebirr">TeleBirr</SelectItem>
                            <SelectItem value="cbe">CBE Birr</SelectItem>
                            <SelectItem value="amole">Amole</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mobileNumber">Mobile Number</Label>
                        <Input id="mobileNumber" placeholder="09xxxxxxxx" required />
                      </div>
                    </TabsContent>
                    <TabsContent value="bank" className="space-y-4 pt-4">
                      <div className="p-4 bg-muted rounded-md">
                        <p className="font-medium mb-2">Bank Transfer Details:</p>
                        <p className="text-sm text-muted-foreground">Account Name: AASTU FOCUS Fellowship</p>
                        <p className="text-sm text-muted-foreground">Bank: Commercial Bank of Ethiopia</p>
                        <p className="text-sm text-muted-foreground">Account Number: 1000123456789</p>
                        <p className="text-sm text-muted-foreground">Branch: AASTU Branch</p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Please include your name and "Donation" in the transfer description.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="transferReference">Transfer Reference (if already completed)</Label>
                        <Input id="transferReference" placeholder="Optional" />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  {donationFrequency === "one-time" ? "Donate" : "Start Recurring Donation"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your donation is secure and encrypted. By donating, you agree to our terms and privacy policy.
                </p>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">How Your Donation Helps</h2>
                <div className="space-y-4">
                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Bible Study Resources</h3>
                        <p className="text-muted-foreground">
                          Provides study materials, books, and resources for our Bible study groups.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Fellowship Events</h3>
                        <p className="text-muted-foreground">
                          Supports weekly gatherings, special events, and community-building activities.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Church className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Worship Equipment</h3>
                        <p className="text-muted-foreground">
                          Helps purchase and maintain instruments, sound equipment, and worship resources.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Heart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Outreach Projects</h3>
                        <p className="text-muted-foreground">
                          Funds community service initiatives and outreach programs on campus and beyond.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Leadership Development</h3>
                        <p className="text-muted-foreground">
                          Supports training, conferences, and resources for student leadership development.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Mission Trips</h3>
                        <p className="text-muted-foreground">
                          Helps fund local and international mission trips and service opportunities.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-4">Donation Impact</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span>$5</span>
                    <span>Provides refreshments for one Bible study</span>
                  </p>
                  <p className="flex justify-between">
                    <span>$25</span>
                    <span>Sponsors a student for a local retreat</span>
                  </p>
                  <p className="flex justify-between">
                    <span>$50</span>
                    <span>Funds a community outreach project</span>
                  </p>
                  <p className="flex justify-between">
                    <span>$100</span>
                    <span>Helps purchase worship equipment</span>
                  </p>
                  <p className="flex justify-between">
                    <span>$500</span>
                    <span>Sponsors a leadership training event</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 md:px-10 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Impact of Your Support</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from students whose lives have been impacted by the ministry of AASTU FOCUS
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-card">
              <CardContent className="p-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Testimonial" fill className="object-cover" />
                </div>
                <p className="italic text-muted-foreground mb-4 text-center">
                  "The leadership retreat funded by donors changed my life. I learned valuable skills that I'm now using
                  to serve both in our fellowship and in my community."
                </p>
                <p className="text-center font-medium">Abebe T.</p>
                <p className="text-center text-sm text-muted-foreground">Computer Science, 3rd Year</p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Testimonial" fill className="object-cover" />
                </div>
                <p className="italic text-muted-foreground mb-4 text-center">
                  "Thanks to donor support, our outreach team was able to serve at a local orphanage. Seeing the impact
                  we made on those children's lives was an unforgettable experience."
                </p>
                <p className="text-center font-medium">Selam G.</p>
                <p className="text-center text-sm text-muted-foreground">Civil Engineering, 4th Year</p>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardContent className="p-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                  <Image src="/placeholder.svg?height=100&width=100" alt="Testimonial" fill className="object-cover" />
                </div>
                <p className="italic text-muted-foreground mb-4 text-center">
                  "The worship equipment purchased through donations has transformed our worship nights. We're able to
                  create a more meaningful atmosphere for students to connect with God."
                </p>
                <p className="text-center font-medium">Daniel H.</p>
                <p className="text-center text-sm text-muted-foreground">Music, 3rd Year</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 px-4 md:px-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Other Ways to Support</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Financial donations are just one way to support our fellowship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Volunteer Your Time</h3>
                <p className="text-muted-foreground mb-4">
                  Share your skills and expertise by volunteering as a mentor, speaker, or advisor to our fellowship.
                </p>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Donate Resources</h3>
                <p className="text-muted-foreground mb-4">
                  Contribute books, equipment, or other resources that can benefit our fellowship activities.
                </p>
                <Button asChild variant="outline">
                  <Link href="/contact">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">Pray for Us</h3>
                <p className="text-muted-foreground mb-4">
                  Support our fellowship through prayer for our members, leaders, and activities.
                </p>
                <Button asChild variant="outline">
                  <Link href="/contact">Prayer Requests</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-10 bg-primary-gradient text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Make a Difference Today</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Your support helps us build a vibrant Christian community at AASTU. Every contribution makes a difference.
          </p>
          <Button asChild size="lg" variant="secondary">
            <a href="#top">Donate Now</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
