"use client";

interface Props {
  invoiceId: string;

  onViewInvoice: () => void;
}

export default function OrderSuccessModal({ invoiceId, onViewInvoice }: Props) {
  return (
    <div
      className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/50
"
    >
      <div
        className="
rounded-xl
bg-white
p-8
text-center
dark:bg-gray-900
"
      >
        <h2
          className="
text-2xl
font-bold
text-gray-900
dark:text-white
"
        >
          Order Successful 🎉
        </h2>

        <p
          className="
mt-4
text-gray-600
dark:text-gray-300
"
        >
          Your order has been placed.
        </p>

        <p
          className="
mt-3
font-semibold
text-brand
"
        >
          Invoice ID:
          {invoiceId}
        </p>

        <button
          onClick={onViewInvoice}
          className="
mt-6
rounded-lg
bg-brand
px-6
py-3
text-white
hover:bg-brand-hover
"
        >
          View Invoice
        </button>
      </div>
    </div>
  );
}
