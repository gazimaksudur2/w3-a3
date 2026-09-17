export default function Loading() {
  return (
    <main
      className="
        mx-auto
        min-h-[70vh]
        max-w-7xl
        px-4
        py-10
        sm:px-6
      "
    >

      {/* Page title skeleton */}

      <div
        className="
          mb-10
          h-10
          w-64
          animate-pulse
          rounded-lg
          bg-gray-200
          dark:bg-gray-800
        "
      />


      {/* Content skeleton */}

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >

        {Array.from({ length: 8 }).map((_, index) => (

          <div
            key={index}
            className="
              animate-pulse
            "
          >

            {/* Image */}

            <div
              className="
                aspect-4/5
                rounded-xl
                bg-gray-200
                dark:bg-gray-800
              "
            />


            {/* Text */}

            <div className="pt-4">

              <div
                className="
                  mb-3
                  h-3
                  w-20
                  rounded
                  bg-gray-200
                  dark:bg-gray-800
                "
              />


              <div
                className="
                  h-5
                  w-4/5
                  rounded
                  bg-gray-200
                  dark:bg-gray-800
                "
              />


              <div
                className="
                  mt-3
                  h-4
                  w-16
                  rounded
                  bg-gray-200
                  dark:bg-gray-800
                "
              />


            </div>


          </div>

        ))}


      </div>


    </main>
  );
}