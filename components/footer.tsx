import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Twitter, Youtube } from "lucide-react";
import { FaTelegramPlane, FaTiktok } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="font-bold text-xl flex items-center">
              <span className="text-primary mr-1">AASTU</span>
              <span>FOCUS</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A Christ-centered community dedicated to fostering spiritual
              growth, building meaningful relationships, and serving our campus.
            </p>
            <div className="flex space-x-4">
              <Link
                target="_blank"
                href="https://www.facebook.com/fstufocus"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/fstufocus"
                className="text-muted-foreground hover:text-primary"
              >
                <FaTelegramPlane className="h-5 w-5" />
                <span className="sr-only">Telegram</span>
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://vm.tiktok.com/ZMBmNFJ8b/"
                className="text-muted-foreground hover:text-primary"
              >
                <FaTiktok className="h-4 w-4" />
                <span className="sr-only">TikTok</span>
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://youtube.com/@aastufocusofficial9025?si=_lFJUbo27Gmaeu2y"
                className="text-muted-foreground hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Teams
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/join-us"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  href="/teams"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for updates on events and activities.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-background"
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AASTU FOCUS Fellowship. All rights
            reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="/privacy-policy"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
