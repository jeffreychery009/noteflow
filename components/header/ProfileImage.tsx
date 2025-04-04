import { LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";

import { auth, signOut } from "@/auth";
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
import { Button } from "../ui/button";

const ProfileImage = async () => {
  const session = await auth();
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
        <DropdownMenuItem className="">
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: ROUTES.HOME });
            }}
          >
            <Button
              variant="ghost"
              type="submit"
              className="flex h-3 w-full items-center justify-start gap-2 px-0"
            >
              <LogOut className="size-4" />
              <span className="font-light tracking-wide">Logout</span>
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileImage;
