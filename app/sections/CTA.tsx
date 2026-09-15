import React from "react";

export default function CTA() {
  return (
    //SUBSCRIBE CTA
    <section id="cta" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-light text-black dark:text-white leading-tight">
              Never miss a post.
              <br className="hidden md:block" /> Subscribe now.
            </h2>
            <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-lg">
              Join thousands of mindful readers. Get weekly insights on
              wellness, relationships, and intentional living.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md text-black dark:text-white bg-white dark:bg-gray-800">
                Your name
              </div>
              <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-md text-black dark:text-white bg-white dark:bg-gray-800">
                Email address
              </div>
              <div className="w-full py-3 px-6 bg-black dark:bg-white text-white dark:text-black font-medium uppercase tracking-wider rounded-md text-center">
                Subscribe
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
