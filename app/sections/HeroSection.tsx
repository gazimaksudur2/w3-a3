"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Slide {
  id: number;
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryButton: string;
  primaryLink: string;
  secondaryButton: string;
  secondaryLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/HeroImage1.png",
    eyebrow: "New Collection",
    title: "Discover Products Made for Your Everyday Life",
    description:
      "Explore carefully selected products designed to bring style, comfort, and simplicity into your daily routine.",
    primaryButton: "Shop Now",
    primaryLink: "/products",
    secondaryButton: "Explore Categories",
    secondaryLink: "#categories",
  },
  {
    id: 2,
    image: "/HeroImage2.png",
    eyebrow: "Trending Now",
    title: "Upgrade Your Style With Our Latest Collection",
    description:
      "Find fresh arrivals, popular essentials, and products you'll love at prices that fit your lifestyle.",
    primaryButton: "Explore Products",
    primaryLink: "/products",
    secondaryButton: "View Categories",
    secondaryLink: "#categories",
  },
  {
    id: 3,
    image: "/HeroImage3.png",
    eyebrow: "Featured Picks",
    title: "Quality Products. Simple Shopping.",
    description:
      "Discover standout products from our featured collection and make your shopping experience effortless.",
    primaryButton: "Shop Featured",
    primaryLink: "#shop",
    secondaryButton: "Browse All",
    secondaryLink: "/products",
  },
  {
    id: 4,
    image: "/HeroImage4.png",
    eyebrow: "Special Selection",
    title: "Find Something You'll Love Today",
    description:
      "Browse our latest products across popular categories and discover your next favorite item.",
    primaryButton: "Start Shopping",
    primaryLink: "/products",
    secondaryButton: "Learn More",
    secondaryLink: "#about",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((current) =>
      current === slides.length - 1 ? 0 : current + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(() => {
      setCurrentSlide((current) =>
        current === slides.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      id="hero"
      aria-label="Featured products"
      className="relative overflow-hidden bg-gray-950"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[520px] sm:h-[580px] md:h-[650px] lg:h-[700px]">
        {slides.map((slide, index) => {
          const isRightAligned = slide.id % 2 === 0;

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide
                  ? "visible scale-100 opacity-100"
                  : "invisible scale-105 opacity-0"
              }`}
            >
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />

              {/* Base Overlay */}
              <div className="absolute inset-0 bg-black/25" />

              {/* Direction-based gradient */}
              <div
                className={`absolute inset-0 ${
                  isRightAligned
                    ? "bg-linear-to-l from-black/75 via-black/40 to-transparent"
                    : "bg-linear-to-r from-black/75 via-black/40 to-transparent"
                }`}
              />

              {/* Bottom Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/60 to-transparent" />

              {/* Content Area */}
              <div
                className={`relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-6 lg:px-8 ${
                  isRightAligned ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-2xl transition-all duration-700 ${
                    isRightAligned
                      ? "text-right"
                      : "text-left"
                  } ${
                    index === currentSlide
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                >
                  {/* Small Heading */}
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 sm:text-sm">
                    {slide.eyebrow}
                  </p>

                  {/* Title */}
                  <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p
                    className={`mt-5 max-w-xl text-sm leading-6 text-white/80 sm:text-base md:text-lg md:leading-8 ${
                      isRightAligned ? "ml-auto" : "mr-auto"
                    }`}
                  >
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div
                    className={`mt-7 flex flex-wrap gap-3 sm:mt-8 ${
                      isRightAligned
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <Link
                      href={slide.primaryLink}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-100 hover:shadow-xl sm:px-6"
                    >
                      {slide.primaryButton}

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M13 6l6 6-6 6"
                        />
                      </svg>
                    </Link>

                    <Link
                      href={slide.secondaryLink}
                      className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/20 sm:px-6"
                    >
                      {slide.secondaryButton}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Previous Button */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/50 sm:left-5 sm:h-11 sm:w-11 lg:left-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 18l-6-6 6-6"
            />
          </svg>
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-black/50 sm:right-5 sm:h-11 sm:w-11 lg:right-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 18l6-6-6-6"
            />
          </svg>
        </button>

        {/* Pagination */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-8">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="absolute bottom-6 right-5 z-20 hidden text-xs font-medium tracking-widest text-white/70 sm:block lg:right-8">
          <span className="text-white">
            {String(currentSlide + 1).padStart(2, "0")}
          </span>

          <span className="mx-2">/</span>

          <span>
            {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}