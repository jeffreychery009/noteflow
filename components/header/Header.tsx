import { Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

import { auth } from "@/auth";
import { ROUTES } from "@/routes";

import ProfileImage from "./ProfileImage";
import Title from "./Title";
import WelcomeMessage from "./WelcomeMessage";
import MobileNavigation from "../navigation/MobileNavigation";
import { ThemeToggle } from "../toggles/theme-toggle";
import { Button } from "../ui/button";

const Header = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 flex justify-between border-b border-gray-200 bg-white px-4 dark:border-[#2E3747] dark:bg-[#121A28]">
      <div className="flex h-20 items-center">
        <Title />
        <WelcomeMessage />
      </div>
      <div className="flex h-16 items-center">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href={ROUTES.SETTINGS}>
            <Button variant="ghost" className="flex items-center gap-2">
              <Settings />
            </Button>
          </Link>
          <ProfileImage />
          <div className="md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
