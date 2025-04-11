"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import FolderDialog from "../dialogbox/Folder-Dialog";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FolderButton = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use the same key as FolderGrid for consistency

  const addFolder = async () => {
    if (!session?.user?.id) return;

    setIsDialogOpen(true);
  };

  return (
    <div>
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
      <FolderDialog
        isOpen={isDialogOpen}
        onSubmit={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default FolderButton;
