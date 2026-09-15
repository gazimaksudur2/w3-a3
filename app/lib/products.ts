import type { Category } from "./categories";
import { publicApiUrl } from "./api";

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
}

interface ProductPage {
  offset: number;
  limit: number;
}

export async function getProducts({ offset, limit }: ProductPage): Promise<Product[]> {
  const searchParams = new URLSearchParams({
    offset: String(offset),
    limit: String(limit),
  });
  const response = await fetch(`${publicApiUrl("products")}?${searchParams}`);

  if (!response.ok) {
    throw new Error("Failed to load products.");
  }

  return (await response.json()) as Product[];
}
