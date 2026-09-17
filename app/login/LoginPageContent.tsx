"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPageContent() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ mode: "onBlur" });
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const onSubmit: SubmitHandler<LoginForm> = async (values) => {
    setError("");

    try {
      await login(values);

      const pendingBuyNow = window.localStorage.getItem("fastbuy-pending-buy-now");

      if (pendingBuyNow) {
        localStorage.setItem("fastbuy-buy-now", pendingBuyNow);

        localStorage.removeItem("fastbuy-pending-buy-now");
      }

      router.push(redirect);
    } catch (requestError) {
      setError(
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
          <input
            type="password"
            autoComplete="current-password"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            {...register("password", {
              required: "Password is required.",
            })}
          />
          {errors.password && (
            <span className="mt-1 block text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </label>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
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
