"use client";

import { Menu } from "lucide-react";
import React, { useState } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import MobileSidebar from "../sidebar/MobileSidebar";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu className="size-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] p-0 md:hidden">
        <MobileSidebar onNavigate={handleNavigate} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
