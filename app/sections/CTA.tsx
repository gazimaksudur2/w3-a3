"use client";

import type { FormEvent } from "react";
import toast from "react-hot-toast";

export default function CTA() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success("You are on the FastBuy list.");
  };

  return (
    <section id="cta" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-light leading-tight text-navy md:text-5xl dark:text-white">
              Bring something new home.
              <br className="hidden md:block" /> Get FastBuy updates.
            </h2>
            <p className="mt-4 max-w-lg text-gray-700 dark:text-gray-300">
              Be the first to hear about new arrivals, featured products, and
              offers picked for everyday shopping.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <label htmlFor="subscriber-name" className="sr-only">
              Your name
            </label>
            <input
              id="subscriber-name"
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="w-full rounded-md border border-gray-300 bg-background px-4 py-3 text-navy"
            />
            <label htmlFor="subscriber-email" className="sr-only">
              Email address
            </label>
            <input
              id="subscriber-email"
              name="email"
              type="email"
              placeholder="Email address"
              required
              className="w-full rounded-md border border-gray-300 bg-background px-4 py-3 text-navy"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-brand px-6 py-3 font-medium uppercase tracking-wider text-white hover:bg-brand-hover"
            >
              Subscribe to FastBuy
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
