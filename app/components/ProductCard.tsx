import Image from "next/image";
import React from "react";
import { type Product } from "../lib/products";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div
        key={product.id}
        className="
                  rounded-xl border p-4 shadow-sm
                  border-card
                  bg-card   
                  transition
                  hover:shadow-md
                  dark:bg-surface
                "
      >
        <div className="relative mb-4 h-56">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="
                      rounded-lg object-cover
                    "
          />
        </div>

        <h2
          className="
                  font-semibold
                  text-navy
                  dark:text-white
                "
        >
          {product.title}
        </h2>

        <p
          className="
                  mt-2
                  font-bold text-brand
                "
        >
          ${product.price}
        </p>

        <span
          className="
                  text-sm
                  text-text-secondary
                "
        >
          {product.category.name}
        </span>
      </div>
    </Link>
  );
}
