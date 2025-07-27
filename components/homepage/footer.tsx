"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-gray-200 bg-gray-50/80 dark:border-gray-800 dark:bg-gray-800/80">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="text-center">
          <div className="mb-6">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Image
                src="/new-veltnote.png"
                alt="veltnote-logo"
                width={500}
                height={500}
                className="size-20 rounded-lg object-cover object-top"
                style={{ objectPosition: "center 25%" }}
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                veltnote
              </span>
            </div>
            <p className="mx-auto max-w-md text-sm text-gray-600 dark:text-gray-300">
              The simplest way to organize your thoughts and stay productive.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © 2024 veltnote. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
