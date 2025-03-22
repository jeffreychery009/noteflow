"use client";

import { ChevronDown, Cloud, Grid, History, ThumbsUp } from "lucide-react";
import type React from "react";
import { useState, useRef, useEffect } from "react";

import { Button } from "@/components/ui/button";

interface FeatureAccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function FeatureAccordion({
  title,
  children,
  defaultOpen = false,
}: FeatureAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(
    defaultOpen ? undefined : 0
  );

  useEffect(() => {
    if (!contentRef.current) return;

    if (isOpen) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="border-t py-4 dark:border-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <div
          className={`transition-transform duration-500 ease-out${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <ChevronDown className="size-5" />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-out"
        style={{ height: height !== undefined ? `${height}px` : "auto" }}
      >
        <div
          ref={contentRef}
          className={`pt-4 transition-opacity duration-500 ease-out${isOpen ? "opacity-100" : "opacity-0"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function FeatureSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <div className="mb-4 flex size-10 items-center justify-center text-blue-500 dark:text-blue-400">
              <Cloud className="size-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Use it everywhere</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Notes stay updated across all your devices, automatically and in
              real time. There&apos;s no &quot;sync&quot; button: It just works.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex size-10 items-center justify-center text-blue-500 dark:text-blue-400">
              <Grid className="size-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Powerful features</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Blocks, tables & markdown, subpages, cards and bi-directional
              linking - Nulis is jammed with brilliant features.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex size-10 items-center justify-center text-blue-500 dark:text-blue-400">
              <History className="size-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Go back in time</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Notes are backed up with every change, so you can see what you
              noted last week or last month.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="mb-4 flex size-10 items-center justify-center text-blue-500 dark:text-blue-400">
              <ThumbsUp className="size-6" />
            </div>
            <h3 className="mb-2 text-xl font-medium">Easy to use</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Just open, write and organize - no interruptions, no
              heavy-lifting, no steep learning curve. Enjoy an easy experience.
            </p>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-3xl font-bold md:text-4xl">
              Brilliant features that make styling
            </h2>

            <FeatureAccordion title="Sync across device" defaultOpen={true}>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Having your documents with you on an iPhone is one thing, but
                  you probably also want to use and work on these documents from
                  your computer. And you always want to be sure to have a backup
                  of your documents in case your device gets lost or stolen.
                  Nulis offers several options.
                </p>
                <Button variant="outline" className="rounded-full">
                  Learn more
                </Button>
              </div>
            </FeatureAccordion>

            <FeatureAccordion title="Create fancy documents">
              <p className="text-gray-600 dark:text-gray-300">
                Create beautiful documents with rich formatting, images, and
                more. Nulis makes it easy to create documents that look great
                and are easy to read.
              </p>
            </FeatureAccordion>

            <FeatureAccordion title="Edit like a pro">
              <p className="text-gray-600 dark:text-gray-300">
                Powerful editing tools make it easy to format your text, add
                images, and more. Keyboard shortcuts and markdown support help
                you work faster.
              </p>
            </FeatureAccordion>

            <FeatureAccordion title="Organize documents">
              <p className="text-gray-600 dark:text-gray-300">
                Keep your notes organized with folders, tags, and powerful
                search. Find what you need when you need it.
              </p>
            </FeatureAccordion>

            <FeatureAccordion title="Manage tasks and projects">
              <p className="text-gray-600 dark:text-gray-300">
                Turn your notes into actionable tasks. Track progress, set
                deadlines, and collaborate with others.
              </p>
            </FeatureAccordion>
          </div>

          <div className="relative flex items-center justify-center">
            {/* Placeholder for mobile app previews */}
            <div className="relative flex h-[500px] w-[300px] items-center justify-center">
              <div className="absolute left-0 top-0 z-10 flex h-[450px] w-[250px] rotate-[-5deg] items-center justify-center rounded-[36px] border-4 border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
                <p className="text-center text-gray-500 dark:text-gray-300">
                  Mobile App Preview 1<br />
                  (Left Phone)
                </p>
              </div>
              <div className="absolute left-[50px] top-[50px] flex h-[450px] w-[250px] rotate-[5deg] items-center justify-center rounded-[36px] border-4 border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
                <p className="text-center text-gray-500 dark:text-gray-300">
                  Mobile App Preview 2<br />
                  (Right Phone)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
