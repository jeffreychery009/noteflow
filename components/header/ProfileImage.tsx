"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/routes";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileImage = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    try {
      await fetch("/api/presence/offline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Failed to set user offline:", error);
    }
    await signOut({ callbackUrl: ROUTES.HOME });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="size-6">
          <AvatarImage src={session?.user?.image || ""} />
          <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={ROUTES.PROFILE}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={ROUTES.SETTINGS}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="size-4" />
          <span className="font-light tracking-wide">Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileImage;
