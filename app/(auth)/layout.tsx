"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import SocialAuthForm from "@/components/forms/SocialAuthForm";
import { ThemeToggle } from "@/components/toggles/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const formType = pathname.includes("sign-up") ? "SIGN_UP" : "SIGN_IN";

  return (
    <div className="flex min-h-screen flex-col dark:bg-gradient-to-br dark:from-gray-900 dark:via-purple-950 dark:to-gray-900">
      <header className="container mt-20 flex h-16 items-center justify-center py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-center text-2xl font-bold">veltnote</span>
          </Link>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                {formType === "SIGN_UP"
                  ? "Get Started with Noteflow"
                  : "Welcome back"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {formType === "SIGN_UP"
                  ? "Join Noteflow today and start organizing your notes"
                  : "Sign in to your account to continue"}
              </p>
            </div>
            {children}
            <SocialAuthForm />
          </div>
        </div>
      </main>
    </div>
  );
}
