"use client";

import type { FormEvent } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success("Your message has been sent.");
  };

  return (

    <main className="mx-auto w-full max-w-7xl px-4 py-16">


      <section className="text-center">

        <h1 className="
          text-4xl font-bold
          text-navy
          dark:text-white
        ">
          Contact Us
        </h1>


        <p className="
          mt-4
          text-text-secondary
        ">
          Have questions or need help? Get in touch with our team.
        </p>


      </section>





      <div className="
        mt-12 grid gap-8
        md:grid-cols-2
      ">


        {/* Contact Information */}

        <div className="
          rounded-xl border p-8
          border-gray-200
          bg-card
          dark:border-gray-800
        ">

          <h2 className="
            text-2xl font-semibold
            text-navy
            dark:text-white
          ">
            Get In Touch
          </h2>


          <div className="
            mt-6 space-y-4
            text-text-secondary
          ">

            <p>
              📧 Email: support@fastbuy.com
            </p>


            <p>
              📞 Phone: +880 1234-567890
            </p>


            <p>
              📍 Address: Dhaka, Bangladesh
            </p>


          </div>


        </div>





        {/* Contact Form */}

        <form onSubmit={handleSubmit} className="
          rounded-xl border p-8
          border-gray-200
          bg-card
          dark:border-gray-800
          space-y-5
        ">


          <input
            type="text"
            placeholder="Your name"
            required
            className="
              w-full rounded-lg border px-4 py-3
              border-gray-300
              bg-background
              text-navy
              dark:border-gray-700
              dark:text-white
            "
          />



          <input
            type="email"
            placeholder="Your email"
            required
            className="
              w-full rounded-lg border px-4 py-3
              border-gray-300
              bg-background
              text-navy
              dark:border-gray-700
              dark:text-white
            "
          />



          <textarea
            rows={5}
            placeholder="Your message"
            required
            className="
              w-full rounded-lg border px-4 py-3
              border-gray-300
              bg-background
              text-navy
              dark:border-gray-700
              dark:text-white
            "
          />



          <button
            type="submit"
            className="
              rounded-lg
              bg-brand
              px-6 py-3
              font-medium
              text-white
              transition
              hover:bg-brand-hover
            "
          >
            Send Message
          </button>


        </form>


      </div>


    </main>

  );
}