import { useState, useEffect, useCallback } from "react";

export interface Friend {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: string;
}

interface FriendRequest {
  from: Friend;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

interface FriendsData {
  friends: Friend[];
  pendingRequests: FriendRequest[];
  sentRequests: FriendRequest[];
}

interface FriendsResponse {
  success: boolean;
  data: FriendsData;
}

export const useFriends = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendingRequests, setPendingRequests] = useState<FriendRequest[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFriends = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/friends");
      const data: FriendsResponse = await response.json();

      if (data.success) {
        setFriends(data.data.friends);
        setPendingRequests(data.data.pendingRequests);
        setSentRequests(data.data.sentRequests);
        setError(null);
      }
    } catch (error) {
      console.error("Failed to fetch friends:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendFriendRequest = useCallback(
    async (username: string) => {
      try {
        const response = await fetch("/api/friends/request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ receiverUsername: username }),
        });
        const data = await response.json();

        if (data.success) {
          // Refresh friends data to get updated sent requests
          await fetchFriends();
        }
        return data;
      } catch (error) {
        console.error("Failed to send friend request:", error);
        throw error;
      }
    },
    [fetchFriends]
  );

  const respondToFriendRequest = useCallback(
    async (username: string, status: "accepted" | "rejected") => {
      try {
        const response = await fetch("/api/friends/respond", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ senderUsername: username, status }),
        });
        const data = await response.json();

        if (data.success) {
          // Refresh friends data to get updated friends list and requests
          await fetchFriends();
        }
        return data;
      } catch (error) {
        console.error("Failed to respond to friend request:", error);
        throw error;
      }
    },
    [fetchFriends]
  );

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  return {
    friends,
    pendingRequests,
    sentRequests,
    loading,
    error,
    sendFriendRequest,
    respondToFriendRequest,
    refetch: fetchFriends,
  };
};
