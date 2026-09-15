import React from "react";

export default function CategoriesSections() {
  return (
    // =========== CATEGORIES ===========
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div className="group block relative overflow-hidden rounded-lg shadow-sm">
            <img
              src="https://picsum.photos/400/400?random=4"
              alt="Wellness Tips"
              className="w-full h-auto aspect-square object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-12 text-center">
              <h3 className="text-white text-sm font-medium">Wellness Tips</h3>
            </div>
          </div>
          <div className="group block relative overflow-hidden rounded-lg shadow-sm">
            <img
              src="https://picsum.photos/400/400?random=5"
              alt="Mindful Eating"
              className="w-full h-auto aspect-square object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-12 text-center">
              <h3 className="text-white text-sm font-medium">Mindful Eating</h3>
            </div>
          </div>
          <div className="group block relative overflow-hidden rounded-lg shadow-sm">
            <img
              src="https://picsum.photos/400/400?random=6"
              alt="Yoga Flow"
              className="w-full h-auto aspect-square object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-12 text-center">
              <h3 className="text-white text-sm font-medium">Yoga Flow</h3>
            </div>
          </div>
          <div className="group block relative overflow-hidden rounded-lg shadow-sm">
            <img
              src="https://picsum.photos/400/400?random=7"
              alt="Herbal Care"
              className="w-full h-auto aspect-square object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-12 text-center">
              <h3 className="text-white text-sm font-medium">Herbal Care</h3>
            </div>
          </div>
          <div className="group block relative overflow-hidden rounded-lg shadow-sm">
            <img
              src="https://picsum.photos/400/400?random=8"
              alt="Self Love"
              className="w-full h-auto aspect-square object-cover"
              loading="lazy"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-12 text-center">
              <h3 className="text-white text-sm font-medium">Self Love</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
