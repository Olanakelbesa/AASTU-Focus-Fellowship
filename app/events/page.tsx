"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import EventRegistrationForm, {
  RegistrationFormData,
} from "@/components/event-registration-form";

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/events.png"
            alt="Fellowship events"
            fill
            sizes="100vw"
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Join us for fellowship, worship, Bible study, and community service
            events throughout the year.
          </p>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-16 px-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Event Cards */}
                {upcomingEvents.map((event, index) => (
                  <EventCard key={index} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Past Event Cards */}
                {pastEvents.map((event, index) => (
                  <EventCard key={index} event={event} isPast />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-8">
              <div className="bg-card border rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-center">
                  March 2024
                </h3>
                <div className="grid grid-cols-7 gap-1">
                  {/* Calendar header */}
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div key={day} className="text-center font-medium p-2">
                        {day}
                      </div>
                    )
                  )}

                  {/* Calendar days */}
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={day}
                      className={`text-center p-2 rounded-md ${
                        [3, 10, 17, 24, 25].includes(day)
                          ? "bg-primary/10 font-medium cursor-pointer hover:bg-primary/20"
                          : ""
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium">Events this month:</h4>
                  <ul className="space-y-1">
                    <li className="text-sm">• Mar 3: Weekly Bible Study</li>
                    <li className="text-sm">• Mar 10: Weekly Bible Study</li>
                    <li className="text-sm">• Mar 17: Weekly Bible Study</li>
                    <li className="text-sm">• Mar 24: Weekly Bible Study</li>
                    <li className="text-sm">• Mar 25: Worship Night</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-16 px-10 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Event Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore different types of events we host throughout the year
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="Bible Studies"
              description="Weekly gatherings to study God's word and grow in faith together."
              imageSrc="/bible.jpg"
            />
            <CategoryCard
              title="Worship Nights"
              description="Evenings of praise, worship, and spiritual renewal."
              imageSrc="/bible.jpg"
            />
            <CategoryCard
              title="Community Service"
              description="Opportunities to serve our campus and local community."
              imageSrc="/bible.jpg"
            />
            <CategoryCard
              title="Retreats & Conferences"
              description="Special events for deeper fellowship and spiritual growth."
              imageSrc="/bible.jpg"
            />
          </div>
        </div>
      </section>

      {/* Event Registration */}
      <section className="py-16 px-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to Register for an Event?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Click on any event to register or contact us for more information
            about upcoming activities.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// Event Card Component
function EventCard({
  event,
  isPast = false,
}: {
  event: any;
  isPast?: boolean;
}) {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleRegistrationSubmit = (data: RegistrationFormData) => {
    // Handle form submission here
    console.log("Registration data:", data);
    setShowRegistration(false);
  };

  return (
    <Card className="overflow-hidden h-full">
      <div className="relative h-48 w-full">
        <Image
          src={event.imageSrc || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
        />
        {isPast && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-medium px-3 py-1 bg-primary/80 rounded-md">
              Past Event
            </span>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
        <div className="flex items-center text-muted-foreground mb-1">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.date}</span>
        </div>
        <div className="flex items-center text-muted-foreground mb-1">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.time}</span>
        </div>
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{event.location}</span>
        </div>
        <p className="text-muted-foreground">{event.description}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={isPast ? "outline" : "default"} className="w-full">
              View Details
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">{event.title}</DialogTitle>
            </DialogHeader>
            <div className="relative h-[300px] w-full overflow-hidden rounded-lg mb-4">
              <Image
                src={event.imageSrc || "/placeholder.svg"}
                alt={event.title}
                fill
                className="object-cover"
              />
              {isPast && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-medium px-3 py-1 bg-primary/80 rounded-md">
                    Past Event
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="pt-2">
                <h4 className="font-semibold mb-2">About this event</h4>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
              {!isPast && (
                <div className="pt-4">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setShowRegistration(true)}
                  >
                    Register for Event
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <EventRegistrationForm
          eventTitle={event.title}
          isOpen={showRegistration}
          onClose={() => setShowRegistration(false)}
          onSubmit={handleRegistrationSubmit}
        />
      </CardFooter>
    </Card>
  );
}

// Category Card Component
function CategoryCard({
  title,
  description,
  imageSrc,
}: {
  title: string;
  description: string;
  imageSrc: string;
}) {
  return (
    <div className="bg-card rounded-lg overflow-hidden border">
      <div className="relative h-40 w-full">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// Sample data
const upcomingEvents = [
  {
    id: 1,
    title: "Weekly Bible Study",
    date: "March 20, 2024",
    time: "6:00 PM - 7:30 PM",
    location: "Main Campus, Room 201",
    description:
      "Join us as we study the Book of John and discover what it means to follow Jesus.",
    imageSrc: "/worship.jpg",
  },
  {
    id: 2,
    title: "Worship Night",
    date: "March 25, 2024",
    time: "7:00 PM - 9:00 PM",
    location: "University Auditorium",
    description:
      "A night of praise and worship to connect with God and each other.",
    imageSrc: "/worship.jpg",
  },
  {
    id: 3,
    title: "Community Outreach",
    date: "April 2, 2024",
    time: "9:00 AM - 1:00 PM",
    location: "Local Community Center",
    description:
      "Serving our community through various activities and sharing God's love.",
    imageSrc: "/worship.jpg",
  },
  {
    id: 4,
    title: "Prayer Breakfast",
    date: "April 8, 2024",
    time: "8:00 AM - 9:30 AM",
    location: "Campus Cafeteria",
    description:
      "Start your day with fellowship, prayer, and a delicious breakfast.",
    imageSrc: "/worship.jpg",
  },
  {
    id: 5,
    title: "Leadership Workshop",
    date: "April 15, 2024",
    time: "5:00 PM - 7:00 PM",
    location: "Student Center, Room 105",
    description: "Develop your leadership skills from a Christian perspective.",
    imageSrc: "/worship.jpg",
  },
  {
    id: 6,
    title: "Spring Retreat",
    date: "April 22-24, 2024",
    time: "All Day",
    location: "Mountain View Retreat Center",
    description:
      "A weekend of spiritual renewal, fellowship, and fun activities.",
    imageSrc: "/worship.jpg",
  },
];

const pastEvents = [
  {
    id: 101,
    title: "Welcome Week",
    date: "February 5, 2024",
    time: "11:00 AM - 2:00 PM",
    location: "Campus Quad",
    description: "Welcoming new and returning students to our fellowship.",
    imageSrc: "/worship.jpg",
  },
  {
    id: 102,
    title: "Movie Night",
    date: "February 12, 2024",
    time: "7:00 PM - 10:00 PM",
    location: "Student Center",
    description: "Watching and discussing a faith-based film together.",
    imageSrc: "/worship.jpg",
  },
  {
    id: 103,
    title: "Guest Speaker Series",
    date: "February 19, 2024",
    time: "6:30 PM - 8:00 PM",
    location: "Lecture Hall A",
    description: "Special talk on faith and academic excellence.",
    imageSrc: "/worship.jpg",
  },
];
