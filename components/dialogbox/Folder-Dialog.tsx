"use client";

import { useSession } from "next-auth/react";
import React, { useState } from "react";
import useSWR from "swr";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { folderColors } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { createFolder } from "@/lib/utils/createFolder";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface FolderDialogProps {
  isOpen: boolean;
  onSubmit: (title: string) => void;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FolderDialog = ({ isOpen, onSubmit }: FolderDialogProps) => {
  const { data: session } = useSession();
  const [folderName, setFolderName] = useState("");
  const [selectedColor, setSelectedColor] = useState(folderColors[0].value);
  const { data, mutate } = useSWR(
    session?.user?.id ? `/api/users/${session.user.id}` : null,
    fetcher
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onSubmit("");
      setFolderName("");
      setSelectedColor(folderColors[0].value);
    }
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a folder name",
      });
      return;
    }

    await createFolder(folderName, mutate, data, toast, setIsLoading);
    if (!isLoading) {
      handleOpenChange(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild />
        <DialogContent className="max-w-md rounded-xl sm:rounded-lg">
          <DialogHeader>
            <DialogTitle>Create new folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder and choose a color.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="folder-name" className="mb-1">
                Folder name
              </Label>
              <Input
                className="bg-gray-50 outline-none ring-0 dark:bg-gray-800"
                id="folder-name"
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </div>
            <div className="mt-4 grid gap-2">
              <Label className="mb-1">Folder color</Label>
              <RadioGroup
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex flex-wrap gap-3"
              >
                {folderColors.map((color) => (
                  <div
                    key={color.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={color.value}
                      id={color.value}
                      className="sr-only"
                    />
                    <Label
                      htmlFor={color.value}
                      className="flex cursor-pointer items-center justify-center"
                    >
                      <div
                        className={`flex size-8 items-center justify-center rounded-full ${color.value} ${
                          selectedColor === color.value
                            ? "ring-2 ring-primary ring-offset-2"
                            : ""
                        }`}
                      >
                        {selectedColor === color.value && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-white"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        )}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-full">
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="primary-gradient rounded-full"
              onClick={handleCreateFolder}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FolderDialog;
