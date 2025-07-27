"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <div className="mt-40 text-center">
      <div className="rounded-3xl bg-gradient-to-r from-purple-500 to-pink-600 p-12 text-white">
        <h2 className="mb-6 text-4xl font-bold">Ready to get started?</h2>
        <p className="mx-auto mb-10 max-w-2xl text-xl opacity-90">
          Join thousands of users who have transformed their productivity. Start
          organizing your thoughts and tasks today.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="rounded-full bg-white px-8 py-4 text-lg text-blue-600 hover:bg-gray-100"
            >
              Create Free Account
              <ArrowRight className="ml-2 size-5" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-white bg-transparent px-8 py-4 text-lg text-white hover:bg-white hover:text-blue-600"
            >
              Try Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
