import { useSession } from "next-auth/react";
import useSWR, { mutate as globalMutate } from "swr";

type Folder = {
  _id: string;
  title: string;
  itemCount: number;
  createdAt: string;
  updatedAt?: string;
};

interface FolderData {
  success: boolean;
  data: {
    folders: Folder[];
  };
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      if (!json.success) throw new Error(json.message || "API Error");
      return json as FolderData;
    });

export function useCreateFolder() {
  const { data: session } = useSession();
  const { data, mutate } = useSWR<FolderData>(
    session?.user?.id ? `/api/users/${session.user.id}` : null,
    fetcher
  );

  const createFolder = async (title: string) => {
    if (!session?.user?.id)
      return { success: false, error: "No session found" };

    try {
      // Build optimistic folder
      const optimisticFolder: Folder = {
        _id: Date.now().toString(),
        title,
        itemCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Update the cache optimistically
      await mutate(
        {
          success: true,
          data: {
            ...data?.data,
            folders: [...(data?.data?.folders || []), optimisticFolder],
          },
        },
        false
      );

      // Make the API request
      const response = await fetch("/api/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to create folder");
      }

      // Update both endpoints
      await globalMutate("/api/folders");
      await mutate();

      return { success: true, data: result.data };
    } catch (error: any) {
      // Rollback to the exact previous state
      await mutate(data, false);
      return {
        success: false,
        error: error.message || "An unexpected error occurred",
      };
    }
  };

  return {
    createFolder,
    folders: data?.data?.folders || [],
    isLoading: !data && session?.user?.id,
  };
}
