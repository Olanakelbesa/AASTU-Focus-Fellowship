"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, DollarSign, MessageSquare, TrendingUp, Eye, UserPlus, CalendarPlus } from "lucide-react"
import { CountUp } from "@/components/animations/motion"
import Link from "next/link"

export default function AdminDashboard() {
  // Mock data - in real app, this would come from API
  const stats = {
    totalUsers: 156,
    newUsersThisMonth: 12,
    totalEvents: 24,
    upcomingEvents: 8,
    totalDonations: 15420,
    thisMonthDonations: 2340,
    pendingContacts: 5,
    totalContacts: 89,
  }

  const recentActivities = [
    { id: 1, type: "user", message: "New user Sarah Johnson registered", time: "2 hours ago" },
    { id: 2, type: "event", message: "Worship Night event was updated", time: "4 hours ago" },
    { id: 3, type: "donation", message: "New donation of $50 received", time: "6 hours ago" },
    { id: 4, type: "contact", message: "New contact form submission", time: "8 hours ago" },
    { id: 5, type: "user", message: "Michael K. joined Worship Team", time: "1 day ago" },
  ]

  const upcomingEvents = [
    { id: 1, title: "Weekly Bible Study", date: "Today, 6:00 PM", attendees: 25 },
    { id: 2, title: "Worship Night", date: "March 25, 7:00 PM", attendees: 45 },
    { id: 3, title: "Community Outreach", date: "April 2, 9:00 AM", attendees: 18 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, David!</h1>
          <p className="text-muted-foreground">Here's what's happening with your fellowship today.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/events/new">
              <CalendarPlus className="h-4 w-4 mr-2" />
              New Event
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/users">
              <UserPlus className="h-4 w-4 mr-2" />
              Manage Users
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp end={stats.totalUsers} />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />+{stats.newUsersThisMonth} this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp end={stats.totalEvents} />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              {stats.upcomingEvents} upcoming
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $<CountUp end={stats.totalDonations} />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +${stats.thisMonthDonations} this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <CountUp end={stats.totalContacts} />
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Badge variant="destructive" className="text-xs">
                {stats.pendingContacts} pending
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                  </div>
                  <Badge variant="secondary">{event.attendees} registered</Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/admin/events">Manage Events</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/admin/events/new">
                <CalendarPlus className="h-6 w-6 mb-2" />
                Create Event
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/admin/content/new">
                <MessageSquare className="h-6 w-6 mb-2" />
                New Article
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/admin/users">
                <Users className="h-6 w-6 mb-2" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col" asChild>
              <Link href="/admin/contact">
                <MessageSquare className="h-6 w-6 mb-2" />
                View Messages
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
