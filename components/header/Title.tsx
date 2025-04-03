"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { navLinks } from "@/constants/index";

const Title = () => {
  const pathname = usePathname();

  const getCurrentPageLabel = () => {
    // Flatten all links into a single array
    const allLinks = navLinks.flatMap((section) => section.links);
    // Find the matching route
    const currentRoute = allLinks.find((link) => link.href === pathname);

    if (currentRoute?.label === "Home") {
      return "";
    }
    // Return the label or a default value
    return currentRoute?.label || "Dashboard";
  };

  return (
    <h1 className="flex items-center text-xl font-semibold">
      {getCurrentPageLabel()}
    </h1>
  );
};

export default Title;
