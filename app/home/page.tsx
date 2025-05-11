import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"
{
  /* Update the Quick Links section to use the gradient */
}
;<section className="py-16 bg-primary-gradient text-primary-foreground">
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <FadeIn>
        <h2 className="text-3xl font-bold mb-4">Get Involved</h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="max-w-2xl mx-auto opacity-90">There are many ways to be part of our fellowship community</p>
      </FadeIn>
    </div>

    <StaggerContainer>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        <StaggerItem>
          <Link
            href="/events"
            className="flex flex-col items-center p-6 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
          >
            <Calendar className="h-10 w-10 mb-3" />
            <span className="text-lg font-medium">Events</span>
          </Link>
        </StaggerItem>
        <StaggerItem>
          <Link
            href="/teams"
            className="flex flex-col items-center p-6 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
          >
            <Users className="h-10 w-10 mb-3" />
            <span className="text-lg font-medium">Teams</span>
          </Link>
        </StaggerItem>
        <StaggerItem>
          <Link
            href="/gallery"
            className="flex flex-col items-center p-6 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
          >
            <ImageIcon className="h-10 w-10 mb-3" />
            <span className="text-lg font-medium">Gallery</span>
          </Link>
        </StaggerItem>
        <StaggerItem>
          <Link
            href="/donate"
            className="flex flex-col items-center p-6 bg-primary-foreground/10 rounded-lg hover:bg-primary-foreground/20 transition-colors"
          >
            <Heart className="h-10 w-10 mb-3" />
            <span className="text-lg font-medium">Donate</span>
          </Link>
        </StaggerItem>
      </div>
    </StaggerContainer>
  </div>
</section>
