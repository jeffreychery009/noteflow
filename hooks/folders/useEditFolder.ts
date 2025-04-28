import { useSession } from "next-auth/react";
import useSWR, { mutate as globalMutate } from "swr";

import { Folder, FolderData, folderFetcher } from "./types";

export function useEditFolder() {
  const { data: session } = useSession();
  const { data, mutate } = useSWR<FolderData>(
    session?.user?.id ? `/api/users/${session.user.id}` : null,
    folderFetcher
  );

  const editFolder = async (folderId: string, newTitle: string) => {
    if (!session?.user?.id) {
      return { success: false, error: "No session found" };
    }

    try {
      // Find the current folder
      const currentFolder = data?.data?.folders.find(
        (folder) => folder._id === folderId
      );

      if (!currentFolder) {
        throw new Error("Folder not found");
      }

      // Create optimistic update
      const updatedFolders =
        data?.data?.folders.map((folder) =>
          folder._id === folderId
            ? {
                ...folder,
                title: newTitle,
                updatedAt: new Date().toISOString(), // Make sure this is being set
              }
            : folder
        ) || [];

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
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      const result = await response.json();
      console.log("API Response Structure:", {
        success: result.success,
        folder: result.folder, // Should show the updated timestamps
        message: result.message,
      });

      // Update with server response
      const updatedServerFolders: Folder[] = (data?.data?.folders || []).map(
        (folder) => (folder._id === folderId ? result.folder : folder)
      );

      await mutate(
        {
          success: true,
          data: {
            ...data?.data,
            folders: updatedServerFolders,
          },
        },
        false
      );

      // Final revalidation
      await mutate();
      await globalMutate("/api/folders");

      return { success: true, data: result.data };
    } catch (error: any) {
      console.error("Edit folder error:", error);
      await mutate(data, false);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    }
  };

  return {
    editFolder,
    folders: data?.data?.folders || [],
    isLoading: !data && session?.user?.id,
  };
}
