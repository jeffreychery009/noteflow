"use client";

import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

import NotesCard from "./NotesCard";

interface Note {
  _id: string;
  title: string;
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
}

const NotesGrid = ({ folderId }: NotesGridProps) => {
  const { data: session, status } = useSession();
  const { data, error } = useSWR<NotesResponse>(
    session?.user?.id ? `/api/folders/${folderId}/notes` : null,
    fetcher
  );

  console.log("SWR Data:", data); // Debug log
  console.log("Folder ID:", folderId); // Debug log

  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>Please log in to view Notes</div>;
  if (error) return <div>Failed to load Notes</div>;
  if (!data) return <div>Loading Notes...</div>;

  // Safely access the notes array
  const notes = data?.data || [];

  return (
    <div className="flex-1 overflow-auto p-2 sm:p-6">
      <div className="">
        <pre className="mt-4 text-sm text-gray-500">
          <div className="flex-1 overflow-auto p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <NotesCard key={note._id} note={note} />
              ))}
            </div>
          </div>
        </pre>
      </div>
    </div>
  );
};

export default NotesGrid;
