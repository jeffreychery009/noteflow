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
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">n.</span>
          </Link>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center py-12">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold">
                {formType === "SIGN_UP"
                  ? "Get Started with Noteflow"
                  : "Welcome Back"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {formType === "SIGN_UP"
                  ? "Join Noteflow today and start organizing your notes"
                  : "Login to your account to continue"}
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
