import { SearchIcon } from "lucide-react";
import React from "react";

import { Input } from "../ui/input";

const Search = () => {
  return (
    <div className="mb-2 px-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search"
          className="border-gray-200 bg-gray-50 pl-9 dark:border-gray-800 dark:bg-gray-900"
        />
      </div>
    </div>
  );
};

export default Search;
