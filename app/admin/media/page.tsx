"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MoreHorizontal, Upload, Images, Video, FileText, Download, Edit, Trash2, Eye } from "lucide-react"

export default function MediaPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock media data
  const mediaItems = [
    {
      id: 1,
      name: "worship-night-2024.jpg",
      type: "image",
      size: "2.4 MB",
      dimensions: "1920x1080",
      uploadedBy: "David Mulugeta",
      uploadedAt: "2024-03-20",
      url: "/placeholder.svg?height=200&width=300",
      category: "events",
    },
    {
      id: 2,
      name: "fellowship-group-photo.jpg",
      type: "image",
      size: "3.1 MB",
      dimensions: "2048x1536",
      uploadedBy: "Sarah Johnson",
      uploadedAt: "2024-03-19",
      url: "/placeholder.svg?height=200&width=300",
      category: "gallery",
    },
    {
      id: 3,
      name: "sunday-service-march.mp4",
      type: "video",
      size: "125 MB",
      dimensions: "1920x1080",
      uploadedBy: "Michael Kebede",
      uploadedAt: "2024-03-18",
      url: "/placeholder.svg?height=200&width=300",
      category: "sermons",
    },
    {
      id: 4,
      name: "prayer-guide-2024.pdf",
      type: "document",
      size: "1.2 MB",
      dimensions: "A4",
      uploadedBy: "Grace Alemayehu",
      uploadedAt: "2024-03-17",
      url: "/placeholder.svg?height=200&width=300",
      category: "resources",
    },
    {
      id: 5,
      name: "outreach-team-banner.png",
      type: "image",
      size: "800 KB",
      dimensions: "1200x600",
      uploadedBy: "Daniel Haile",
      uploadedAt: "2024-03-16",
      url: "/placeholder.svg?height=200&width=300",
      category: "banners",
    },
    {
      id: 6,
      name: "bible-study-audio.mp3",
      type: "audio",
      size: "45 MB",
      dimensions: "44.1 kHz",
      uploadedBy: "Pastor Yonas",
      uploadedAt: "2024-03-15",
      url: "/placeholder.svg?height=200&width=300",
      category: "audio",
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Images className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      case "audio":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "image":
        return "default"
      case "video":
        return "destructive"
      case "document":
        return "secondary"
      case "audio":
        return "outline"
      default:
        return "outline"
    }
  }

  const filteredMedia = mediaItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const imageItems = mediaItems.filter((item) => item.type === "image")
  const videoItems = mediaItems.filter((item) => item.type === "video")
  const documentItems = mediaItems.filter((item) => item.type === "document")
  const audioItems = mediaItems.filter((item) => item.type === "audio")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground">Manage photos, videos, and documents</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Media
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Images className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{imageItems.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Images</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{videoItems.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Videos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{documentItems.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Documents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-bold">{audioItems.length}</div>
            </div>
            <p className="text-xs text-muted-foreground">Audio Files</p>
          </CardContent>
        </Card>
      </div>

      {/* Media Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Media Files</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
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
              <TabsTrigger value="all">All Media</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredMedia.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative aspect-video bg-muted">
                      {item.type === "image" ? (
                        <Image src={item.url || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="flex items-center justify-center h-full">{getTypeIcon(item.type)}</div>
                      )}
                      <div className="absolute top-2 right-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm truncate">{item.name}</h3>
                          <Badge variant={getTypeBadgeVariant(item.type)}>{item.type}</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div>{item.size}</div>
                          <div>{item.dimensions}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <div>By {item.uploadedBy}</div>
                          <div>{item.uploadedAt}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other tabs would filter by type */}
            <TabsContent value="images">
              <div className="text-center py-8 text-muted-foreground">Image files would be filtered here</div>
            </TabsContent>
            <TabsContent value="videos">
              <div className="text-center py-8 text-muted-foreground">Video files would be filtered here</div>
            </TabsContent>
            <TabsContent value="documents">
              <div className="text-center py-8 text-muted-foreground">Document files would be filtered here</div>
            </TabsContent>
            <TabsContent value="audio">
              <div className="text-center py-8 text-muted-foreground">Audio files would be filtered here</div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
