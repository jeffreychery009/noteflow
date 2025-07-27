import { Plus, Search } from "lucide-react";
import React from "react";

import UserInfo from "./UserInfo";
import Navigation from "../navigation/Navigation";
import { ThemeToggle } from "../toggles/theme-toggle";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <div
      className={`flex size-full flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 ${className}`}
    >
      {/* User profile */}
      <div className="border-b border-gray-100 p-6 dark:border-gray-800">
        <UserInfo />
      </div>

      {/* New folder button */}
      <div className="p-6">
        <Button
          className="w-full justify-center bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg transition-all duration-200 hover:from-purple-600 hover:to-violet-700 hover:shadow-xl"
          size="default"
        >
          <Plus className="mr-2 size-4" />
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
      <Navigation />

      {/* Theme toggle */}
      <div className="border-t border-gray-100 p-6 dark:border-gray-800">
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
