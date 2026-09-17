import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "@/app/context/CartContext";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FastBuy",
  description:
    "Fast Buy is a modern ecommerce platform that allows you to create and manage your online store with ease. It offers a wide range of features, including product management, order tracking, and customer support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="font-sans antialiased">
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen bg-background text-navy dark:text-white flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
              <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
