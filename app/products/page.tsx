"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Product } from "../lib/products";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductsPage() {
  const { products, loading } = useProducts();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12;

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    let result = [...products];

    // Search filter
    if (search.trim()) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Category filter
    if (category !== "all") {
      result = result.filter((product) => product.category.name === category);
    }

    // Price filter
    if (maxPrice) {
      result = result.filter((product) => product.price <= Number(maxPrice));
    }

    setFilteredProducts(result);

    // Reset pagination after filtering
    setCurrentPage(1);
  }, [search, category, maxPrice, products]);

  useEffect(() => {
    const urlCategory = searchParams.get("category") || "all";

    setCategory(urlCategory);
  }, [searchParams]);

  const categories = [
    "all",
    ...Array.from(new Set(products.map((product) => product.category.name))),
  ];

  // Pagination calculation

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  if (loading) {
    return (
      <div
        className="
        flex min-h-[50vh] items-center justify-center
        text-text-secondary
      "
      >
        Loading products...
      </div>
    );
  }

  return (
    <main
      className="
      mx-auto w-full max-w-7xl px-4 py-10
    "
    >
      <h1
        className="
        mb-8 text-4xl font-bold
        text-navy
        dark:text-white
      "
      >
        All Products
      </h1>

      {/* FILTER AREA */}

      <div
        className="
        mb-10 grid gap-4 rounded-xl border p-5
        border-card
        bg-surface
        dark:bg-surface
        md:grid-cols-3
      "
      >
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            rounded-lg border px-4 py-2
            border-card
            bg-background
            text-navy
            placeholder:text-text-secondary
            focus:outline-none
            focus:ring-2
            focus:ring-brand
            dark:bg-gray-800
            dark:text-white
          "
        />

        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="
      w-full
      rounded-lg
      border
      border-card
      bg-background
      px-4
      py-2
      text-navy
      focus:outline-none
      focus:ring-2
      focus:ring-brand
      dark:bg-gray-800
      dark:text-white
    "
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {category !== "all" && (
            <button
              type="button"
              onClick={() => {
                setCategory("all");
                router.push("/products");
              }}
              className="
        absolute
        right-1
        top-1/2
        -translate-y-1/2

        rounded-md
        border
        border-gray-300

        bg-white
        px-2
        py-1

        text-xs
        font-medium
        text-gray-600

        transition

        hover:border-red-400
        hover:bg-red-50
        hover:text-red-500

        dark:border-gray-600
        dark:bg-gray-800
        dark:text-gray-300

        dark:hover:border-red-500
        dark:hover:bg-red-900/30
        dark:hover:text-red-400
      "
            >
              Clear
            </button>
          )}
        </div>

        <input
          type="number"
          placeholder="Maximum price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="
            rounded-lg border px-4 py-2
            border-card
            bg-background
            text-navy
            placeholder:text-text-secondary
            focus:outline-none
            focus:ring-2
            focus:ring-brand
            dark:bg-gray-800
            dark:text-white
          "
        />
      </div>

      {/* PRODUCT GRID */}

      <div
        className="
        grid gap-6
        sm:grid-cols-2
        lg:grid-cols-4
      "
      >
        {currentProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div
          className="
          mt-10 flex flex-wrap
          items-center justify-center gap-2
        "
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="
              rounded-lg border px-4 py-2
              border-gray-300
              bg-background
              text-text-secondary
              disabled:opacity-50
              dark:border-gray-700
              dark:bg-surface
              dark:text-gray-200
            "
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded-lg border px-4 py-2${
                  currentPage === page
                    ? "border-brand bg-brand text-white"
                    : "border-gray-300 bg-background text-text-secondary dark:border-gray-700 dark:bg-surface dark:text-gray-200"
                }
              `}
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="
              rounded-lg border px-4 py-2
              border-gray-300
              bg-background
              text-text-secondary
              disabled:opacity-50
              dark:border-gray-700
              dark:bg-surface
              dark:text-gray-200
            "
          >
            Next
          </button>
        </div>
      )}

      {filteredProducts.length === 0 && (
        <p
          className="
          mt-10 text-center
          text-text-secondary
        "
        >
          No products found.
        </p>
      )}
    </main>
  );
}
