export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-16">

      {/* Hero */}
      <section className="text-center">

        <h1 className="
          text-4xl font-bold
          text-navy
          dark:text-white
        ">
          About FastBuy
        </h1>


        <p className="
          mx-auto mt-5 max-w-2xl
          text-text-secondary
        ">
          FastBuy is a modern ecommerce platform built to make online
          shopping faster, simpler, and more enjoyable. We connect
          customers with quality products through a seamless shopping
          experience.
        </p>

      </section>



      {/* Mission */}
      <section className="mt-16 grid gap-8 md:grid-cols-3">


        <div className="
          rounded-xl border p-6
          border-gray-200
          bg-card
          dark:border-gray-800
          dark:bg-card
        ">
          <h2 className="
            text-xl font-semibold
            text-navy
            dark:text-white
          ">
            Our Mission
          </h2>

          <p className="
            mt-3 text-text-secondary
          ">
            To provide customers with a reliable and convenient online
            marketplace where finding and purchasing products is simple.
          </p>

        </div>



        <div className="
          rounded-xl border p-6
          border-gray-200
          bg-card
          dark:border-gray-800
          dark:bg-card
        ">

          <h2 className="
            text-xl font-semibold
            text-navy
            dark:text-white
          ">
            Quality First
          </h2>


          <p className="
            mt-3 text-text-secondary
          ">
            We focus on offering carefully selected products with a
            smooth and trustworthy shopping experience.
          </p>

        </div>




        <div className="
          rounded-xl border p-6
          border-gray-200
          bg-card
          dark:border-gray-800
          dark:bg-card
        ">

          <h2 className="
            text-xl font-semibold
            text-navy
            dark:text-white
          ">
            Customer Focus
          </h2>


          <p className="
            mt-3 text-text-secondary
          ">
            Customer satisfaction is at the center of everything we do,
            from browsing products to receiving orders.
          </p>

        </div>


      </section>



      {/* Story */}

      <section className="
        mt-16 rounded-xl border p-8
        border-gray-200
        bg-surface
        dark:border-gray-800
        dark:bg-surface
      ">

        <h2 className="
          text-2xl font-bold
          text-navy
          dark:text-white
        ">
          Why Choose FastBuy?
        </h2>


        <p className="
          mt-4 leading-7
          text-text-secondary
        ">
          We believe shopping should be simple and stress-free.
          FastBuy combines modern technology, user-friendly design,
          and reliable service to create a better online shopping
          experience for everyone.
        </p>

      </section>


    </main>
  );
}