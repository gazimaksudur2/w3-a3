"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  return (
    <div
      className="
        flex
        min-h-[60vh]
        flex-col
        items-center
        justify-center
        text-center
      "
    >

      <h2
        className="
          text-3xl
          font-bold
          text-navy
          dark:text-white
        "
      >
        Oops! Something broke.
      </h2>


      <p className="mt-3 text-text-secondary">
        Please try again.
      </p>


      <button
        onClick={() => reset()}
        className="
          mt-6
          rounded-lg
          bg-brand
          px-5
          py-3
          text-white
        "
      >
        Retry
      </button>


    </div>
  );
}