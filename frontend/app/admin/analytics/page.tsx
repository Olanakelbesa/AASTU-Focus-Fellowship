"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, TrendingUp, TrendingDown, Eye, DollarSign } from "lucide-react"

export default function AnalyticsPage() {
  // Mock analytics data
  const websiteStats = {
    totalVisitors: 2456,
    pageViews: 8934,
    bounceRate: 34.2,
    avgSessionDuration: "3:42",
    topPages: [
      { page: "/", views: 1234, percentage: 13.8 },
      { page: "/events", views: 987, percentage: 11.0 },
      { page: "/about", views: 756, percentage: 8.5 },
      { page: "/gallery", views: 543, percentage: 6.1 },
      { page: "/contact", views: 432, percentage: 4.8 },
    ],
  }

  const membershipStats = {
    totalMembers: 156,
    newMembersThisMonth: 12,
    activeMembers: 134,
    membersByYear: [
      { year: "1st Year", count: 45 },
      { year: "2nd Year", count: 38 },
      { year: "3rd Year", count: 42 },
      { year: "4th Year", count: 31 },
    ],
    membersByTeam: [
      { team: "Worship", count: 12 },
      { team: "Prayer", count: 8 },
      { team: "Outreach", count: 15 },
      { team: "Welcome", count: 6 },
      { team: "Media", count: 4 },
    ],
  }

  const eventStats = {
    totalEvents: 24,
    upcomingEvents: 8,
    averageAttendance: 45,
    eventsByType: [
      { type: "Bible Study", count: 8, attendance: 25 },
      { type: "Worship Night", count: 6, attendance: 65 },
      { type: "Outreach", count: 4, attendance: 30 },
      { type: "Retreat", count: 2, attendance: 85 },
      { type: "Prayer Meeting", count: 4, attendance: 20 },
    ],
  }

  const engagementStats = {
    totalDonations: 15420,
    averageDonation: 87,
    contactSubmissions: 89,
    newsletterSubscribers: 234,
    socialMediaFollowers: {
      facebook: 456,
      instagram: 234,
      twitter: 123,
      youtube: 89,
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Track fellowship performance and engagement metrics</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{websiteStats.totalVisitors.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground">Website Visitors</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+12.5%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{membershipStats.totalMembers}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Members</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+{membershipStats.newMembersThisMonth} this month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{eventStats.averageAttendance}</div>
            </div>
            <p className="text-xs text-muted-foreground">Avg Event Attendance</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-xs text-red-500">-2.3%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">${engagementStats.totalDonations.toLocaleString()}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Donations</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-500">+8.7%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="website" className="w-full">
        <TabsList>
          <TabsTrigger value="website">Website Analytics</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        {/* Website Analytics */}
        <TabsContent value="website" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Website Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Page Views</p>
                    <p className="text-2xl font-bold">{websiteStats.pageViews.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">{websiteStats.bounceRate}%</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Avg Session</p>
                    <p className="text-2xl font-bold">{websiteStats.avgSessionDuration}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Visitors</p>
                    <p className="text-2xl font-bold">{websiteStats.totalVisitors.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {websiteStats.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="font-medium">{page.page}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{page.views.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">{page.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Membership Analytics */}
        <TabsContent value="membership" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Members by Academic Year</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {membershipStats.membersByYear.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{item.year}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(item.count / membershipStats.totalMembers) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {membershipStats.membersByTeam.map((team, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{team.team}</span>
                      <Badge variant="secondary">{team.count} members</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Events Analytics */}
        <TabsContent value="events" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventStats.eventsByType.map((event, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{event.type}</span>
                        <span className="text-sm text-muted-foreground">{event.count} events</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(event.attendance / 100) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{event.attendance} avg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Event Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Events</p>
                    <p className="text-2xl font-bold">{eventStats.totalEvents}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Upcoming</p>
                    <p className="text-2xl font-bold">{eventStats.upcomingEvents}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Average Attendance</p>
                  <p className="text-2xl font-bold">{eventStats.averageAttendance} people</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Engagement Analytics */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Donations</p>
                    <p className="text-2xl font-bold">${engagementStats.totalDonations.toLocaleString()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Average Donation</p>
                    <p className="text-2xl font-bold">${engagementStats.averageDonation}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Contact Submissions</p>
                  <p className="text-2xl font-bold">{engagementStats.contactSubmissions}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Newsletter Subscribers</p>
                  <p className="text-2xl font-bold">{engagementStats.newsletterSubscribers}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media Followers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Facebook</span>
                    <Badge variant="outline">{engagementStats.socialMediaFollowers.facebook}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Instagram</span>
                    <Badge variant="outline">{engagementStats.socialMediaFollowers.instagram}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Twitter</span>
                    <Badge variant="outline">{engagementStats.socialMediaFollowers.twitter}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">YouTube</span>
                    <Badge variant="outline">{engagementStats.socialMediaFollowers.youtube}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
