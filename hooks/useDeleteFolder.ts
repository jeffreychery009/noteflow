import { useSession } from "next-auth/react";
import useSWR, { mutate } from "swr";

export function useDeleteFolder() {
  const { data: session } = useSession();

  const deleteFolder = async (id: string) => {
    if (!session?.user?.id) {
      throw new Error("User not authenticated");
    }

    try {
      const response = await fetch("/api/folders", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete folder");
      }

      // Mutate the cache with the correct key and data structure
      await mutate(
        `/api/users/${session.user.id}`,
        (currentData: any) => {
          if (!currentData?.data?.folders) return currentData;

          return {
            ...currentData,
            data: {
              ...currentData.data,
              folders: currentData.data.folders.filter(
                (f: any) => f._id !== id
              ),
            },
          };
        },
        false
      ); // false means don't revalidate immediately

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { deleteFolder };
}
