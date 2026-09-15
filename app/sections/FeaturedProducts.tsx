import React from "react";

export default function FeaturedProducts() {
  return (
    // =========== BLOG CARDS ===========
    <section id="blog" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group">
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src="https://picsum.photos/600/400?random=1"
                alt="Blog post"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              in{" "}
              <span className="font-medium text-black dark:text-white">
                Wellness
              </span>{" "}
              on 12 Jan 2025
            </p>
            <h3 className="mt-2 text-xl font-light text-black dark:text-white">
              The Art of Mindful Breathing
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Discover how conscious breathing can transform your daily stress
              into calm presence.
            </p>
            <div className="mt-3 inline-block text-sm font-medium text-black dark:text-white border-b border-black dark:border-white">
              Read More
            </div>
          </div>
          {/* Card 2 */}
          <div className="group">
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src="https://picsum.photos/600/400?random=2"
                alt="Blog post"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              in{" "}
              <span className="font-medium text-black dark:text-white">
                Relationships
              </span>{" "}
              on 10 Jan 2025
            </p>
            <h3 className="mt-2 text-xl font-light text-black dark:text-white">
              Boundaries as an Act of Love
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              How saying "no" can deepen your connections and honor your energy.
            </p>
            <div className="mt-3 inline-block text-sm font-medium text-black dark:text-white border-b border-black dark:border-white">
              Read More
            </div>
          </div>
          {/* Card 3 */}
          <div className="group">
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src="https://picsum.photos/600/400?random=3"
                alt="Blog post"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              in{" "}
              <span className="font-medium text-black dark:text-white">
                Nutrition
              </span>{" "}
              on 8 Jan 2025
            </p>
            <h3 className="mt-2 text-xl font-light text-black dark:text-white">
              Eating with Intention
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
              Move beyond diets—cultivate a joyful, intuitive relationship with
              food.
            </p>
            <div className="mt-3 inline-block text-sm font-medium text-black dark:text-white border-b border-black dark:border-white">
              Read More
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
