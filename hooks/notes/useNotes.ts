import { useSession } from "next-auth/react";
import useSWR, { mutate as globalMutate } from "swr";

import { Note, NoteData, noteFetcher } from "./types";

export function useAllNotes() {
  const { data: session } = useSession();
  const { data, mutate } = useSWR<NoteData>(
    session?.user?.id ? "/api/notes" : null,
    noteFetcher
  );

  return {
    notes: data?.data || [],
    isLoading: !data && session?.user?.id,
    mutate,
  };
}

export function useNotes(folderId: string) {
  const { data: session } = useSession();
  const { data, mutate } = useSWR<NoteData>(
    session?.user?.id && folderId ? `/api/folders/${folderId}/notes` : null,
    noteFetcher
  );

  const createNote = async (title: string, content: string) => {
    if (!session?.user?.id)
      return { success: false, error: "No session found" };
    if (!folderId) return { success: false, error: "No folder specified" };

    try {
      // Build optimistic note
      const optimisticNote: Note = {
        _id: Date.now().toString(),
        title,
        content,
        folder: folderId,
        owner: session.user.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Update the cache optimistically
      await mutate(
        {
          success: true,
          data: [...(data?.data || []), optimisticNote],
        },
        false
      );

      // Make the API request
      const response = await fetch(`/api/folders/${folderId}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to create note");
      }

      // Update both endpoints
      await globalMutate(`/api/folders/${folderId}/notes`);
      await mutate();

      return { success: true, data: result.data };
    } catch (error) {
      // Rollback on error
      await mutate(data, false);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create note",
      };
    }
  };

  return {
    createNote,
    notes: data?.data || [],
    isLoading: !data && session?.user?.id && !!folderId,
  };
}
