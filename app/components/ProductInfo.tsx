import React from "react";
import { Product } from "../lib/products";
import ProductActions from "./ProductActions";

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <div
      className="
            flex
            flex-col
            justify-center
          "
    >
      <p
        className="
            text-sm
            text-text-secondary
          "
      >
        {product.category.name}
      </p>

      <h1
        className="
            mt-3
            text-4xl
            font-bold
            text-navy
            dark:text-white
          "
      >
        {product.title}
      </h1>

      <p
        className="
            mt-5
            text-3xl
            font-bold
            text-brand
          "
      >
        ${product.price}
      </p>

      <p
        className="
            mt-5
            leading-7
            text-text-secondary
          "
      >
        {product.description}
      </p>

      <ProductActions product={{...product, image: product.images[0]}} />
    </div>
  );
}
