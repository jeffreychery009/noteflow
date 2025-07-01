import React from "react";

import { useFriends } from "@/hooks/useFriends";

import FriendCard from "./FriendCard";

interface FriendsListProps {
  type: "friends" | "requests" | "sent" | "discover";
}

const FriendsList: React.FC<FriendsListProps> = ({ type }) => {
  const { friends, pendingRequests, sentRequests, loading, error } =
    useFriends();

  let data: any[] = [];
  if (type === "friends") {
    data = friends;
  } else if (type === "requests") {
    data = pendingRequests.map((req) => req.from);
  } else if (type === "sent") {
    data = sentRequests.map((req) => req.from);
  } // Discover can be implemented later

  if (loading) {
    return <div className="py-12 text-center text-gray-400">Loading...</div>;
  }
  if (error) {
    return (
      <div className="py-12 text-center text-red-400">
        Error loading friends.
      </div>
    );
  }
  if (!data.length) {
    return (
      <div className="py-12 text-center text-gray-400">No {type} found.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((user) => (
        <FriendCard
          key={user._id}
          user={{
            id: user._id,
            name: user.name,
            email: user.email,
            mutualFriends: 0, // Replace with real value if available
            online: user.isOnline,
          }}
        />
      ))}
    </div>
  );
};

export default FriendsList;
