// components/FolderCard.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Folder,
  MoreHorizontal,
  Pencil,
  Share,
  Trash,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { useDeleteFolder } from "@/hooks/folders/useDeleteFolder";
import { useToast } from "@/hooks/use-toast";
import { formatDate } from "@/lib/formatDate";
import { ROUTES } from "@/routes";

import DialogBox from "../dialogbox/Dialog";
import DropdownOptions from "../dropdown/DropdownOptions";
import EditForm from "../forms/EditForm";
import SearchModal from "../modal/searchModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const formSchema = z.object({
  name: z.string().min(1, "Folder name is required"),
});

const FolderCard = ({ folder }: { folder: any }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { deleteFolder } = useDeleteFolder();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: folder.title,
    },
  });

  const handleDelete = async () => {
    try {
      const confirmToast = new Promise<boolean>((resolve) => {
        toast({
          title: "Are you sure you want to delete this folder?",
          description: "This action cannot be undone.",
          action: (
            <div className="flex justify-end gap-2">
              <Button variant="destructive" onClick={() => resolve(true)}>
                Delete
              </Button>
            </div>
          ),
        });
      });

      // Only proceed if user confirmed
      const confirmed = await confirmToast;
      if (confirmed) {
        const result = await deleteFolder(folder._id);

        if (result.success) {
          toast({
            className: "bg-green-500 text-white dark:bg-green-900",
            variant: "default",
            title: "Success",
            description: "Folder deleted successfully",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: result.error || "Failed to delete folder",
          });
        }
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete folder",
      });
    }
  };

  const options = [
    {
      title: "Edit",
      icon: <Pencil className="size-4" />,
      onClick: () => setIsEditOpen(true),
    },
    {
      title: "Delete",
      icon: <Trash className="size-4" />,
      onClick: handleDelete,
    },
    {
      title: "Share",
      icon: <Share className="size-4" />,
      onClick: () => setIsShareOpen(true),
    },
  ];

  return (
    <>
      <div className="relative rounded-3xl border border-gray-100 bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
        {/* Dropdown Menu - Positioned Absolutely */}
        <div className="absolute right-4 top-4 z-10">
          <DropdownOptions options={options} />
        </div>

        <DialogBox
          title="Edit Folder"
          description="Edit the folder name"
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
        >
          <div className="mt-4">
            <EditForm
              setIsEditOpen={setIsEditOpen}
              folderId={folder._id}
              defaultValue={folder.title}
            />
          </div>
        </DialogBox>

        {isShareOpen && (
          <SearchModal
            itemType="folder"
            itemName={folder.title}
            open={isShareOpen}
            onOpenChange={setIsShareOpen}
          />
        )}

        {/* Clickable Card Content */}
        <Link href={ROUTES.FOLDER_DETAILS(folder._id)} className="block">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="mr-4 flex size-12 items-center justify-center rounded-xl bg-purple-500">
                <Folder className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {folder.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {folder.itemCount} {folder.itemCount === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 flex items-center justify-between">
            <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <Calendar className="mr-2 size-4" />
              {formatDate(folder.updatedAt)}
            </span>

            {folder.sharedWith && folder.sharedWith.length > 0 ? (
              <div className="flex -space-x-2">
                {folder.sharedWith
                  .slice(0, 3)
                  .map((user: any, index: number) => (
                    <Avatar
                      key={user.id}
                      className="size-8 border-2 border-white dark:border-gray-900"
                    >
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  ))}
              </div>
            ) : (
              <div className="flex -space-x-2">
                {/* <div className="size-8 rounded-full border-2 border-purple-200 bg-gray-100 dark:border-purple-800 dark:bg-gray-800"></div>
                <div className="size-8 rounded-full border-2 border-purple-200 bg-gray-100 dark:border-purple-800 dark:bg-gray-800"></div> */}
              </div>
            )}
          </div>
        </Link>
      </div>
    </>
  );
};

export default FolderCard;
