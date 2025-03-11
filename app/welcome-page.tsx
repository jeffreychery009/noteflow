"use client";

import {
  Pen,
  Sparkles,
  Cloud,
  Users,
  Moon,
  Sun,
  ArrowRight,
  MessageSquare,
  Zap,
  Check,
  MessageCircle,
  Share2,
  History,
  Search,
  Tags,
  FolderTree,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";
import { useState, useEffect } from "react";

import { FeatureCard } from "@/components/cards/FeatureCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/routes";

export default function WelcomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 transition-colors duration-200 dark:bg-[#121212] dark:text-gray-100">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <Pen className="size-6 text-primary" />
          <span className="text-xl font-bold">Noteflow</span>
        </div>
        <div className="flex items-center gap-5">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDarkMode}
            className="size-10 rounded-full p-0"
          >
            {isDarkMode ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={ROUTES.SIGN_IN}>Log in</Link>
          </Button>
          <Button
            size="sm"
            className="border-none bg-gradient-to-r from-[#12A7FB] to-[#7DC5ED] text-white"
            asChild
          >
            <Link href={ROUTES.SIGN_UP}>Sign up</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mb-6 text-4xl font-semibold md:text-5xl lg:text-6xl">
              Take Notes in Real Time with AI Assistance
            </h1>
            <p className="mb-8 text-xl font-extralight text-gray-600 md:text-2xl dark:text-gray-300">
              Collaborate seamlessly with your team while AI helps you capture
              and organize your thoughts
            </p>
            <Button
              size="lg"
              className="border-none bg-gradient-to-r from-[#12A7FB] to-[#7DC5ED] text-white"
            >
              Get Started <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="relative aspect-[4/3] w-full max-w-2xl flex-1">
            <Image
              src="/placeholder.svg?height=900&width=1200"
              alt="Noteflow app interface"
              fill
              className="rounded-xl object-cover shadow-2xl dark:invert"
              priority
            />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          <FeatureCard
            title="Smart Writing"
            description="Get AI-powered assistance that helps you write better, faster, and more effectively while maintaining your unique voice."
            features={[
              {
                icon: <Sparkles className="size-5" />,
                text: "AI-powered suggestions",
              },
              {
                icon: <MessageSquare className="size-5" />,
                text: "Writing assistance",
              },
              {
                icon: <Zap className="size-5" />,
                text: "Quick formatting",
              },
              {
                icon: <Check className="size-5" />,
                text: "Grammar checking",
              },
            ]}
          />
          <FeatureCard
            title="Seamless Collaboration"
            description="Work together with your team in real-time. Share, edit, and comment on notes with instant synchronization across all devices."
            features={[
              {
                icon: <Users className="size-5" />,
                text: "Real-time editing",
              },
              {
                icon: <MessageCircle className="size-5" />,
                text: "Inline comments",
              },
              {
                icon: <Share2 className="size-5" />,
                text: "Easy sharing",
              },
              {
                icon: <History className="size-5" />,
                text: "Version history",
              },
            ]}
          />
          <FeatureCard
            title="Powerful Organization"
            description="Keep your notes organized with powerful tools. Use tags, folders, and smart search to find anything instantly."
            features={[
              {
                icon: <Search className="size-5" />,
                text: "Smart search",
              },
              {
                icon: <Tags className="size-5" />,
                text: "Custom tags",
              },
              {
                icon: <FolderTree className="size-5" />,
                text: "Nested folders",
              },
              {
                icon: <Cloud className="size-5" />,
                text: "Cloud sync",
              },
            ]}
          />
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="bg-white py-20 md:py-32 dark:bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
              What Our Users Say
            </h2>
            <p className="mx-auto max-w-2xl text-xl font-light text-gray-600 dark:text-gray-400">
              Join thousands of satisfied users who have transformed their
              note-taking experience
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {/* Testimonial placeholders */}
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="border border-transparent bg-white dark:border-[#C8CBD9] dark:border-opacity-30 dark:bg-[#2A2A2A]"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="size-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div>
                      <h4 className="font-semibold">User Name</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Position, Company
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &quot;Noteflow has completely transformed how I organize my
                    thoughts and collaborate with my team. The AI features are
                    incredibly helpful!&quot;
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="rounded-2xl p-8 text-center text-black shadow-md md:p-12 dark:border-opacity-30 dark:bg-[#2A2A2A] dark:text-white dark:shadow-none">
          <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl font-light">
            Join thousands of users and teams who are already enhancing their
            productivity with Noteflow
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <div className="flex justify-center">
              <Button
                size="lg"
                className="border-none bg-gradient-to-r from-[#7DC5ED] via-[#7DC5ED] to-[#12A7FB] text-white"
                asChild
              >
                <Link href="/signup">
                  Start for Free <ArrowRight className="size-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center gap-2 md:mb-0">
              <Pen className="size-5 text-primary" />
              <span className="font-bold">Noteflow</span>
            </div>
            <div className="flex gap-8">
              <Link
                href="/about"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/features"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                Features
              </Link>

              <Link
                href="/contact"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Noteflow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
