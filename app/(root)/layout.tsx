import React from "react";

import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-[#151D2C]">
      <div className="hidden border-r border-gray-200 md:block md:w-80 dark:border-gray-800">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
