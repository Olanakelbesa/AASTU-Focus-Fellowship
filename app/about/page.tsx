import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from "@/components/animations/motion";
import AboutPageMap from "@/components/about-page-map";

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg max-w-2xl mx-auto">
              Learn more about AASTU FOCUS Fellowship, our mission, vision, and
              the people who make it happen.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Our Mission & Vision
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Mission</h3>
                    <p className="text-muted-foreground">
                      Our mission is to build a Christ-centered community that
                      fosters spiritual growth, meaningful relationships, and
                      service to our campus and beyond.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Vision</h3>
                    <p className="text-muted-foreground">
                      We envision a campus where students are transformed by the
                      love of Christ, equipped to live out their faith, and
                      empowered to make a positive impact in their communities.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Purpose</h3>
                    <p className="text-muted-foreground">
                      AASTU FOCUS exists to provide a supportive community where
                      students can explore and deepen their faith, develop
                      leadership skills, and find purpose through serving
                      others.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="/worship.jpg"
                  alt="Fellowship gathering"
                  fill
                  className="object-cover"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary-gradient text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <CountUp
                end={100}
                className="text-4xl md:text-5xl font-bold mb-2"
                suffix="+"
              />
              <p className="text-primary-foreground/80">Active Members</p>
            </div>
            <div className="p-4">
              <CountUp
                end={6}
                className="text-4xl md:text-5xl font-bold mb-2"
              />
              <p className="text-primary-foreground/80">Ministry Teams</p>
            </div>
            <div className="p-4">
              <CountUp
                end={52}
                className="text-4xl md:text-5xl font-bold mb-2"
                suffix="+"
              />
              <p className="text-primary-foreground/80">Events Per Year</p>
            </div>
            <div className="p-4">
              <CountUp
                end={9}
                className="text-4xl md:text-5xl font-bold mb-2"
              />
              <p className="text-primary-foreground/80">Years of Impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do as a fellowship
              </p>
            </FadeIn>
          </div>

          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StaggerItem>
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Faith</h3>
                    <p className="text-muted-foreground">
                      Grounding everything we do in Christ and His teachings,
                      seeking to grow in our relationship with God.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">2</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Community</h3>
                    <p className="text-muted-foreground">
                      Creating a welcoming environment where authentic
                      relationships can flourish.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Service</h3>
                    <p className="text-muted-foreground">
                      Following Christ's example by serving others with humility
                      and compassion.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>

              <StaggerItem>
                <Card className="text-center h-full">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">4</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Growth</h3>
                    <p className="text-muted-foreground">
                      Encouraging continuous spiritual, personal, and leadership
                      development.
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* History */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Our History</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The journey of AASTU FOCUS Fellowship from its beginnings to
                today
              </p>
            </FadeIn>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            <StaggerContainer>
              <StaggerItem>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl font-bold">2015</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">The Beginning</h3>
                    <p className="text-muted-foreground">
                      AASTU FOCUS Fellowship was founded by a small group of
                      five students who wanted to create a space for Christian
                      fellowship on campus. They began meeting weekly for prayer
                      and Bible study.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl font-bold">2017</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Growing Community
                    </h3>
                    <p className="text-muted-foreground">
                      The fellowship grew to over 30 regular members and began
                      organizing larger events, including worship nights and
                      community service projects.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl font-bold">2020</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Virtual Adaptation
                    </h3>
                    <p className="text-muted-foreground">
                      During the global pandemic, FOCUS adapted by moving
                      meetings online, which unexpectedly allowed us to reach
                      more students and maintain our community despite physical
                      distance.
                    </p>
                  </div>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                    <span className="text-xl font-bold">Today</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Thriving Fellowship
                    </h3>
                    <p className="text-muted-foreground">
                      Today, AASTU FOCUS has grown into a vibrant community with
                      over 100 members, multiple weekly gatherings, and a strong
                      presence on campus. We continue to focus on spiritual
                      growth, community building, and service.
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Location Map */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Find Us on Campus</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're located in the Student Center, Room 105 at Addis Ababa
                Science and Technology University
              </p>
            </FadeIn>
          </div>

          <div className="max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
              <AboutPageMap
                latitude={8.8883}
                longitude={38.7759}
                markerTitle="AASTU FOCUS Fellowship - Student Center, Room 105"
              />
            </FadeIn>

            <div className="mt-8 bg-card rounded-lg p-6 border">
              <h3 className="font-bold text-lg mb-4">Contact Information</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Address:</span> Student Center,
                  Room 105, Addis Ababa Science and Technology University
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  <a
                    href="mailto:contact@aastufocus.org"
                    className="text-primary hover:underline"
                  >
                    contact@aastufocus.org
                  </a>
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  <a
                    href="tel:+251911234567"
                    className="text-primary hover:underline"
                  >
                    +251 911 234 567
                  </a>
                </p>
                <p>
                  <span className="font-medium">Office Hours:</span> Monday -
                  Friday: 10:00 AM - 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <FadeIn>
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Meet the dedicated individuals who guide our fellowship
              </p>
            </FadeIn>
          </div>

          <Tabs defaultValue="executive" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="executive">Executive Team</TabsTrigger>
                <TabsTrigger value="ministry">Ministry Leaders</TabsTrigger>
                <TabsTrigger value="advisors">Faculty Advisors</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="executive" className="space-y-8">
              <StaggerContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StaggerItem>
                    <LeaderCard
                      name="David Mulugeta"
                      role="President"
                      bio="Computer Science, 4th Year. David has been with FOCUS since his freshman year and is passionate about building community."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <LeaderCard
                      name="Sarah Abebe"
                      role="Vice President"
                      bio="Electrical Engineering, 3rd Year. Sarah oversees our ministry teams and helps coordinate major events."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <LeaderCard
                      name="Michael Tesfaye"
                      role="Secretary"
                      bio="Business Administration, 3rd Year. Michael manages communications and keeps our fellowship organized."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <LeaderCard
                      name="Ruth Girma"
                      role="Treasurer"
                      bio="Accounting, 4th Year. Ruth manages our finances and fundraising efforts with integrity and skill."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </TabsContent>

            <TabsContent value="ministry" className="space-y-8">
              <StaggerContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StaggerItem>
                    <LeaderCard
                      name="Daniel Haile"
                      role="Worship Team Leader"
                      bio="Music, 3rd Year. Daniel coordinates our worship team and helps create meaningful worship experiences."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <LeaderCard
                      name="Bethel Tadesse"
                      role="Outreach Coordinator"
                      bio="Sociology, 4th Year. Bethel organizes community service projects and campus outreach initiatives."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <LeaderCard
                      name="Samuel Bekele"
                      role="Bible Study Coordinator"
                      bio="Theology, 3rd Year. Samuel plans our Bible study curriculum and trains small group leaders."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <LeaderCard
                      name="Hanna Mekonnen"
                      role="Prayer Team Leader"
                      bio="Psychology, 2nd Year. Hanna coordinates our prayer ministry and weekly prayer gatherings."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </TabsContent>

            <TabsContent value="advisors" className="space-y-8">
              <StaggerContainer>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <StaggerItem>
                    <LeaderCard
                      name="Dr. Solomon Desta"
                      role="Faculty Advisor"
                      bio="Professor of Engineering. Dr. Desta has been advising FOCUS since 2017 and provides wisdom and guidance."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <LeaderCard
                      name="Prof. Meseret Alemu"
                      role="Faculty Advisor"
                      bio="Associate Professor of Philosophy. Prof. Alemu helps students integrate faith and academic pursuits."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                  <StaggerItem>
                    <LeaderCard
                      name="Pastor Yonas Kebede"
                      role="Spiritual Mentor"
                      bio="Campus Minister. Pastor Yonas provides spiritual guidance and mentorship to our leadership team."
                      imageSrc="/worship.jpg"
                    />
                  </StaggerItem>
                </div>
              </StaggerContainer>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Want to Learn More?</h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              We'd love to tell you more about our fellowship and answer any
              questions you might have.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/join-us">Join Our Fellowship</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}

// Leader Card Component
function LeaderCard({
  name,
  role,
  bio,
  imageSrc,
}: {
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
}) {
  return (
    <Card className="overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-primary font-medium mb-2">{role}</p>
        <p className="text-sm text-muted-foreground">{bio}</p>
      </CardContent>
    </Card>
  );
}
