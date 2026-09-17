"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, Moon, ShoppingCart, Sun, User } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

type Theme = "light" | "dark";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
}

export default function Header() {
  const pathname = usePathname();

  const { user, isLoading, logout } = useAuth();

  const { cartItems } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [avatarError, setAvatarError] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  const [theme, setTheme] = useState<Theme>("light");

  const [themeReady, setThemeReady] = useState(false);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);

    applyTheme(newTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-card bg-background/90 backdrop-blur-[6px] transition-colors duration-300 dark:border-card dark:bg-surface/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}

          <Link
            href="/"
            className="text-xl font-light tracking-wide text-navy transition-colors dark:text-white"
          >
            <Image
              src="/fastbuy-brand-logo.png"
              alt="FastBuy Logo"
              width={68}
              height={68}
            />
          </Link>

          {/* DESKTOP NAVIGATION */}

          <nav className="hidden items-center gap-8 md:flex">
            {[
              { name: "Home", href: "/" },
              { name: "Products", href: "/products" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative text-sm font-medium transition-colors duration-200 ${isActive ? "text-navy dark:text-white" : "text-text-secondary hover:text-brand dark:text-text-secondary dark:hover:text-brand"} after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:bg-brand after:transition-all after:duration-300 ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
                >
                  {item.name}
                </Link>
              );
            })}
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
                className="group relative flex h-9 w-[68px] shrink-0 items-center rounded-full border border-card bg-surface p-1 shadow-inner transition-all duration-300 hover:border-brand hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600 dark:focus-visible:ring-white dark:focus-visible:ring-offset-gray-900"
              >
                {/* Sun left indicator */}
                <span
                  className={`absolute left-2 flex h-4 w-4 items-center justify-center transition-all duration-300 ${
                    theme === "light"
                      ? "text-amber-500 opacity-100"
                      : "text-text-secondary opacity-40"
                  }`}
                >
                  <Sun className="h-3 w-3" />
                </span>

                {/* Moon right indicator */}
                <span
                  className={`absolute right-2 flex h-4 w-4 items-center justify-center transition-all duration-300 ${
                    theme === "dark"
                      ? "text-indigo-300 opacity-100"
                      : "text-text-secondary opacity-40"
                  }`}
                >
                  <Moon className="h-3 w-3" />
                </span>

                {/* Sliding active icon */}
                <span
                  className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-md transition-transform duration-300 ease-in-out dark:bg-gray-950 ${
                    theme === "dark" ? "translate-x-[31px]" : "translate-x-0"
                  }`}
                >
                  {theme === "light" ? (
                    <Sun className="h-3 w-3 text-amber-500" />
                  ) : (
                    <Moon className="h-3 w-3 text-indigo-300" />
                  )}
                </span>
              </button>
            )}

            {/* CART */}

            <Link
              href="/cart"
              className="relative mr-4 text-text-secondary transition hover:text-brand"
            >
              <ShoppingCart className="h-5 w-5" />

              {cartCount > 0 && (
                <span className="absolute -right-3 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* AUTH SECTION */}

            {isLoading ? null : user ? (
              <div className="flex items-center gap-3">
                {/* PROFILE DROPDOWN */}

                <div ref={profileRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    className="group relative flex h-11 w-11 items-center justify-center rounded-full"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white p-[3px] shadow-sm ring-2 ring-gray-300 ring-offset-2 ring-offset-white transition-all duration-300 hover:scale-105 hover:border-gray-400 hover:shadow-md hover:ring-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:border-gray-700 dark:bg-surface dark:ring-gray-600 dark:ring-offset-gray-900 dark:hover:border-gray-500 dark:hover:ring-white dark:focus-visible:ring-white">
                      <span className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-navy text-sm font-semibold text-white dark:bg-white dark:text-navy">
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
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-14 z-50 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl animate-in fade-in slide-in-from-top-2 dark:border-gray-800 dark:bg-gray-900">
                      <div className="border-b pb-3 dark:border-gray-800">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>

                      <div className="mt-3 space-y-1">
                        <Link
                          href="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-surface hover:text-brand dark:text-gray-300"
                        >
                          <span>Profile</span>

                          <User className="h-4 w-4" />
                        </Link>

                        <Link
                          href="/cart"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-surface hover:text-brand dark:text-gray-300"
                        >
                          <span>Cart</span>

                          <ShoppingCart className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => {
                            logout();

                            setIsProfileOpen(false);
                          }}
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <span>Logout</span>

                          <LogOut className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className="hidden items-center gap-2 sm:flex"
                aria-label="Account actions"
              >
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary transition-colors duration-200 hover:bg-surface hover:text-brand dark:text-text-secondary dark:hover:bg-surface"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  className="rounded-md bg-brand px-3 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-brand-hover"
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
              className="rounded-md p-1 text-text-secondary transition-colors duration-200 hover:bg-surface hover:text-brand dark:text-text-secondary dark:hover:bg-surface dark:hover:text-brand md:hidden"
            >
              {isMenuOpen ? (
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
        className={`${isMenuOpen ? "block" : "hidden"} space-y-3 border-t border-card bg-background px-4 pb-4 pt-2 transition-colors dark:border-card dark:bg-surface md:hidden`}
      >
        {[
          { name: "Home", href: "/" },
          { name: "Products", href: "/products" },
          { name: "About", href: "/about" },
          { name: "Contact", href: "/contact" },
        ].map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsMenuOpen(false)}
            className={`block rounded-lg px-2 py-2 text-sm ${
              pathname === item.href
                ? "bg-surface text-brand"
                : "text-text-secondary"
            }`}
          >
            {item.name}
          </Link>
        ))}
        {!user && !isLoading && (
          <div className="flex gap-4 border-t border-gray-200 pt-3 dark:border-gray-800 sm:hidden">
            <Link
              href="/login"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-text-secondary"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-medium text-navy dark:text-white"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
