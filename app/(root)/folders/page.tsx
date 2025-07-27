"use client";

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import FolderGrid from "@/components/layout/FolderGrid";
import SearchActionBar from "@/components/layout/SearchActionBar";

const Folders = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  // Redirect unauthenticated users to sign-in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="p-6">
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

  const handleSearchChange = (value: string) => {
    setQuery(value);
    // Update URL with search query
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("query", value);
    } else {
      params.delete("query");
    }
    router.push(`/folders?${params.toString()}`);
  };

  return (
    <div>
      <SearchActionBar
        placeholder="Search folders..."
        onSearchChange={handleSearchChange}
      />
      <FolderGrid query={query} />
    </div>
  );
};

export default Folders;
