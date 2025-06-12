// hooks/usePresence.ts
import { useEffect } from "react";

export const usePresence = () => {
  useEffect(() => {
    console.log("🟢 usePresence started - new instance");

    // Update presence status every 30 seconds
    const updatePresence = async () => {
      try {
        console.log("📡 Sending presence update...");
        const response = await fetch("/api/presence/update", {
          method: "POST",
        });

        console.log("📊 Response status:", response.status);

        // Check for both 401 and 400
        if (response.status === 401 || response.status === 400) {
          console.log("🔴 Auth failed - returning false to stop polling");
          return false;
        }
        console.log("✅ Presence updated successfully");
        return true;
      } catch (error) {
        console.error("❌ Presence update failed:", error);
        return false;
      }
    };

    let interval: NodeJS.Timeout | null = null;
    let isActive = true; // Flag to track if this effect is still active

    const startPolling = async () => {
      console.log("🚀 Starting presence polling...");
      const success = await updatePresence();
      console.log("🔍 Initial auth check result:", success);

      if (success && isActive) {
        // If auth check passes and the effect is still active, start the interval
        console.log("✅ Auth check passed - starting interval");
        interval = setInterval(async () => {
          if (!isActive) {
            console.log("🛑 Effect no longer active, clearing interval");
            if (interval) clearInterval(interval);
            return;
          }

          console.log("⏰ Interval tick - checking presence");
          const success = await updatePresence();
          if (!success) {
            console.log("⏹️ Stopping presence polling due to auth failure");
            if (interval) {
              clearInterval(interval);
              interval = null;
            }
          }
        }, 30000);
      } else {
        console.log("❌ Auth check failed - not starting interval");
      }
    };

    startPolling();

    return () => {
      console.log("🔄 usePresence cleanup - marking as inactive");
      isActive = false;
      if (interval) {
        console.log("🧹 Clearing interval on cleanup");
        clearInterval(interval);
        interval = null;
      }
    };
  }, []);
};
