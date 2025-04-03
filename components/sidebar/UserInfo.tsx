import React from "react";

import { auth } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserInfo = async () => {
  const session = await auth();
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-10">
        <AvatarImage
          src={session?.user?.image || ""}
          alt={session?.user?.name || "User avatar"}
        />
        <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{session?.user?.name}</p>
        <p className="truncate text-xs text-gray-500 dark:text-gray-400">
          {session?.user?.email}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
