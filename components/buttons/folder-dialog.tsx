"use client";

import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import DialogBox from "../dialogbox/Dialog";
import CreateForm from "../forms/CreateForm";

const FolderButton = () => {
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    if (!session?.user?.id) return;
    setIsDialogOpen(true);
  };

  return (
    <div>
      <Button
        onClick={handleOpenDialog}
        className="primary-gradient flex-1 rounded-full sm:flex-none"
        size="sm"
      >
        <Plus className="size-4 sm:mr-2" />
        <span className="hidden font-light sm:inline">New Folder</span>
      </Button>

      <DialogBox
        title="Create a new folder"
        description="Create a new folder to store your files"
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      >
        <CreateForm setIsDialogOpen={setIsDialogOpen} />
      </DialogBox>
    </div>
  );
};

export default FolderButton;
