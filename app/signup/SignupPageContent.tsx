"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPageContent() {
  const { signup } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({ mode: "onBlur" });
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<SignupForm> = async (values) => {
    try {
      await signup(values);
      toast.success("Account created successfully.");

      const pendingBuyNow = localStorage.getItem("fastbuy-pending-buy-now");

      if (pendingBuyNow) {
        localStorage.setItem("fastbuy-buy-now", pendingBuyNow);

        localStorage.removeItem("fastbuy-pending-buy-now");
      }

      router.push(redirect);
    } catch (requestError) {
      toast.error(
        requestError instanceof Error
          ? requestError.message
          : "Unable to create account.",
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-md space-y-5 rounded-lg bg-card p-8 shadow-sm"
      >
        <div className="flex flex-col items-center">
          {/* LOGO */}
          <Link href="/" className="tracking-wide">
            <Image
              src="/fastbuy-brand-logo.png"
              alt="FastBuy Logo"
              width={68}
              height={68}
            />
          </Link>
          <h1 className="mt-2 text-3xl font-semibold text-navy dark:text-white">
            Create an account
          </h1>
        </div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Name
          <input
            autoComplete="name"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            {...register("name", {
              required: "Name is required.",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters.",
              },
            })}
          />
          {errors.name && (
            <span className="mt-1 block text-sm text-red-600">
              {errors.name.message}
            </span>
          )}
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Email
          <input
            type="email"
            autoComplete="email"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <span className="mt-1 block text-sm text-red-600">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Password
          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="
      w-full
      rounded-md
      border
      border-gray-300
      px-3
      py-2
      pr-10
      dark:border-gray-600
      dark:bg-gray-700
      dark:text-white
    "
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2
      text-gray-500
      transition
      hover:text-brand
      dark:text-gray-300
    "
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff size={20} strokeWidth={1.8} />
              ) : (
                <Eye size={20} strokeWidth={1.8} />
              )}
            </button>
          </div>
        </label>
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-md bg-brand px-4 py-2 font-medium text-white transition hover:bg-brand-hover disabled:opacity-50"
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
        <p className="text-center text-sm text-text-secondary">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-brand hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
