"use client";

import { SearchIcon, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

import { ROUTES } from "@/routes";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Search = ({ query: initialQuery }: { query?: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = (value: string) => {
    setQuery(value);
    const searchParams = new URLSearchParams();
    if (value) {
      searchParams.set("query", value);
    }

    // If we're in a folder, maintain the current path
    if (pathname.startsWith("/folders/")) {
      router.push(`${pathname}?${searchParams.toString()}`);
    } else {
      // Otherwise, go to the folders page (default behavior)
      router.push(`${ROUTES.FOLDERS}?${searchParams.toString()}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    // If we're in a folder, maintain the current path
    if (pathname.startsWith("/folders/")) {
      router.push(pathname);
    } else {
      // Otherwise, go to the folders page (default behavior)
      router.push(ROUTES.FOLDERS);
    }
  };

  return (
    <div className="mb-2 px-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
          className="border-gray-200 bg-gray-50 pl-9 dark:border-gray-800 dark:bg-gray-900"
        />
        {query && (
          <Button
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
            onClick={clearSearch}
          >
            <X className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Search;
