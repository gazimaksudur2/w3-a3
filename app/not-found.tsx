"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center
        bg-background
        px-5
        dark:bg-surface
      "
    >

      <div
        className="
          max-w-md
          text-center
        "
      >

        {/* 404 Number */}

        <h1
          className="
            text-8xl
            font-bold
            tracking-tight
            text-brand
            opacity-90
          "
        >
          404
        </h1>


        <h2
          className="
            mt-5
            text-3xl
            font-bold
            text-navy
            dark:text-white
          "
        >
          Page not found
        </h2>


        <p
          className="
            mt-4
            text-sm
            leading-6
            text-text-secondary
            sm:text-base
          "
        >
          Sorry, the page you are looking for does not exist
          or has been moved.
        </p>



        <div
          className="
            mt-8
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:justify-center
          "
        >

          <Link
            href="/"
            className="
              rounded-lg
              bg-brand
              px-6
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-brand-hover
            "
          >
            Back to Home
          </Link>


          <Link
            href="/products"
            className="
              rounded-lg
              border
              border-card
              px-6
              py-3
              text-sm
              font-medium
              text-text-secondary
              transition
              hover:bg-surface
            "
          >
            Browse Products
          </Link>


        </div>


      </div>


    </main>
  );
}