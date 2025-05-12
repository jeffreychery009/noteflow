"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";
import useSWR from "swr";

import { navLinks } from "@/constants/index";
import { FolderData, folderFetcher } from "@/hooks/folders/types";

const Title = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data } = useSWR<FolderData>(
    status === "authenticated" ? `/api/users/${session.user.id}` : null,
    folderFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const pageLabel = useMemo(() => {
    // Check if we're in a folder route
    const folderMatch = pathname.match(/\/folders\/([^/]+)/);
    if (folderMatch) {
      const folderId = folderMatch[1];
      const folder = data?.data?.folders.find((f) => f._id === folderId);
      if (folder) {
        return folder.title;
      }
      // Only show loading if we're authenticated and waiting for data
      return status === "authenticated" ? "Loading..." : "";
    }

    // Flatten all links into a single array
    const allLinks = navLinks.flatMap((section) => section.links);
    // Find the matching route
    const currentRoute = allLinks.find((link) => link.href === pathname);

    if (currentRoute?.label === "Home") {
      return "";
    }
    // Return the label or a default value
    return currentRoute?.label || "Dashboard";
  }, [pathname, data?.data?.folders, status]);

  const isInFolderRoute = pathname.startsWith("/folders/");

  return (
    <div className="flex items-center gap-2">
      {isInFolderRoute && (
        <button
          key="back-button"
          onClick={() => router.push("/folders")}
          className="rounded-full p-1 transition-colors hover:bg-accent"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      <h1 key="title" className="flex items-center text-xl">
        {pageLabel}
      </h1>
    </div>
  );
};

export default React.memo(Title);
