import { Plus } from "lucide-react";
import React from "react";

import UserInfoClient from "./UserInfoClient";
import Navigation from "../navigation/Navigation";
import Search from "../search/search";
import { Button } from "../ui/button";

interface MobileSidebarProps {
  onNavigate?: () => void;
}

const MobileSidebar = ({ onNavigate }: MobileSidebarProps) => {
  return (
    <div className="flex size-full flex-col bg-white dark:bg-gray-950">
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <UserInfoClient />
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
      <Navigation onNavigate={onNavigate} />
    </div>
  );
};

export default MobileSidebar;
