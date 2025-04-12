"use client";

import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { CTASection } from "@/components/homepage/cta-section";
import { FeatureSection } from "@/components/homepage/feature-section";
import { Footer } from "@/components/homepage/footer";
import { TestimonialSection } from "@/components/homepage/testimonial-section";
import { ThemeToggle } from "@/components/toggles/theme-toggle";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">n.</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#download"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              Download
            </Link>
            <Link
              href="#resources"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              Resources
            </Link>
            <Link
              href="#company"
              className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
            >
              Company
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Link href={ROUTES.SIGN_IN}>
            <Button className="rounded-full">Sign in</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center py-12 text-center md:py-24">
          <div className="mb-8 inline-flex items-center rounded-full border bg-muted/50 px-4 py-1.5 dark:bg-muted/20">
            <div className="flex items-center justify-center rounded-full bg-orange-100 p-1 text-orange-600 dark:bg-orange-900/60 dark:text-orange-300">
              <Flame className="size-4" />
            </div>
            <span className="ml-2 text-sm font-medium">
              See what&apos;s new
            </span>
            <ArrowRight className="ml-2 size-4" />
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              The simplest way
              <br />
              to keep notes
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              All your notes, synced on all your devices. Get Nulis now for
              <br />
              iOS, Mac, or in your browser.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="rounded-full px-8">
              Download Nulis
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Open in Browser
            </Button>
          </div>
          <div className="mt-16 w-full max-w-5xl">
            <div className="flex aspect-[16/9] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-900">
              <div className="px-6 py-10 text-center">
                <div className="mx-auto size-12 text-gray-400 dark:text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Hero Image Placeholder
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Add your app screenshot or hero image here
                </p>
              </div>
            </div>
          </div>
        </section>

        <FeatureSection />

        <TestimonialSection />

        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
