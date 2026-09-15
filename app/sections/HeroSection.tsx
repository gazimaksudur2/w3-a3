import React from "react";

export default function HeroSection() {
  return (
    // =========== HERO ===========
    <section
      id="hero"
      className="relative min-h-[520px] bg-gray-50 dark:bg-gray-900"
    >
      <div className="absolute inset-0 bg-[url('https://picsum.photos/1200/600?blur=2')] bg-cover bg-center"></div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-32 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-black dark:text-white drop-shadow-sm dark:drop-shadow-md">
          Self Love & Relationships
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
          Fitness enthusiast sharing 5 years of transformation insights
        </p>
      </div>
    </section>
  );
}
