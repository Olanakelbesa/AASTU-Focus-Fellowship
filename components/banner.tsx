"use client";

import { FadeIn } from "./animations/motion";

interface BannerProps {
  title: string;
  subTitle: string;
}

export function Banner({ title, subTitle }: BannerProps) {
  return (
    <div className="relative min-h-[300px] md:min-h-[400px] lg:min-h-[500px] overflow-hidden banner-bg">
      {/* Geometric background shapes - hidden on mobile */}
      <div className="absolute inset-0 hidden md:block">
        {/* Large primary shape - top right */}
        <div className="absolute -top-10 -right-10 w-48 md:w-72 h-48 md:h-72 bg-primary-gradient transform rotate-45 opacity-80" />

        {/* Medium primary shape - bottom left */}
        <div className="absolute -bottom-16 -left-16 w-56 md:w-80 h-56 md:h-80 bg-primary-gradient transform rotate-12 opacity-70" />

        {/* Light primary accent - top left */}
        <div className="absolute left-10 md:left-20 w-40 md:w-64 h-40 md:h-64 bg-primary-gradient transform -rotate-12 opacity-60" />

        {/* Small accent shape - middle right */}
        <div className="absolute top-1/2 right-8 md:right-16 w-32 md:w-48 h-32 md:h-48 bg-primary-gradient transform rotate-45 opacity-50" />

        {/* Additional geometric elements */}
        <div className="absolute left-1/4 w-24 md:w-32 h-24 md:h-32 bg-primary-gradient transform rotate-45 opacity-40" />

        <div className="absolute -bottom-10 right-1/4 w-28 md:w-40 h-28 md:h-40 bg-primary-gradient transform -rotate-12 opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] lg:min-h-[500px] px-4 md:px-6 text-center">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-foreground">
            {title}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground px-2 md:px-0">
            {subTitle}
          </p>
        </FadeIn>
      </div>

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/20" />
    </div>
  );
}
