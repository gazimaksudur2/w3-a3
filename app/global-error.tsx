"use client";

import { useEffect } from "react";

export default function GlobalError({
  reset,
}: {
  reset: () => void;
}) {

  useEffect(() => {
    console.error(
      "A global application error occurred"
    );
  }, []);


  return (
    <html lang="en">
      <body>

        <main
          className="
            flex
            min-h-screen
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
              rounded-2xl
              border
              border-card
              bg-white
              p-8
              text-center
              shadow-lg
              dark:bg-gray-900
            "
          >

            {/* Error Icon */}

            <div
              className="
                mx-auto
                mb-6
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-red-100
                text-4xl
                dark:bg-red-950
              "
            >
              ⚠️
            </div>


            <h1
              className="
                mb-3
                text-3xl
                font-bold
                text-navy
                dark:text-white
              "
            >
              Something went wrong
            </h1>


            <p
              className="
                mb-8
                text-sm
                leading-6
                text-text-secondary
              "
            >
              We encountered an unexpected error.
              Please try again or return to the homepage.
            </p>


            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:justify-center
              "
            >

              <button
                onClick={() => reset()}
                className="
                  rounded-lg
                  bg-brand
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-brand-hover
                "
              >
                Try again
              </button>


              <a
                href="/"
                className="
                  rounded-lg
                  border
                  border-card
                  px-5
                  py-3
                  text-sm
                  font-medium
                  text-text-secondary
                  transition
                  hover:bg-surface
                "
              >
                Go home
              </a>


            </div>


          </div>


        </main>

      </body>
    </html>
  );
}