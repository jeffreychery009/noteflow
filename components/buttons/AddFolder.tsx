"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/ui/button";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FolderButton = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // Use the same key as FolderGrid for consistency
  const { data, mutate } = useSWR(
    session?.user?.id ? `/api/users/${session.user.id}` : null,
    fetcher
  );

  const addFolder = async () => {
    if (!session?.user?.id) return;

    try {
      setIsLoading(true);
      console.log("Current data structure:", data); // Log current data

      // Optimistically update the UI
      const optimisticFolder = {
        _id: Date.now().toString(), // Temporary ID
        title: "New Folder",
        itemCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("Optimistic folder:", optimisticFolder); // Log optimistic folder

      // Update the cache optimistically
      const optimisticData = {
        success: true,
        data: {
          ...data?.data,
          folders: [...(data?.data?.folders || []), optimisticFolder],
        },
      };
      console.log("New data structure:", optimisticData); // Log new data structure

      await mutate(optimisticData, false);

      // Make the actual API request
      const response = await fetch("/api/folders", {
        method: "POST",
        body: JSON.stringify({ title: "New Folder" }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      console.log("API response:", result); // Log API response

      if (result.success) {
        // Update the cache with the real data
        await mutate();
      } else {
        // If there's an error, rollback the optimistic update
        await mutate(data, false);
      }
    } catch (error) {
      console.error(error);
      // Rollback on error
      await mutate(data, false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={addFolder}
      className="primary-gradient flex-1 rounded-full sm:flex-none"
      size="sm"
      disabled={isLoading}
    >
      <Plus className={`size-4 sm:mr-2 ${isLoading ? "animate-spin" : ""}`} />
      <span className="hidden font-light sm:inline">
        {isLoading ? "Creating..." : "New Folder"}
      </span>
    </Button>
  );
};

export default FolderButton;
