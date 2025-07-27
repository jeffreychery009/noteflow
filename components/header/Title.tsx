"use client";

import { ChevronLeft, Folder, LucideIcon } from "lucide-react";
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

  const { pageLabel, pageIcon } = useMemo(() => {
    // Check if we're in a folder route
    const folderMatch = pathname.match(/\/folders\/([^/]+)/);
    if (folderMatch) {
      const folderId = folderMatch[1];
      const folder = data?.data?.folders.find((f) => f._id === folderId);
      if (folder) {
        return { pageLabel: folder.title, pageIcon: Folder };
      }
      // Only show loading if we're authenticated and waiting for data
      return {
        pageLabel: status === "authenticated" ? "Loading..." : "",
        pageIcon: Folder,
      };
    }

    // Flatten all links into a single array
    const allLinks = navLinks.flatMap((section) => section.links);
    // Find the matching route
    const currentRoute = allLinks.find((link) => link.href === pathname);

    if (currentRoute?.label === "Home") {
      return { pageLabel: "", pageIcon: null };
    }
    // Return the label and icon or default values
    return {
      pageLabel: currentRoute?.label || "Dashboard",
      pageIcon: currentRoute?.icon || Folder,
    };
  }, [pathname, data?.data?.folders, status]) as {
    pageLabel: string;
    pageIcon: LucideIcon | null;
  };

  const isInFolderRoute = pathname.startsWith("/folders/");

  return (
    <div className="flex items-center gap-3">
      {isInFolderRoute && (
        <button
          key="back-button"
          onClick={() => router.push("/folders")}
          className="rounded-full p-1 transition-colors hover:bg-accent"
        >
          <ChevronLeft className="size-5" />
        </button>
      )}
      <div className="flex items-center gap-3">
        {pageIcon && (
          <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500 shadow-sm">
            {React.createElement(pageIcon, { className: "size-5 text-white" })}
          </div>
        )}
        <h1
          key="title"
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          {pageLabel}
        </h1>
      </div>
    </div>
  );
};

export default React.memo(Title);
