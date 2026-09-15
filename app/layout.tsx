import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fast Buy ecommerce platform",
  description: "Fast Buy is a modern ecommerce platform that allows you to create and manage your online store with ease. It offers a wide range of features, including product management, order tracking, and customer support.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-theme="light"
    >
      <body className="font-sans antialiased bg-white dark:bg-gray-900 text-black dark:text-white">{children}</body>
    </html>
  );
}
