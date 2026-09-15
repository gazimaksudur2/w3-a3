"use client";

import { useEffect } from "react";

export default function Header() {
  useEffect(() => {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!menuToggle || !mobileMenu) {
      return;
    }

    const toggleMenu = () => mobileMenu.classList.toggle("hidden");
    menuToggle.addEventListener("click", toggleMenu);

    return () => menuToggle.removeEventListener("click", toggleMenu);
  }, []);

  return (
    // =========== HEADER ===========
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-[2px] border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-xl font-light tracking-wide text-black dark:text-white">
            Mindful Living
          </div>

          {/* Desktop Navigation (static) */}
          <nav className="hidden md:flex items-center space-x-8">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Blog
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Shop
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              About
            </div>
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Contact
            </div>
            
          </nav>

          {/* Mobile Menu Button (still functional) */}
          <button
            id="menu-toggle"
            className="md:hidden text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (static items) */}
      <div
        id="mobile-menu"
        className="hidden md:hidden px-4 pb-4 space-y-3 border-t border-gray-200 dark:border-gray-800"
      >
        <div className="block py-2 text-sm text-gray-600 dark:text-gray-400">
          Blog
        </div>
        <div className="block py-2 text-sm text-gray-600 dark:text-gray-400">
          Shop
        </div>
        <div className="block py-2 text-sm text-gray-600 dark:text-gray-400">
          About
        </div>
        <div className="block py-2 text-sm text-gray-600 dark:text-gray-400">
          Contact
        </div>
        <div className="block py-2 text-sm font-medium text-black dark:text-white">
          Subscribe
        </div>
      </div>
    </header>
  );
}
