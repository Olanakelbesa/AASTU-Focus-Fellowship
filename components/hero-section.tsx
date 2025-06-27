"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface HeroSectionProps {
  headline?: string
  subheading?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay },
  }),
}

export default function HeroSection({
  headline = "Growing Together in Faith and Fellowship",
  subheading = "Join AASTU FOCUS Fellowship in our journey of spiritual growth and community service",
  primaryButtonText = "Join Us",
  secondaryButtonText = "Learn More",
  onPrimaryClick = () => {},
  onSecondaryClick = () => {},
}: HeroSectionProps) {
  return (
    <section className="bg-muted/30 min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="px-5 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">

          {/* Text Section */}
          <motion.div
            className="space-y-8 lg:pr-8"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
              variants={fadeUpVariant}
              custom={0.2}
            >
              {headline}
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl leading-relaxed max-w-2xl"
              variants={fadeUpVariant}
              custom={0.4}
            >
              {subheading}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeUpVariant}
              custom={0.6}
            >
              <Button
                onClick={onPrimaryClick}
                className="px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform active:scale-95 group relative overflow-hidden"
              >
                <span className="relative z-10">{primaryButtonText}</span>
              </Button>

              <Button
                onClick={onSecondaryClick}
                variant="outline"
                className="px-8 py-3 text-lg font-medium rounded-lg transition-all duration-300 bg-transparent hover:scale-105 hover:shadow-md transform active:scale-95 hover:border-gray-400"
              >
                {secondaryButtonText}
              </Button>
            </motion.div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            className="relative"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            <div className="grid grid-cols-2 gap-4 h-[600px]">
              {/* Top Image */}
              <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform">
                <Image
                  src="/hero-section/hero-1.jpg"
                  alt="Community members celebrating together with raised hands"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Bottom Left */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform delay-100">
                <Image
                  src="/hero-section/hero-2.jpg"
                  alt="Large group photo of fellowship members"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              {/* Bottom Right */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform delay-200">
                <Image
                  src="/hero-section/hero-3.jpg"
                  alt="People in a unity circle showing fellowship"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-full opacity-30 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-25 blur-xl animate-float"></div>
            <div className="absolute top-1/2 -right-6 w-16 h-16 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-20 blur-lg animate-bounce"></div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-sm animate-pulse opacity-50 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
