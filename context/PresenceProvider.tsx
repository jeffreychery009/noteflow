"use client";

import { usePresence } from "@/hooks/usePresence";

export const PresenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  usePresence();

  return <>{children}</>;
};
