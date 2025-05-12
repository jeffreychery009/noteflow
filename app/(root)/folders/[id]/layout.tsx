import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;
