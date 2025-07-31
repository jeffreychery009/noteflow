"use client";

import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/components/toggles/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="relative z-10 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/new-veltnote.png"
            alt="veltnote-logo"
            className="size-12 rounded-xl object-cover object-top sm:size-16 md:size-20"
            width={500}
            height={500}
            style={{ objectPosition: "center 25%" }}
          />
          <span className="text-lg font-bold text-gray-900 sm:text-xl md:text-2xl dark:text-white">
            veltnote
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Pricing
          </Link>
        </div>

        {/* Right side - Theme toggle, Sign in, Get Started */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="rounded-full bg-purple-600 px-6 py-2 text-white transition-colors hover:bg-purple-700">
              Get Started
              <svg
                className="ml-2 size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
