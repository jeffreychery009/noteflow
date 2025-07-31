"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <h1 className="mb-8 text-5xl font-bold md:text-6xl lg:text-7xl">
        <span className="text-gray-900 dark:text-white">Your thoughts,</span>
        <br />
        <span className="text-purple-600 dark:text-purple-400">
          beautifully organized
        </span>
      </h1>

      <p className="mx-auto mb-16 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
        Experience the future of note-taking with veltnote. Capture ideas,
        collaborate with others, and organize your thoughts with our
        intelligent, beautiful interface.
      </p>

      <div className="mb-24 flex flex-col justify-center gap-4 sm:flex-row">
        <Link href="/sign-up">
          <Button
            size="lg"
            className="rounded-full bg-purple-600 px-8 py-4 text-lg text-white transition-colors hover:bg-purple-700"
          >
            Start Writing for Free
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </Link>
        <Link href="#demo">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-gray-300 bg-transparent px-8 py-4 text-lg text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:border-gray-500 dark:hover:bg-gray-800"
          >
            Watch Demo
          </Button>
        </Link>
      </div>
    </div>
  );
}
