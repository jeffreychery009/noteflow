"use client";

import { ArrowUpDown, Filter, Search } from "lucide-react";
import { useState } from "react";

import FolderButton from "../buttons/folder-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchActionBarProps {
  placeholder?: string;
  onSearchChange?: (value: string) => void;
  showNewFolderButton?: boolean;
  showFilterButton?: boolean;
  showSortButton?: boolean;
}

const SearchActionBar = ({
  placeholder = "Search...",
  onSearchChange,
  showNewFolderButton = true,
  showFilterButton = true,
  showSortButton = true,
}: SearchActionBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange?.(value);
  };

  return (
    <div className="border-b border-gray-200 bg-white/50 px-6 py-4 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/50">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={placeholder}
            className="h-12 rounded-xl border-gray-200 bg-white/80 pl-12 text-base backdrop-blur-sm dark:border-gray-600 dark:bg-gray-800/80"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex gap-3">
          {showFilterButton && (
            <Button
              variant="outline"
              size="sm"
              className="h-12 flex-1 rounded-xl border-gray-200 bg-white/80 px-6 backdrop-blur-sm hover:bg-white sm:flex-none dark:border-gray-600 dark:bg-gray-800/80 dark:hover:bg-gray-700"
            >
              <Filter className="size-4 sm:mr-2" />
              <span className="hidden font-medium sm:inline">Filter</span>
            </Button>
          )}
          {showSortButton && (
            <Button
              variant="outline"
              size="sm"
              className="h-12 flex-1 rounded-xl border-gray-200 bg-white/80 px-6 backdrop-blur-sm hover:bg-white sm:flex-none dark:border-gray-600 dark:bg-gray-800/80 dark:hover:bg-gray-700"
            >
              <ArrowUpDown className="size-4 sm:mr-2" />
              <span className="hidden font-medium sm:inline">Sort</span>
            </Button>
          )}
          {showNewFolderButton && <FolderButton />}
        </div>
      </div>
    </div>
  );
};

export default SearchActionBar;
