import React from "react";

import Sidebar from "@/components/sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black">
      <div className="hidden border-r border-gray-200 md:block md:w-64 dark:border-gray-800">
        <Sidebar />
      </div>
    </div>
  );
};

export default Layout;
