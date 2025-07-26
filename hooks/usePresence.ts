// hooks/usePresence.ts
"use client";

import { useEffect } from "react";

export const usePresence = () => {
  useEffect(() => {
    const updatePresence = async (forceStatus?: boolean) => {
      try {
        const status = typeof forceStatus === "boolean" ? forceStatus : true;

        // Fetching the presence update endpoint
        const response = await fetch("/api/presence/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        });

        // If the response is not ok, log the error
        if (!response.ok) {
          console.log("Failed to update presence:", await response.text());
          return false;
        }

        // If the response is ok, return true
        return true;
      } catch (error) {
        console.error("Presence update failed:", error);
        return false;
      }
    };

    let interval: NodeJS.Timeout | null = null;
    let isActive = true;

    // Starting the polling
    const startPolling = async () => {
      const success = await updatePresence();

      if (success && isActive) {
        // Setting the interval
        interval = setInterval(async () => {
          if (!isActive) {
            if (interval) clearInterval(interval);
            return;
          }

          // Updating the presence
          const success = await updatePresence();
          if (!success && interval) {
            clearInterval(interval);
            interval = null;
          }
        }, 30000);
      }
    };

    startPolling();

    // Cleaning up the interval
    return () => {
      isActive = false;
      if (interval) {
        clearInterval(interval);
        interval = null;
      }

      // Sending the offline status
      updatePresence(false).catch((error) =>
        console.error("Failed to send offline status:", error)
      );
    };
  }, []);
};
