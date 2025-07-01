"use client";

import React, { useState } from "react";

import FriendsList from "./FriendsList";

const TABS = [
  { label: "Friends", key: "friends" },
  { label: "Requests", key: "requests" },
  { label: "Sent", key: "sent" },
  { label: "Discover", key: "discover" },
];

const FriendsTabs = () => {
  const [activeTab, setActiveTab] = useState("friends");

  return (
    <div>
      <div className="mb-6 flex w-full overflow-hidden rounded-lg bg-gray-100">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 py-2 text-center text-base font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white text-blue-700 shadow-sm"
                : "text-gray-500 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <FriendsList
        type={activeTab as "friends" | "requests" | "sent" | "discover"}
      />
    </div>
  );
};

export default FriendsTabs;
