"use client";

import { useCart } from "../context/CartContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/navigation";
import OrderSuccessModal from "../components/OrderSuccessModal";
import Image from "next/image";

export default function CheckoutPage() {
  const [showModal, setShowModal] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");

  const router = useRouter();
  const { cartItems, cartTotal } = useCart();
  const searchParams = useSearchParams();

  const [buyNowItem, setBuyNowItem] = useState<any>(null);

  useEffect(() => {
    if (searchParams.get("mode") === "buy") {
      const item = localStorage.getItem("fastbuy-buy-now");

      if (item) {
        setBuyNowItem(JSON.parse(item));
      }
    }
  }, [searchParams]);

  const checkoutItems = buyNowItem ? [buyNowItem] : cartItems;

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = checkoutItems.length > 0 ? 10 : 0;

  const total = subtotal + deliveryFee;

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
        mb-10
        text-4xl
        font-bold
        text-gray-900
        dark:text-white
      "
      >
        Checkout
      </h1>

      <div
        className="
        grid
        gap-10
        lg:grid-cols-3
      "
      >
        {/* FORM SECTION */}

        <div
          className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-6
          dark:border-gray-800
          dark:bg-gray-900
          lg:col-span-2
        "
        >
          <h2
            className="
            mb-6
            text-2xl
            font-semibold
            text-gray-900
            dark:text-white
          "
          >
            Customer Information
          </h2>

          <CheckoutForm
            checkoutItems={checkoutItems}
            subtotal={subtotal}
            mode={searchParams.get("mode") === "buy" ? "buy" : "cart"}
            onSuccess={(id) => {
              setInvoiceId(id);
              setShowModal(true);
            }}
          />
        </div>

        {/* ORDER SUMMARY */}

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
            font-semibold
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
            text-gray-600
            dark:text-gray-300
          "
          >
            <div className="mt-6 space-y-4">
              {checkoutItems.map((item) => (
                <div
                  key={item.id}
                  className="
        flex
        gap-4
        rounded-lg
        border
        p-3
        dark:border-gray-700
      "
                >
                  {/* PRODUCT IMAGE */}
                  <div
                    className="
          relative
          h-20
          w-20
          shrink-0
          overflow-hidden
          rounded-lg
          bg-gray-100
          dark:bg-gray-800
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

                  {/* PRODUCT DETAILS */}
                  <div
                    className="
          flex
          flex-1
          justify-between
          gap-3
        "
                  >
                    <div>
                      <p
                        className="
              font-medium
              text-gray-900
              dark:text-white
              line-clamp-2
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
                        Qty: {item.quantity}
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

                    {/* PRICE */}
                    <div
                      className="
            text-right
            whitespace-nowrap
          "
                    >
                      <p
                        className="
              font-semibold
              text-gray-900
              dark:text-white
            "
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="
              flex
              justify-between
            "
            >
              <span>Subtotal</span>

              <span>${subtotal}</span>
            </div>

            <div
              className="
              flex
              justify-between
            "
            >
              <span>Delivery Fee</span>

              <span>${deliveryFee}</span>
            </div>

            <div
              className="
              flex
              justify-between
              border-t
              pt-4
              font-bold
              text-gray-900
              dark:text-white
            "
            >
              <span>Total</span>

              <span className="text-brand">${total}</span>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <OrderSuccessModal
          invoiceId={invoiceId}
          onViewInvoice={() => {
            router.push(`/invoice/${invoiceId}`);
          }}
        />
      )}
    </main>
  );
}
