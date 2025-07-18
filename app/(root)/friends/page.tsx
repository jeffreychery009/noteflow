import React from "react";

import FriendsTabs from "@/components/friends/FriendsTabs";
import Search from "@/components/search/search";

const FriendsPage = () => {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold">
        <span className="text-blue-600">
          {/* Icon here */}{" "}
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4Z"
              fill="currentColor"
            />
          </svg>
        </span>
        Friends
      </h1>
      <Search /> {/*TODO: FIX STYLING*/}
      <div className="mt-4">
        <FriendsTabs />
      </div>
    </div>
  );
};

export default FriendsPage;
