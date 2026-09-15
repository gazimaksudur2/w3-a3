"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, isLoading, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-[2px] dark:border-gray-800 dark:bg-gray-900/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-light tracking-wide text-black dark:text-white">
            Mindful Living
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {["Blog", "Shop", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {isLoading ? null : user ? (
              <>
                {/* Cart Button */}
                <button
                  type="button"
                  aria-label="Open cart"
                  className="rounded-full p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <span aria-hidden="true">🛒</span>
                </button>

                <div className="flex items-center gap-3">
                  {/* Profile Link */}
                  <Link
                    href="/profile"
                    aria-label={`Go to ${user.name} profile`}
                    title={`View ${user.name}'s profile`}
                    className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white p-[3px] shadow-sm ring-2 ring-gray-300 ring-offset-2 ring-offset-white transition-all duration-300 hover:scale-105 hover:border-gray-400 hover:shadow-md hover:ring-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:ring-gray-600 dark:ring-offset-gray-900 dark:hover:border-gray-500 dark:hover:ring-white dark:focus-visible:ring-white"
                  >
                    <span
                      className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-900 text-sm font-semibold text-white dark:bg-white dark:text-gray-900"
                    >
                      {user?.avatar && !avatarError ? ( 
                        <img
                          src={user.avatar}
                          alt={`${user.name} profile`}
                          onError={() => setAvatarError(true)}
                          className="h-full w-full rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <span aria-hidden="true">
                          {user.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </span>
                  </Link>

                  {/* Logout Button */}
                  <button
                    type="button"
                    onClick={() => void logout()}
                    className="hidden text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-black sm:block dark:text-gray-300 dark:hover:text-white"
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              /* Login / Signup */
              <div
                className="hidden items-center gap-2 sm:flex"
                aria-label="Account actions"
              >
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="text-gray-600 transition-colors duration-200 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white md:hidden"
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
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } space-y-3 border-t border-gray-200 px-4 pb-4 dark:border-gray-800 md:hidden`}
      >
        {["Blog", "Shop", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setIsMenuOpen(false)}
            className="block py-2 text-sm text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white"
          >
            {item}
          </a>
        ))}

        {/* Mobile Login / Signup */}
        {!user && !isLoading && (
          <div className="flex gap-4 border-t border-gray-200 pt-3 dark:border-gray-800 sm:hidden">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-gray-900 dark:text-white"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
