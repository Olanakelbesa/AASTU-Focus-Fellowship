"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Mail, MessageSquare, Clock, CheckCircle, AlertCircle, Reply } from "lucide-react"

export default function ContactPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<any>(null)
  const [replyText, setReplyText] = useState("")

  // Mock contact submissions data
  const contactSubmissions = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      subject: "general",
      message: "I'm interested in joining the fellowship. Can you provide more information about your weekly meetings?",
      status: "new",
      createdAt: "2024-03-20 10:30 AM",
      assignedTo: null,
      response: null,
    },
    {
      id: 2,
      name: "Mary Smith",
      email: "mary.smith@student.aastu.edu.et",
      subject: "events",
      message: "When is the next worship night? I'd love to attend with some friends.",
      status: "in_progress",
      createdAt: "2024-03-19 2:15 PM",
      assignedTo: "David Mulugeta",
      response: null,
    },
    {
      id: 3,
      name: "Peter Johnson",
      email: "peter.j@email.com",
      subject: "volunteer",
      message: "I'm a graduate and would like to volunteer as a mentor for current students. How can I get involved?",
      status: "resolved",
      createdAt: "2024-03-18 9:45 AM",
      assignedTo: "Sarah Wilson",
      response: "Thank you for your interest! We've sent you information about our mentorship program.",
    },
    {
      id: 4,
      name: "Grace Alemayehu",
      email: "grace.a@student.aastu.edu.et",
      subject: "prayer",
      message: "Please pray for my family during this difficult time. My father is in the hospital.",
      status: "resolved",
      createdAt: "2024-03-17 6:20 PM",
      assignedTo: "Pastor Yonas",
      response: "We're praying for your father and family. Our prayer team will continue to lift you up.",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael.brown@email.com",
      subject: "membership",
      message: "I'm a transfer student. What's the process for joining the fellowship?",
      status: "new",
      createdAt: "2024-03-16 11:00 AM",
      assignedTo: null,
      response: null,
    },
  ]

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new":
        return "destructive"
      case "in_progress":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4" />
      case "in_progress":
        return <Clock className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <MessageSquare className="h-4 w-4" />
    }
  }

  const getSubjectLabel = (subject: string) => {
    const labels: { [key: string]: string } = {
      general: "General Inquiry",
      events: "Events Information",
      membership: "Membership Questions",
      volunteer: "Volunteer Opportunities",
      prayer: "Prayer Request",
      other: "Other",
    }
    return labels[subject] || subject
  }

  const filteredSubmissions = (status?: string) => {
    let filtered = contactSubmissions

    if (status) {
      filtered = filtered.filter((submission) => submission.status === status)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (submission) =>
          submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          submission.message.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }

  const handleReply = (submission: any) => {
    setSelectedMessage(submission)
    setReplyText("")
  }

  const handleSendReply = () => {
    // In real app, this would send the reply via API
    console.log("Sending reply:", replyText)
    setSelectedMessage(null)
    setReplyText("")
  }

  const newSubmissions = filteredSubmissions("new")
  const inProgressSubmissions = filteredSubmissions("in_progress")
  const resolvedSubmissions = filteredSubmissions("resolved")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Management</h1>
          <p className="text-muted-foreground">Manage contact form submissions and inquiries</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <div className="text-2xl font-bold">{newSubmissions.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">New Messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div className="text-2xl font-bold">{inProgressSubmissions.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div className="text-2xl font-bold">{resolvedSubmissions.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{contactSubmissions.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Messages</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Messages */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Contact Messages</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new" className="w-full">
            <TabsList>
              <TabsTrigger value="new" className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                New ({newSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="in_progress" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                In Progress ({inProgressSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="resolved" className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Resolved ({resolvedSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="all">All Messages</TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="space-y-4">
              <ContactTable submissions={newSubmissions} onReply={handleReply} />
            </TabsContent>

            <TabsContent value="in_progress" className="space-y-4">
              <ContactTable submissions={inProgressSubmissions} onReply={handleReply} />
            </TabsContent>

            <TabsContent value="resolved" className="space-y-4">
              <ContactTable submissions={resolvedSubmissions} onReply={handleReply} />
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <ContactTable submissions={filteredSubmissions()} onReply={handleReply} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Reply Dialog */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
            <DialogDescription>
              Responding to {selectedMessage?.name} ({selectedMessage?.email})
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Original Message:</h4>
                <p className="text-sm">{selectedMessage.message}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Reply:</label>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={6}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedMessage(null)}>
              Cancel
            </Button>
            <Button onClick={handleSendReply} disabled={!replyText.trim()}>
              <Reply className="h-4 w-4 mr-2" />
              Send Reply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Contact Table Component
function ContactTable({ submissions, onReply }: { submissions: any[]; onReply: (submission: any) => void }) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new":
        return "destructive"
      case "in_progress":
        return "default"
      case "resolved":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getSubjectLabel = (subject: string) => {
    const labels: { [key: string]: string } = {
      general: "General Inquiry",
      events: "Events Information",
      membership: "Membership Questions",
      volunteer: "Volunteer Opportunities",
      prayer: "Prayer Request",
      other: "Other",
    }
    return labels[subject] || subject
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Contact</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => (
            <TableRow key={submission.id}>
              <TableCell>
                <div>
                  <div className="font-medium">{submission.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {submission.email}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{getSubjectLabel(submission.subject)}</Badge>
              </TableCell>
              <TableCell>
                <div className="max-w-xs truncate" title={submission.message}>
                  {submission.message}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(submission.status)}>{submission.status.replace("_", " ")}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{submission.createdAt}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => onReply(submission)}>
                    <Reply className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
