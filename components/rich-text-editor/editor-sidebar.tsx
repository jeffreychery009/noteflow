import { Search, FolderPlus } from "lucide-react";
import NextLink from "next/link";

import { NewFolderDialog } from "./placeholder-components";
import { navLinks } from "../../constants";
import UserInfoClient from "../sidebar/UserInfoClient";
import { ThemeToggle } from "../toggles/theme-toggle";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Sidebar component matching the dashboard design
export function EditorSidebar({
  className = "",
  onCreateFolder,
}: {
  className?: string;
  onCreateFolder: (name: string, color: string) => void;
}) {
  return (
    <div
      className={`flex size-full flex-col border-l border-gray-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 shadow-lg dark:border-gray-700 dark:from-[#141C2B] dark:via-[#1F2937] dark:to-[#151D2C] ${className}`}
    >
      {/* User profile */}
      <div className="border-b border-gray-100 p-6 dark:border-gray-800">
        <UserInfoClient />
      </div>

      {/* New folder button */}
      <div className="p-6">
        <Button
          className="w-full justify-center rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 font-light text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-violet-700 hover:shadow-xl"
          size="default"
          onClick={() => onCreateFolder("New Folder", "#6366f1")}
        >
          <FolderPlus className="mr-2 size-4" />
          New Folder
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 px-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search notes and folders..."
            className="h-12 rounded-xl border-gray-200 bg-white pl-12 shadow-sm transition-shadow focus:shadow-md dark:border-gray-700 dark:bg-gray-800"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4">
        {navLinks.map((section) => (
          <div key={section.subTitle} className="mb-8">
            <p className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {section.subTitle}
            </p>
            <ul className="space-y-2">
              {section.links.map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.label}>
                    <NextLink href={link.href}>
                      <Button
                        variant={link.href === "/notes" ? "default" : "ghost"}
                        className={`h-12 w-full justify-start rounded-xl transition-all duration-200 ${
                          link.href === "/notes"
                            ? "bg-purple-500 text-white shadow-md hover:bg-purple-600"
                            : "text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        <Icon className="mr-3 size-5" />
                        {link.label}
                      </Button>
                    </NextLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Theme toggle */}
      <div className="border-t border-gray-100 p-6 dark:border-[#26303F]">
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
