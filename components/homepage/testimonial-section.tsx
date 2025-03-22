"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Andrew Cano",
    role: "Product Designer",
    company: "Tokopedia",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "I can now Delete the Other Apps. I've tried a lot of note taking and to-do list apps. This app is simply the best. Everything I need in one app and it works flawlessly. Everything I need is now in Nulis. Many thanks to the developer for a great app. The developer is very helpful with advice and there is a useful forum and introductory notes.",
    date: "Oct 29, 2022",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Google",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "Nulis has transformed how our team collaborates on projects. The seamless syncing across devices means we're always on the same page, literally. The interface is intuitive and the markdown support is excellent for our technical documentation needs.",
    date: "Jan 15, 2023",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Software Engineer",
    company: "Dropbox",
    image: "/placeholder.svg?height=60&width=60",
    content:
      "As someone who takes a lot of technical notes, Nulis is a game-changer. The organization features and search functionality make it easy to find what I need when I need it. The bi-directional linking has changed how I connect ideas and concepts.",
    date: "Mar 8, 2023",
  },
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-12 border-t py-24 md:py-32 dark:border-gray-800">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="relative h-[300px] overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            {/* Subtle background */}
            <div className="absolute inset-0 bg-blue-50/30 dark:bg-blue-950/20"></div>

            {/* Decorative elements with more subtle colors */}
            <div className="absolute right-0 top-0 -mr-10 -mt-10 size-32 rounded-full bg-blue-100/20 dark:bg-blue-900/20"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 size-24 rounded-full bg-blue-100/20 dark:bg-blue-900/20"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentIndex].id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 z-10 p-8"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="relative size-12 overflow-hidden rounded-full border border-gray-100 shadow-sm dark:border-gray-700">
                    <Image
                      src={
                        testimonials[currentIndex].image || "/placeholder.svg"
                      }
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {testimonials[currentIndex].name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonials[currentIndex].role} at{" "}
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>

                <p className="relative mb-4 text-gray-700 dark:text-gray-200">
                  <span className="absolute -left-2 -top-2 text-4xl text-blue-200/50 dark:text-blue-700/50">
                    &quot;
                  </span>
                  <span className="relative z-10">
                    {testimonials[currentIndex].content}
                  </span>
                  <span className="absolute -right-2 bottom-0 text-4xl text-blue-200/50 dark:text-blue-700/50">
                    &quot;
                  </span>
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Wonderful. Well done.
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    4:50 PM · {testimonials[currentIndex].date}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-4 z-10 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-6 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Wise words. Read our customer stories.
            </h2>
            <p className="mb-8 text-gray-600 dark:text-gray-300">
              Nulis is trusted by most people who are focused on elevating
              everyday life. Not only that, but Nulis also helps freelancers and
              peoples who collaborate with team to stay organized and keep their
              projects on track. Here&apos;s what they have to say about us.
            </p>
            <Button variant="outline" className="self-start rounded-full">
              Read all customer stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
