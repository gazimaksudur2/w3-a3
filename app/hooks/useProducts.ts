import { useEffect, useState } from "react";
import { getProducts, type Product } from "../lib/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts({
        offset: 0,
        limit: 50,
      });

      setProducts(data);

      setLoading(false);
    }

    fetchProducts();
  }, []);

  return {
    products,
    loading,
  };
}
