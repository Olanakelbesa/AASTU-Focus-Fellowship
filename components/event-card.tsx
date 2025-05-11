import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin } from "lucide-react"
import { ScaleOnHover } from "@/components/animations/motion"

interface EventCardProps {
  title: string
  date: string
  location: string
  description: string
  imageSrc: string
}

export default function EventCard({ title, date, location, description, imageSrc }: EventCardProps) {
  return (
    <ScaleOnHover scale={1.03}>
      <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg dark-mode-transition">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <div className="flex items-center text-muted-foreground mb-1">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex items-center text-muted-foreground mb-3">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{location}</span>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <Button asChild variant="outline" className="w-full">
            <Link href="/events">Learn More</Link>
          </Button>
        </CardFooter>
      </Card>
    </ScaleOnHover>
  )
}
