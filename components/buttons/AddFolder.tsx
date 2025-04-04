"use client";

import { Plus } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";

const FolderButton = () => {
  const addFolder = async () => {
    try {
      const response = await fetch("/api/folders", {
        method: "POST",
        body: JSON.stringify({ title: "New Folder" }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.success) {
        console.log("Folder created:", data.data);
        // Optionally trigger a refresh of your folders list here
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={addFolder}
      className="primary-gradient flex-1 rounded-full sm:flex-none"
      size="sm"
    >
      <Plus className="size-4 sm:mr-2" />
      <span className="hidden font-light sm:inline">New Folder</span>
    </Button>
  );
};

export default FolderButton;
