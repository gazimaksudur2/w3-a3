"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getProducts, type Product } from "../lib/products";

const PRODUCTS_PER_PAGE = 8;

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const observerTarget = useRef<HTMLDivElement | null>(null);

  // Keep pagination offset independently from rendered product count.
  const offsetRef = useRef(0);

  // Prevent multiple requests at the same time.
  const loadingRef = useRef(false);

  const loadMoreProducts = useCallback(async () => {
    if (loadingRef.current || !hasMore) {
      return;
    }

    try {
      loadingRef.current = true;
      setIsLoading(true);
      setError(null);

      const currentOffset = offsetRef.current;

      const data = await getProducts({
        offset: currentOffset,
        limit: PRODUCTS_PER_PAGE,
      });

      // Remove possible duplicate products.
      setProducts((currentProducts) => {
        const productMap = new Map<number, Product>();

        currentProducts.forEach((product) => {
          productMap.set(product.id, product);
        });

        data.forEach((product) => {
          productMap.set(product.id, product);
        });

        return Array.from(productMap.values());
      });

      // Move API pagination forward.
      offsetRef.current += PRODUCTS_PER_PAGE;

      // If API returns fewer than requested,
      // there are no more products.
      if (data.length < PRODUCTS_PER_PAGE) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Featured products error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while loading products."
      );
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [hasMore]);

  // Initial product request.
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadMoreProducts();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadMoreProducts]);

  // Infinite scroll observer.
  useEffect(() => {
    const target = observerTarget.current;

    if (!target || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !loadingRef.current) {
          void loadMoreProducts();
        }
      },
      {
        root: null,

        // Start loading slightly before user reaches the bottom.
        rootMargin: "300px",

        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    loadMoreProducts,
    hasMore,
    isLoading,
    products.length,
  ]);

  return (
    <section
      id="shop"
      className="bg-white py-14 sm:py-16 lg:py-20 dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/*HEADER*/}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500 dark:text-gray-400">
              Shop
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">
              Featured Products
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base dark:text-gray-400">
              Discover some of our selected products and keep scrolling
              to explore more.
            </p>
          </div>

          <Link
            href="/products"
            className="hidden shrink-0 items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-black sm:flex dark:text-gray-300 dark:hover:text-white"
          >
            View all

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
        </div>

        {/*PRODUCTS GRID*/}
        {products.length > 0 && (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

        {/*INITIAL LOADING*/}
        {isLoading && products.length === 0 && (
          <ProductSkeletons />
        )}

        {/*ERROR*/}
        {error && (
          <div className="mt-10 flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-5 py-8 text-center dark:border-red-900/50 dark:bg-red-950/20">
            <p className="text-sm font-medium text-red-700 dark:text-red-300">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadMoreProducts()}
              className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Try again
            </button>
          </div>
        )}

        {/*INFINITE SCROLL TARGET*/}
        {hasMore && !error && (
          <div
            ref={observerTarget}
            className="mt-8 flex min-h-20 items-center justify-center"
          >
            {isLoading && products.length > 0 && (
              <div
                className="flex items-center gap-3"
                aria-live="polite"
              >
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />

                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Loading more products...
                </span>
              </div>
            )}
          </div>
        )}

        {/*END MESSAGE*/}
        {!hasMore && products.length > 0 && (
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              You&apos;ve reached the end.
            </p>
          </div>
        )}

        {/*MOBILE VIEW ALL*/}
        <div className="mt-8 sm:hidden">
          <Link
            href="/products"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            View all products

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
        </div>
      </div>
    </section>
  );
}

/* PRODUCT CARD */

function ProductCard({
  product,
}: {
  product: Product;
}) {
  const image =
    product.images?.[0] ||
    product.category?.image ||
    "https://placehold.co/600x600?text=Product";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block min-w-0"
    >
      {/* Product image */}
      <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
        <img
          src={image}
          alt={product.title}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;

            event.currentTarget.src =
              "https://placehold.co/600x750?text=Product";
          }}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Image overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

        {/* Category badge */}
        {product.category?.name && (
          <span className="absolute left-3 top-3 max-w-[75%] truncate rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-gray-800 shadow-sm backdrop-blur-sm dark:bg-gray-900/85 dark:text-gray-200">
            {product.category.name}
          </span>
        )}

        {/* Hover view button */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex items-center justify-center gap-2 rounded-lg bg-white/95 px-3 py-2.5 text-xs font-semibold text-gray-900 shadow-md backdrop-blur-md dark:bg-gray-900/95 dark:text-white">
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
      </div>

      {/* Product information */}
      <div className="pt-3">
        <p className="mb-1 truncate text-xs text-gray-400 dark:text-gray-500">
          {product.category?.name}
        </p>

        <h3 className="truncate text-sm font-medium text-gray-900 transition-colors group-hover:text-gray-600 sm:text-base dark:text-gray-100 dark:group-hover:text-gray-300">
          {product.title}
        </h3>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
            ${product.price.toLocaleString()}
          </p>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 group-hover:border-gray-900 group-hover:bg-gray-900 group-hover:text-white dark:border-gray-700 dark:text-gray-400 dark:group-hover:border-white dark:group-hover:bg-white dark:group-hover:text-gray-900">
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
          </span>
        </div>
      </div>
    </Link>
  );
}

/*LOADING SKELETONS */

function ProductSkeletons() {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({
        length: PRODUCTS_PER_PAGE,
      }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse"
        >
          <div className="aspect-4/5 rounded-xl bg-gray-200 dark:bg-gray-800" />

          <div className="pt-3">
            <div className="mb-2 h-3 w-16 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="mt-3 h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}