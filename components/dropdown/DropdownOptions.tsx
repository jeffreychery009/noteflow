import { MoreHorizontal } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

const DropdownOptions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="rounded-md p-3 outline-none hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <MoreHorizontal className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownOptions;
