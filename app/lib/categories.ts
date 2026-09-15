import { apiUrl } from "./api";

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(apiUrl("categories"), {
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    return (await response.json()) as Category[];
  } catch (error) {
    console.error("Category fetch error:", error);
    return [];
  }
}
