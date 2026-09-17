"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

const questions = [
  {
    id: "shopping",
    question: "How do I find the right product?",
    answer:
      "Browse by category or use the product search and price filters to narrow down your options. Each product page includes its images, price, and category details before you add it to your cart.",
  },
  {
    id: "delivery",
    question: "How much does delivery cost?",
    answer:
      "A flat $10 delivery fee is added to orders with at least one item. You will see the complete subtotal, delivery fee, and total before placing your order.",
  },
  {
    id: "checkout",
    question: "What information do I need at checkout?",
    answer:
      "Checkout requires your name, email, delivery address, city, phone number, and postal code so we can process and deliver your order correctly.",
  },
  {
    id: "account",
    question: "Do I need an account to buy something?",
    answer:
      "You can browse products without an account. Creating an account makes it easier to sign in and continue with features such as Buy Now and your profile.",
  },
  {
    id: "support",
    question: "How can I contact FastBuy support?",
    answer:
      "Visit our Contact page to send us a message, or use the support email and phone number listed there. Our team will be happy to help with your shopping questions.",
  },
];

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState("shopping");

  return (
    <section className="bg-background dark:bg-surface">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-center text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
          Shopping made simple
        </h1>

        <div className="mt-8 lg:flex lg:-mx-12 xl:mt-16">
          <div className="lg:mx-12">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Quick links
            </h1>

            <div className="mt-4 space-y-4 lg:mt-8">
              {questions.map((question, index) => (
                <a
                  key={question.id}
                  href={`#${question.id}`}
                  className={`block hover:underline ${index === 0 ? "text-brand" : "text-text-secondary"}`}
                >
                  {question.id === "shopping"
                    ? "Shopping"
                    : question.id.charAt(0).toUpperCase() + question.id.slice(1)}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 flex-1 lg:mx-12 lg:mt-0">
            {questions.map((question) => {
              const isOpen = openQuestion === question.id;

              return (
                <div key={question.id} id={question.id} className="scroll-mt-24">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenQuestion(isOpen ? "" : question.id)}
                    className="flex w-full items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    {isOpen ? (
                      <Minus className="h-6 w-6 shrink-0 text-brand" />
                    ) : (
                      <Plus className="h-6 w-6 shrink-0 text-brand" />
                    )}
                    <span className="mx-4 text-xl text-gray-700 dark:text-white">
                      {question.question}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-8 flex md:mx-10">
                      <span className="border border-brand" />
                      <p className="max-w-3xl px-4 text-text-secondary">
                        {question.answer}
                      </p>
                    </div>
                  )}

                  {question.id !== questions[questions.length - 1].id && (
                    <hr className="my-8 border-gray-200 dark:border-gray-700" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
