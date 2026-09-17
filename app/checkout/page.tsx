"use client";

import { useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useRouter } from "next/navigation";
import OrderSuccessModal from "../components/OrderSuccessModal";

export default function CheckoutPage() {
  const [showModal, setShowModal] = useState(false);
  const [invoiceId, setInvoiceId] = useState("");

  const router = useRouter();
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
            <div
              className="
              flex
              justify-between
            "
            >
              <span>Subtotal</span>

              <span>$0</span>
            </div>

            <div
              className="
              flex
              justify-between
            "
            >
              <span>Delivery Fee</span>

              <span>$10</span>
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

              <span className="text-brand">$10</span>
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
