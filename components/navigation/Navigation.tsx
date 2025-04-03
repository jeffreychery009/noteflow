"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { navLinks } from "@/constants";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "../toggles/theme-toggle";
import { Button } from "../ui/button";

interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface NavSection {
  subTitle: string;
  links: NavLink[];
}

interface NavigationProps {
  onNavigate?: () => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav
      className="flex h-full flex-col justify-between"
      aria-label="Main navigation"
    >
      <div className="flex-1 overflow-y-auto p-2">
        {navLinks.map((section) => (
          <div className="mb-4" key={section.subTitle}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {section.subTitle}
            </p>
            <ul
              className="space-y-1"
              role="list"
              aria-label={`${section.subTitle} navigation`}
            >
              {section.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={onNavigate}>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      <span className="mr-2 text-sm">
                        <item.icon aria-hidden="true" />
                      </span>
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-center border-t border-gray-200 p-4 dark:border-gray-800">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navigation;
