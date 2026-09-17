"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

import type { Order } from "../../lib/order";

export default function InvoicePage() {
  const params = useParams();

  const id = params.id;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("fastbuy-order");

    if (savedOrder) {
      const parsedOrder = JSON.parse(savedOrder);

      setOrder(parsedOrder);
    }
  }, []);

  if (!order) {
    return (
      <div
        className="
        flex
        min-h-[50vh]
        items-center
        justify-center
      "
      >
        Loading invoice...
      </div>
    );
  }

  return (
    <main
      className="
      mx-auto
      max-w-4xl
      px-4
      py-12
    "
    >
      <div
        className="
        rounded-xl
        border
        border-gray-200
        bg-white
        p-8
        dark:border-gray-800
        dark:bg-gray-900
      "
      >
        <div
          className="
          flex
          justify-between
          items-start
        "
        >
          <div>
            <h1
              className="
              text-3xl
              font-bold
              text-gray-900
              dark:text-white 
            "
            >
              FastBuy Invoice
            </h1>

            <p
              className="
              mt-2
              text-gray-500
            "
            >
              Invoice ID: {id}
            </p>
          </div>

          <p
            className="
            text-brand
            font-semibold
          "
          >
            Cash On Delivery
          </p>
        </div>

        {/* CUSTOMER */}

        <div
          className="
          mt-8
          border-t
          pt-6
        "
        >
          <h2
            className="
            text-xl
            font-semibold
          "
          >
            Customer Details
          </h2>

          <div
            className="
            mt-4
            space-y-1
            text-gray-600
            dark:text-gray-300
          "
          >
            <p>Name: {order.customer.name}</p>

            <p>Email: {order.customer.email}</p>

            <p>Address: {order.customer.address}</p>

            <p>City: {order.customer.city}</p>

            <p>Phone: {order.customer.phone}</p>
          </div>
        </div>

        {/* PRODUCTS */}

        <div
          className="
          mt-8
          border-t
          pt-6
        "
        >
          <h2
            className="
            text-xl
            font-semibold
          "
          >
            Products
          </h2>

          <div
            className="
            mt-5
            space-y-4
          "
          >
            {order.items?.map((item) => (
              <div
                key={item.id}
                className="
      flex
      gap-4
      rounded-lg
      bg-gray-50
      p-4
      dark:bg-gray-800
    "
              >
                <div
                  className="
        relative
        h-20
        w-20
        shrink-0
        overflow-hidden
        rounded-lg
        bg-gray-200
        dark:bg-gray-700
      "
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="
          object-cover
        "
                  />
                </div>

                <div
                  className="
        flex
        flex-1
        justify-between
        gap-4
      "
                >
                  <div>
                    <p
                      className="
            font-medium
            text-gray-900
            dark:text-white
          "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
            mt-1
            text-sm
            text-gray-500
            dark:text-gray-400
          "
                    >
                      Quantity: {item.quantity}
                    </p>

                    <p
                      className="
            mt-1
            text-sm
            text-gray-500
            dark:text-gray-400
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
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}

        <div
          className="
          mt-8
          border-t
          pt-6
          space-y-3
        "
        >
          <div
            className="
            flex
            justify-between
          "
          >
            <span>Subtotal</span>

            <span>${order.subtotal}</span>
          </div>

          <div
            className="
            flex
            justify-between
          "
          >
            <span>Delivery Fee</span>

            <span>${order.deliveryFee}</span>
          </div>

          <div
            className="
            flex
            justify-between
            text-xl
            font-bold
          "
          >
            <span>Total</span>

            <span className="text-brand">${order.total}</span>
          </div>
        </div>

        <Link
          href="/"
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
          Back To Home
        </Link>
      </div>
    </main>
  );
}
