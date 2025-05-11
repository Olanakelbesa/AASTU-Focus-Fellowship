import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ImageIcon, Calendar } from "lucide-react";
import GalleryLightbox from "@/components/gallery-lightbox";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion";

export default function GalleryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/events.png"
            alt="About AASTU FOCUS Fellowship"
            fill
            sizes="100vw"
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg max-w-2xl mx-auto">
              Browse photos and videos from our fellowship events and activities
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="photos" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="photos">Photo Albums</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="photos" className="space-y-12">
              {/* Photo Albums */}
              {photoAlbums.map((album, index) => (
                <div key={index} className="space-y-6">
                  <FadeIn>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">{album.title}</h2>
                        <p className="text-muted-foreground flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          {album.date}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </div>
                  </FadeIn>

                  <StaggerContainer>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {album.photos.map((photo, photoIndex) => (
                        <StaggerItem key={photoIndex}>
                          <GalleryLightbox
                            images={album.photos}
                            initialIndex={photoIndex}
                          >
                            <div className="relative aspect-square overflow-hidden rounded-md cursor-pointer hover:opacity-90 transition-opacity">
                              <Image
                                src={photo || "/worship.jpg"}
                                alt={`Photo ${photoIndex + 1} from ${
                                  album.title
                                }`}
                                fill
                                className="object-cover transition-transform duration-500 hover:scale-110"
                              />
                            </div>
                          </GalleryLightbox>
                        </StaggerItem>
                      ))}
                    </div>
                  </StaggerContainer>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="videos" className="space-y-8">
              <StaggerContainer>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video, index) => (
                    <StaggerItem key={index}>
                      <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                        <div className="relative aspect-video overflow-hidden group">
                          <Image
                            src={video.thumbnail || "/worship.jpg"}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-full bg-primary/90 p-3 text-primary-foreground transform transition-transform duration-300 group-hover:scale-110">
                              <Play className="h-8 w-8" />
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg">{video.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1">
                            {video.date}
                          </p>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerContainer>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Featured Moments</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Special highlights from our fellowship journey
              </p>
            </FadeIn>
          </div>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem>
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
                  <Image
                    src="/worship.jpg"
                    alt="Worship night"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                      <h3 className="font-bold text-lg">Worship Night</h3>
                      <p className="text-sm opacity-90">
                        A night of praise and worship
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
                  <Image
                    src="/worship.jpg"
                    alt="Community service"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                      <h3 className="font-bold text-lg">Community Service</h3>
                      <p className="text-sm opacity-90">
                        Serving our local community
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="relative aspect-[4/5] rounded-lg overflow-hidden group">
                  <Image
                    src="/worship.jpg"
                    alt="Bible study"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                      <h3 className="font-bold text-lg">Bible Study</h3>
                      <p className="text-sm opacity-90">
                        Growing together in God's word
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* Submit Photos */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-4">Have Photos to Share?</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              If you have photos or videos from our events that you'd like to
              share, we'd love to add them to our gallery!
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Button size="lg" className="flex items-center gap-2 animate-pulse">
              <ImageIcon className="h-5 w-5" />
              Submit Your Photos
            </Button>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

// Sample data
const photoAlbums = [
  {
    title: "Retreat 2025",
    date: "April 2024",
    photos: [
      "/worship.jpg",
      "/worship.jpg",
      "/worship.jpg",
      "/worship.jpg",
      "/worship.jpg",
      "/worship.jpg",
      "/worship.jpg",
      "/worship.jpg",
    ],
  },
  {
    title: "Worship Night",
    date: "March 2024",
    photos: ["/worship.jpg", "/worship.jpg", "/worship.jpg", "/worship.jpg"],
  },
  {
    title: "Community Service Day",
    date: "February 2024",
    photos: ["/worship.jpg", "/worship.jpg", "/worship.jpg", "/worship.jpg"],
  },
];

const videos = [
  {
    title: "Worship Night Highlights",
    date: "March 25, 2024",
    thumbnail: "/worship.jpg",
  },
  {
    title: "Testimony: Finding Faith in College",
    date: "March 10, 2024",
    thumbnail: "/worship.jpg",
  },
  {
    title: "Bible Study Series: Book of John",
    date: "February 15, 2024",
    thumbnail: "/worship.jpg",
  },
  {
    title: "Christmas Celebration 2023",
    date: "December 20, 2023",
    thumbnail: "/worship.jpg",
  },
  {
    title: "Welcome Week 2023",
    date: "September 5, 2023",
    thumbnail: "/worship.jpg",
  },
  {
    title: "Summer Mission Trip Recap",
    date: "August 15, 2023",
    thumbnail: "/worship.jpg",
  },
];
