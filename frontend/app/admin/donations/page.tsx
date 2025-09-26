"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, DollarSign, TrendingUp, Calendar, Download, Eye, Receipt } from "lucide-react"

export default function DonationsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock donations data
  const donations = [
    {
      id: 1,
      amount: 100,
      donor: "John Doe",
      email: "john.doe@email.com",
      method: "credit_card",
      purpose: "general",
      status: "completed",
      date: "2024-03-20",
      transactionId: "TXN_001",
      anonymous: false,
    },
    {
      id: 2,
      amount: 250,
      donor: "Anonymous",
      email: "anonymous@donor.com",
      method: "bank_transfer",
      purpose: "building_fund",
      status: "completed",
      date: "2024-03-19",
      transactionId: "TXN_002",
      anonymous: true,
    },
    {
      id: 3,
      amount: 50,
      donor: "Sarah Johnson",
      email: "sarah.j@student.aastu.edu.et",
      method: "mobile_money",
      purpose: "missions",
      status: "completed",
      date: "2024-03-18",
      transactionId: "TXN_003",
      anonymous: false,
    },
    {
      id: 4,
      amount: 75,
      donor: "Michael Brown",
      email: "michael.b@email.com",
      method: "credit_card",
      purpose: "youth_ministry",
      status: "pending",
      date: "2024-03-17",
      transactionId: "TXN_004",
      anonymous: false,
    },
    {
      id: 5,
      amount: 500,
      donor: "Grace Wilson",
      email: "grace.w@email.com",
      method: "bank_transfer",
      purpose: "general",
      status: "completed",
      date: "2024-03-16",
      transactionId: "TXN_005",
      anonymous: false,
    },
  ]

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getMethodBadgeVariant = (method: string) => {
    switch (method) {
      case "credit_card":
        return "default"
      case "bank_transfer":
        return "secondary"
      case "mobile_money":
        return "outline"
      default:
        return "outline"
    }
  }

  const getPurposeLabel = (purpose: string) => {
    const labels: { [key: string]: string } = {
      general: "General Fund",
      building_fund: "Building Fund",
      missions: "Missions",
      youth_ministry: "Youth Ministry",
      worship: "Worship Ministry",
      outreach: "Community Outreach",
    }
    return labels[purpose] || purpose
  }

  const filteredDonations = donations.filter(
    (donation) =>
      donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.transactionId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)
  const completedDonations = donations.filter((d) => d.status === "completed")
  const pendingDonations = donations.filter((d) => d.status === "pending")
  const thisMonthDonations = donations.filter((d) => d.date.startsWith("2024-03"))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Donation Management</h1>
          <p className="text-muted-foreground">Track and manage fellowship donations</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Donations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">${thisMonthDonations.reduce((sum, d) => sum + d.amount, 0)}</div>
            </div>
            <p className="text-xs text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{completedDonations.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-yellow-500" />
              <div className="text-2xl font-bold">{pendingDonations.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Donations Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Donations</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search donations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Donations</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="this-month">This Month</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Donor</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDonations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{donation.donor}</div>
                            <div className="text-sm text-muted-foreground">{donation.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">${donation.amount}</div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{getPurposeLabel(donation.purpose)}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getMethodBadgeVariant(donation.method)}>
                            {donation.method.replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(donation.status)}>{donation.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{donation.date}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Receipt className="h-4 w-4 mr-2" />
                                Generate Receipt
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Export
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Other tabs would filter accordingly */}
            <TabsContent value="completed">
              <div className="text-center py-8 text-muted-foreground">Completed donations would be filtered here</div>
            </TabsContent>
            <TabsContent value="pending">
              <div className="text-center py-8 text-muted-foreground">Pending donations would be filtered here</div>
            </TabsContent>
            <TabsContent value="this-month">
              <div className="text-center py-8 text-muted-foreground">
                This month's donations would be filtered here
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
