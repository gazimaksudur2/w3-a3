import { useEffect, useState } from "react";
import { getProducts, type Product } from "../lib/products";

const allowedHosts = [
  "plus.unsplash.com",
  "images.unsplash.com",
  "picsum.photos",
];

function isValidImage(url: string) {
  try {
    const parsed = new URL(url);

    return allowedHosts.includes(parsed.hostname);
  } catch {
    return false;
  }
}

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFudHN8ZW58MHx8MHx8fDA%3D";

function sanitizeProducts(products: Product[]) {
  return products.map((product) => {
    const validImages = product.images.filter(isValidImage);

    return {
      ...product,
      images: validImages.length ? validImages : [FALLBACK_IMAGE],
    };
  });
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts({
        offset: 0,
        limit: 50,
      });

      const cleanProducts = sanitizeProducts(data);

      setProducts(cleanProducts);

      setLoading(false);
    }

    fetchProducts();
  }, []);

  return {
    products,
    loading,
  };
}
