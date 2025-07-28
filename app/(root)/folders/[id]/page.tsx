// app/(root)/folders/[id]/page.tsx
"use client";

import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { Suspense } from "react";
import useSWR from "swr";

import NotesGrid from "@/components/layout/NotesGrid";
import SearchActionBar from "@/components/layout/SearchActionBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FolderData, folderFetcher } from "@/hooks/folders/types";
import { useToast } from "@/hooks/use-toast";

interface FolderContentProps {
  params: Promise<{ id: string }>;
}

function FolderContent({ params }: FolderContentProps) {
  const { id } = React.use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const query = searchParams.get("query") || "";

  const { data, error, isLoading } = useSWR<FolderData>(
    status === "authenticated" ? `/api/users/${session.user.id}` : null,
    folderFetcher
  );

  const folder = data?.data?.folders.find((f) => f._id === id);

  const handleCreateNote = () => {
    try {
      router.push(`/new?folderId=${id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to navigate to note editor",
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
      {/* Search and action bar */}
      <SearchActionBar
        placeholder="Search notes..."
        showNewFolderButton={false}
        showFilterButton={true}
        showSortButton={true}
        onSearchChange={(value) => {
          // Handle search change
          console.log("Search:", value);
        }}
        customNewButton={
          <Button
            onClick={handleCreateNote}
            size="sm"
            className="h-12 rounded-xl bg-gradient-to-r from-purple-500 to-violet-600 font-light text-white shadow-lg hover:from-purple-600 hover:to-violet-700"
          >
            <Plus className="mr-2 size-4" />
            New Note
          </Button>
        }
      />

      {/* Notes content */}
      <div className="flex-1 overflow-auto p-6">
        <NotesGrid folderId={id} query={query} />
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
