"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPageContent() {
  const searchParams = useSearchParams();

  const [buyNowItem, setBuyNowItem] = useState(null);
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  useEffect(() => {
    if (searchParams.get("mode") === "buy") {
      const storedItem = window.localStorage.getItem("fastbuy-buy-now");

      if (storedItem) {
        setBuyNowItem(JSON.parse(storedItem));
      }
    }
  }, [searchParams]);

  const checkoutItems =
    searchParams.get("mode") === "buy" && buyNowItem ? [buyNowItem] : cartItems;
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = checkoutItems.length > 0 ? 10 : 0;

  const grandTotal = subtotal + deliveryFee;

  if (checkoutItems.length === 0) {
    return (
      <main
        className="
        flex
        min-h-[60vh]
        flex-col
        items-center
        justify-center
        px-4
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-gray-900
          dark:text-white
        "
        >
          Your cart is empty
        </h1>

        <Link
          href="/products"
          className="
            mt-6
            rounded-lg
            bg-brand
            px-6
            py-3
            text-white
          "
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main
      className="
      mx-auto
      max-w-7xl
      px-4
      py-12
    "
    >
      <h1
        className="
        mb-8
        text-4xl
        font-bold
        text-gray-900
        dark:text-white
      "
      >
        Shopping Cart
      </h1>

      <div
        className="
        grid
        gap-8
        lg:grid-cols-3
      "
      >
        {/* CART ITEMS */}

        <div
          className="
          space-y-5
          lg:col-span-2
        "
        >
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="
                flex
                gap-5
                rounded-xl
                border
                border-gray-200
                bg-white
                p-5
                dark:border-gray-800
                dark:bg-gray-900
              "
            >
              <div
                className="
                relative
                h-28
                w-28
                shrink-0
              "
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="
                    rounded-lg
                    object-cover
                  "
                />
              </div>

              <div
                className="
    flex
    flex-1
    flex-col
  "
              >
                <div
                  className="
      flex
      justify-between
      gap-4
    "
                >
                  <div>
                    <h2
                      className="
          font-semibold
          text-gray-900
          dark:text-white
        "
                    >
                      {item.title}
                    </h2>

                    <p
                      className="
          mt-2
          font-bold
          text-brand
        "
                    >
                      ${item.price} each
                    </p>
                  </div>

                  <div
                    className="
        text-right
      "
                  >
                    <p
                      className="
          text-lg
          font-bold
          text-gray-900
          dark:text-white
        "
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <p
                      className="
          text-sm
          text-gray-500
          dark:text-gray-400
        "
                    >
                      Subtotal
                    </p>
                  </div>
                </div>

                <div
                  className="
      mt-auto
      flex
      items-center
      gap-3
    "
                >
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-md
        border
        hover:bg-gray-100
        dark:hover:bg-gray-800
      "
                  >
                    -
                  </button>

                  <span
                    className="
        min-w-8
        text-center
        font-semibold
      "
                  >
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="
        flex
        h-8
        w-8
        items-center
        justify-center
        rounded-md
        border
        hover:bg-gray-100
        dark:hover:bg-gray-800
      "
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="
        ml-auto
        text-sm
        text-red-500
        hover:text-red-700
      "
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}

        <div
          className="
          h-fit
          rounded-xl
          border
          border-gray-200
          bg-white
          p-6
          dark:border-gray-800
          dark:bg-gray-900
        "
        >
          <h2
            className="
            text-2xl
            font-bold
            text-gray-900
            dark:text-white
          "
          >
            Order Summary
          </h2>

          <div
            className="
            mt-6
            space-y-4
          "
          >
            <div
              className="
              flex
              justify-between
            "
            >
              <span>Subtotal</span>

              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div
              className="
              flex
              justify-between
            "
            >
              <span>Delivery</span>

              <span>$10</span>
            </div>

            <div
              className="
              flex
              justify-between
              border-t
              pt-4
              text-lg
              font-bold
            "
            >
              <span>Total</span>

              <span className="text-brand">${grandTotal}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="
              mt-8
              block
              rounded-lg
              bg-brand
              px-6
              py-3
              text-center
              font-semibold
              text-white
              hover:bg-brand-hover
            "
          >
            Proceed To Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}
