// app/(root)/folders/[id]/page.tsx
"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { Suspense } from "react";
import useSWR from "swr";

import Search from "@/components/search/search";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderData, folderFetcher } from "@/hooks/folders/types";
import { useNotes } from "@/hooks/notes/useNotes";
import { useToast } from "@/hooks/use-toast";

interface FolderContentProps {
  params: Promise<{ id: string }>;
}

function FolderContent({ params }: FolderContentProps) {
  const { id } = React.use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const { notes, isLoading: notesLoading, createNote } = useNotes(id);
  const { data, error, isLoading } = useSWR<FolderData>(
    status === "authenticated" ? `/api/users/${session.user.id}` : null,
    folderFetcher
  );

  const folder = data?.data?.folders.find((f) => f._id === id);

  const handleCreateNote = async () => {
    try {
      const result = await createNote("Untitled", "");
      if (!result.success) {
        throw new Error(result.error);
      }
      toast({
        title: "Success",
        description: "Note created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to create note",
        variant: "destructive",
      });
    }
  };

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  // Handle unauthenticated state
  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">Error loading folder: {error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-8 w-[250px]" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!folder) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Folder not found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header with search and actions */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center gap-3">
          <div className="relative mt-2 flex-1">
            <Search />
          </div>
          <div className="flex items-center">
            <Button
              onClick={handleCreateNote}
              size="sm"
              className="primary-gradient flex-1 rounded-full sm:flex-none"
            >
              <Plus className="size-4 sm:mr-2" />
              <span className="hidden font-light sm:inline">New Note</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Notes content */}
      <div className="flex-1 p-4">
        {notesLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : notes.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-500">No notes in this folder</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Note cards will go here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FolderPage(props: FolderContentProps) {
  return (
    <Suspense
      fallback={
        <div className="space-y-4 p-4">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-32 w-full" />
        </div>
      }
    >
      <FolderContent {...props} />
    </Suspense>
  );
}
