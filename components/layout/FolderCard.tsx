import { Calendar, Folder, Pencil, Pin, Share, Trash } from "lucide-react";
import React from "react";

import { useToast } from "@/hooks/use-toast";
import { useDeleteFolder } from "@/hooks/useDeleteFolder";
import { formatDate } from "@/lib/formatDate";

import DropdownOptions from "../dropdown/DropdownOptions";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const FolderCard = ({ folder }: { folder: any }) => {
  const { deleteFolder } = useDeleteFolder();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const success = await deleteFolder(folder._id);
      if (success) {
        toast({
          title: "Success",
          description: "Folder deleted successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete folder",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete folder",
        variant: "destructive",
      });
    }
  };

  const options = [
    {
      title: "Edit",
      icon: <Pencil className="size-4" />,
      onClick: () => console.log("Edit clicked"),
    },
    {
      title: "Share",
      icon: <Share className="size-4" />,
      onClick: () => console.log("Share clicked"),
    },
    {
      title: "Pin",
      icon: <Pin className="size-4" />,
      onClick: () => console.log("Pin clicked"),
    },
    {
      title: "Delete",
      icon: <Trash className="size-4" />,
      onClick: handleDelete,
    },
  ];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex size-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
            <Folder className="size-5 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <h3 className="font-medium">{folder.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {folder.itemCount} {folder.itemCount === 1 ? "item" : "items"}
            </p>
          </div>
        </div>
        <DropdownOptions options={options} />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="mr-1 size-3" />
          {formatDate(folder.updatedAt)}
        </span>

        {folder.sharedWith && (
          <div className="flex space-x-2">
            {folder.sharedWith.map((user: any) => (
              <Avatar
                key={user.id}
                className="size-6 border-2 border-white dark:border-gray-900"
              >
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderCard;
