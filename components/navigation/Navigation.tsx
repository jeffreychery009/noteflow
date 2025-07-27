"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { navLinks } from "@/constants/index";

import { Button } from "../ui/button";

interface NavigationProps {
  onNavigate?: () => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto px-4">
      {navLinks.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-8">
          <p className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            {section.subTitle}
          </p>
          <ul className="space-y-2">
            {section.links.map((link, linkIndex) => {
              const IconComponent = link.icon;
              const isActive = pathname === link.href;

              return (
                <li key={linkIndex}>
                  <Link href={link.href} onClick={onNavigate}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`h-12 w-full justify-start rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md hover:from-purple-600 hover:to-violet-700"
                          : "text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
                      }`}
                    >
                      <IconComponent className="mr-3 size-5" />
                      {link.label}
                    </Button>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
};

export default Navigation;
