"use client";

import { FileText } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function AppPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const appPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (appPreviewRef.current) {
      observer.observe(appPreviewRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative mx-auto mb-32 max-w-4xl" ref={appPreviewRef}>
      <div
        className={`overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl transition-all duration-1000 hover:scale-105 dark:border-gray-800 dark:bg-[#141142] dark:bg-gray-900${isVisible ? "animate-bounce-in" : "translate-y-16 opacity-0"}`}
      >
        <div className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              veltnote
            </h2>
            <div className="flex gap-2">
              <div className="size-3 rounded-full bg-red-400"></div>
              <div className="size-3 rounded-full bg-yellow-400"></div>
              <div className="size-3 rounded-full bg-green-400"></div>
            </div>
          </div>

          <div className="text-left">
            <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
              Manage your notes and tasks !
            </h3>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-purple-100 p-6 dark:bg-purple-900">
                <div className="mb-4 flex items-center gap-3">
                  <FileText className="size-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-semibold dark:text-white">
                    Daily Journal
                  </h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Something that you can use to write your thoughts and how you
                  feel...
                </p>
              </div>

              <div className="rounded-2xl bg-green-100 p-6 dark:bg-green-900">
                <div className="mb-4 flex items-center gap-3">
                  <FileText className="size-5 text-green-600 dark:text-green-400" />
                  <h4 className="font-semibold dark:text-white">To-Do List</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded border-2 border-gray-300 dark:border-gray-600"></div>
                    <span className="text-sm dark:text-gray-300">
                      Go on date
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded border-2 border-gray-300 dark:border-gray-600"></div>
                    <span className="text-sm dark:text-gray-300">
                      Do homework
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
