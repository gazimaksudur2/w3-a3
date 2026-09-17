import ProductCard from "./ProductCard";
import type { Product } from "../lib/products";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2
        className="
        mb-8
        text-3xl
        font-bold
        text-navy
        dark:text-white
      "
      >
        Related Products
      </h2>

      <div
        className="
        grid
        gap-6
        sm:grid-cols-2
        lg:grid-cols-4
      "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
