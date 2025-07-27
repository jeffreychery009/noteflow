"use client";

import {
  FileText,
  Folder,
  Home,
  Settings,
  Star,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { Button } from "../ui/button";

interface NavigationProps {
  onNavigate?: () => void;
}

const Navigation = ({ onNavigate }: NavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex-1 overflow-y-auto px-4">
      <div className="mb-8">
        <p className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Main
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/home" onClick={onNavigate}>
              <Button
                variant={pathname === "/home" ? "default" : "ghost"}
                className={`h-12 w-full justify-start rounded-xl transition-all duration-200 ${
                  pathname === "/home"
                    ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md hover:from-purple-600 hover:to-violet-700"
                    : "text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Home className="mr-3 size-5" />
                Home
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/notes" onClick={onNavigate}>
              <Button
                variant={pathname === "/notes" ? "default" : "ghost"}
                className={`h-12 w-full justify-start rounded-xl transition-all duration-200 ${
                  pathname === "/notes"
                    ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md hover:from-purple-600 hover:to-violet-700"
                    : "text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <FileText className="mr-3 size-5" />
                Notes
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/folders" onClick={onNavigate}>
              <Button
                variant={pathname === "/folders" ? "default" : "ghost"}
                className={`h-12 w-full justify-start rounded-xl transition-all duration-200 ${
                  pathname === "/folders"
                    ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md hover:from-purple-600 hover:to-violet-700"
                    : "text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Folder className="mr-3 size-5" />
                Folders
              </Button>
            </Link>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <p className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Library
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/folders" onClick={onNavigate}>
              <Button
                variant={pathname === "/folders" ? "default" : "ghost"}
                className={`h-12 w-full justify-start rounded-xl transition-all duration-200 ${
                  pathname === "/folders"
                    ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md hover:from-purple-600 hover:to-violet-700"
                    : "text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Folder className="mr-3 size-5" />
                All Folders
              </Button>
            </Link>
          </li>
          <li>
            <Button
              variant="ghost"
              className="h-12 w-full justify-start rounded-xl text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Users className="mr-3 size-5" />
              Shared with me
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              className="h-12 w-full justify-start rounded-xl text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Star className="mr-3 size-5" />
              Favorites
            </Button>
          </li>
        </ul>
      </div>

      <div className="mb-8">
        <p className="mb-4 px-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Account
        </p>
        <ul className="space-y-2">
          <li>
            <Link href="/profile" onClick={onNavigate}>
              <Button
                variant={pathname === "/profile" ? "default" : "ghost"}
                className={`h-12 w-full justify-start rounded-xl transition-all duration-200 ${
                  pathname === "/profile"
                    ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md hover:from-purple-600 hover:to-violet-700"
                    : "text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <User className="mr-3 size-5" />
                Profile
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/friends" onClick={onNavigate}>
              <Button
                variant={pathname === "/friends" ? "default" : "ghost"}
                className={`h-12 w-full justify-start rounded-xl transition-all duration-200 ${
                  pathname === "/friends"
                    ? "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-md hover:from-purple-600 hover:to-violet-700"
                    : "text-gray-700 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                <Users className="mr-3 size-5" />
                Friends
              </Button>
            </Link>
          </li>
          <li>
            <Button
              variant="ghost"
              className="h-12 w-full justify-start rounded-xl text-gray-700 transition-all duration-200 hover:bg-white hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <Settings className="mr-3 size-5" />
              Settings
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
