"use client";

import NotesCard from "@/components/layout/NotesCard";
import { useAllNotes } from "@/hooks/notes/useNotes";

export default function NotesPage() {
  const { notes, isLoading } = useAllNotes();

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Your Notes</h1>
        <div className="flex h-64 items-center justify-center text-gray-500">
          Loading notes...
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Your Notes</h1>
      {notes.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-gray-500">
          No notes found.
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NotesCard key={note._id} note={note} onDelete={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
