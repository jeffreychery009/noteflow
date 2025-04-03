"use client";

import { usePathname } from "next/navigation";

import { ROUTES } from "@/routes";

interface ClientWelcomeWrapperProps {
  userName: string;
}

export default function ClientWelcomeWrapper({
  userName,
}: ClientWelcomeWrapperProps) {
  const pathname = usePathname();

  // Only show welcome message on dashboard or home route
  // You can customize this logic as needed
  const shouldShowWelcome = pathname === ROUTES.HOME_PAGE;

  if (!shouldShowWelcome) {
    return null;
  }

  return (
    <div>
      <h2 className="flex items-center text-xl font-semibold">
        Welcome back, {userName}!
      </h2>
    </div>
  );
}
