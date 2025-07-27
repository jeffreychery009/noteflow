"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h1 className="mb-8 text-5xl font-bold text-gray-900 md:text-6xl dark:text-white">
        Manage your notes
        <br />
        and tasks !
      </h1>

      <p className="mx-auto mb-16 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
        The simplest way to organize your thoughts, track your tasks, and stay
        productive every day.
      </p>

      <div className="mb-24 flex flex-col justify-center gap-4 sm:flex-row">
        <Link href="/sign-in">
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-8 py-4 text-lg text-white hover:from-purple-600 hover:to-pink-700"
          >
            Start Taking Notes
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </Link>
        <Link href="/sign-up">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full bg-transparent px-8 py-4 text-lg hover:border-purple-900 hover:bg-purple-100 hover:text-purple-900"
          >
            Create Account
          </Button>
        </Link>
      </div>
    </div>
  );
}
