import { useSession } from "next-auth/react";
import useSWR, { mutate as globalMutate } from "swr";

import { Folder, FolderData, folderFetcher } from "./types";

export function useDeleteFolder() {
  const { data: session } = useSession();
  const { data, mutate } = useSWR<FolderData>(
    session?.user?.id ? `/api/users/${session.user.id}` : null,
    folderFetcher
  );

  const deleteFolder = async (folderId: string) => {
    if (!session?.user?.id)
      return { success: false, error: "No session found" };

    try {
      // Build optimistic update
      const updatedFolders =
        data?.data?.folders.filter((folder) => folder._id !== folderId) || [];

      // Update cache optimistically
      await mutate(
        {
          success: true,
          data: {
            ...data?.data,
            folders: updatedFolders,
          },
        },
        false
      );

      // Make the API request
      const response = await fetch(`/api/folders/${folderId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to delete folder");
      }

      // Update both endpoints
      await globalMutate("/api/folders");
      await mutate();

      return { success: true, data: result.data };
    } catch (error) {
      console.error("Error deleting folder:", error);
      return { success: false, error: "Failed to delete folder" };
    }
  };

  return { deleteFolder };
}
