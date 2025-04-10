"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import React from "react";
import useSWR from "swr";

import { ROUTES } from "@/routes";

import FolderCard from "./FolderCard";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const FolderGrid = () => {
  const { data: session, status } = useSession();

  // Using relative URL (/api/...) automatically prepends the current domain
  // In development: http://localhost:3000/api/users/...
  // In production: https://your-domain.com/api/users/...
  const { data, error } = useSWR(
    session?.user?.id ? `/api/users/${session.user.id}` : null,
    fetcher
  );

  // Handle loading states
  if (status === "loading") return <div>Loading session...</div>;
  if (!session) return <div>Please log in to view folders</div>;
  if (error) return <div>Failed to load folders</div>;
  if (!data) return <div>Loading folders...</div>;

  console.log("Session user ID:", session.user.id);
  console.log("Folder data structure:", data.data?.folders);

  return (
    <div className="flex-1 overflow-auto p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.data?.folders.map((folder: any) => (
          <Link href={ROUTES.FOLDER_DETAILS(folder._id)} key={folder._id}>
            <FolderCard folder={folder} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FolderGrid;
