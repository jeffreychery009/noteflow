import { Plus } from "lucide-react";
import React from "react";

import { auth } from "@/auth";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import Navigation from "../navigation/Navigation";
import Search from "../search/search";
import { Button } from "../ui/button";

const Sidebar = async () => {
  const session = await auth();

  return (
    <div className="flex size-full flex-col bg-white dark:bg-gray-950">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <Avatar className="size-10">
            <AvatarImage
              src={session?.user?.image || ""}
              alt={session?.user?.name || "User avatar"}
            />
            <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {session?.user?.name}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {session?.user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* New Folder Button */}
      <div className="p-4">
        <Button
          className="primary-gradient w-full justify-start rounded-full"
          size="sm"
        >
          <Plus className="mr-2 size-4" />
          New Folder
        </Button>
      </div>

      {/* Search */}
      <Search />

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default Sidebar;
