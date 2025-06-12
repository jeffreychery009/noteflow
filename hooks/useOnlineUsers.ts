// hooks/useOnlineUsers.ts
import { useState, useEffect, useCallback, useRef } from "react";

export interface OnlineUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: string;
}

interface PaginationData {
  current: number;
  pages: number;
  total: number;
}

interface OnlineUsersResponse {
  success: boolean;
  users: OnlineUser[];
  pagination: PaginationData;
}

const POLLING_INTERVAL = 60000; // Increased to 60 seconds
const DEBOUNCE_DELAY = 300; // 300ms debounce for updates

export const useOnlineUsers = (page = 1, limit = 20) => {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Keep track of the last successful response to prevent UI flicker
  const lastSuccessfulResponse = useRef<OnlineUsersResponse | null>(null);

  // Track if this is the initial load
  const isInitialLoad = useRef(true);

  // Debounce timer
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Queue state updates with debouncing
  const queueUpdate = useCallback((data: OnlineUsersResponse) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      // Merge the updates instead of replacing
      setOnlineUsers((prevUsers) => {
        const updatedUsers = data.users.map((newUser) => {
          const existingUser = prevUsers.find((u) => u._id === newUser._id);
          // If user exists, preserve some properties but update online status
          return existingUser
            ? {
                ...existingUser,
                isOnline: newUser.isOnline,
                lastSeen: newUser.lastSeen,
              }
            : newUser;
        });
        return updatedUsers;
      });
      setPagination(data.pagination);
      lastSuccessfulResponse.current = data;
    }, DEBOUNCE_DELAY);
  }, []); // Empty dependency array since this callback doesn't depend on any props or state

  const fetchOnlineUsers = useCallback(
    async (isPolling = false) => {
      // Only show loading state on initial load or manual refresh
      if (!isPolling) {
        setLoading(true);
      }

      try {
        const response = await fetch(
          `/api/presence/online?page=${page}&limit=${limit}`
        );
        const data: OnlineUsersResponse = await response.json();

        if (data.success) {
          // Compare with previous data to prevent unnecessary updates
          const hasChanges =
            JSON.stringify(data.users) !==
            JSON.stringify(lastSuccessfulResponse.current?.users);

          if (hasChanges || isInitialLoad.current) {
            // Use the debounced update
            queueUpdate(data);
            setError(null);
            isInitialLoad.current = false;
          }
        }
      } catch (error) {
        console.error("Failed to fetch online users:", error);
        setError(error as Error);

        // On error during polling, keep the last successful data
        if (isPolling && lastSuccessfulResponse.current) {
          queueUpdate(lastSuccessfulResponse.current);
        }
      } finally {
        if (!isPolling) {
          setLoading(false);
        }
      }
    },
    [page, limit, queueUpdate]
  );

  useEffect(() => {
    // Reset state when page or limit changes
    isInitialLoad.current = true;
    lastSuccessfulResponse.current = null;

    // Clear any pending debounce
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Initial fetch
    fetchOnlineUsers(false);

    // Set up polling with a random offset to prevent all clients from polling at exactly the same time
    const randomOffset = Math.random() * 5000; // Random offset between 0-5 seconds
    const interval = setInterval(() => {
      fetchOnlineUsers(true);
    }, POLLING_INTERVAL + randomOffset);

    return () => {
      clearInterval(interval);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [fetchOnlineUsers]);

  const refetch = useCallback(
    () => fetchOnlineUsers(false),
    [fetchOnlineUsers]
  );

  return { onlineUsers, pagination, loading, error, refetch };
};
