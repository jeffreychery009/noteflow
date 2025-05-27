"use client";

import { useSession } from "next-auth/react";
import React from "react";
import useSWR, { mutate } from "swr";

import NotesCard from "@/components/layout/NotesCard";
import { useToast } from "@/hooks/use-toast";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface NotesResponse {
  success: boolean;
  data: Note[];
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

interface NotesGridProps {
  folderId: string;
  query?: string;
}

const NotesGrid = ({ folderId, query }: NotesGridProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const {
    data,
    error,
    mutate: mutateNotes,
  } = useSWR(folderId ? `/api/folders/${folderId}/notes` : null);

  const { data: folderData, mutate: mutateFolders } = useSWR(
    session?.user?.id ? `/api/users/${session.user.id}` : null
  );

  const handleDeleteNote = async (noteId: string) => {
    try {
      const response = await fetch(`/api/notes/${noteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      // Revalidate both notes list and folder data
      await Promise.all([mutateNotes(), mutateFolders()]);

      toast({
        title: "Success",
        description: "Note deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting note:", error);
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      });
    }
  };

  const filteredNotes = data?.data?.filter((note: any) =>
    note.title.toLowerCase().includes(query?.toLowerCase() || "")
  );

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">Error loading notes</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Loading notes...</p>
      </div>
    );
  }

  if (filteredNotes?.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">No notes found in this folder</p>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredNotes.map((note: any) => (
        <NotesCard
          key={note._id}
          note={note}
          onDelete={() => handleDeleteNote(note._id)}
        />
      ))}
    </div>
  );
};

export default NotesGrid;
