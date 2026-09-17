import Image from "next/image";
import { notFound } from "next/navigation";
import { getProducts } from "../../lib/products";
import ProductGallery from "@/app/components/ProductGallery";
import ProductInfo from "@/app/components/ProductInfo";
import RelatedProducts from "@/app/components/RelatedProducts";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const products = await getProducts({
    offset: 0,
    limit: 100,
  });

  const product = products.find((item) => String(item.id) === id);
  const relatedProducts = products
  .filter(
    (item)=>
      item.category.id === product?.category.id &&
      item.id !== product?.id
  )
  .slice(0,4);

  if (!product) {
    notFound();
  }

  return (
    <main
      className="mx-auto max-w-7xl px-4 py-12"
    >
      <div
        className=" grid gap-10 lg:grid-cols-2"
      > 
      <ProductGallery product={product} />
      <ProductInfo product={product} />
      </div>
      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
