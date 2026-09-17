"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useSearchParams } from "next/navigation";

interface CheckoutFormData {
  name: string;

  email: string;

  address: string;

  city: string;

  phone: string;

  postalCode: string;
}

interface CheckoutFormProps {
  onSuccess: (invoiceId: string) => void;
}

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();

  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      name: user?.name || "",

      email: user?.email || "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    const invoiceId = "FB-" + Date.now();

    const buyNowItem = localStorage.getItem("fastbuy-buy-now");

    let orderItems = cartItems;

    let subtotal = cartTotal;

    if (searchParams.get("mode") === "buy" && buyNowItem) {
      const item = JSON.parse(buyNowItem);

      orderItems = [item];

      subtotal = item.price * item.quantity;
    }

    const deliveryFee = 10;

    const total = subtotal + deliveryFee;

    const order = {
      invoiceId,

      customer: data,

      items: orderItems,

      subtotal,

      deliveryFee,

      total,
    };

    localStorage.setItem(
      "fastbuy-order",

      JSON.stringify(order),
    );

    if (searchParams.get("mode") === "buy") {
      localStorage.removeItem("fastbuy-buy-now");
    } else {
      clearCart();
    }

    onSuccess(invoiceId);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        space-y-5
      "
    >
      {/* NAME */}

      <div>
        <label
          className="
          mb-2
          block
          text-sm
          font-medium
        "
        >
          Full Name
        </label>

        <input
          {...register("name", {
            required: "Name is required",
          })}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-white
            dark:bg-gray-800
            dark:border-gray-700
          "
        />

        {errors.name && (
          <p
            className="
            mt-1
            text-sm
            text-red-500
          "
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* EMAIL */}

      <div>
        <label
          className="
          mb-2
          block
          text-sm
          font-medium
        "
        >
          Email
        </label>

        <input
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-white
            dark:bg-gray-800
            dark:border-gray-700
          "
        />

        {errors.email && (
          <p
            className="
            mt-1
            text-sm
            text-red-500
          "
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* ADDRESS */}

      <div>
        <label
          className="
          mb-2
          block
          text-sm
          font-medium
        "
        >
          Full Address
        </label>

        <textarea
          rows={4}
          {...register("address", {
            required: "Address is required",
          })}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-white
            dark:bg-gray-800
            dark:border-gray-700
          "
        />

        {errors.address && (
          <p
            className="
            mt-1
            text-sm
            text-red-500
          "
          >
            {errors.address.message}
          </p>
        )}
      </div>

      {/* CITY */}

      <div>
        <label
          className="
          mb-2
          block
          text-sm
          font-medium
        "
        >
          City
        </label>

        <input
          {...register("city", {
            required: "City is required",
          })}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-white
            dark:bg-gray-800
            dark:border-gray-700
          "
        />

        {errors.city && (
          <p
            className="
            mt-1
            text-sm
            text-red-500
          "
          >
            {errors.city.message}
          </p>
        )}
      </div>

      {/* PHONE */}

      <div>
        <label
          className="
          mb-2
          block
          text-sm
          font-medium
        "
        >
          Phone Number
        </label>

        <input
          type="tel"
          {...register("phone", {
            required: "Phone number is required",
          })}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-white
            dark:bg-gray-800
            dark:border-gray-700
          "
        />

        {errors.phone && (
          <p
            className="
            mt-1
            text-sm
            text-red-500
          "
          >
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* POSTAL CODE */}

      <div>
        <label
          className="
          mb-2
          block
          text-sm
          font-medium
        "
        >
          Postal Code
        </label>

        <input
          {...register("postalCode", {
            required: "Postal code is required",
          })}
          className="
            w-full
            rounded-lg
            border
            px-4
            py-3
            bg-white
            dark:bg-gray-800
            dark:border-gray-700
          "
        />

        {errors.postalCode && (
          <p
            className="
            mt-1
            text-sm
            text-red-500
          "
          >
            {errors.postalCode.message}
          </p>
        )}
      </div>

      {/* PAYMENT */}

      <div
        className="
        rounded-lg
        border
        p-4
        dark:border-gray-700
      "
      >
        <h3
          className="
          font-semibold
        "
        >
          Payment Method
        </h3>

        <label
          className="
          mt-3
          flex
          items-center
          gap-3
        "
        >
          <input type="radio" checked readOnly />
          Cash On Delivery
        </label>
      </div>

      <button
        type="submit"
        className="
          w-full
          rounded-lg
          bg-brand
          px-6
          py-3
          font-semibold
          text-white
          hover:bg-brand-hover
        "
      >
        Place Order
      </button>
    </form>
  );
}
