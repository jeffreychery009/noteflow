import { MoreHorizontal } from "lucide-react";
import React from "react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

interface DropdownOption {
  title: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface DropdownOptionsProps {
  options: DropdownOption[];
}

const DropdownOptions = ({ options }: DropdownOptionsProps) => {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => {}}
          className="rounded-md p-3 outline-none hover:bg-gray-100 dark:hover:bg-gray-800"
          variant="ghost"
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option, index) => (
          <DropdownMenuItem
            key={index}
            onClick={() => {
              option.onClick();
            }}
          >
            {option.icon && <span className="mr-2">{option.icon}</span>}
            {option.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownOptions;
