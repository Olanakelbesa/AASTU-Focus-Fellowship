"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Search, MoreHorizontal, Plus, Edit, Trash2, Users, UserPlus, Crown } from "lucide-react"

export default function TeamsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingTeam, setEditingTeam] = useState<any>(null)
  const [newTeam, setNewTeam] = useState({
    name: "",
    description: "",
    leader: "",
  })

  // Mock teams data
  const teams = [
    {
      id: 1,
      name: "Worship Team",
      description: "Leading worship and praise during services",
      leader: "Daniel Haile",
      members: [
        { id: 1, name: "Daniel Haile", role: "Leader", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 2, name: "Sarah Johnson", role: "Vocalist", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 3, name: "Michael Brown", role: "Guitarist", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 4, name: "Grace Wilson", role: "Pianist", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      meetingTime: "Sundays 5:00 PM",
      status: "active",
    },
    {
      id: 2,
      name: "Prayer Team",
      description: "Interceding for the fellowship and community",
      leader: "Sarah Johnson",
      members: [
        { id: 5, name: "Sarah Johnson", role: "Leader", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 6, name: "Mary Alemayehu", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 7, name: "John Kebede", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      meetingTime: "Wednesdays 6:00 PM",
      status: "active",
    },
    {
      id: 3,
      name: "Outreach Team",
      description: "Community service and evangelism",
      leader: "Michael Kebede",
      members: [
        { id: 8, name: "Michael Kebede", role: "Leader", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 9, name: "David Mulugeta", role: "Co-Leader", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 10, name: "Grace Alemayehu", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 11, name: "Peter Johnson", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 12, name: "Ruth Tadesse", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      meetingTime: "Saturdays 9:00 AM",
      status: "active",
    },
    {
      id: 4,
      name: "Welcome Team",
      description: "Greeting and welcoming new visitors",
      leader: "Grace Alemayehu",
      members: [
        { id: 13, name: "Grace Alemayehu", role: "Leader", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 14, name: "Samuel Tesfaye", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 15, name: "Hanna Bekele", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      meetingTime: "Sundays 4:30 PM",
      status: "active",
    },
    {
      id: 5,
      name: "Media Team",
      description: "Photography, videography, and social media",
      leader: "Not Assigned",
      members: [
        { id: 16, name: "Alex Girma", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
        { id: 17, name: "Bethel Yonas", role: "Member", avatar: "/placeholder.svg?height=32&width=32" },
      ],
      meetingTime: "TBD",
      status: "recruiting",
    },
  ]

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "recruiting":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleEditTeam = (team: any) => {
    setEditingTeam(team)
  }

  const handleSaveTeam = () => {
    // In real app, this would make an API call
    console.log("Saving team:", editingTeam)
    setEditingTeam(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground">Manage fellowship teams and their members</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{teams.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Teams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{teams.reduce((acc, team) => acc + team.members.length, 0)}</div>
            </div>
            <p className="text-xs text-muted-foreground">Total Members</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{teams.filter((team) => team.leader !== "Not Assigned").length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Active Teams</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{teams.filter((team) => team.status === "recruiting").length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Recruiting</p>
          </CardContent>
        </Card>
      </div>

      {/* Teams List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Teams</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search teams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team</TableHead>
                  <TableHead>Leader</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Meeting Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{team.name}</div>
                        <div className="text-sm text-muted-foreground">{team.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {team.leader !== "Not Assigned" ? (
                          <>
                            <Crown className="h-4 w-4 text-yellow-500" />
                            <span>{team.leader}</span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">Not Assigned</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {team.members.slice(0, 3).map((member) => (
                            <Avatar key={member.id} className="h-6 w-6 border-2 border-background">
                              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                              <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                          ))}
                          {team.members.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs">
                              +{team.members.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{team.members.length} members</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{team.meetingTime}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(team.status)}>{team.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditTeam(team)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Team
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Manage Members
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Team
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Team Dialog */}
      <Dialog open={!!editingTeam} onOpenChange={() => setEditingTeam(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>Make changes to the team information here.</DialogDescription>
          </DialogHeader>
          {editingTeam && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teamName" className="text-right">
                  Name
                </Label>
                <Input
                  id="teamName"
                  value={editingTeam.name}
                  onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teamDescription" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="teamDescription"
                  value={editingTeam.description}
                  onChange={(e) => setEditingTeam({ ...editingTeam, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="teamLeader" className="text-right">
                  Leader
                </Label>
                <Input
                  id="teamLeader"
                  value={editingTeam.leader}
                  onChange={(e) => setEditingTeam({ ...editingTeam, leader: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meetingTime" className="text-right">
                  Meeting Time
                </Label>
                <Input
                  id="meetingTime"
                  value={editingTeam.meetingTime}
                  onChange={(e) => setEditingTeam({ ...editingTeam, meetingTime: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={handleSaveTeam}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
