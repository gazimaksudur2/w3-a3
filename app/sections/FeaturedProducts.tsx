"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getProducts, type Product } from "../lib/products";

const FEATURED_LIMIT = 8;

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedProducts = useCallback(async () => {
    let isMounted = true;

    try {
      setIsLoading(true);
      setError(null);

      const data = await getProducts({
        offset: 0,
        limit: FEATURED_LIMIT,
      });

      if (isMounted) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Featured products error:", error);

      if (isMounted) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading products.",
        );
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  function ProductCard({ product }: { product: Product }) {
    const image =
      product.images?.[0] ||
      product.category?.image ||
      "https://placehold.co/600x600?text=Product";

    return (
      <div className="group block min-w-0">
        {/* Product image */}

        <div
          className="
          relative
          aspect-4/5
          overflow-hidden
          rounded-xl
          bg-gray-100
          dark:bg-gray-800
        "
        >
          <img
            src={image}
            alt={product.title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;

              event.currentTarget.src =
                "https://placehold.co/600x750?text=Product";
            }}
            className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            ease-out
            group-hover:scale-105
          "
          />

          {/* Image overlay */}

          <div
            className="
            absolute
            inset-0
            bg-black/0
            transition-colors
            duration-300
            group-hover:bg-black/5
          "
          />

          {/* Category badge */}

          {product.category?.name && (
            <span
              className="
              absolute
              left-3
              top-3
              max-w-[75%]
              truncate
              rounded-full
              bg-white/90
              px-2.5
              py-1
              text-[11px]
              font-medium
              text-gray-800
              shadow-sm
              backdrop-blur-sm
              dark:bg-gray-900/85
              dark:text-gray-200
            "
            >
              {product.category.name}
            </span>
          )}

          <Link href={`/products/${product.id}`}>
            <div
              className="
              absolute
              inset-x-3
              bottom-3
              translate-y-3
              opacity-0
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
            >
              <div
                className="
                flex
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-white/95
                px-3
                py-2.5
                text-xs
                font-semibold
                text-gray-900
                shadow-md
                backdrop-blur-md
                dark:bg-gray-900/95
                dark:text-white
              "
              >
                View product
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-3.5 w-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M13 6l6 6-6 6"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Product information */}

        <div className="pt-3">
          <p
            className="
            mb-1
            truncate
            text-xs
            text-text-secondary
          "
          >
            {product.category?.name}
          </p>

          <h3
            className="
            truncate
            text-sm
            font-medium
            text-navy
            transition-colors
            group-hover:text-brand
            sm:text-base
            dark:text-white
          "
          >
            {product.title}
          </h3>

          <div
            className="
            mt-1.5
            flex
            items-center
            justify-between
            gap-2
          "
          >
            <p
              className="
              text-sm
              font-semibold
              text-brand
              sm:text-base
            "
            >
              ${product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  function ProductSkeletons() {
    return (
      <div
        className="
        grid
        grid-cols-2
        gap-x-3
        gap-y-6
        sm:gap-x-5
        sm:gap-y-8
        md:grid-cols-3
        lg:grid-cols-4
      "
      >
        {Array.from({
          length: FEATURED_LIMIT,
        }).map((_, index) => (
          <div key={index} className="animate-pulse">
            {/* Image skeleton */}

            <div
              className="
              aspect-4/5
              rounded-xl
              bg-gray-200
              dark:bg-gray-800
            "
            />

            {/* Text skeleton */}

            <div className="pt-3">
              <div
                className="
                mb-2
                h-3
                w-16
                rounded
                bg-gray-200
                dark:bg-gray-800
              "
              />

              <div
                className="
                h-4
                w-4/5
                rounded
                bg-gray-200
                dark:bg-gray-800
              "
              />

              <div
                className="
                mt-3
                h-4
                w-16
                rounded
                bg-gray-200
                dark:bg-gray-800
              "
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getProducts({
          offset: 0,
          limit: FEATURED_LIMIT,
        });

        if (active) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Featured products error:", error);

        if (active) {
          setError(
            error instanceof Error
              ? error.message
              : "Something went wrong while loading products.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section
      id="shop"
      className="
        bg-background
        py-14
        sm:py-16
        lg:py-20
        dark:bg-surface
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* HEADER */}

        <div
          className="
            mb-8
            flex
            items-end
            justify-between
            gap-4
            sm:mb-10
          "
        >
          <div>
            <p
              className="
                mb-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.22em]
                text-text-secondary
              "
            >
              Shop
            </p>

            <h2
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-navy
                sm:text-3xl
                lg:text-4xl
                dark:text-white
              "
            >
              Featured Products
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-6
                text-text-secondary
                sm:text-base
              "
            >
              Discover some of our selected products.
            </p>
          </div>

          <Link
            href="/products"
            className="
              hidden
              shrink-0
              text-sm
              font-medium
              text-text-secondary
              transition-colors
              hover:text-brand
              sm:flex
            "
          >
            View all →
          </Link>
        </div>

        {/* LOADING */}

        {isLoading && <ProductSkeletons />}

        {/* ERROR */}

        {error && (
          <div
            className="
              mt-5
              rounded-xl
              border
              border-red-200
              bg-red-50
              px-5
              py-8
              text-center
              text-red-700
              dark:border-red-900/50
              dark:bg-red-950/20
              dark:text-red-300
            "
          >
            <p>{error}</p>

            <button
              type="button"
              onClick={fetchFeaturedProducts}
              className="
                mt-4
                rounded-lg
                bg-brand
                px-4
                py-2
                text-sm
                font-medium
                text-white
              "
            >
              Try again
            </button>
          </div>
        )}
        {/* PRODUCTS GRID */}

        {!isLoading && products.length > 0 && (
          <div
            className="
              grid
              grid-cols-2
              gap-x-3
              gap-y-6
              sm:gap-x-5
              sm:gap-y-8
              md:grid-cols-3
              lg:grid-cols-4
            "
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}

        {!isLoading && products.length === 0 && !error && (
          <div
            className="
              py-10
              text-center
              text-text-secondary
            "
          >
            No featured products available.
          </div>
        )}

        {/* MOBILE VIEW ALL */}

        <div className="mt-8 sm:hidden">
          <Link
            href="/products"
            className="
              flex
              w-full
              items-center
              justify-center
              rounded-lg
              border
              border-card
              px-4
              py-3
              text-sm
              font-medium
              text-text-secondary
            "
          >
            View all products →
          </Link>
        </div>
      </div>
    </section>
  );
}
