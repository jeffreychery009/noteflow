import React from "react";

import { auth } from "@/auth";
import FolderButton from "@/components/buttons/AddFolder";
import FolderGrid from "@/components/layout/FolderGrid";
import Search from "@/components/search/search";

const Folders = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const session = await auth();
  console.log(session);
  const query = (await searchParams).query;

  const addFolder = async () => {
    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        body: JSON.stringify({ title: "New Folder" }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.success) {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search query={query} />
          </div>
          <div className="flex gap-2">
            <FolderButton />
          </div>
        </div>
      </div>
      <FolderGrid />
    </div>
  );
};

export default Folders;
