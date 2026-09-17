"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";



export default function CartPage() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartTotal,
  } = useCart();

  const deliveryFee = cartItems.length > 0 ? 10 : 0;

  const grandTotal = cartTotal + deliveryFee;

  if (cartItems.length === 0) {
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
                  text-brand
                  font-bold
                "
                >
                  ${item.price}
                </p>

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
                      h-8
                      w-8
                      rounded-md
                      border
                    "
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="
                      h-8
                      w-8
                      rounded-md
                      border
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

              <span>${cartTotal}</span>
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
