"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

type Theme = "light" | "dark";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function Header() {
  const { user, isLoading, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const [theme, setTheme] = useState<Theme>("light");
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialTheme: Theme = isTheme(savedTheme)
      ? savedTheme
      : systemPrefersDark
        ? "dark"
        : "light";

    applyTheme(initialTheme);

    const timeoutId = window.setTimeout(() => {
      setTheme(initialTheme);
      setThemeReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-[6px] transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            className="text-xl font-light tracking-wide text-black transition-colors dark:text-white"
          >
            <Image src="/fastbuy-brand-logo.png" alt="FastBuy Logo" width={68} height={68} />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-600 transition-colors duration-200 hover:text-black dark:text-gray-400 dark:hover:text-white"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* THEME TOGGLE */}
            {themeReady && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                title={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
                className="group relative flex h-9 w-[68px] shrink-0 items-center rounded-full border border-gray-200 bg-gray-100 p-1 shadow-inner transition-all duration-300 hover:border-gray-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:focus-visible:ring-white dark:focus-visible:ring-offset-gray-900"
              >
                {/* Sun */}
                <span
                  className={`
                    absolute
                    left-2
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    ${
                      theme === "light"
                        ? "text-amber-500 opacity-100"
                        : "text-gray-500 opacity-40"
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="4" />

                    <path
                      strokeLinecap="round"
                      d="
                        M12 2v2
                        M12 20v2
                        M4.93 4.93l1.42 1.42
                        M17.65 17.65l1.42 1.42
                        M2 12h2
                        M20 12h2
                        M4.93 19.07l1.42-1.42
                        M17.65 6.35l1.42-1.42
                      "
                    />
                  </svg>
                </span>

                {/* Moon */}
                <span
                  className={`
                    absolute
                    right-2
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    ${
                      theme === "dark"
                        ? "text-indigo-300 opacity-100"
                        : "text-gray-400 opacity-40"
                    }
                  `}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                    />
                  </svg>
                </span>

                {/* Sliding Circle */}
                <span
                  className={`
                    relative
                    z-10
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-md
                    transition-transform
                    duration-300
                    ease-in-out
                    dark:bg-gray-950
                    ${theme === "dark" ? "translate-x-[31px]" : "translate-x-0"}
                  `}
                >
                  {theme === "light" ? (
                    /* Sun inside slider */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 text-amber-500"
                    >
                      <circle cx="12" cy="12" r="4" />

                      <path
                        strokeLinecap="round"
                        d="
                          M12 2v2
                          M12 20v2
                          M4.93 4.93l1.42 1.42
                          M17.65 17.65l1.42 1.42
                          M2 12h2
                          M20 12h2
                          M4.93 19.07l1.42-1.42
                          M17.65 6.35l1.42-1.42
                        "
                      />
                    </svg>
                  ) : (
                    /* Moon inside slider */
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="h-4 w-4 text-indigo-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                      />
                    </svg>
                  )}
                </span>
              </button>
            )}

            {/* AUTH SECTION */}
            {isLoading ? null : user ? (
              <>
                {/* Cart */}
                <button
                  type="button"
                  aria-label="Open cart"
                  className="rounded-full p-2 text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <span aria-hidden="true">🛒</span>
                </button>

                <div className="flex items-center gap-3">
                  {/* PROFILE */}
                  <Link
                    href="/profile"
                    aria-label={`Go to ${user.name} profile`}
                    title={`View ${user.name}'s profile`}
                    className="
                      group
                      relative
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-gray-200
                      bg-white
                      p-[3px]
                      shadow-sm
                      ring-2
                      ring-gray-300
                      ring-offset-2
                      ring-offset-white
                      transition-all
                      duration-300
                      hover:scale-105
                      hover:border-gray-400
                      hover:shadow-md
                      hover:ring-gray-900
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-gray-900
                      dark:border-gray-700
                      dark:bg-gray-900
                      dark:ring-gray-600
                      dark:ring-offset-gray-900
                      dark:hover:border-gray-500
                      dark:hover:ring-white
                      dark:focus-visible:ring-white
                    "
                  >
                    <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gray-900 text-sm font-semibold text-white dark:bg-white dark:text-gray-900">
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

                  {/* LOGOUT */}
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
              /* LOGIN / SIGNUP */
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

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="rounded-md p-1 text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white md:hidden"
            >
              {isMenuOpen ? (
                /* Close icon */
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                /* Hamburger */
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
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } space-y-3 border-t border-gray-200 bg-white px-4 pb-4 pt-2 transition-colors dark:border-gray-800 dark:bg-gray-900 md:hidden`}
      >
        {["Home", "Products", "About", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setIsMenuOpen(false)}
            className="block rounded-lg px-2 py-2 text-sm text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-black dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
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
