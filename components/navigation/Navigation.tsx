import Link from "next/link";
import React from "react";

import { navLinks } from "@/constants/index";

import { ThemeToggle } from "../toggles/theme-toggle";
import { Button } from "../ui/button";

const Navigation = () => {
  return (
    <nav className="flex h-full flex-col justify-between">
      <div className="flex-1 overflow-y-auto p-2">
        {navLinks.map((link) => (
          <div className="mb-4" key={link.subTitle}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {link.subTitle}
            </p>
            <ul className="space-y-1">
              {link.links.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <Button variant="ghost" className="w-full justify-start">
                      <span className="mr-2 text-sm">
                        {React.createElement(item.icon)}
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
