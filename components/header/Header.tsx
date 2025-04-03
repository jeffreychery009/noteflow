import React from "react";

import Title from "./Title";
import WelcomeMessage from "./WelcomeMessage";
import MobileNavigation from "../navigation/MobileNavigation";
import { ThemeToggle } from "../toggles/theme-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-16 items-center gap-4">
        <Title />
        <WelcomeMessage />
      </div>
      <div className="flex h-16 items-center">
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex items-center md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
