"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Save,
  Eye,
  ArrowLeft,
  Upload,
  Calendar,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEventsError,
  selectEventsLoading,
} from "@/lib/redux/eventSlice/selector";
import { createEventRequest } from "@/lib/redux/eventSlice";
import {
  CreateEventPayload,
  EventCategory,
} from "@/lib/redux/eventSlice/types";

export default function NewEventPage() {
  const prevLoadingRef = useRef(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const loading = useSelector(selectEventsLoading);
  const error = useSelector(selectEventsError);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [event, setEvent] = useState<
    Omit<CreateEventPayload, "image"> & { endTime?: string }
  >({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    category: "bible_study" as EventCategory,
    maxAttendees: null,
    isActive: false,
    isPublic: false,
    tags: [],
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (status: "draft" | "published") => {
    const payload: CreateEventPayload = {
      ...event,
      isActive: status === "published",
      isPublic: status === "published",
    };

    // Use FormData if there is an image
    if (image) {
      const formData = new FormData();
      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach((v) => formData.append(`${key}[]`, v));
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      formData.append("image", image);
      dispatch(createEventRequest(formData));
    } else {
      dispatch(createEventRequest(payload));
    }

    toast({
      description: "Saving event...",
    });
  };

  useEffect(() => {
    if (prevLoadingRef.current && !loading) {
      if (!error) {
        router.push("/admin/events");
      } else {
        toast({
          description: error,
          variant: "destructive",
        });
      }
    }
    prevLoadingRef.current = loading;
  }, [loading, error, router]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New Event</h1>
            <p className="text-muted-foreground">Add a new fellowship event</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave("draft")}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSave("published")}>
            <Eye className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={event.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter event title..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={event.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe the event..."
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventImage">Event Image</Label>
                <div className="border-2 border-dashed border-muted-foreground rounded-lg p-8 text-center">
                  {imagePreview ? (
                    <div className="mb-4 flex flex-col items-center gap-2">
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Event Preview"
                          className="mx-auto mb-2 rounded-lg object-cover max-h-48"
                        />
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute -top-2 -right-2 z-10 rounded-full p-1 h-7 w-7 flex items-center justify-center"
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          aria-label="Remove Image"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Upload event image
                      </p>
                    </>
                  )}

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                  {!imagePreview && (
                    <Button
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Choose File
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={event.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="time"
                      value={event.startTime}
                      onChange={(e) =>
                        handleInputChange("startTime", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="time"
                      value={event.endTime}
                      onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={event.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="Event location..."
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={event.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bible_study">Bible Study</SelectItem>
                    <SelectItem value="worship">Worship Night</SelectItem>
                    <SelectItem value="outreach">Community Outreach</SelectItem>
                    <SelectItem value="prayer">Prayer Meeting</SelectItem>
                    <SelectItem value="fellowship">Fellowship</SelectItem>
                    <SelectItem value="break_mission">Break Mission</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={event.maxAttendees ?? ""}
                  onChange={(e) =>
                    handleInputChange("maxAttendees", Number(e.target.value))
                  }
                  placeholder="Leave empty for unlimited"
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="registrationRequired">
                  Registration Required
                </Label>
                <Switch
                  id="registrationRequired"
                  checked={event.isPublic}
                  onCheckedChange={(checked) =>
                    handleInputChange("isPublic", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="featured">Featured Event</Label>
                <Switch
                  id="featured"
                  checked={event.isActive}
                  onCheckedChange={(checked) =>
                    handleInputChange("isActive", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
