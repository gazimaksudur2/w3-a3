"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

interface CheckoutItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CheckoutFormData {
  name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  postalCode: string;
}

interface CheckoutFormProps {
  checkoutItems: CheckoutItem[];

  subtotal: number;

  mode: "buy" | "cart";

  onSuccess: (invoiceId: string) => void;
}

export default function CheckoutForm({
  checkoutItems,
  subtotal,
  mode,
  onSuccess,
}: CheckoutFormProps) {
  const { user } = useAuth();

  const { clearCart } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    mode: "onBlur",

    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    const invoiceId = "FB-" + Date.now();

    const deliveryFee = 10;

    const total = subtotal + deliveryFee;

    const order = {
      invoiceId,

      customer: data,

      items: checkoutItems,

      subtotal,

      deliveryFee,

      total,
    };

    localStorage.setItem("fastbuy-order", JSON.stringify(order));

    if (mode === "buy") {
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

            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },

            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name can contain only letters",
            },
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
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

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

            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
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
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

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

            minLength: {
              value: 10,
              message: "Address must be at least 10 characters",
            },
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
          <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

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

            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "City can contain only letters",
            },
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
          <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>

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
          inputMode="numeric"
          placeholder="017XXXXXXXX"
          {...register("phone", {
            required: "Phone number is required",

            pattern: {
              value: /^[+]?[0-9]{10,15}$/,
              message: "Enter a valid phone number",
            },
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
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

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

            pattern: {
              value: /^[0-9]{4,6}$/,
              message: "Enter a valid postal code",
            },
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
          <p className="mt-1 text-sm text-red-500">
            {errors.postalCode.message}
          </p>
        )}
      </div>

      <div
        className="
        rounded-lg
        border
        p-4
        dark:border-gray-700
        "
      >
        <h3 className="font-semibold">Payment Method</h3>

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
        disabled={!isValid}
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
