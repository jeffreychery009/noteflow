"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import NotesCard from "@/components/layout/NotesCard";
import SearchActionBar from "@/components/layout/SearchActionBar";
import { useAllNotes } from "@/hooks/notes/useNotes";

export default function NotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { notes, isLoading } = useAllNotes();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold">Your Notes</h1>
        <div className="flex h-64 items-center justify-center text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (status === "unauthenticated") {
    return null;
  }

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
    <div>
      <SearchActionBar
        placeholder="Search notes..."
        showNewFolderButton={false}
        onSearchChange={(value) => {
          // Handle search change
          console.log("Search:", value);
        }}
      />
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
    </div>
  );
}
