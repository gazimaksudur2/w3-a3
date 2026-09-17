import { useEffect, useState } from "react";
import { getProducts, type Product } from "../lib/products";
import toast from "react-hot-toast";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts({
          offset: 0,
          limit: 50,
        });

        setProducts(data);
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to load products.",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return {
    products,
    loading,
  };
}
