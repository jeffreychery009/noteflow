// app/(root)/folders/[id]/page.tsx
"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { Suspense } from "react";
import useSWR from "swr";

import NotesGrid from "@/components/layout/NotesGrid";
import Search from "@/components/search/search";
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
  const { data: session, status } = useSession();
  const { toast } = useToast();

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
              className="primary-gradient rounded-full"
            >
              <Plus className="mr-2 size-4" />
              New Note
            </Button>
          </div>
        </div>
      </div>

      {/* Notes content */}
      <div className="flex-1 p-2">
        <div className="flex">
          <NotesGrid folderId={id} />
        </div>
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
