"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPageContent() {
  const { login } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ mode: "onBlur" });
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginForm> = async (values) => {
    try {
      await login(values);
      toast.success("Signed in successfully.");

      const pendingBuyNow = window.localStorage.getItem(
        "fastbuy-pending-buy-now",
      );

      if (pendingBuyNow) {
        localStorage.setItem("fastbuy-buy-now", pendingBuyNow);

        localStorage.removeItem("fastbuy-pending-buy-now");
      }

      router.push(redirect);
    } catch (requestError) {
      toast.error(
        requestError instanceof Error
          ? requestError.message
          : "Unable to sign in.",
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
            Welcome back
          </h1>
        </div>
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
              autoComplete="current-password"
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
        rounded-full
        p-1
        text-gray-500
        transition
        hover:bg-gray-100
        hover:text-brand
        dark:text-gray-300
        dark:hover:bg-gray-800
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
          {errors.password && (
            <span className="mt-1 block text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </label>
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full rounded-md bg-brand px-4 py-2 font-medium text-white transition hover:bg-brand-hover disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
        <p className="text-center text-sm text-text-secondary">
          Do not have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-brand hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
