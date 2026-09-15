import Link from "next/link";
import { getCategories } from "../lib/categories";

export default async function CategoriesSections() {
  const categories = await getCategories();

  return (
    <section className="bg-white py-12 sm:py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
              Explore
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Shop by Category
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
              Explore our collection and discover products based on your
              favorite categories.
            </p>
          </div>
        </div>

        {/* Empty / Error State */}
        {categories.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 text-center dark:border-gray-700 dark:bg-gray-800/50">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                No categories are available right now.
              </p>

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Please try again later.
              </p>
            </div>
          </div>
        ) : (
          /* Categories Grid */
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative block overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:bg-gray-800 dark:focus-visible:ring-white dark:focus-visible:ring-offset-gray-900"
              >
                {/* Category Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />

                  {/* Dark Image Overlay */}
                  <div className="absolute inset-0 bg-black/5 transition-colors duration-300 group-hover:bg-black/15" />

                  {/* Bottom Gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Category Content */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-semibold text-white sm:text-base">
                        {category.name}
                      </h3>

                      <p className="mt-0.5 hidden text-xs text-white/70 sm:block">
                        Explore products
                      </p>
                    </div>

                    {/* Arrow */}
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 translate-x-1 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    >
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
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}