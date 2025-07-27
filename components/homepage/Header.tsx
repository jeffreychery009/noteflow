"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="relative z-10 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
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
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/sign-in">
            <Button
              variant="ghost"
              className="rounded-full px-3 py-2 text-sm hover:border-purple-900 hover:bg-purple-100 hover:text-purple-900 sm:px-6 sm:text-base"
            >
              Sign in
            </Button>
          </Link>
          <Link href="/sign-up">
            <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-3 py-2 text-sm text-white hover:from-purple-600 hover:to-pink-700 sm:px-6 sm:text-base">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
