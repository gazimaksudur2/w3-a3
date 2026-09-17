"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useCart } from "@/app/context/CartContext";

interface ProductActionsProps {
  product: {
    id: number;
    title: string;
    price: number;
    image: string;
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();

  const { addToCart } = useCart();

  const { user } = useAuth();

  function handleAddToCart() {
    addToCart({
      id: product.id,

      title: product.title,

      price: product.price,

      image: product.image,

      quantity: 1,
    });
  }

  function handleBuyNow() {
  const buyNowProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image,
    quantity: 1,
  };


  if (!user) {

    localStorage.setItem(
      "fastbuy-pending-buy-now",
      JSON.stringify(buyNowProduct),
    );


    const redirectUrl = encodeURIComponent(
      "/checkout?mode=buy"
    );


    router.push(
      `/login?redirect=${redirectUrl}`
    );


    return;
  }


  localStorage.setItem(
    "fastbuy-buy-now",
    JSON.stringify(buyNowProduct),
  );


  router.push("/checkout?mode=buy");
}

  return (
    <div
      className="
      mt-8
      flex
      gap-4
    "
    >
      <button
        onClick={handleBuyNow}
        className="
        flex-1
        rounded-lg
        bg-brand
        px-6
        py-3
        font-semibold
        text-white
        transition-all
        duration-200
        hover:bg-brand-hover
        hover:shadow-lg
        active:scale-95
        active:shadow-sm
    "
      >
        Buy Now
      </button>

      <button
        onClick={handleAddToCart}
        className="
        flex-1
        rounded-lg
        border
        border-brand
        px-6
        py-3
        font-semibold
        text-brand
        transition-all
        duration-200
        hover:bg-brand
        hover:text-white
        hover:shadow-lg
        active:scale-95
        active:shadow-sm
    "
      >
        Add To Cart
      </button>
    </div>
  );
}
